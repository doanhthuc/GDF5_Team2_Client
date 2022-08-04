let TowerAbilityComponent = Component.extend({
    name: "TowerAbilityComponent",
    typeID: GameConfig.COMPONENT_ID.TOWER_ABILITY,

    ctor: function (range, effect) {
        this._super();
        this.reset(range, effect);
        this.saveData();
    },

    clone: function () {
        return ComponentFactory.create(TowerAbilityComponent, this.range, this.effect);
    },

    reset: function (range, effect) {
        this.range = range;
        this.effect = effect;
    },

    saveData: function () {
        const data = {
            range: this.range,
            effect: this.effect.clone()
        }
        tickManager.getTickData()
            .saveComponentData(this.id, data);
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        this.reset(componentData.range, componentData.effect.clone());
    },
});
TowerAbilityComponent.typeID = GameConfig.COMPONENT_ID.TOWER_ABILITY;
ComponentManager.getInstance().registerClass(TowerAbilityComponent);