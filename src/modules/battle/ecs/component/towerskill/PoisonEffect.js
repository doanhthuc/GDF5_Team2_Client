let PoisonComponent = Component.extend({
    name: "PoisonComponent",
    typeID: GameConfig.COMPONENT_ID.POISON,

    ctor: function (healthPerSecond, duration) {
        this._super();
        this.reset(healthPerSecond, duration);
    },

    clone: function () {
        return ComponentFactory.create(PoisonComponent,this.healthPerSecond,this.duration);
    },

    reset: function (healthPerSecond, duration) {
        this.healthPerSecond = healthPerSecond;
        this.duration = duration;
    },
});
PoisonComponent.typeID = GameConfig.COMPONENT_ID.POISON;
ComponentManager.getInstance().registerClass(PoisonComponent);