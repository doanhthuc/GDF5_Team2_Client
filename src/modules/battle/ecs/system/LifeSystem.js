let LifeSystem = System.extend({
    id: GameConfig.SYSTEM_ID.LIFE,
    name: "LifeSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesByComponents(GameConfig.COMPONENT_ID.LIFE);
        for (let entity of entityList) {
            let lifeComponent = entity.getComponent(GameConfig.COMPONENT_ID.LIFE);
            if (lifeComponent.hp <= 0) {
                if (Utils.isMonster(entity)) {
                    let monsterInfo = entity.getComponent(GameConfig.COMPONENT_ID.MONSTER_INFO);

                    // FIXME: add destroy method into Entity, remove sprite of Apprearance Component, set Active = false for other Component
                    // can delegate for each component destroy
                    let appearanceComponent = entity.getComponent(GameConfig.COMPONENT_ID.APPEARANCE)
                    if (appearanceComponent) {
                        let sprite = appearanceComponent.sprite;
                        sprite.setVisible(false);
                    }
                    entity.setActive(false);
                    for (let key of Object.keys(entity.components)) {
                        entity.components[key].setActive(false);
                    }

                }
            }
        }
    }
});