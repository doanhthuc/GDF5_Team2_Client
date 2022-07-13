let SpawnMinionComponent = Component.extend({
    name: "SpawnMinionComponent",
    typeID: GameConfig.COMPONENT_ID.SPAWN_MINION,

    ctor: function (period) {
        this._super();
        this.reset(period);
    },

    reset: function (period) {
        this.period = period;
        this.spawnAmount = 0;
    },

    clone: function () {
        return new SpawnMinionComponent(this.period);
    }
});
SpawnMinionComponent.typeID = GameConfig.COMPONENT_ID.SPAWN_MINION;
ComponentManager.getInstance().registerClass(SpawnMinionComponent);