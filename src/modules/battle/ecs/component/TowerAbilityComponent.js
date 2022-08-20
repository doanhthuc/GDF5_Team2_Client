let TowerAbilityComponent = Component.extend({
    name: "TowerAbilityComponent",
    typeID: GameConfig.COMPONENT_ID.TOWER_ABILITY,

    ctor: function (range, effect) {
        this._super();
        this.reset(range, effect);
    },

    clone: function () {
        return ComponentFactory.create(TowerAbilityComponent, this.range, this.effect);
    },

    reset: function (range, effect) {
        this.range = range;
        this.effect = effect;
    },

    readData: function (data) {
        this._super(data);
        this.range = data.range;
        this.effect = data.effect;
    }
});
TowerAbilityComponent.typeID = GameConfig.COMPONENT_ID.TOWER_ABILITY;
ComponentManager.getInstance().registerClass(TowerAbilityComponent);

TowerAbilityComponent.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);
    data.range = inPacket.getDouble();
    //Unpack Effect component of tower ability Component
    let componentTypeID = inPacket.getInt();
    let ComponentCls = ComponentManager.getInstance().getClass(componentTypeID);
    let component = ComponentCls.unpackData(inPacket);
    component.typeID = componentTypeID;
    data.effect = component;
    return data;
}