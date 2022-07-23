let BattleLayer = cc.Layer.extend({

    ctor: function () {
        this._super();
        BattleManager.getInstance().registerBattleLayer(this);
        this.selectedCard = null;

        if (GameConfig.NETWORK === 0) BattleData.fakeData();
        this.battleData = BattleManager.getInstance().getBattleData();
        // this.battleLoop = new BattleLoop();

        this._setupUI();

        this._prefetchAssetGame();

        // init entity manager
        this._entityManager = new EntityManager();
        EntityManager.getInstance = function () {
            return this._entityManager;
        }.bind(this);

        this._initSystem();

        // this._initTower();
        this._handleEventKey();
        this.startGame();
        this.oneTimeBornMonster({x: 0, y: 4}, GameConfig.PLAYER);
        this.oneTimeBornMonster({x: 0, y: 4}, GameConfig.OPPONENT);
    },

    _setupUI: function () {
        this.uiLayer = new BattleUILayer(this.battleData);
        this.addChild(this.uiLayer, 2);
        this.mapLayer = new BattleMapLayer(this.battleData);
        this.mapLayer._genMap(GameConfig.PLAYER);
        this.mapLayer._genMap(GameConfig.OPPONENT);
        this.addChild(this.mapLayer, 1);
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
    },

    update: function (dt) {
        // IMPORTANT: EffectSystem (SlowEffect) < PathSystem
        this.resetSystem.start(dt);
        this.abilitySystem.start(dt);
        this.effectSystem.start(dt);
        this.attackSystem.start(dt);
        this.renderSystem.start(dt);
        this.lifeSystem.start(dt);
        this.collisionSystem.start(dt);
        this.pathSystem.start(dt);
        this.spriteSheetAnimationSystem.start(dt);
        this.spellSystem.start(dt);
        this.skeletonAnimationSystem.start(dt);
        this.monsterSystem.start(dt);
        this.bulletSystem.start(dt);
        this.movementSystem.start(dt);


        if (GameConfig.DEBUG) {
            cc.warn("---------------------------------------")
            cc.warn("* Entity Manager size = " + Object.keys(EntityManager.getInstance().entities).length);
            // let entityActive = 0, entityInActive = 0;
            // for (let key of Object.keys(EntityManager.getInstance().entities)) {
            //     if (EntityManager.getInstance().entities[key].getActive()) {
            //         entityActive++;
            //     } else {
            //         entityInActive++;
            //     }
            // }
            // cc.warn("   + Active size = " + entityActive);
            // cc.warn("   + Inactive size = "+ entityInActive);

            cc.warn("* Component Manager size = " + ComponentManager.getInstance()._storeInstance.size);

            let poolSize = 0;
            let componentActive = 0;
            let componentInactive = 0;
            for (let key of Object.keys(ComponentFactory.pool._store)) {
                poolSize += ComponentFactory.pool._store[key].length;
                for (let component of ComponentFactory.pool._store[key]) {
                    if (component.getActive()) {
                        componentActive++;
                    } else {
                        componentInactive++;
                    }
                }
            }
            cc.warn("* ComponentPool size = " + JSON.stringify(poolSize));
            cc.warn("   + Active size = " + JSON.stringify(componentActive));
            cc.warn("   + Inactive size = " + JSON.stringify(componentInactive));
        }

    },

    bornMonster: function (tilePos, mode) {
        let pixelPos;
        if (!tilePos) {
            pixelPos = Utils.tile2Pixel(0, 4, mode);
        } else {
            pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
        }
        //EntityFactory.createSwordsmanMonster(pixelPos, mode);
        // setTimeout(function () {
        //     EntityFactory.createSwordsmanMonster(pixelPos, mode);
        // }, 1000);
        // setTimeout(function () {
        //     EntityFactory.createAssassinMonster(pixelPos, mode);
        // }, 2000);
        // setTimeout(function () {
        //     EntityFactory.createNinjaMonster(pixelPos, mode);
        // }, 3000);
        // setTimeout(function () {
        //     EntityFactory.createGiantMonster(pixelPos, mode);
        // }, 5000);
        // EntityFactory.createAssassinMonster(pixelPos, mode);
        // EntityFactory.createGiantMonster(pixelPos, mode);
        // EntityFactory.createSwordsmanMonster(pixelPos, mode);
        EntityFactory.createNinjaMonster(pixelPos, mode);
        // EntityFactory.createSwordsmanMonster(pixelPos, mode);
        // EntityFactory.createSwordsmanMonster(pixelPos, mode);
        // EntityFactory.createBatMonster(pixelPos, mode);
        // EntityFactory.createSatyrBoss(pixelPos, mode);
    },

    oneTimeBornMonster: function (tilePos, mode) {
        let pixelPos;
        if (!tilePos) {
            pixelPos = Utils.tile2Pixel(0, 4, mode);
        } else {
            pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
        }
        //EntityFactory.createBatMonster(pixelPos, mode);
        setTimeout(function () {
            EntityFactory.createSwordsmanMonster(pixelPos, mode);
        }, 1000);
        // setTimeout(function () {
        //     EntityFactory.createAssassinMonster(pixelPos, mode);
        // }, 2000);
        // setTimeout(function () {
        //     EntityFactory.createNinjaMonster(pixelPos, mode);
        // }, 3000);
        // setTimeout(function () {
        //     EntityFactory.createGiantMonster(pixelPos, mode);
        // }, 5000);
        // setTimeout(function () {
        //     EntityFactory.createSatyrBoss(pixelPos, mode);
        // }, 20000);
        // setTimeout(function () {
        //     EntityFactory.createDarkGiantBoss(pixelPos, mode);
        // }, 40000);
        // setTimeout(function () {
        //     EntityFactory.createDemonTreeBoss(pixelPos, mode);
        // }, 60000);

    },
    // bornMonsterInWave: function (monsterWave, mode) {
    //     // let pixelPos = Utils.tile2Pixel(0, 4, mode);
    //     // // for(let entityID of monsterWave)
    //     // // {
    //     // //    // setTimeout(this.createMonster(pixelPos,mode,entityID),time);
    //     // // )
    // },
    createMonster: function (pixelPos, mode, entityID) {
        switch (entityID) {
            case GameConfig.ENTITY_ID.SWORD_MAN:
                EntityFactory.createSwordsmanMonster(pixelPos, mode);
                break;
            case GameConfig.ENTITY_ID.NINJA:
                EntityFactory.createNinjaMonster(pixelPos, mode);
                break;
            case GameConfig.ENTITY_ID.BAT:
                EntityFactory.createBatMonster(pixelPos, mode);
                break;
            case GameConfig.ENTITY_ID.ASSASSIN:
                EntityFactory.createAssassinMonster(pixelPos, mode);
                break;
            case GameConfig.ENTITY_ID.DEMON_TREE:
                EntityFactory.createDemonTreeBoss(pixelPos, mode);
                break;
            case GameConfig.ENTITY_ID.DARK_GIANT:
                EntityFactory.createDarkGiantBoss(pixelPos, mode);
                break;
            case GameConfig.ENTITY_ID.SATYR:
                EntityFactory.createSatyrBoss(pixelPos, mode);
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
        let tilePos = Utils.pixel2Tile(pixelPos.x, pixelPos.y, mode);

        // FIXME: reduce if statement
        if (ValidatorECS.isSpell(type)) {
            if (!Utils.isPixelPositionInMap(pixelPos, mode)) {
                cc.warn("put spell at pixel pos = " + JSON.stringify(pixelPos) + " is invalid")
                return;
            }
        } else if (ValidatorECS.isTower(type)) {
            if (!Utils.validateTilePos(tilePos)) {
                return;
            }

            let row = GameConfig.MAP_HEIGH - 1 - tilePos.y;
            let col = tilePos.x;
            let map = this.battleData.getMap(mode);
            if (map[row][col] === GameConfig.MAP.TREE || map[row][col] === GameConfig.MAP.HOLE
                || (tilePos.x === GameConfig.HOUSE_POSITION.x && tilePos.y === GameConfig.HOUSE_POSITION.y)
                || (tilePos.x === GameConfig.MONSTER_BORN_POSITION.x && tilePos.y === GameConfig.MONSTER_BORN_POSITION.y)) {
                return;
            }
        } else if (ValidatorECS.isTrap(type)) {
            // check valid position
        } else {
            throw new Error("Type is invalid");
        }

        if (ValidatorECS.isSpell(type)) {
            this.dropSpell(type, pixelPos, mode)
            if (GameConfig.NETWORK === 1) BattleNetwork.connector.sendDropSell(type, pixelPos);
        } else if (ValidatorECS.isTrap(type)) {
            SpellFactory.createTrap(tilePos, mode);
        } else if (ValidatorECS.isTower(type)) {
            // if (this.shouldUpgradeTower(type, tilePos)) {
            //     EventDispatcher.getInstance()
            //         .dispatchEvent(EventType.UPGRADE_TOWER, {towerId: type, pos: tilePos});
            // } else if (this.shouldPutNewTower(tilePos)) {
            //     this.buildTower(type, tilePos, mode);
            //     EventDispatcher.getInstance()
            //         .dispatchEvent(EventType.PUT_NEW_TOWER, {cardId: type, pos: tilePos, mode: mode});
            // }
            this.putTowerCardIntoMap(type, tilePos, mode);
        }

        BattleManager.getInstance().getBattleLayer().selectedCard = null;
    },

    putTowerCardIntoMap: function (type, tilePos, mode) {
        if (GameConfig.NETWORK) {
            if (this.shouldUpgradeTower(type, tilePos)) {
                EventDispatcher.getInstance()
                    .dispatchEvent(EventType.UPGRADE_TOWER, {towerId: type, pos: tilePos});
                return;
            }
        }

        if (this.shouldPutNewTower(tilePos)) {
            this.buildTower(type, tilePos, mode);
            if (GameConfig.NETWORK === 1) BattleNetwork.connector.sendPutTower(type, tilePos);
        }
    },

    buildTower: function (towerId, tilePos, mode) {
        switch (towerId) {
            case GameConfig.ENTITY_ID.CANNON_TOWER:
                EntityFactory.createCannonOwlTower(tilePos, mode);
                break;
            case GameConfig.ENTITY_ID.FROG_TOWER:
                EntityFactory.createBoomerangFrogTower(tilePos, mode);
                break;
            case GameConfig.ENTITY_ID.BEAR_TOWER:
                EntityFactory.createIceGunPolarBearTower(tilePos, mode);
                break;
            case GameConfig.ENTITY_ID.BUNNY_TOWER:
                EntityFactory.createBunnyOilGunTower(tilePos, mode);
                break;
            case GameConfig.ENTITY_ID.WIZARD_TOWER:
                EntityFactory.createWizardTower(tilePos, mode);
                break;
            case GameConfig.ENTITY_ID.SNAKE_TOWER:
                EntityFactory.createSnakeAttackSpeedTower(tilePos, mode);
                break;
            case GameConfig.ENTITY_ID.GOAT_TOWER:
                EntityFactory.createGoatDamageTower(tilePos, mode);
                break;
            default:
                return;
        }
        EventDispatcher.getInstance()
            .dispatchEvent(EventType.PUT_NEW_TOWER, {cardId: towerId, pos: tilePos, mode: mode});
    },

    dropSpell: function (spellId, pixelPos, mode) {
        switch (spellId) {
            case GameConfig.ENTITY_ID.FIRE_SPELL:
                SpellFactory.createFireSpell(pixelPos, mode);
                break;
            case GameConfig.ENTITY_ID.FROZEN_SPELL:
                SpellFactory.createFrozenSpell(pixelPos, mode);
                break;
            case GameConfig.ENTITY_ID.TRAP:
                SpellFactory.createTrap(tilePos, mode);
                break;
            default:
                return;
        }
    },

    shouldUpgradeTower: function (towerId, tilePos) {
        if (GameConfig.NETWORK === 0) return false;
        let cellObject = BattleManager.getInstance().getBattleData().getMapObject(GameConfig.PLAYER)[tilePos.x][tilePos.y];
        if (cellObject.objectInCellType === ObjectInCellType.TOWER && cellObject.tower !== null) {
            let tower = cellObject.tower;
            let inventoryContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.INVENTORY_CONTEXT);
            let card = inventoryContext.getCardById(towerId);
            if (card && card.cardLevel > tower.level) {
                return true;
            }
            // return true;
        }
        return false;
    },

    shouldPutNewTower: function (tilePos) {
        if (GameConfig.NETWORK === 0) return true;
        let cellObject = BattleManager.getInstance().getBattleData().getMapObject(GameConfig.PLAYER)[tilePos.x][tilePos.y];
        return cellObject.objectInCellType === ObjectInCellType.NONE;
    },

    _initTower: function () {
        EntityFactory.createCannonOwlTower({x: 1, y: 3}, GameConfig.PLAYER);
        EntityFactory.createIceGunPolarBearTower({x: 1, y: 1}, GameConfig.PLAYER);
        EntityFactory.createBoomerangFrogTower({x: 3, y: 3}, GameConfig.PLAYER);
    },

    _handleEventKey: function () {
        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesEnded: function (touches, event) {
                if (touches.length <= 0)
                    return;
                if (BattleManager.getInstance().getBattleLayer().selectedCard !== null) {
                    let pixelPos = touches[0].getLocation();
                    let pixelInMap = Utils.convertWorldSpace2MapNodeSpace(pixelPos, GameConfig.PLAYER);
                    BattleManager.getInstance().getBattleLayer()
                        .putCardAt(BattleManager.getInstance().getBattleLayer().selectedCard, pixelInMap, GameConfig.PLAYER);
                }
            }
        }), this.uiLayer)
    },

    startGame: function () {
        //  this.battleLoop.start();
        //this.schedule(this.update,0.1,10000);
        this.scheduleUpdate();
        //BattleManager.getInstance().getBattleLayer().oneTimeBornMonster({x: 0, y: 4}, GameConfig.PLAYER);
    },

    stopGame: function () {
        this.unscheduleUpdate();
        this.uiLayer.stopTimer();

        let playerEnergyHouse = this.battleData.getEnergyHouse(GameConfig.PLAYER);
        let opponentEnergyHouse = this.battleData.getEnergyHouse(GameConfig.OPPONENT);

        let result = GameConfig.BATTLE_RESULT.DRAW;
        if (playerEnergyHouse > opponentEnergyHouse) {
            result = GameConfig.BATTLE_RESULT.WIN;
        } else if (playerEnergyHouse < opponentEnergyHouse) {
            result = GameConfig.BATTLE_RESULT.LOSE;
        }

        this.addChild(new BattleResultLayer(result, this.battleData), 2);
        delete this._entityManager;
        delete ComponentManager.getInstance();
        // TODO: remove file from sprite frame cache
    },

    getPlayerMapNode: function () {
        return this.mapLayer.playerMapNode;
    },

    getOpponentMapNode: function () {
        return this.mapLayer.opponentMapNode;
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
    },

    _clearAsset: function () {
        cc.spriteFrameCache.removeUnusedSpriteFrames();
    }
});