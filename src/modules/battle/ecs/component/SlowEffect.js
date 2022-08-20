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

    readData: function (data) {
        this._super(data);
        this.duration = data.duration;
        this.percent = data.percent;
        this.countdown = data.countdown;
    }
});
SlowEffect.typeID = GameConfig.COMPONENT_ID.SLOW_EFFECT;
ComponentManager.getInstance().registerClass(SlowEffect);

SlowEffect.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);

    data.duration = inPacket.getDouble();
    data.percent = inPacket.getDouble();
    data.countdown = inPacket.getDouble();

    return data;
}