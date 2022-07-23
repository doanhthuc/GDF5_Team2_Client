let TrapEffect = EffectComponent.extend({
    name: "TrapEffect",
    typeID: GameConfig.COMPONENT_ID.TRAP_SPELL,

    ctor: function (duration) {
        this._super();
        this.reset(duration);
    },

    reset: function (delayTime) {
        this.delayTime = delayTime;
        this.countDown = delayTime;
        this.isTriggered = false;
    },

    clone: function () {
        return ComponentFactory.create(FrozenEffect, this._duration);
    },
});
TrapEffect.typeID = GameConfig.COMPONENT_ID.TRAP_SPELL;
ComponentManager.getInstance().registerClass(TrapEffect);