let BattleLayer = cc.Layer.extend({

    ctor: function () {
        this._super();
        BattleManager.getInstance().registerBattleLayer(this);
        this.selectedCard = null;



        // BattleData.fakeData();
        this.battleData = BattleManager.getInstance().getBattleData();


        this._setupUI();

        // init entity manager
        this._entityManager = new EntityManager();
        EntityManager.getInstance = function () {
            return this._entityManager;
        }.bind(this);

        this._initSystem();

        // this._initTower();
        this._handleEventKey();
        this.startGame();
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
    },

    update: function (dt) {
        // IMPORTANT: EffectSystem (SlowEffect) < PathSystem
        this.movementSystem.start(dt);
        this.attackSystem.start(dt);
        this.renderSystem.start(dt);
        this.lifeSystem.start(dt);
        this.collisionSystem.start(dt);
        this.effectSystem.start(dt);
        this.pathSystem.start(dt);
        this.spellSystem.start(dt);
        this.skeletonAnimationSystem.start(dt);
        this.monsterSystem.start(dt);
        this.bulletSystem.start(dt);
        this.abilitySystem.start(dt);

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

        EntityFactory.createNinjaMonster(pixelPos, mode);
        EntityFactory.createSwordsmanMonster(pixelPos, mode);
        EntityFactory.createBatMonster(pixelPos, mode);
    },

    oneTimeBornMonster: function (tilePos, mode) {
        let pixelPos;
        if (!tilePos) {
            pixelPos = Utils.tile2Pixel(0, 4, mode);
        } else {
            pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
        }
        // EntityFactory.createSatyrBoss(pixelPos, mode);
        // EntityFactory.createDarkGiantBoss(pixelPos,mode);
        EntityFactory.createDemonTreeBoss(pixelPos,mode);
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
        if (type === GameConfig.ENTITY_ID.FIRE_SPELL || type === GameConfig.ENTITY_ID.FROZEN_SPELL) {
            if (!Utils.isPixelPositionInMap(pixelPos, mode)) {
                cc.warn("put spell at pixel pos = " + JSON.stringify(pixelPos) + " is invalid")
                return;
            }
        } else {
            if (!Utils.validateTilePos(tilePos)) {
                return;
            }

            let xMap = GameConfig.MAP_HEIGH - 1 - tilePos.y;
            let yMap = tilePos.x;
            let map = this.battleData.getMap(mode);
            if (map[xMap][yMap] === GameConfig.MAP.TREE || map[xMap][yMap] === GameConfig.MAP.HOLE) {
                return;
            }
        }

        switch (type) {
            case GameConfig.ENTITY_ID.CANNON_TOWER:
                EntityFactory.createCannonOwlTower(tilePos, mode);
                break;
            case GameConfig.ENTITY_ID.FROG_TOWER:
                EntityFactory.createBoomerangFrogTower(tilePos, mode);
                break;
            case GameConfig.ENTITY_ID.BEAR_TOWER:
                EntityFactory.createIceGunPolarBearTower(tilePos, mode);
                break;
            case GameConfig.ENTITY_ID.FIRE_SPELL:
                SpellFactory.createFireSpell(pixelPos, mode);
                break;
            case GameConfig.ENTITY_ID.FROZEN_SPELL:
                SpellFactory.createFrozenSpell(pixelPos, mode);
                break;
            default:
                return;
        }

        if (type !== GameConfig.ENTITY_ID.FIRE_SPELL
            && type !== GameConfig.ENTITY_ID.FROZEN_SPELL) {
            EventDispatcher.getInstance()
                .dispatchEvent(EventType.PUT_NEW_TOWER, {pos: tilePos, mode: mode});

            // FIXME: test will delete later
            cc.log("[GameLayer.js line 134] tilePos: " + JSON.stringify(pixelPos));
            BattleNetwork.connector.sendPutTower(BattleManager.getInstance().getBattleData().getRoomId(), type, tilePos, pixelPos);
        }
        BattleManager.getInstance().getBattleLayer().selectedCard = null;
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
        // this.battleLoop.start();
        this.scheduleUpdate();
        BattleManager.getInstance().getBattleLayer().oneTimeBornMonster({x: 0, y: 4}, GameConfig.PLAYER);
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
    },

    getPlayerMapNode: function () {
        return this.mapLayer.playerMapNode;
    },

    getOpponentMapNode: function () {
        return this.mapLayer.opponentMapNode;
    },
});