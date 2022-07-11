let FrozenEffect = EffectComponent.extend({
    name: "FrozenEffect",
    typeID: GameConfig.COMPONENT_ID.FROZEN_EFFECT,

    ctor: function (duration) {
        this._super();
        this.reset(duration);
    },

    clone: function () {
        return new FrozenEffect(this.duration);
    },

    reset: function (duration) {
        this.duration = duration;
        this.countdown = this.duration;
    }
});
FrozenEffect.typeID = GameConfig.COMPONENT_ID.FROZEN_EFFECT;
ComponentManager.getInstance().registerClass(FrozenEffect);