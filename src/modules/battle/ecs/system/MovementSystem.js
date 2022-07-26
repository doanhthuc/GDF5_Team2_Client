let MovementSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.MOVEMENT,
    name: "MovementSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    _run: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(VelocityComponent, PositionComponent);
        for (let entity of entityList) {
            let positionComponent = entity.getComponent(PositionComponent);
            let velocityComponent = entity.getComponent(VelocityComponent);
            let appearanceComponent = entity.getComponent(AppearanceComponent);

            if (velocityComponent.dynamicPosition && velocityComponent.dynamicPosition.getActive()) {
                let newVelocity = Utils.calculateVelocityVector(positionComponent, velocityComponent.dynamicPosition,
                    velocityComponent.originSpeed);
                velocityComponent.speedX = newVelocity.speedX;
                velocityComponent.speedY = newVelocity.speedY;
            }

            if (velocityComponent.getActive()) {
                let moveDistanceX = velocityComponent.speedX * tick;
                let moveDistanceY = velocityComponent.speedY * tick;
                positionComponent.x += moveDistanceX;
                positionComponent.y += moveDistanceY;
                let moveDistance=Math.sqrt(Math.pow(moveDistanceX, 2) + Math.pow(moveDistanceY, 2))
                positionComponent.moveDistance += moveDistance;
                // cc.log(positionComponent.moveDistance+" "+moveDistance);
            }

            if (velocityComponent && appearanceComponent) {
                let spriteList = appearanceComponent.sprite.getChildren();
                let speed = VelocityComponent.calculateSpeed(velocityComponent.speedX, velocityComponent.speedY);
                for (let sprite of spriteList) {
                    // if (sprite.myRunningAction) {
                    //     sprite.myRunningAction.setSpeed(0.5);
                    // }
                    if (sprite.getActionByTag(0)) {
                        sprite.getActionByTag(0).setSpeed(speed / 50);
                    }
                    // if (!sprite.tagActions) continue;
                    // for (let tag of sprite.tagActions) {
                    //     let action = sprite.getActionByTag(1);
                    //     cc.log("tag = " + tag + ", action = " + action + ", number running = " + sprite.getNumberOfRunningActions());
                    //     if (action) {
                    //         action.setSpeed(0.5);
                    //         cc.warn("set");
                    //     }
                    // }
                }
            }
        }
    },
});
MovementSystem.typeID = GameConfig.SYSTEM_ID.MOVEMENT;
SystemManager.getInstance().registerClass(MovementSystem);