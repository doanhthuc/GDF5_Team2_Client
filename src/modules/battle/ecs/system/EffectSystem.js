let EffectSystem = System.extend({
    id: GameConfig.SYSTEM_ID.EFFECT,
    name: "EffectSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        // TODO: case damage effects
        let entityList = EntityManager.getInstance()
            .getEntitiesByComponents(GameConfig.COMPONENT_ID.DAMAGE_EFFECT);
        for (let entity of entityList) {
            let lifeComponent = entity.getComponent(GameConfig.COMPONENT_ID.LIFE);
            if (lifeComponent) {
                let damageComponent = entity.getComponent(GameConfig.COMPONENT_ID.DAMAGE_EFFECT);
                lifeComponent.hp -= damageComponent.damage;
                entity.removeComponent(damageComponent.typeID)
            }
        }
    }
});