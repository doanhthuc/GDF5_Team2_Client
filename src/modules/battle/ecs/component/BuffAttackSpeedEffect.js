let BuffAttackSpeedEffect = EffectComponent.extend({
    name: "BuffAttackSpeedEffect",
    typeID: GameConfig.COMPONENT_ID.BUFF_ATTACK_SPEED,

    ctor: function (percent) {
        this._super();
        this.reset(percent);
    },

    clone: function () {
        return ComponentFactory.create(BuffAttackSpeedEffect, this.percent)
    },

    reset: function (percent) {
        this.percent = percent;
    },

    readData: function (data) {
        this._super(data);
        this.percent = data.percent;
    }
});
BuffAttackSpeedEffect.typeID = GameConfig.COMPONENT_ID.BUFF_ATTACK_SPEED;
ComponentManager.getInstance().registerClass(BuffAttackSpeedEffect);

BuffAttackSpeedEffect.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);
    data.percent = inPacket.getDouble();
    return data;
}