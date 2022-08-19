let FrozenEffect = EffectComponent.extend({
    name: "FrozenEffect",
    typeID: GameConfig.COMPONENT_ID.FROZEN_EFFECT,

    ctor: function (duration) {
        this._super();
        this.reset(duration);
    },

    reset: function (duration) {
        this._duration = duration;
        this.countdown = this._duration;
    },

    clone: function () {
        return ComponentFactory.create(FrozenEffect, this._duration);
    },
});
FrozenEffect.typeID = GameConfig.COMPONENT_ID.FROZEN_EFFECT;
ComponentManager.getInstance().registerClass(FrozenEffect);

FrozenEffect.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);
    return data;
}