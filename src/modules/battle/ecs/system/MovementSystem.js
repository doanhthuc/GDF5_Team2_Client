let MovementSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.MOVEMENT,
    name: "MovementSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    run: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(VelocityComponent, PositionComponent);
        for (let entity of entityList) {
            let positionComponent = entity.getComponent(PositionComponent);
            let velocityComponent = entity.getComponent(VelocityComponent);

            if (velocityComponent.dynamicPosition && velocityComponent.dynamicPosition.getActive()) {
                let newVelocity = Utils.calculateVelocityVector(positionComponent, velocityComponent.dynamicPosition,
                    velocityComponent.originSpeed);
                velocityComponent.speedX = newVelocity.speedX;
                velocityComponent.speedY = newVelocity.speedY;
            }

            if (velocityComponent.getActive()) {
                positionComponent.x += velocityComponent.speedX * tick;
                positionComponent.y += velocityComponent.speedY * tick;
            }
        }
    },
});
MovementSystem.typeID = GameConfig.SYSTEM_ID.MOVEMENT;
SystemManager.getInstance().registerClass(MovementSystem);