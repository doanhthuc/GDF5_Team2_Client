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
        for (let effect of data.effects) {
            if (this.effect.typeID === effect.typeID) {
                this.effect.percent = effect.percent;
            }
        }
    }
});
TowerAbilityComponent.typeID = GameConfig.COMPONENT_ID.TOWER_ABILITY;
ComponentManager.getInstance().registerClass(TowerAbilityComponent);

TowerAbilityComponent.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);
    data.range = inPacket.getDouble();
    data.effects = []
    let effect = {};
    effect.typeID = inPacket.getInt();
    effect.percent = inPacket.getDouble();
    data.effects.push(effect);
    return data;
}