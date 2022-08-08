let GoatSlowAuraComponent = Component.extend({
    name: "PoisonComponent",
    typeID: GameConfig.COMPONENT_ID.GOAT_SLOW_AURA,

    ctor: function (range) {
        this._super();
        this.reset(range);
    },

    clone: function () {
        return ComponentFactory.create(GoatSlowAuraComponent,range);
    },

    reset: function (range) {
        this.range = range;
    },
});
GoatSlowAuraComponent.typeID = GameConfig.COMPONENT_ID.GOAT_SLOW_AURA;
ComponentManager.getInstance().registerClass(GoatSlowAuraComponent);