let GameLayer = cc.Layer.extend({

    ctor: function () {
        this._super();
        GameConfig.gameLayer = this;

        // data game
        this.battleData = GameConfig.battleData;

        // create UI
        this.uiLayer = new BattleUILayer(this.battleData);
        this.addChild(this.uiLayer, 2);

        this.mapLayer = new BattleMapLayer(this.battleData);
        this.addChild(this.mapLayer, 1);

        // init entity manager
        this._entityManager = new EntityManager();;
        EntityManager.getInstance = function () {
            return this._entityManager;
        }.bind(this);

        // create system
        this.movementSystem = new MovementSystem();
        this.renderSystem = new RenderSystem();
        this.lifeSystem = new LifeSystem();
        this.attackSystem = new AttackSystem();
        this.collisionSystem = new CollisionSystem();
        this.effectSystem = new EffectSystem();
        this.pathSystem = new PathMonsterSystem();

        // this._initTower();
        this._handleEventKey();
        this.scheduleUpdate();
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
    },

    bornMonster: function (pos, mode) {
        // pos is in tile coordinator
        cc.log("position tile " + JSON.stringify(pos))

        if (!pos) {
            pos = Utils.tile2Pixel(0, 4, mode);
        } else {
            pos = Utils.tile2Pixel(pos.x, pos.y, mode);
        }
        EntityFactory.createSwordsmanMonster(pos, mode);
    },

    putTowerAt: function (type, pos) {
        // pos is tile coordinator
        if (pos.x < 0 || pos.x >= GameConfig.MAP_WIDTH || pos.y < 0 || pos.y >= GameConfig.MAP_HEIGH) {
            return;
        }

        // FIXME: map
        let xMap = GameConfig.MAP_HEIGH-1-pos.y;
        let yMap = pos.x;
        let map = this.battleData.getMap(GameConfig.PLAYER);
        if (map[xMap][yMap] === 6 || map[xMap][yMap] === 5) {
            return;
        }

        if (type === GameConfig.ENTITY_ID.CANNON_TOWER) {
            EntityFactory.createCannonOwlTower(pos);
            EventDispatcher.getInstance()
                .dispatchEvent(EventType.PUT_NEW_TOWER, {pos: pos});
        }
    },

    _initTower: function () {
        EntityFactory.createCannonOwlTower({x: 1, y: 3});
        EntityFactory.createIceGunPolarBearTower({x: 1, y: 1});
        EntityFactory.createBoomerangFrogTower({x: 3, y: 3});
    },

    _handleEventKey: function () {
        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesEnded: function (touches, event) {
                if (touches.length <= 0)
                    return;
                let pixel = touches[0].getLocation();
                let pos = Utils.pixel2Tile(pixel.x, pixel.y);

                GameConfig.gameLayer.putTowerAt(GameConfig.ENTITY_ID.CANNON_TOWER, pos);

            }
        }), this.uiLayer)
    },

    stopGame: function () {
        this.unscheduleUpdate();
        this.uiLayer.stopTimer();

        let playerEnergyHouse = this.battleData.getEnergyHouse(GameConfig.PLAYER);
        let opponentEnergyHouse = this.battleData.getEnergyHouse(GameConfig.OPPONENT);

        // FIXME: hardcode result value
        let result = "draw";
        if (playerEnergyHouse > opponentEnergyHouse) {
            result = "win";
        } else if (playerEnergyHouse < opponentEnergyHouse) {
            result = "lose";
        }
        this.addChild(new BattleResultLayer(result, this.battleData), 2);
        delete this._entityManager;
        delete ComponentManager.getInstance();
        GameConfig.gameLayer = null;
    },
});