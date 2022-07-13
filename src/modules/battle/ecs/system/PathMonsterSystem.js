let PathMonsterSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.PATH_MONSTER,
    name: "PathMonsterSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    run: function (tick) {
        let entityList = EntityManager.getInstance().getEntitiesHasComponents(PathComponent);
        for (let entity of entityList) {
            let pathComponent = entity.getComponent(PathComponent);
            let positionComponent = entity.getComponent(PositionComponent);
            let velocityComponent = entity.getComponent(VelocityComponent);
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
            }
        }
    },
});
PathMonsterSystem.typeID = GameConfig.SYSTEM_ID.PATH_MONSTER;
SystemManager.getInstance().registerClass(PathMonsterSystem);