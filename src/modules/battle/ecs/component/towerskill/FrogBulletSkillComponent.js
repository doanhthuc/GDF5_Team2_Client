let FrogBulletSkillComponent = Component.extend({
    name: "FrogBulletSkillComponent",
    typeID: GameConfig.COMPONENT_ID.FROG_BULLET_SKILL,

    ctor: function () {
        this._super();
        this.reset();
    },

    clone: function () {
        return ComponentFactory.create(FrogBulletSkillComponent);
    },

    reset: function (damage) {
    },
});
FrogBulletSkillComponent.typeID = GameConfig.COMPONENT_ID.FROG_BULLET_SKILL;
ComponentManager.getInstance().registerClass(FrogBulletSkillComponent);

FrogBulletSkillComponent.readSnapshot = function (inPacket) {
    let component = Component.readSnapshot(inPacket);
    return component;
}