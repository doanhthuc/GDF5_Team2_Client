let LifeSystem = System.extend({
    id: GameConfig.SYSTEM_ID.LIFE,
    name: "LifeSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(LifeComponent);
        for (let entity of entityList) {
            let lifeComponent = entity.getComponent(LifeComponent);
            if (lifeComponent.hp <= 0) {
                EntityManager.destroy(entity);
            }
        }
    }
});