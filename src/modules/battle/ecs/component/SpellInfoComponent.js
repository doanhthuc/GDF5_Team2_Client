let SpellInfoComponent = Component.extend({
    name: "SpellInfoComponent",
    typeID: GameConfig.COMPONENT_ID.SPELL,
    DELAY_DESTROY_TIME: 1,

    ctor: function (position, effects, range, duration) {
        this._super();
        this.reset(position, effects, range, duration);
    },

    reset: function (position, effects, range, delay, delayDestroy, isTriggered=false) {
        this.position = position;
        this.effects = effects;
        this.range = range;
        this.delay = delay;

        this.delayDestroy = this.delay + this.DELAY_DESTROY_TIME;
        if (delayDestroy) {
            this.delayDestroy = delayDestroy;
        }

        this.isTriggered = isTriggered;
    },

    clone: function () {
        // TODO: should effect.clone()??
        return ComponentFactory.create(SpellInfoComponent, this.pos, this.effects, this.range, this.delay, this.delayDestroy, this.isTriggered);
    },
});
SpellInfoComponent.typeID = GameConfig.COMPONENT_ID.SPELL;
ComponentManager.getInstance().registerClass(SpellInfoComponent);

SpellInfoComponent.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);
    return data;
}

