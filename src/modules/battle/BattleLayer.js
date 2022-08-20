let BattleLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        BattleManager.getInstance().registerBattleLayer(this);
        this.selectedCard = null;
        this.selectedCardLevel = null;

        this._prefetchAssetGame();

        // init entity manager
        this._entityManager = new EntityManager();
        EntityManager.getInstance = function () {
            return this._entityManager;
        }.bind(this);

        if (!GameConfig.NETWORK) {
            BattleData.fakeData();
        }
        this.battleData = BattleManager.getInstance().getBattleData();

        // this.battleLoop = new BattleLoop();

        // _initSystem() must be call before _setupUI
        this._initSystem();
        this._setupUI();

        // this._initTower();
        this._handleEventKey();

        let delayTime = (tickManager.getStartTime() - TimeUtil.getServerTime()) / 1000;
        cc.error("start time = " + tickManager.getStartTime());
        cc.error("delay time = " + delayTime);
        this.scheduleOnce(this.startGame, delayTime);
        // this.oneTimeBornMonster({x: 0, y: 4}, GameConfig.USER1());
        // this.oneTimeBornMonster({x: 0, y: 4}, GameConfig.USER2());
    },

    _setupUI: function () {
        this.uiLayer = new BattleUILayer(this.battleData);
        this.addChild(this.uiLayer, 2);
        this.mapLayer = new BattleMapLayer(this.battleData);
        this.mapLayer._genMap(GameConfig.USER1());
        this.mapLayer._genMap(GameConfig.USER2());
        this.addChild(this.mapLayer, 1);

        this.fpsText = new ccui.Text("", "textures/font/SVN-Supercell Magic.ttf", 20);
        this.fpsText.setPosition(cc.p(cc.winSize.width - 50, cc.winSize.height - 30));
        this.addChild(this.fpsText, 100);
    },

    _initSystem: function () {
        this.resetSystem = SystemFactory.create(ResetSystem);
        this.movementSystem = SystemFactory.create(MovementSystem);
        this.renderSystem = SystemFactory.create(RenderSystem);
        this.lifeSystem = SystemFactory.create(LifeSystem);
        this.attackSystem = SystemFactory.create(AttackSystem);
        this.collisionSystem = SystemFactory.create(CollisionSystem);
        this.effectSystem = SystemFactory.create(EffectSystem);
        this.pathSystem = SystemFactory.create(PathMonsterSystem);
        this.spellSystem = SystemFactory.create(SpellSystem);
        this.skeletonAnimationSystem = SystemFactory.create(SkeletonAnimationSystem);
        this.monsterSystem = SystemFactory.create(MonsterSystem);
        this.bulletSystem = SystemFactory.create(BulletSystem);
        this.abilitySystem = SystemFactory.create(AbilitySystem);
        this.spriteSheetAnimationSystem = SystemFactory.create(SpriteSheetAnimationSystem);
        this.towerSpecialSkillSystem = SystemFactory.create(TowerSpecialSkillSystem);
    },

    update: function (dt) {
        this.fpsText.setString(cc.director.getFrameRate().toFixed(1));
        let currentTick = tickManager.getCurrentTick();
        while (tickManager.getLatestUpdateTick() < currentTick) {
            tickManager.updateData();
        }

        this.getTimerNode().timer();
        this.movementSystem.start(dt);
        this.spriteSheetAnimationSystem.start(dt);
        this.skeletonAnimationSystem.start(dt);
        this.renderSystem.start(dt);
        tickManager.renderNormalTimerNode();
    },

    createMonsterByEntityTypeID: function (mode, entityTypeID, entityId) {
        let pixelPos = Utils.tile2Pixel(0, 4, mode);
        switch (entityTypeID) {
            case GameConfig.ENTITY_ID.SWORD_MAN:
                EntityFactory.createSwordsmanMonster(pixelPos, mode, entityId);
                break;
            case GameConfig.ENTITY_ID.GIANT:
                EntityFactory.createGiantMonster(pixelPos, mode, entityId);
                break;
            case GameConfig.ENTITY_ID.NINJA:
                EntityFactory.createNinjaMonster(pixelPos, mode, entityId);
                break;
            case GameConfig.ENTITY_ID.BAT:
                EntityFactory.createBatMonster(pixelPos, mode, entityId);
                break;
            case GameConfig.ENTITY_ID.ASSASSIN:
                EntityFactory.createAssassinMonster(pixelPos, mode, entityId);
                break;
            case GameConfig.ENTITY_ID.DEMON_TREE:
                EntityFactory.createDemonTreeBoss(pixelPos, mode, entityId);
                break;
            case GameConfig.ENTITY_ID.DARK_GIANT:
                EntityFactory.createDarkGiantBoss(pixelPos, mode, entityId);
                break;
            case GameConfig.ENTITY_ID.SATYR:
                EntityFactory.createSatyrBoss(pixelPos, mode, entityId);
                break;
        }
    },

    /**
     *
     * @param type
     * @param pixelPos in map node space
     * @param mode
     */
    putCardAt: function (type, pixelPos, mode) {
        BattleManager.getInstance().getCardDeckNode().removeDragSprite(type);
        let tilePos = Utils.pixel2Tile(pixelPos.x, pixelPos.y, mode);
        if (!BattleManager.getInstance().getCardDeckNode().validateEnoughEnergySelectCard(type)) {
            BattleManager.getInstance().getBattleLayer().uiLayer.notify("Không đủ năng lượng");
            EventDispatcher.getInstance()
                .dispatchEvent(EventType.INVALID_PUT_CARD_POSITION, {cardId: type, mode: mode})
            return;
        }

        let {error, msg} = ValidatorECS.validatePositionPutCard(type, pixelPos, mode);
        if (error) {
            this.uiLayer.notify(msg);
            EventDispatcher.getInstance()
                .dispatchEvent(EventType.INVALID_PUT_CARD_POSITION, {cardId: type, mode: mode})
            return;
        }

        BattleManager.getInstance().getCardDeckNode().handlePutCardIntoMap({
            cardId: type,
            mode: mode,
        });

        if (ValidatorECS.isSpell(type)) {
            if (GameConfig.NETWORK) {
                BattleNetwork.connector.sendDropSpell(type, pixelPos);
            } else {
                this.dropSpell(type, pixelPos, mode)
            }
        } else if (ValidatorECS.isTrap(type)) {
            EventDispatcher.getInstance()
                .dispatchEvent(EventType.PUT_TRAP, {cardId: type, tilePos: tilePos, mode: mode});
            if (GameConfig.NETWORK === 1) BattleNetwork.connector.sendPutTrap(tilePos);
        } else if (ValidatorECS.isTower(type)) {
            this.putTowerCardIntoMap(type, tilePos, mode);
        }
        // BattleManager.getInstance().getCardDeckNode().onCardPutIntoMap(type);
        BattleManager.getInstance().getBattleLayer().selectedCard = null;
    },

    putTowerCardIntoMap: function (type, tilePos, mode) {
        if (GameConfig.NETWORK) {
            cc.log("putTowerCardIntoMap: shouldUpgradeTower: " + this.shouldUpgradeTower(type, tilePos));
            if (this.shouldUpgradeTower(type, tilePos)) {
                EventDispatcher.getInstance()
                    .dispatchEvent(EventType.UPGRADE_TOWER, {cardId: type, pos: tilePos, mode: mode});
                return;
            }
        }

        if (this.shouldPutNewTower(tilePos)) {
            this.showTimerBuildTower(tilePos, mode);
            if (GameConfig.NETWORK === 1) BattleNetwork.connector.sendPutTower(type, tilePos);
            // this.buildTower(type, tilePos, mode);
        }
    },

    showTimerBuildTower: function (tilePos, mode) {
        NodeFactory.createBuildingTowerTimer(tilePos, mode);
    },

    buildTower: function (towerId, tilePos, mode) {
        this._createTower(towerId, tilePos, mode);
        EventDispatcher.getInstance()
            .dispatchEvent(EventType.PUT_NEW_TOWER, {cardId: towerId, pos: tilePos, mode: mode});
        if (mode === GameConfig.USER1()) soundManager.playPutNewTower();
    },

    _createTower: function (towerId, tilePos, mode) {
        let tower = null;
        switch (towerId) {
            case GameConfig.ENTITY_ID.CANNON_TOWER:
                tower = EntityFactory.createCannonOwlTower(tilePos, mode);
                break;
            case GameConfig.ENTITY_ID.FROG_TOWER:
                tower = EntityFactory.createBoomerangFrogTower(tilePos, mode);
                break;
            case GameConfig.ENTITY_ID.BEAR_TOWER:
                tower = EntityFactory.createIceGunPolarBearTower(tilePos, mode);
                break;
            case GameConfig.ENTITY_ID.BUNNY_TOWER:
                tower = EntityFactory.createBunnyOilGunTower(tilePos, mode);
                break;
            case GameConfig.ENTITY_ID.WIZARD_TOWER:
                tower = EntityFactory.createWizardTower(tilePos, mode);
                break;
            case GameConfig.ENTITY_ID.SNAKE_TOWER:
                tower = EntityFactory.createSnakeAttackSpeedTower(tilePos, mode);
                break;
            case GameConfig.ENTITY_ID.GOAT_TOWER:
                tower = EntityFactory.createGoatDamageTower(tilePos, mode);
                break;
            default:
                return;
        }

        if (GameConfig.NETWORK === 1) {
            this.setEntityIdForTileObject(tower.id, tilePos, mode);
        }

        let mapObject = BattleManager.getInstance().getBattleData().getMapObject(mode);
        let buffType = mapObject.getBuffType(tilePos);
        EntityFactory.buffTower(tower, buffType)
        return tower;
    },

    setEntityIdForTileObject: function (entityId, tilePos, mode = GameConfig.USER1()) {
        let battleData = BattleManager.getInstance().getBattleData();
        let mapObject = battleData.getMapObject(mode);
        mapObject.getObjectInTileByTilePos(tilePos).setEntityId(entityId);
    },

    dropSpell: function (spellId, pixelPos, mode) {
        switch (spellId) {
            case GameConfig.ENTITY_ID.FIRE_SPELL:
                EntityFactory.createFireSpell(pixelPos, mode);
                break;
            case GameConfig.ENTITY_ID.FROZEN_SPELL:
                EntityFactory.createFrozenSpell(pixelPos, mode);
                break;
            default:
                return;
        }
        EventDispatcher.getInstance()
            .dispatchEvent(EventType.DROP_SPELL, {cardId: spellId, mode: mode});
    },

    shouldUpgradeTower: function (towerId, tilePos) {
        if (GameConfig.NETWORK === 0) return false;
        let objectInTile = BattleManager.getInstance().getBattleData().getMapObject(GameConfig.USER1()).getObjectInTileByTilePos(tilePos);
        if (objectInTile.getObjectInTileType() === ObjectInCellType.TOWER && objectInTile.getType() === towerId) {
            let tower = objectInTile;
            cc.log("[shouldUpgradeTower] tower: " + JSON.stringify(tower));
            // let inventoryContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.INVENTORY_CONTEXT);
            // let card = inventoryContext.getCardById(towerId);
            // if (card && card.cardLevel > tower.level) {
            //     return true;
            // }
            return true;
        }
        return false;
    },

    shouldPutNewTower: function (tilePos) {
        if (GameConfig.NETWORK === 0) return true;
        let tileObject = BattleManager.getInstance().getBattleData().getMapObject(GameConfig.USER1()).getTileObject(tilePos.x, tilePos.y);
        return tileObject.getObjectInTileType() === ObjectInCellType.NONE;
    },

    _handleEventKey: function () {
        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesEnded: function (touches, event) {
                if (touches.length <= 0)
                    return;
                BattleManager.getInstance().getCardDeckNode().removeDragSprite(BattleManager.getInstance().getBattleLayer().selectedCard);
                if (BattleManager.getInstance().getBattleLayer().selectedCard !== null) {
                    let selectedCardType = BattleManager.getInstance().getBattleLayer().selectedCard
                    BattleManager.getInstance().getCardDeckNode().removeDragSprite(selectedCardType);
                    let pixelPos = touches[0].getLocation();
                    let pixelInMap = Utils.convertWorldSpace2MapNodeSpace(pixelPos, GameConfig.USER1());
                    let tilePos = Utils.pixel2Tile(pixelInMap.x, pixelInMap.y, GameConfig.USER2());
                    if (Utils.validateTilePos(tilePos)) {
                        BattleManager.getInstance().getBattleLayer()
                            .putCardAt(selectedCardType, pixelInMap, GameConfig.USER1());
                    }
                }
            }
        }), this.uiLayer)

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touch, event) {
                if (BattleManager.getInstance().getBattleLayer().selectedCard !== null) {
                    return false;
                }
                let globalPos = touch.getLocation();
                let localPos = Utils.convertWorldSpace2MapNodeSpace(globalPos, GameConfig.USER1());
                let tilePos = Utils.pixel2Tile(localPos.x, localPos.y, GameConfig.USER1());
                if (Utils.validateTilePos(tilePos)) {
                    let mapObject = BattleManager.getInstance().getBattleData().getMapObject(GameConfig.USER1());
                    let playerMapMatrix = mapObject.convertBattleMapObjectToSimpleMap();
                    if (playerMapMatrix[GameConfig.MAP_HEIGH - 1 - tilePos.y][tilePos.x] === GameConfig.MAP.TOWER) {
                        let towerId = mapObject.getEntityIdByTilePos(tilePos)
                        let towerEntity = EntityManager.getInstance().getEntity(towerId);

                        let attackComponent = towerEntity.getComponent(AttackComponent);
                        let towerAbility = towerEntity.getComponent(TowerAbilityComponent);
                        let range;
                        if (towerAbility) {
                            range = towerAbility.range;
                        } else if (attackComponent) {
                            range = attackComponent.range;
                        }
                        BattleManager.getInstance().getBattleLayer()
                            .uiLayer.showTargetCircle(tilePos.x, tilePos.y, range);
                    }
                }
                return false;
            },
        }, this.uiLayer);
    },

    startGame: function () {
        //  this.battleLoop.start();
        //this.schedule(this.update,0.1,10000);
        this.uiLayer.startGame();
        this.scheduleUpdate();
        //BattleManager.getInstance().getBattleLayer().oneTimeBornMonster({x: 0, y: 4}, GameConfig.USER1());
    },

    stopGame: function () {
        this.unscheduleUpdate();
        this.uiLayer.stopTimer();

        let playerEnergyHouse = this.battleData.getEnergyHouse(GameConfig.USER1());
        let opponentEnergyHouse = this.battleData.getEnergyHouse(GameConfig.USER2());

        let result = GameConfig.BATTLE_RESULT.DRAW;
        if (playerEnergyHouse > opponentEnergyHouse) {
            result = GameConfig.BATTLE_RESULT.WIN;
        } else if (playerEnergyHouse < opponentEnergyHouse) {
            result = GameConfig.BATTLE_RESULT.LOSE;
        }

        const trophyChange = this.battleData.getTrophyChange();
        this.addChild(new BattleResultLayer(result, this.battleData, trophyChange), 2);

        // TODO: remove file from sprite frame cache
        this._entityManager.clear();
        this._entityManager = null;
        ComponentManager.resetInstance();
        tickManager.clearAndCreateNew();
        SystemManager.resetInstance();
        BattleManager.resetInstance();
    },

    getPlayerMapNode: function () {
        return this.mapLayer.mapNode[GameConfig.USER1()];
    },

    getOpponentMapNode: function () {
        return this.mapLayer.mapNode[GameConfig.USER2()];
    },

    getMapNode: function (mode) {
        return this.mapLayer.mapNode[mode];
    },

    _prefetchAssetGame: function () {
        cc.spriteFrameCache.addSpriteFrames("res/textures/tower/sprite_sheet/cannon.plist");
        cc.spriteFrameCache.addSpriteFrames("res/textures/tower/sprite_sheet/ice_gun.plist");
        cc.spriteFrameCache.addSpriteFrames("res/textures/tower/sprite_sheet/oil_gun.plist");
        cc.spriteFrameCache.addSpriteFrames("res/textures/tower/sprite_sheet/boomerang.plist");
        cc.spriteFrameCache.addSpriteFrames("res/textures/tower/sprite_sheet/wizard.plist");
        cc.spriteFrameCache.addSpriteFrames("res/textures/tower/sprite_sheet/attack_speed.plist");
        cc.spriteFrameCache.addSpriteFrames("res/textures/tower/sprite_sheet/tower_damage.plist");
        cc.spriteFrameCache.addSpriteFrames("res/textures/monster/sprite_sheet/swordsman.plist");
        cc.spriteFrameCache.addSpriteFrames("res/textures/monster/sprite_sheet/ninja.plist");
        cc.spriteFrameCache.addSpriteFrames("res/textures/monster/sprite_sheet/assassin.plist");
        cc.spriteFrameCache.addSpriteFrames("res/textures/monster/sprite_sheet/giant.plist");
        cc.spriteFrameCache.addSpriteFrames("res/textures/monster/sprite_sheet/bat.plist");
        cc.spriteFrameCache.addSpriteFrames("res/textures/monster/sprite_sheet/demon_tree.plist");
        cc.spriteFrameCache.addSpriteFrames("res/textures/monster/sprite_sheet/demon_tree_minion.plist");
        cc.spriteFrameCache.addSpriteFrames("res/textures/monster/sprite_sheet/dark_giant.plist");
        cc.spriteFrameCache.addSpriteFrames("res/textures/monster/sprite_sheet/satyr.plist");
        cc.spriteFrameCache.addSpriteFrames("res/textures/potion/fx_trap/sprite_sheet/trap.plist");
        cc.spriteFrameCache.addSpriteFrames("res/textures/tower/sprite_sheet/tower_pedestal.plist");
    },

    _clearAsset: function () {
        cc.spriteFrameCache.removeUnusedSpriteFrames();
    },

    getTimerNode: function () {
        return this.uiLayer.timerNode;
    }
});