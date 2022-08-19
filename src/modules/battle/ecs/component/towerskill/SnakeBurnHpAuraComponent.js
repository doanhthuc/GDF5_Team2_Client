let SnakeBurnHpAuraComponent = Component.extend({
    name: "PoisonComponent",
    typeID: GameConfig.COMPONENT_ID.SNAKE_BURN_HP_AURA,

    ctor: function (burnRate, maxBurnHP, range) {
        this._super();
        this.reset(burnRate, maxBurnHP, range);
    },

    clone: function () {
        return ComponentFactory.create(SnakeBurnHpAuraComponent, this.burnRate, this.maxBurnHP, this.range);
    },

    reset: function (burnRate, maxBurnHP, range) {
        this.range = range;
        this.burnRate = burnRate;
        this.maxBurnHP = maxBurnHP;
    },
});
SnakeBurnHpAuraComponent.typeID = GameConfig.COMPONENT_ID.SNAKE_BURN_HP_AURA;
ComponentManager.getInstance().registerClass(SnakeBurnHpAuraComponent);

SnakeBurnHpAuraComponent.readSnapshot = function (inPacket) {
    let component = Component.readSnapshot(inPacket);
    return component;
}