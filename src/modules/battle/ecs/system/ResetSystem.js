const ResetSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.RESET_SYSTEM,
    name: "ResetSystem",

    ctor: function () {
        this._super();
    },

    _run: function (tick) {
    },

    updateData: function () {
        // this.handleResetGoatSlowEffect();
    },

    // handleResetGoatSlowEffect: function () {
    //     let monsterList = EntityManager.getInstance().getEntitiesHasComponents(GoatSlowEffectComponent);
    //     for(let monster of monsterList) {
    //         let goatSlowEffect = monster.getComponent(GoatSlowEffectComponent);
    //         monster.removeComponent(goatSlowEffect);
    //         let velocityComponent = monster.getComponent(VelocityComponent);
    //         velocityComponent.speedX = velocityComponent.originSpeedX;
    //         velocityComponent.speedY = velocityComponent.originSpeedY;
    //     }
    // },
})
ResetSystem.typeID = GameConfig.SYSTEM_ID.RESET_SYSTEM;
SystemManager.getInstance().registerClass(ResetSystem);