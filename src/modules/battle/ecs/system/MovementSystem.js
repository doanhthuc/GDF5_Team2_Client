let MovementSystem = System.extend({
    id: GameConfig.SYSTEM_ID.MOVEMENT,
    name: "MovementSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesByComponents(GameConfig.COMPONENT_ID.VELOCITY, GameConfig.COMPONENT_ID.POSITION);
        for (let entity of entityList) {
            let positionComponent = entity.getComponent(GameConfig.COMPONENT_ID.POSITION);
            let velocityComponent = entity.getComponent(GameConfig.COMPONENT_ID.VELOCITY);

            // side-effect
            this._updateVelocityVector(entity, velocityComponent, positionComponent);
            // end side-effect

            positionComponent.x += velocityComponent.speedX * tick;
            positionComponent.y += velocityComponent.speedY * tick;
        }
    },

    _updateVelocityVector: function (entity, velocityComponent, positionComponent) {
        // dynamic target
        if (velocityComponent.dynamicPosition && velocityComponent.dynamicPosition.getActive()) {
            if (Math.abs(velocityComponent.dynamicPosition.x - positionComponent.x) <= 3
                && Math.abs(velocityComponent.dynamicPosition.y - positionComponent.y) <= 3) {
                // entity.removeComponent(velocityComponent);
                let collisionComponent = entity.getComponent(GameConfig.COMPONENT_ID.COLLISION);
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
    }
});