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
            this._updateVelocityVector(velocityComponent, positionComponent);
            // end side-effect

            positionComponent.x += velocityComponent.speedX * tick;
            positionComponent.y += velocityComponent.speedY * tick;
        }
    },

    _updateVelocityVector: function (velocityComponent, positionComponent) {
        // dynamic target
        if (velocityComponent.dynamicPosition) {
            let newSpeed = Utils.calculateVelocityVector(positionComponent, velocityComponent.dynamicPosition,
                velocityComponent.originVelocity);
            velocityComponent.speedX = newSpeed.speedX;
            velocityComponent.speedY = newSpeed.speedY;
        }
    }
});