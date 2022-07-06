let MovementSystem = System.extend({
    id: GameConfig.SYSTEM_ID.MOVEMENT,
    name: "MovementSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(VelocityComponent, PositionComponent);
        for (let entity of entityList) {
            let positionComponent = entity.getComponent(PositionComponent);
            let velocityComponent = entity.getComponent(VelocityComponent);

            // side-effect
            if (Utils.isMonster(entity)) {
                // check if monster goes to the player house, then minus the player energy house
                let posTile = Utils.pixel2Tile(positionComponent.x, positionComponent.y, entity.mode);
                if (posTile.x === GameConfig.HOUSE_POSITION.x && posTile.y === GameConfig.HOUSE_POSITION.y) {
                    let monsterInfo = entity.getComponent(MonsterInfoComponent);
                    BattleUILayer.minusHouseEnergy(monsterInfo.damageEnergy, entity.mode);
                    EntityManager.destroy(entity);
                }
            }
            this._dynamicMovement(entity, velocityComponent, positionComponent);
            // end side-effect

            if (velocityComponent.getActive()) {
                positionComponent.x += velocityComponent.speedX * tick;
                positionComponent.y += velocityComponent.speedY * tick;
            }
        }
    },

    _dynamicMovement: function (entity, velocityComponent, positionComponent) {
        // dynamic target
        if (velocityComponent.dynamicPosition && velocityComponent.dynamicPosition.getActive()) {
            if (Math.abs(velocityComponent.dynamicPosition.x - positionComponent.x) <= 3
                && Math.abs(velocityComponent.dynamicPosition.y - positionComponent.y) <= 3) {
                // entity.removeComponent(velocityComponent);
                let collisionComponent = entity.getComponent(CollisionComponent);
                if (collisionComponent) {
                    collisionComponent.width = 1;
                    collisionComponent.height = 1;
                }
            } else {
                let newVelocity = Utils.calculateVelocityVector(positionComponent, velocityComponent.dynamicPosition,
                    velocityComponent.originSpeed);
                velocityComponent.speedX = newVelocity.speedX;
                velocityComponent.speedY = newVelocity.speedY;
            }
        }

        // FIXME: when dynamic position is not active ==> remove velocity and destroy entity???
        // if (velocityComponent.dynamicPosition && velocityComponent.dynamicPosition.getActive() === false) {
        //     velocityComponent.dynamicPosition = null;
        //     entity.setActive(false);
        //     // set sprite false
        // }
    }
});