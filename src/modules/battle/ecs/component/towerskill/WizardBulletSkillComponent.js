let WizardBulletSkillComponent = Component.extend({
    name: "WizardBulletSkillComponent",
    typeID: GameConfig.COMPONENT_ID.WIZARD_BULLET_SKILL,

    ctor: function (amountMonster) {
        this._super();
        this.reset(amountMonster);
    },

    clone: function () {
        return ComponentFactory.create(WizardBulletSkillComponent);
    },

    reset: function (amountMonster) {
        this.amountMonster= amountMonster;
    },
});
WizardBulletSkillComponent.typeID = GameConfig.COMPONENT_ID.WIZARD_BULLET_SKILL;
ComponentManager.getInstance().registerClass(WizardBulletSkillComponent);