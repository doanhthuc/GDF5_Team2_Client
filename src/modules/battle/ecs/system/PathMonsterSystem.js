let PathMonsterSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.PATH_MONSTER,
    name: "PathMonsterSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    _run: function (dt) {

    },

    checkEntityCondition: function (entity, componentOrCls) {
        return componentOrCls.typeID === PathComponent.typeID;
    },

    updateData: function () {
        for (let entityID in this.getEntityStore()) {
            let entity = this.getEntityStore()[entityID];
            if (!entity._hasComponent(PositionComponent)) continue;
            if (!entity._hasComponent(VelocityComponent)) continue;


            let pathComponent = entity.getComponent(PathComponent);
            let positionComponent = entity.getComponent(PositionComponent);
            let velocityComponent = entity.getComponent(VelocityComponent);

            let path = pathComponent.path, currentPathIdx = pathComponent.currentPathIdx;

            let nextPosIdx = this._findNextPath(path, positionComponent, currentPathIdx);
            if (nextPosIdx > 1) pathComponent.currentPathIdx = nextPosIdx - 1;
            // cc.log("currentPathIdx = " + currentPathIdx);
            // cc.log("nextPoxIdx = " + nextPosIdx);
            // cc.log("path.length = " + path.length);
            let nextPos = path[nextPosIdx];
            let speed = VelocityComponent.calculateSpeed(velocityComponent.speedX, velocityComponent.speedY);
            let newVelocity = Utils.calculateVelocityVector(positionComponent, nextPos, speed)
            velocityComponent.speedX = newVelocity.speedX;
            velocityComponent.speedY = newVelocity.speedY;

            //Update Direction for Monster
            if (entity.hasAnyComponent(SpriteSheetAnimationComponent) && entity.hasAnyComponent(MonsterInfoComponent)) {
                let spriteComponent = entity.getComponent(SpriteSheetAnimationComponent);
                let state = this._getMovingDirection(entity);
                if (state !== spriteComponent.getCurrentState()) {
                    spriteComponent.changeCurrentState(state);
                }
            }
        }
    },

    /**
     *
     * @returns {string}
     * @private
     */
    _getMovingDirection: function (entity) {
        let pathComponent = entity.getComponent(PathComponent);
        let positionComponent = entity.getComponent(PositionComponent);
        let path = pathComponent.path, currentPathIdx = pathComponent.currentPathIdx;
        let movingDeg = Utils.calcSlopeOfLine({
            x: positionComponent.x,
            y: positionComponent.y
        }, {
            x: path[currentPathIdx + 1].x,
            y: path[currentPathIdx + 1].y
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
        return directionDegree.get(minDeg);
    },
    _findNextPath: function (path, position, currentPathIdx) {
        let minDisIdx = null;
        let minDistance = 99999999;
        for (let i = currentPathIdx; i < path.length - 1; i++) {
            let distance = Utils.euclidDistance(path[i], position);
            if (distance < minDistance) {
                minDistance = distance;
                minDisIdx = i;
            }
        }
        return minDisIdx + 1;
    },
});


PathMonsterSystem.typeID = GameConfig.SYSTEM_ID.PATH_MONSTER;
SystemManager.getInstance().registerClass(PathMonsterSystem);