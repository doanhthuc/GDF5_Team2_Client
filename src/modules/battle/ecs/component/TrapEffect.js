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

    saveData: function () {
        const data = {
            isExecuted: this.isExecuted,
            countdown: this.countdown,
        }
        tickManager.getTickData()
            .saveComponentData(this.id, data);
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        this.isExecuted = componentData.isExecuted;
        this.countdown = componentData.countdown;
    },
});
TrapEffect.typeID = GameConfig.COMPONENT_ID.TRAP_EFFECT;
ComponentManager.getInstance().registerClass(TrapEffect);