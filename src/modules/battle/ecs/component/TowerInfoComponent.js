let TowerInfoComponent = InfoComponent.extend({
    name: "TowerInfoComponentECS",
    typeID: GameConfig.COMPONENT_ID.TOWER_INFO,

    ctor: function (energy, bulletTargetType, archType, targetType, bulletType) {
        this._super();
        this.reset(energy, bulletTargetType, archType, targetType, bulletType);
    },

    reset: function (energy, bulletTargetType, archType, targetType, bulletType) {
        this.energy = energy;
        this.bulletTargetType = bulletTargetType;
        this.archType = archType;
        this.targetType = targetType;
        this.bulletType = bulletType;
    },

    clone: function () {
        return new TowerInfoComponent(this.energy, this.bulletTargetType, this.archType, this.targetType, this.bulletType);
    }
});
TowerInfoComponent.typeID = GameConfig.COMPONENT_ID.TOWER_INFO;
ComponentManager.getInstance().registerClass(TowerInfoComponent);