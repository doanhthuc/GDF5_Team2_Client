const ResetSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.RESET_SYSTEM,
    name: "ResetSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    _run: function (tick) {
    },

    updateData: function () {
        this.handleResetDamageEffect();
    },

    handleResetDamageEffect: function () {
        let towerList = EntityManager.getInstance().getEntitiesHasComponents(AttackComponent);
        for (let tower of towerList) {
            let attackComponent = tower.getComponent(AttackComponent);
            attackComponent.setDamage(attackComponent.originDamage);
            attackComponent.setSpeed(attackComponent.originSpeed);
        }
    },
})
ResetSystem.typeID = GameConfig.SYSTEM_ID.RESET_SYSTEM;
SystemManager.getInstance().registerClass(ResetSystem);