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
    }
});
TrapEffect.typeID = GameConfig.COMPONENT_ID.TRAP_EFFECT;
ComponentManager.getInstance().registerClass(TrapEffect);