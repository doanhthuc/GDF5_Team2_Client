let AbilitySystem = System.extend({
    id: GameConfig.SYSTEM_ID.ABILITY,
    name: "AbilitySystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
       this._handleUnderGroundComponent();
    },

    _handleUnderGroundComponent: function (tick) {
        let entityList = EntityManager.getInstance().getEntitiesHasComponents(UnderGroundComponent);
        for (let entity of entityList) {
            let lifeComponent = entity.getComponent(LifeComponent);
            let underGroundComponent = entity.getComponent(UnderGroundComponent);
            let pathComponent = entity.getComponent(PathComponent);
            if (underGroundComponent.isRunning == false) {
                if (((lifeComponent.hp / lifeComponent.maxHP) <= 0.7 - 0.3 * underGroundComponent.trigger)) {
                    underGroundComponent.trigger += 1;
                    underGroundComponent.disablePathIdx = pathComponent.currentPathIdx + 2;
                    underGroundComponent.isRunning = true;
                }
            } else {
                if (underGroundComponent.disablePathIdx == pathComponent.currentPathIdx) {
                    underGroundComponent.isRunning = false;
                }
            }
        }
    },


    _handleSlowEffect: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(SlowEffect);
        for (let entity of entityList) {
            let velocityComponent = entity.getComponent(VelocityComponent);
            let slowComponent = entity.getComponent(SlowEffect);

            slowComponent.countdown = slowComponent.countdown - tick;
            if (slowComponent.countdown <= 0) {
                // EventDispatcher.getInstance()
                //     .dispatchEvent(EventType.RESET_INIT_VELOCITY, {velocityComponent: velocityComponent})
                this._updateOriginVelocity(velocityComponent);
                entity.removeComponent(slowComponent);
            } else {
                velocityComponent.speedX = slowComponent.percent * velocityComponent.originSpeedX;
                velocityComponent.speedY = slowComponent.percent * velocityComponent.originSpeedY;
            }
        }
    },

    _updateOriginVelocity: function (velocityComponent) {
        velocityComponent.speedX = velocityComponent.originSpeedX;
        velocityComponent.speedY = velocityComponent.originSpeedY;
    }
});