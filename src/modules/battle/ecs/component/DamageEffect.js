let DamageEffect = EffectComponent.extend({
    name: "DamageEffect",
    typeID: GameConfig.COMPONENT_ID.DAMAGE_EFFECT,

    ctor: function (damage) {
        this._super();
        this.reset(damage);
    },

    clone: function () {
        return ComponentFactory.create(DamageEffect, this.damage);
    },

    reset: function (damage) {
        this.damage = damage;
    },
});
DamageEffect.typeID = GameConfig.COMPONENT_ID.DAMAGE_EFFECT;
ComponentManager.getInstance().registerClass(DamageEffect);