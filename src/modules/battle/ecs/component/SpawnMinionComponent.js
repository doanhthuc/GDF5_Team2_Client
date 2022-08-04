let SpawnMinionComponent = Component.extend({
    name: "SpawnMinionComponent",
    typeID: GameConfig.COMPONENT_ID.SPAWN_MINION,

    ctor: function (period) {
        this._super();
        this.reset(period);
        this.saveData();
    },

    reset: function (period) {
        this.period = period;
        this.spawnAmount = 0;
    },

    clone: function () {
        return ComponentFactory.create(SpawnMinionComponent, this.period);
    },

    saveData: function () {
        tickManager.getTickData()
            .saveComponentData(this.id, {period: this.period, spawnAmount: this.spawnAmount});
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        this.period = componentData.period;
        this.spawnAmount = componentData.spawnAmount;
    },
});
SpawnMinionComponent.typeID = GameConfig.COMPONENT_ID.SPAWN_MINION;
ComponentManager.getInstance().registerClass(SpawnMinionComponent);