let GoatSlowEffectComponent = Component.extend({
    name: "PoisonComponent",
    typeID: GameConfig.COMPONENT_ID.GOAT_SLOW_EFFECT,

    ctor: function (percent) {
        this._super();
        this.reset(percent);
    },

    clone: function () {
        return ComponentFactory.create(GoatSlowEffectComponent,this.percent);
    },

    reset: function (percent) {
        this.slowRate = percent;
    },
});
GoatSlowEffectComponent.typeID = GameConfig.COMPONENT_ID.GOAT_SLOW_EFFECT;
ComponentManager.getInstance().registerClass(GoatSlowEffectComponent);