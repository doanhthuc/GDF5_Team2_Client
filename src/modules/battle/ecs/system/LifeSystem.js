let LifeSystem = System.extend({
    id: GameConfig.SYSTEM_ID.LIFE,
    name: "LifeSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesByComponent(GameConfig.COMPONENT_ID.LIFE);
        for (let entity of entityList) {
            let lifeComponent = entity.getComponent(GameConfig.COMPONENT_ID.LIFE);
            if (lifeComponent.hp <= 0) {
                // fire event
            }
        }
    }
});