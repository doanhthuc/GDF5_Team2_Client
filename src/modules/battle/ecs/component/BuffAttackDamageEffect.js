let BuffAttackDamageEffect = EffectComponent.extend({
    name: "BuffAttackDamageEffect",
    typeID: GameConfig.COMPONENT_ID.BUFF_ATTACK_DAMAGE,

    ctor: function (percent) {
        this._super();
        this.reset(percent);
    },

    clone: function () {
        return ComponentFactory.create(BuffAttackDamageEffect, this.percent)
    },

    reset: function (percent) {
        this.percent = percent;
    }
});
BuffAttackDamageEffect.typeID = GameConfig.COMPONENT_ID.BUFF_ATTACK_DAMAGE;
ComponentManager.getInstance().registerClass(BuffAttackDamageEffect);

BuffAttackDamageEffect.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);
    return data;
}