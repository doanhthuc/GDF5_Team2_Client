let SnakeBurnHpComponent = Component.extend({
    name: "PoisonComponent",
    typeID: GameConfig.COMPONENT_ID.POISON,

    ctor: function (burnRate) {
        this._super();
        this.reset(burnRate);
    },

    clone: function () {
        return ComponentFactory.create(SnakeBurnHpComponent,this.healthPerSecond);
    },

    reset: function (healthPerSecond) {
        this.healthPerSecond = healthPerSecond;
    },
});
SnakeBurnHpComponent.typeID = GameConfig.COMPONENT_ID.POISON;
ComponentManager.getInstance().registerClass(SnakeBurnHpComponent);