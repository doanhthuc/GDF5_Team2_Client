let SlowEffect = EffectComponent.extend({
    name: "SlowEffect",
    typeID: GameConfig.COMPONENT_ID.SLOW_EFFECT,

    ctor: function (duration, percent) {
        this._super();
        this.reset(duration, percent);
    },

    reset: function (duration, percent) {
        this.duration = duration;
        this.countdown = this.duration;
        this.percent = percent;
    },

    clone: function () {
        return ComponentFactory.create(SlowEffect, this.duration, this.percent);
    },
});
SlowEffect.typeID = GameConfig.COMPONENT_ID.SLOW_EFFECT;
ComponentManager.getInstance().registerClass(SlowEffect);

SlowEffect.readSnapshot = function (inPacket) {
    let component = Component.readSnapshot(inPacket);
    return component;
}