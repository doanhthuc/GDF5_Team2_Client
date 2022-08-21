let GoatSlowAuraComponent = Component.extend({
    name: "GoatSlowAura",
    typeID: GameConfig.COMPONENT_ID.GOAT_SLOW_AURA,

    ctor: function (percent, range) {
        this._super();
        this.reset(percent, range);
    },

    clone: function () {
        return ComponentFactory.create(GoatSlowAuraComponent, this.percent, this.range);
    },

    reset: function (percent, range) {
        this.range = range;
        this.percent = percent;
    },
});
GoatSlowAuraComponent.typeID = GameConfig.COMPONENT_ID.GOAT_SLOW_AURA;
ComponentManager.getInstance().registerClass(GoatSlowAuraComponent);

GoatSlowAuraComponent.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);
    return data;
}