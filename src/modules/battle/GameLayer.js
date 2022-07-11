let GameLayer = cc.Layer.extend({

    ctor: function () {
        this._super();
        GameConfig.gameLayer = this;

        this.selectedCard = null;

        // this.towerImage = cc.Sprite(CARD_CONST[0].image['C']);
        // this.towerImage.setVisible(false);
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
        this.spellSystem = new SpellSystem();
        this.skeletonAnimationSystem = new SkeletonAnimationSystem();

        // this._initTower();
        this._handleEventKey();
        this.scheduleUpdate();
        // this.initDragDropEventListener();
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

        // cc.log("YYYYYYYYYY")
        // let pool = ComponentFactory.pool;
        // cc.log(("pool size = " + Object.keys(pool._store).length))
        // cc.log("key = " + JSON.stringify(Object.keys(pool._store)))
        // cc.log(JSON.stringify(pool._store))
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

        // FIXME: hardcode
        if (type === GameConfig.ENTITY_ID.FIRE_SPELL || type === GameConfig.ENTITY_ID.FROZEN_SPELL) {
            if (!Utils.isPixelPositionInMap(pixelPos, GameConfig.PLAYER)) {
                return;
            }
        } else {
            // put tower
            if (tilePos.x < 0 || tilePos.x >= GameConfig.MAP_WIDTH || tilePos.y < 0 || tilePos.y >= GameConfig.MAP_HEIGH) {
                return;
            }

            // FIXME: map
            let xMap = GameConfig.MAP_HEIGH-1-tilePos.y;
            let yMap = tilePos.x;
            let map = this.battleData.getMap(GameConfig.PLAYER);
            // FIXME: hardcode
            if (map[xMap][yMap] === 6 || map[xMap][yMap] === 5) {
                return;
            }
        }

        switch (type) {
            case GameConfig.ENTITY_ID.CANNON_TOWER:
                EntityFactory.createCannonOwlTower(tilePos, GameConfig.PLAYER);
                break;
            case GameConfig.ENTITY_ID.FROG_TOWER:
                EntityFactory.createBoomerangFrogTower(tilePos, GameConfig.PLAYER);
                break;
            case GameConfig.ENTITY_ID.BEAR_TOWER:
                EntityFactory.createIceGunPolarBearTower(tilePos, GameConfig.PLAYER);
                break;
            case GameConfig.ENTITY_ID.FIRE_SPELL:
                // new FireSpell(this.mapLayer, pixelPos, 50, 1.2*GameConfig.TILE_WIDTH);
                SpellFactory.createFireSpell(pixelPos, GameConfig.PLAYER);
                break;
            case GameConfig.ENTITY_ID.FROZEN_SPELL:
                // new FrozenSpell(this.mapLayer, pixelPos, 50, 5, 1.2*GameConfig.TILE_WIDTH);
                SpellFactory.createFrozenSpell(pixelPos, GameConfig.PLAYER);
                break;
            default:
                return;
        }

        // FIXME: hardcode
        if (GameConfig.gameLayer.selectedCard !== GameConfig.ENTITY_ID.FIRE_SPELL && GameConfig.gameLayer.selectedCard !== GameConfig.ENTITY_ID.FROZEN_SPELL) {
            EventDispatcher.getInstance()
                .dispatchEvent(EventType.PUT_NEW_TOWER, {pos: tilePos});
        }
        GameConfig.gameLayer.selectedCard = null;
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

        let result = GameConfig.BATTLE_RESULT.DRAW;
        if (playerEnergyHouse > opponentEnergyHouse) {
            result = GameConfig.BATTLE_RESULT.WIN;
        } else if (playerEnergyHouse < opponentEnergyHouse) {
            result = GameConfig.BATTLE_RESULT.LOSE;
        }

        this.addChild(new BattleResultLayer(result, this.battleData), 2);
        delete this._entityManager;
        delete ComponentManager.getInstance();
        GameConfig.gameLayer = null;
    },

    // initDragDropEventListener: function () {
    //     const listener = cc.EventListener.create({
    //         event: cc.EventListener.TOUCH_ONE_BY_ONE,
    //         swallowTouches: false,
    //         onTouchBegan: function (touch, event) {
    //             this.uiLayer.cardDeckNode.cardBattleNodeList.forEach(function (cardBattleNode) {
    //                 if (cardBattleNode.isSelecting) {
    //                     this.towerImage.setVisible(true);
    //                     return true;
    //                 }
    //             });
    //             return false;
    //         }.bind(this),
    //         onTouchMoved: function (touch, event) {
    //             this.towerImage.setPosition(touch.getLocation());
    //         }.bind(this),
    //         onTouchEnded: function (touch, event) {
    //             this.towerImage.setVisible(false);
    //             this.uiLayer.cardDeckNode.cardBattleNodeList.forEach(function (cardBattleNode) {
    //                 if (cardBattleNode.isSelecting) {
    //                     this.putTowerAt(cardBattleNode.cardId, cardBattleNode.pos);
    //                     cardBattleNode.isSelecting = false;
    //                 }
    //             }.bind(this));
    //             let pixel = touch.getLocation();
    //             let pos = Utils.pixel2Tile(pixel.x, pixel.y);
    //             GameConfig.gameLayer.putTowerAt(GameConfig.ENTITY_ID.CANNON_TOWER, pos);
    //         }.bind(this)
    //     });
    //
    //     cc.eventManager.addListener(listener, this);
    // }
});