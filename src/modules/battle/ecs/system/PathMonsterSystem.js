let PathMonsterSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.PATH_MONSTER,
    name: "PathMonsterSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    _run: function (tick) {
        let entityList = EntityManager.getInstance().getEntitiesHasComponents(PathComponent);
        for (let entity of entityList) {
            let pathComponent = entity.getComponent(PathComponent);
            let positionComponent = entity.getComponent(PositionComponent);
            let velocityComponent = entity.getComponent(VelocityComponent);
            let path = pathComponent.path, currentPathIdx = pathComponent.currentPathIdx;

            // if (currentPathIdx < path.length - 1) {
            //     let currentPos = path[currentPathIdx];
            //     let nextPos = path[currentPathIdx + 1];
            //     let speed = VelocityComponent.calculateSpeed(velocityComponent.speedX, velocityComponent.speedY);
            //
            //     let newVelocity = Utils.calculateVelocityVector(currentPos, nextPos, speed);
            //     velocityComponent.speedX = newVelocity.speedX;
            //     velocityComponent.speedY = newVelocity.speedY;
            //
            //     let Xb = nextPos.x, Yb = nextPos.y;
            //     let Xa = positionComponent.x, Ya = positionComponent.y;
            //     let signX = Math.sign(velocityComponent.speedX), signY = Math.sign(velocityComponent.speedY);
            //
            //     if (signX * (Xb - Xa) <= 0
            //         && signY * (Yb - Ya) <= 0
            //         && !(signX === 0 && signY === 0)) {
            //         pathComponent.currentPathIdx++;
            //         if (entity._hasComponent(SpriteSheetAnimationComponent)) {
            //             let spriteComponent = entity.getComponent(SpriteSheetAnimationComponent);
            //             let state = this._getMovingDirection(entity);
            //             if (state != spriteComponent.getCurrentState()) {
            //                 spriteComponent.changeState(state);
            //             }
            //         }
            //     }
            if (currentPathIdx <= path.length - 1) {
                let currentPos = {x: positionComponent.x, y: positionComponent.y};
                let nextPos = path[currentPathIdx];
                let speed = VelocityComponent.calculateSpeed(velocityComponent.speedX, velocityComponent.speedY);
                let newVelocity = Utils.calculateVelocityVector(currentPos, nextPos, speed);
                velocityComponent.speedX = newVelocity.speedX;
                velocityComponent.speedY = newVelocity.speedY;
                if (entity._hasComponent(SpriteSheetAnimationComponent)) {
                    let spriteComponent = entity.getComponent(SpriteSheetAnimationComponent);
                    let state = this._getMovingDirection(entity);
                    if (state != spriteComponent.getCurrentState()) {
                        spriteComponent.changeCurrentState(state);
                    }
                }
                // let Xa = positionComponent.x, Ya = positionComponent.y;
                // let Xb = nextPos.x, Yb = nextPos.y;
                // let signX = Math.sign(velocityComponent.speedX), signY = Math.sign(velocityComponent.speedY);
                // cc.log("PathMonsterSystem " + signX + " " + (Xb - Xa) + " " + signY + " " + (Yb - Ya));
                // cc.log("PathMonsterSystem NextPos=" + Xb + " " + Yb + " CurrentPos" + Xa + " " + Ya);
                // if (signX * (Xb - Xa) <= 0
                //     && signY * (Yb - Ya) <= 0
                //     && !(signX === 0 && signY === 0)) {
                //     cc.log("nextPath");
                //     pathComponent.currentPathIdx++;
                // }
                if (this._checkNextPath(currentPos, nextPos) && pathComponent.currentPathIdx != path.length - 1) {
                    pathComponent.currentPathIdx++;
                }

            }
        }
    },
    _getMovingDirection: function (entity) {
        let pathComponent = entity.getComponent(PathComponent);
        let positionComponent = entity.getComponent(PositionComponent);
        let path = pathComponent.path, currentPathIdx = pathComponent.currentPathIdx;
        let movingDeg = Utils.calcSlopeOfLine({
            x: positionComponent.x,
            y: positionComponent.y
        }, {
            x: path[currentPathIdx].x,
            y: path[currentPathIdx].y
        });
        //cc.log(positionComponent.x + " " + positionComponent.y + " " + path[currentPathIdx].x + " " + path[currentPathIdx].y + " "+ movingDeg);
        let directionDegree = new Map([[0, "MOVE_RIGHT"], [45, "MOVE_RIGHT_UP"],
            [90, "MOVE_UP"], [135, "MOVE_LEFT_UP"],
            [180, "MOVE_LEFT"], [225, "MOVE_LEFT_DOWN"],
            [270, "MOVE_DOWN"], [315, "MOVE_RIGHT_DOWN"], [360, "MOVE_RIGHT"]]);
        let min = 9999;
        let minDeg = 0;
        for (let [key, value] of directionDegree.entries()) {
            if ((Math.abs(key - movingDeg)) < min) {
                min = Math.abs(key - movingDeg);
                minDeg = key;
            }
        }
        //cc.log(JSON.stringify(Utils.pixel2Tile(positionComponent.x, positionComponent.y, entity.mode)));
        //cc.log(movingDeg + " " + directionDegree.get(minDeg));
        return directionDegree.get(minDeg);
    },
    _checkNextPath: function (currentPos, nextPos) {
        let distance = Math.sqrt(Math.pow(currentPos.x - nextPos.x, 2) + Math.pow(currentPos.y - nextPos.y, 2));
        return (distance < 10)
    }
});


PathMonsterSystem.typeID = GameConfig.SYSTEM_ID.PATH_MONSTER;
SystemManager.getInstance().registerClass(PathMonsterSystem);