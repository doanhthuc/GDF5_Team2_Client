let TrapEffect = EffectComponent.extend({
    name: "TrapEffect",
    typeID: GameConfig.COMPONENT_ID.TRAP_EFFECT,

    ctor: function () {
        this._super();
        this.reset();
    },

    reset: function () {
        this.isExecuted = false;
        this.countdown = 0;
    },

    clone: function () {
        return ComponentFactory.create(FrozenEffect, this._duration);
    },

    setCountDown: function (countDownTime) {
        this.countdown = countDownTime;
        this.isExecuted = true
    },

    readData: function (data) {
        this._super(data);
        this.countdown = data.countdown;
        this.isExecuted = data.isExecuted;
    }
});
TrapEffect.typeID = GameConfig.COMPONENT_ID.TRAP_EFFECT;
ComponentManager.getInstance().registerClass(TrapEffect);

TrapEffect.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);

    data.countdown = inPacket.getDouble();
    data.isExecuted = Utils.convertShortToBoolean(inPacket.getShort());

    return data;
}