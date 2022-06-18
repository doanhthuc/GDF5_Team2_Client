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
                let velocity = Math.sqrt(Math.pow(velocityComponent.speedX, 2) + Math.pow(velocityComponent.speedY, 2));

                let newSpeed = Utils.calculateVelocityVector(currentPos, nextPos, velocity);
                velocityComponent.speedX = newSpeed.speedX;
                velocityComponent.speedY = newSpeed.speedY;

                let Xb = nextPos.x, Yb = nextPos.y;
                let Xa = positionComponent.x, Ya = positionComponent.y;
                let signX = Math.sign(velocityComponent.speedX), signY = Math.sign(velocityComponent.speedY);

                if (signX * (Xb - Xa) <= 0
                    && signY * (Yb - Ya) <= 0
                    && !(signX === 0 && signY === 0)) {
                    pathComponent.currentPathIdx++;
                }
            } else {
                entity.removeComponent(velocityComponent);
                entity.setActive(false);
            }
        }
    }
});