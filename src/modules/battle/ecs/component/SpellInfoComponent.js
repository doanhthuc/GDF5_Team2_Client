let SpellInfoComponent = Component.extend({
    name: "SpellInfoComponent",
    typeID: GameConfig.COMPONENT_ID.SPELL,

    ctor: function (position, effects, range, duration) {
        this._super();
        this.reset(position, effects, range, duration);
    },

    reset: function (position, effects, range, duration) {
        this.position = position;
        this.effects = effects;
        this.range = range;
        this.duration = duration;
        this.countdown = this.duration;
    },

    clone: function () {
        // TODO: should effect.clone()??
        return ComponentFactory.create(SpellInfoComponent, this.pos, this.effects, this.range, this.duration);
    }
});
SpellInfoComponent.typeID = GameConfig.COMPONENT_ID.SPELL;
ComponentManager.getInstance().registerClass(SpellInfoComponent);