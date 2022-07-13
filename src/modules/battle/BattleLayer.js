let BattleLayer = cc.Layer.extend({

    ctor: function () {
        this._super();
        BattleManager.getInstance().setBattleLayer(this);
        this.selectedCard = null;

        BattleData.fakeData();
        this.battleData = GameConfig.battleData;

        this._setupUI();

        // init entity manager
        this._entityManager = new EntityManager();;
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
    },

    update: function (dt) {
        // IMPORTANT: EffectSystem (SlowEffect) < PathSystem
        this.movementSystem.run(dt);
        this.attackSystem.run(dt);
        this.renderSystem.run(dt);
        this.lifeSystem.run(dt);
        this.collisionSystem.run(dt);
        this.effectSystem.run(dt);
        this.pathSystem.run(dt);
        this.spellSystem.run(dt);
        this.skeletonAnimationSystem.run(dt);
        this.monsterSystem.run(dt);
        this.bulletSystem.run(dt);

        // let pool = ComponentFactory.pool;
        // cc.log(("pool size = " + Object.keys(pool._store).length))
        // cc.log("key = " + JSON.stringify(Object.keys(pool._store)))
        // cc.log(JSON.stringify(pool._store))
    },

    bornMonster: function (tilePos, mode) {
        let pixelPos;
        if (!tilePos) {
            pixelPos = Utils.tile2Pixel(0, 4, mode);
        } else {
            pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
        }
        EntityFactory.createSwordsmanMonster(pixelPos, mode);
    },

    /**
     *
     * @param type
     * @param pixelPos in map node space
     * @param mode
     */
    putCardAt: function (type, pixelPos, mode) {
        let tilePos = Utils.pixel2Tile(pixelPos.x, pixelPos.y, mode);

        // FIXME: hardcode
        if (type === GameConfig.ENTITY_ID.FIRE_SPELL || type === GameConfig.ENTITY_ID.FROZEN_SPELL) {
            if (!Utils.isPixelPositionInMap(pixelPos, mode)) {
                cc.warn("put spell at pixel pos = " + JSON.stringify(pixelPos) + " is invalid")
                return;
            }
        } else {
            if (!Utils.validateTilePos(tilePos)) {
                return;
            }

            // FIXME: map
            let xMap = GameConfig.MAP_HEIGH-1-tilePos.y;
            let yMap = tilePos.x;
            let map = this.battleData.getMap(mode);
            // FIXME: hardcode
            if (map[xMap][yMap] === 6 || map[xMap][yMap] === 5) {
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
        this.scheduleUpdate();
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