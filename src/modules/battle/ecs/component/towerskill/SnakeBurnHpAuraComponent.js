let SnakeBurnHpAuraComponent = Component.extend({
    name: "PoisonComponent",
    typeID: GameConfig.COMPONENT_ID.SNAKE_BURN_HP_AURA,

    ctor: function (range) {
        this._super();
        this.reset(range);
    },

    clone: function () {
        return ComponentFactory.create(SnakeBurnHpAuraComponent,this.range);
    },

    reset: function (range) {
        this.range = range;
    },
});
SnakeBurnHpAuraComponent.typeID = GameConfig.COMPONENT_ID.SNAKE_BURN_HP_AURA;
ComponentManager.getInstance().registerClass(SnakeBurnHpAuraComponent);