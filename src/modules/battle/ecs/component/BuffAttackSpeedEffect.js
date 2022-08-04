let BuffAttackSpeedEffect = EffectComponent.extend({
    name: "BuffAttackSpeedEffect",
    typeID: GameConfig.COMPONENT_ID.BUFF_ATTACK_SPEED,

    ctor: function (percent) {
        this._super();
        this.reset(percent);
        this.saveData();
    },

    clone: function () {
        return ComponentFactory.create(BuffAttackSpeedEffect, this.percent)
    },

    reset: function (percent) {
        this.percent = percent;
    },

    saveData: function () {
        tickManager.getTickData()
            .saveComponentData(this.id, {percent: this.percent});
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        this.reset(componentData.percent);
    },
});
BuffAttackSpeedEffect.typeID = GameConfig.COMPONENT_ID.BUFF_ATTACK_SPEED;
ComponentManager.getInstance().registerClass(BuffAttackSpeedEffect);