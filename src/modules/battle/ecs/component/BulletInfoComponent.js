let BulletInfoComponent = InfoComponent.extend({
    name: "BulletInfoComponentECS",
    typeID: GameConfig.COMPONENT_ID.BULLET_INFO,

    ctor: function (effects, type, radius, canTargetAirMonster = true) {
        this._super();
        this.reset(effects, type, radius, canTargetAirMonster);
    },

    reset: function (effects, type, radius, canTargetAirMonster = true) {
        this.effects = effects;
        this.type = type;
        this.radius = radius;
        this.canTargetAirMonster = canTargetAirMonster;
        this.hitMonster = new Map();
    },

    clone: function () {
        // TODO: should clone effects
        return ComponentFactory.create(BulletInfoComponent, this.effects, this.type, this.radius, this.canTargetAirMonster);
    },
});
BulletInfoComponent.typeID = GameConfig.COMPONENT_ID.BULLET_INFO;
ComponentManager.getInstance().registerClass(BulletInfoComponent);

BulletInfoComponent.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);
    return data;
}