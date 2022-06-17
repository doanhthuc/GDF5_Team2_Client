let GameLayer = cc.Layer.extend({
    mapLayer: null,
    uiLayer: null,
    renderSystem: null,
    movementSystem: null,

    ctor: function () {
        this._super();
        GameConfig.gameLayer = this;

        let rootNode = ccs.load("ui/battle/BattleScene.json", "");
        this.addChild(rootNode.node);
        this.mapLayer = rootNode.node.getChildByName("battle_map_layer");
        this.uiLayer = rootNode.node.getChildByName("battle_ui_layer");

        // create system
        this.renderSystem = new RenderSystem();
        this.movementSystem = new MovementSystem();
        this.lifeSystem = new LifeSystem();
        this.attackSystem = new AttackSystem();
        this.collisionSystem = new CollisionSystem();
        this.effectSystem = new EffectSystem();

        this.initMonster();
        this.initTower();
        this.handleEventKey();

        this.scheduleUpdate();
        this.schedule(this.initMonster, 8);
    },

    update: function(dt) {
        this.movementSystem.run(dt);
        this.attackSystem.run(dt);
        this.renderSystem.run(dt);
        this.lifeSystem.run(dt);
        this.collisionSystem.run(dt);
        this.effectSystem.run(dt);
    },

    initMonster: function () {
        EntityFactory.createSwordsmanMonster();
    },

    initTower: function () {
        EntityFactory.createCannonOwlTower();
        EntityFactory.createIceGunPolarBearTower({x: 5, y: 3});
    },

    handleEventKey: function () {
        if( 'keyboard' in cc.sys.capabilities ) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed:function(key, event) {
                    cc.log("Key down:" + key);
                }.bind(this),
                onKeyReleased:function(key, event) {
                    cc.log("Key up:" + key);
                }.bind(this)
            }, this);
        } else {
            cc.log("KEYBOARD Not supported");
        }
    }
});