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
        return new SpellInfoComponent(this.pos, this.effects);
    }
});
SpellInfoComponent.typeID = GameConfig.COMPONENT_ID.SPELL;
ComponentManager.getInstance().registerClass(SpellInfoComponent);