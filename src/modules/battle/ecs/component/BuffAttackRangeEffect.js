const BuffAttackRangeEffect = EffectComponent.extend({
    name: "BuffAttackRangeEffect",
    typeID: GameConfig.COMPONENT_ID.BUFF_ATTACK_RANGE,

    ctor: function (percent) {
        this._super();
        this.reset(percent);
    },

    clone: function () {
        return ComponentFactory.create(BuffAttackRangeEffect, this.percent)
    },

    reset: function (percent) {
        this.percent = percent;
    },
});

BuffAttackRangeEffect.typeID = GameConfig.COMPONENT_ID.BUFF_ATTACK_RANGE;
ComponentManager.getInstance().registerClass(BuffAttackRangeEffect);

BuffAttackRangeEffect.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);
    return data;
}