let SpellInfoComponent = Component.extend({
    name: "SpellInfoComponent",
    typeID: GameConfig.COMPONENT_ID.SPELL,

    ctor: function (position, effects, range, duration) {
        this._super();
        this.reset(position, effects, range, duration);
        this.saveData();
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

    saveData: function () {
        let effectCloned = [];
        for (let effect of this.effects) {
            effectCloned.push(effect.clone());
        }

        const data = {
            position: cc.p(this.position.x, this.position.y),
            effects: effectCloned,
            range: this.range,
            delay: this.delay,
            countdown: this.countdown,
        }

        tickManager.getTickData()
            .saveComponentData(this.id, data);
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        this.position = componentData.position;
        this.effects = componentData.effects;
        this.range = componentData.range;
        this.delay = componentData.delay;
        this.countdown = componentData.countdown;
    },
});
SpellInfoComponent.typeID = GameConfig.COMPONENT_ID.SPELL;
ComponentManager.getInstance().registerClass(SpellInfoComponent);