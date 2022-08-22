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
        this.maxAmount = 5;
    },

    clone: function () {
        return ComponentFactory.create(SpawnMinionComponent, this.period);
    },

    readData: function (data) {
        this._super(data);
        this.spawnAmount = data.spawnAmount;
        this.period = data.period;
    }
});
SpawnMinionComponent.typeID = GameConfig.COMPONENT_ID.SPAWN_MINION;
ComponentManager.getInstance().registerClass(SpawnMinionComponent);

SpawnMinionComponent.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);
    data.spawnAmount = inPacket.getInt();
    data.period = inPacket.getDouble();
    return data;
}