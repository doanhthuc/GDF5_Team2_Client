let SpellInfoComponent = Component.extend({
    name: "SpellInfoComponent",
    typeID: GameConfig.COMPONENT_ID.SPELL,
    DELAY_DESTROY_TIME: 1,

    ctor: function (position, effects, range, duration) {
        this._super();
        this.reset(position, effects, range, duration);
    },

    reset: function (position, effects, range, delay, delayDestroy, isTriggered = false) {
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

    readData: function (data) {
        this._super(data);
        this.position = data;
        this.delay = data.delay;
        this.delayDestroy = data.delayDestroy;
        this.isTriggered = data.isTriggered;
        this.effects = data.effects;
    }
});
SpellInfoComponent.typeID = GameConfig.COMPONENT_ID.SPELL;
ComponentManager.getInstance().registerClass(SpellInfoComponent);

SpellInfoComponent.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);
    data.position = cc.p(inPacket.getDouble(), inPacket.getDouble())
    data.delay = inPacket.getDouble();
    data.delayDestroy = inPacket.getDouble();
    data.isTriggered = Utils.convertShortToBoolean(inPacket.getShort());
    let effectSize = data.getInt();
    data.effects = [];
    for (let i = 0; i < effectSize; i++) {
        let componentTypeID = inPacket.getInt();
        let ComponentCls = ComponentManager.getInstance().getClass(componentTypeID);
        let component = ComponentCls.unpackData(inPacket);

        component.typeID = componentTypeID;
        data.effects.push(component);
    }
    return data;
}

