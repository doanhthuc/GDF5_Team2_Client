let PathMonsterSystem = System.extend({
    id: GameConfig.SYSTEM_ID.PATH_MONSTER,
    name: "PathMonsterSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        let entityList = EntityManager.getInstance().getEntitiesByComponents(GameConfig.COMPONENT_ID.PATH);
        for (let entity of entityList) {
            let pathComponent = entity.getComponent(GameConfig.COMPONENT_ID.PATH);
            let positionComponent = entity.getComponent(GameConfig.COMPONENT_ID.POSITION);
            let velocityComponent = entity.getComponent(GameConfig.COMPONENT_ID.VELOCITY);
            let path = pathComponent.path, currentPathIdx = pathComponent.currentPathIdx;

            if (currentPathIdx < path.length - 1) {
                let currentPos = path[currentPathIdx];
                let nextPos = path[currentPathIdx + 1];
                let speed = VelocityComponent.calculateSpeed(velocityComponent.speedX, velocityComponent.speedY);

                let newVelocity = Utils.calculateVelocityVector(currentPos, nextPos, speed);
                velocityComponent.speedX = newVelocity.speedX;
                velocityComponent.speedY = newVelocity.speedY;

                let Xb = nextPos.x, Yb = nextPos.y;
                let Xa = positionComponent.x, Ya = positionComponent.y;
                let signX = Math.sign(velocityComponent.speedX), signY = Math.sign(velocityComponent.speedY);

                if (signX * (Xb - Xa) <= 0
                    && signY * (Yb - Ya) <= 0
                    && !(signX === 0 && signY === 0)) {
                    pathComponent.currentPathIdx++;

                    if (path[currentPathIdx+2]) {
                        AnimationMap.changeMonsterDirectionAnimation(entity, nextPos, path[currentPathIdx+2]);
                    }
                }
            } else {
                EventDispatcher.getInstance().dispatchEvent(EventType.FINISH_PATH, {entity: entity});
            }
        }
    },


});