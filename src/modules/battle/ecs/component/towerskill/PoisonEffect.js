let PoisonEffect = EffectComponent.extend({
    name: "PoisonComponent",
    typeID: GameConfig.COMPONENT_ID.POISON,

    ctor: function (healthPerSecond, duration) {
        this._super();
        this.reset(healthPerSecond, duration);
    },

    clone: function () {
        return ComponentFactory.create(PoisonEffect, this.healthPerSecond, this.duration);
    },

    reset: function (healthPerSecond, duration) {
        this.healthPerSecond = healthPerSecond;
        this.duration = duration;
    },

    readData: function (data) {
        this._super(data);
        this.duration = data.duration;
        this.healthPerSecond = data.healthPerSecond;
    }
});
PoisonEffect.typeID = GameConfig.COMPONENT_ID.POISON;
ComponentManager.getInstance().registerClass(PoisonEffect);

PoisonEffect.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);
    data.duration = inPacket.getDouble();
    data.healthPerSecond = inPacket.getDouble();
    return data;
}