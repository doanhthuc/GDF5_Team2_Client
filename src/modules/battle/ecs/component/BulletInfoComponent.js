let BulletInfoComponent = InfoComponent.extend({
    name: "BulletInfoComponentECS",
    typeID: GameConfig.COMPONENT_ID.BULLET_INFO,

    ctor: function (effects, type, radius) {
        this._super();
        this.reset(effects, type, radius);
    },

    reset: function (effects, type, radius) {
        this.effects = effects;
        this.type = type;
        this.radius = radius;
        this.hitMonster = new Map();
    },

    clone: function () {
        // TODO: should clone effects
        return ComponentFactory.create(BulletInfoComponent, this.effects, this.type, this.radius);
    },
});
BulletInfoComponent.typeID = GameConfig.COMPONENT_ID.BULLET_INFO;
ComponentManager.getInstance().registerClass(BulletInfoComponent);

BulletInfoComponent.readSnapshot = function (inPacket) {
    let component = Component.readSnapshot(inPacket);
    return component;
}