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
        this.countdown = this.delay;

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
        this.position = data.position;
        this.delay = data.delay;
        this.delayDestroy = data.delayDestroy;
        this.isTriggered = data.isTriggered;
        this.effects = [];

        for (let effectData of data.effects) {
            let effectType = effectData.typeID;
            ComponentCls = ComponentManager.getInstance().getClass(effectType);
            let component = new ComponentCls();
            component.typeID = effectType;
            component.readData(effectData);
            this.effects.push(component);
        }
    }
});
SpellInfoComponent.typeID = GameConfig.COMPONENT_ID.SPELL;
ComponentManager.getInstance().registerClass(SpellInfoComponent);

SpellInfoComponent.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);

    if (GameConfig.USER1() === "opponent") {
        data.position = cc.p((-1) * inPacket.getDouble(), (-1) * inPacket.getDouble());
    } else {
        data.position = cc.p(inPacket.getDouble(), inPacket.getDouble())
    }

    data.delay = inPacket.getDouble();
    data.delayDestroy = inPacket.getDouble();
    data.isTriggered = Utils.convertShortToBoolean(inPacket.getShort());
    let effectSize = inPacket.getInt();
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

