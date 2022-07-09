let BulletInfoComponent = InfoComponent.extend({
    name: "BulletInfoComponentECS",
    typeID: GameConfig.COMPONENT_ID.BULLET_INFO,

    ctor: function (effects, type) {
        this._super();
        this.reset(effects, type);
    },

    reset: function (effects, type) {
        this.effects = effects;
        this.type = type;
    },

    clone: function () {
        return new BulletInfoComponent(this.effects, this.type);
    }
});
BulletInfoComponent.typeID = GameConfig.COMPONENT_ID.BULLET_INFO;
ComponentManager.getInstance().registerClass(BulletInfoComponent);