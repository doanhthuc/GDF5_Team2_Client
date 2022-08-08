let SpellInfoComponent = Component.extend({
    name: "SpellInfoComponent",
    typeID: GameConfig.COMPONENT_ID.SPELL,

    ctor: function (position, effects, range, duration) {
        this._super();
        this.reset(position, effects, range, duration);
    },

    reset: function (position, effects, range, delay) {
        this.position = position;
        this.effects = effects;
        this.range = range;
        this.delay = delay;
        this.countdown = this.delay;
    },

    clone: function () {
        // TODO: should effect.clone()??
        return ComponentFactory.create(SpellInfoComponent, this.pos, this.effects, this.range, this.delay);
    },
});
SpellInfoComponent.typeID = GameConfig.COMPONENT_ID.SPELL;
ComponentManager.getInstance().registerClass(SpellInfoComponent);