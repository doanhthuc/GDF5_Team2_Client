let SlowEffect = EffectComponent.extend({
    name: "SlowEffect",
    typeID: GameConfig.COMPONENT_ID.SLOW_EFFECT,

    ctor: function (duration, percent) {
        this._super();
        this.reset(duration, percent);
        this.saveData();
    },

    reset: function (duration, percent) {
        this.duration = duration;
        this.countdown = this.duration;
        this.percent = percent;
    },

    clone: function () {
        return ComponentFactory.create(SlowEffect, this.duration, this.percent);
    },

    saveData: function () {
        const data = {
            duration: this.duration,
            countdown: this.countdown,
            percent: this.percent
        }
        tickManager.getTickData()
            .saveComponentData(this.id, data);
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        this.duration = componentData.duration;
        this.countdown = componentData.countdown;
        this.percent = componentData.percent;
    },
});
SlowEffect.typeID = GameConfig.COMPONENT_ID.SLOW_EFFECT;
ComponentManager.getInstance().registerClass(SlowEffect);