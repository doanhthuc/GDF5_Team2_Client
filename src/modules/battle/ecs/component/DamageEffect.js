let DamageEffect = EffectComponent.extend({
    name: "DamageEffect",
    typeID: GameConfig.COMPONENT_ID.DAMAGE_EFFECT,

    ctor: function (damage) {
        this._super();
        this.reset(damage);
        this.saveData();
    },

    clone: function () {
        return ComponentFactory.create(DamageEffect, this.damage);
    },

    reset: function (damage) {
        this.damage = damage;
    },

    saveData: function () {
        tickManager.getTickData()
            .saveComponentData(this.id, {damage: this.damage});
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        this.reset(componentData.damage);
    },
});
DamageEffect.typeID = GameConfig.COMPONENT_ID.DAMAGE_EFFECT;
ComponentManager.getInstance().registerClass(DamageEffect);