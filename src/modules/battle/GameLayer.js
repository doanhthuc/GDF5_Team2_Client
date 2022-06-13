let GameLayer = cc.Layer.extend({
    battleMapLayer: null,
    battleUILayer: null,
    renderSystem: null,
    movementSystem: null,

    ctor: function () {
        this._super();
        GameConfig.gameLayer = this;

        let rootNode = ccs.load("ui/battle/BattleScene.json", "");
        this.addChild(rootNode.node);
        this.battleMapLayer = rootNode.node.getChildByName("battle_map_layer");
        this.battleUILayer = rootNode.node.getChildByName("battle_ui_layer");

        // create system
        this.renderSystem = new RenderSystem();
        this.movementSystem = new MovementSystem();
        this.lifeSystem = new LifeSystem();

        this.initMonster();
        this.initTower();

        this.scheduleUpdate();
    },

    update: function(dt) {
        this.movementSystem.run(dt);
        this.renderSystem.run(dt);
        this.lifeSystem.run(dt);
    },

    initMonster: function () {
        EntityFactory.createSwordsmanMonster();
    },

    initTower: function () {
        EntityFactory.createCannonOwlTower();
    }
});