const BuffAttackRangeEffect = EffectComponent.extend({
    name: "BuffAttackRangeEffect",
    typeID: GameConfig.COMPONENT_ID.BUFF_ATTACK_RANGE,

    ctor: function (percent) {
        this._super();
        this.reset(percent);
        this.saveData();
    },

    clone: function () {
        return ComponentFactory.create(BuffAttackRangeEffect, this.percent)
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

BuffAttackRangeEffect.typeID = GameConfig.COMPONENT_ID.BUFF_ATTACK_RANGE;
ComponentManager.getInstance().registerClass(BuffAttackRangeEffect);