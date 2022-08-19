let TowerInfoComponent = InfoComponent.extend({
    name: "TowerInfoComponentECS",
    typeID: GameConfig.COMPONENT_ID.TOWER_INFO,

    ctor: function (energy, bulletTargetType, archType, targetType, bulletType) {
        this._super();
        this.reset(energy, bulletTargetType, archType, targetType, bulletType);
    },

    reset: function (energy, bulletTargetType, archType, targetType, bulletType) {

    },

    clone: function () {
        return ComponentFactory.create(TowerInfoComponent);
    }
});
TowerInfoComponent.typeID = GameConfig.COMPONENT_ID.TOWER_INFO;
ComponentManager.getInstance().registerClass(TowerInfoComponent);

TowerInfoComponent.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);
    return data;
}