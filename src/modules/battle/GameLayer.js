let GameLayer = cc.Layer.extend({

    ctor: function () {
        this._super();
        GameConfig.gameLayer = this;

        this.selectedTowerCard = null;

        this.towerImage = cc.Sprite(CARD_CONST[0].image['C']);
        this.towerImage.setVisible(false);
        // data game
        this.battleData = GameConfig.battleData;

        // create UI
        this.uiLayer = new BattleUILayer(this.battleData);
        this.addChild(this.uiLayer, 2);

        this.mapLayer = new BattleMapLayer(this.battleData);
        this.addChild(this.mapLayer, 1);

        // init entity manager
        this._entityManager = new EntityManager();
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
        this.initDragDropEventListener();
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

        switch (type) {
            case GameConfig.ENTITY_ID.CANNON_TOWER:
                EntityFactory.createCannonOwlTower(pos);
                break;
            case GameConfig.ENTITY_ID.FROG_TOWER:
                EntityFactory.createBoomerangFrogTower(pos);
                break;
            case GameConfig.ENTITY_ID.BEAR_TOWER:
                EntityFactory.createIceGunPolarBearTower(pos);
                break;
            default:
                return;
        }
        EventDispatcher.getInstance()
            .dispatchEvent(EventType.PUT_NEW_TOWER, {pos: pos});
        GameConfig.gameLayer.selectedTowerCard = null;
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
                cc.log("AAAAAAAAAAAAAAA")
                cc.log(GameConfig.gameLayer.selectedTowerCard);
                if (touches.length <= 0)
                    return;

                if (GameConfig.gameLayer.selectedTowerCard !== null) {
                    let pixel = touches[0].getLocation();
                    let pos = Utils.pixel2Tile(pixel.x, pixel.y);
                    cc.log("here");
                    GameConfig.gameLayer.putTowerAt(GameConfig.gameLayer.selectedTowerCard, pos);
                } else {
                    cc.log("NULLLLLLLLLLLLLLLLLLLLL")
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

    initDragDropEventListener: function () {
        const listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                this.uiLayer.cardDeckNode.cardBattleNodeList.forEach(function (cardBattleNode) {
                    if (cardBattleNode.isSelecting) {
                        this.towerImage.setVisible(true);
                        return true;
                    }
                });
                return false;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                this.towerImage.setPosition(touch.getLocation());
            }.bind(this),
            onTouchEnded: function (touch, event) {
                this.towerImage.setVisible(false);
                this.uiLayer.cardDeckNode.cardBattleNodeList.forEach(function (cardBattleNode) {
                    if (cardBattleNode.isSelecting) {
                        this.putTowerAt(cardBattleNode.cardId, cardBattleNode.pos);
                        cardBattleNode.isSelecting = false;
                    }
                }.bind(this));
                let pixel = touch.getLocation();
                let pos = Utils.pixel2Tile(pixel.x, pixel.y);
                GameConfig.gameLayer.putTowerAt(GameConfig.ENTITY_ID.CANNON_TOWER, pos);
            }.bind(this)
        });

        cc.eventManager.addListener(listener, this);
    }
});