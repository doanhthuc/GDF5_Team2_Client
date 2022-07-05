let GameLayer = cc.Layer.extend({

    ctor: function () {
        this._super();
        GameConfig.gameLayer = this;

        this.selectedCard = null;

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

    putCardAt: function (type, pixelPos) {
        let tilePos = Utils.pixel2Tile(pixelPos.x, pixelPos.y);
        // pos is tile coordinator
        if (tilePos.x < 0 || tilePos.x >= GameConfig.MAP_WIDTH || tilePos.y < 0 || tilePos.y >= GameConfig.MAP_HEIGH) {
            return;
        }

        // FIXME: map
        let xMap = GameConfig.MAP_HEIGH-1-tilePos.y;
        let yMap = tilePos.x;
        let map = this.battleData.getMap(GameConfig.PLAYER);
        if (map[xMap][yMap] === 6 || map[xMap][yMap] === 5) {
            return;
        }

        switch (type) {
            case GameConfig.ENTITY_ID.CANNON_TOWER:
                EntityFactory.createCannonOwlTower(tilePos);
                break;
            case GameConfig.ENTITY_ID.FROG_TOWER:
                EntityFactory.createBoomerangFrogTower(tilePos);
                break;
            case GameConfig.ENTITY_ID.BEAR_TOWER:
                EntityFactory.createIceGunPolarBearTower(tilePos);
                break;
            case GameConfig.ENTITY_ID.FIRE_SPELL:
                new FireSpell(this.mapLayer, Utils.tile2Pixel(tilePos.x, tilePos.y, GameConfig.PLAYER), 50, 1.2*GameConfig.TILE_WIDTH);
                break;
            default:
                return;
        }
        // FIXME: harcode
        if (GameConfig.gameLayer.selectedCard !== GameConfig.ENTITY_ID.FIRE_SPELL) {
            EventDispatcher.getInstance()
                .dispatchEvent(EventType.PUT_NEW_TOWER, {pos: tilePos});
        }
        GameConfig.gameLayer.selectedCard = null;
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
                if (GameConfig.gameLayer.selectedCard !== null) {
                    let pixelPos = touches[0].getLocation();
                    GameConfig.gameLayer.putCardAt(GameConfig.gameLayer.selectedCard, pixelPos);
                }
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