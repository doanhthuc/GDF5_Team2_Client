let SlowEffect = EffectComponent.extend({
    name: "SlowEffect",
    typeID: GameConfig.COMPONENT_ID.SLOW_EFFECT,

    ctor: function (duration, percent) {
        this._super();
        this.reset(duration, percent);
    },

    clone: function () {
        return new SlowEffect(this.duration, this.percent);
    },

    reset: function (duration, percent) {
        this.duration = duration;
        this.countdown = this.duration;
        this.percent = percent;
    }
});
SlowEffect.typeID = GameConfig.COMPONENT_ID.SLOW_EFFECT;
ComponentManager.getInstance().registerClass(SlowEffect);