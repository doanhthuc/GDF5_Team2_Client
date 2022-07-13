let AbilitySystem = System.extend({
    id: GameConfig.SYSTEM_ID.ABILITY,
    name: "AbilitySystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        this._handleUnderGroundComponent();
        this._handleSpawnMinionComponent()
    },

    _handleUnderGroundComponent: function (tick) {
        let entityList = EntityManager.getInstance().getEntitiesHasComponents(UnderGroundComponent);
        for (let entity of entityList) {
            let lifeComponent = entity.getComponent(LifeComponent);
            let underGroundComponent = entity.getComponent(UnderGroundComponent);
            let pathComponent = entity.getComponent(PathComponent);
            if (underGroundComponent.isInGround == false) {
                if (((lifeComponent.hp / lifeComponent.maxHP) <= 0.7 - 0.3 * underGroundComponent.trigger)) {
                    underGroundComponent.trigger += 1;
                    underGroundComponent.disablePathIdx = pathComponent.currentPathIdx + 2;
                    underGroundComponent.isInGround = true;
                }
            } else {
                if (underGroundComponent.disablePathIdx == pathComponent.currentPathIdx) {
                    underGroundComponent.isInGround = false;
                }
            }
        }
    },

    _handleSpawnMinionComponent: function (tick) {
        let entityList = EntityManager.getInstance().getEntitiesHasComponents(SpawnMinionComponent);
        for (let entity of entityList) {
            let spawnMinionComponent = entity.getComponent(SpawnMinionComponent);
            if (spawnMinionComponent.period > 0) {
                spawnMinionComponent.period -= tick;
            } else {
                spawnMinionComponent.period = 2;
                let positionComponent = entity.getComponent(PositionComponent);
                EntityFactory.createSwordsmanMonster({x:positionComponent.x,y:positionComponent.y},GameConfig.PLAYER);
            }
        }
    },

});
AbilitySystem.typeID = GameConfig.SYSTEM_ID.ABILITY;
SystemManager.getInstance().registerClass(AbilitySystem);