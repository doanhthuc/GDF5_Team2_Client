let FrozenEffect = EffectComponent.extend({
    name: "FrozenEffect",
    typeID: GameConfig.COMPONENT_ID.FROZEN_EFFECT,

    ctor: function (duration) {
        this._super();
        this.reset(duration);
        this.saveData();
    },

    reset: function (duration) {
        this._duration = duration;
        this.countdown = this._duration;
    },

    clone: function () {
        return ComponentFactory.create(FrozenEffect, this._duration);
    },

    saveData: function () {
        tickManager.getTickData()
            .saveComponentData(this.id, {_duration: this._duration, countdown: this.countdown});
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        this._duration = componentData._duration;
        this.countdown = componentData.countdown;
    },
});
FrozenEffect.typeID = GameConfig.COMPONENT_ID.FROZEN_EFFECT;
ComponentManager.getInstance().registerClass(FrozenEffect);