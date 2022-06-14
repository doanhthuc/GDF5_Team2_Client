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
            this._updateMonsterDirection(entity, positionComponent, velocityComponent);

            positionComponent.x += velocityComponent.speedX * tick;
            positionComponent.y += velocityComponent.speedY * tick;
        }
    },

    _updateMonsterDirection: function (entity, positionComponent, velocityComponent) {
        if (entity.hasAllComponent(GameConfig.COMPONENT_ID.PATH)) {
            let pathComponent = entity.getComponent(GameConfig.COMPONENT_ID.PATH);
            let path = pathComponent.path, currentPathIdx = pathComponent.currentPathIdx;

            if (currentPathIdx < path.length-1) {
                let currentPos = Utils.tile2Pixel(path[currentPathIdx].x, path[currentPathIdx].y);
                let nextPos = Utils.tile2Pixel(path[currentPathIdx + 1].x, path[currentPathIdx + 1].y);

                let direction = Utils.getDirectionOf2Tile(currentPos, nextPos);
                let velocity = Math.abs(velocityComponent.speedX) + Math.abs(velocityComponent.speedY);
                switch (direction) {
                    case GameConfig.DIRECTION.LEFT:
                        velocityComponent.speedY = 0;
                        velocityComponent.speedX = -1*velocity;
                        if (positionComponent.x < nextPos.x) pathComponent.currentPathIdx++;
                        break;
                    case GameConfig.DIRECTION.RIGHT:
                        velocityComponent.speedY = 0;
                        velocityComponent.speedX = velocity;
                        if (positionComponent.x > nextPos.x) pathComponent.currentPathIdx++;
                        break;
                    case GameConfig.DIRECTION.TOP:
                        velocityComponent.speedY = velocity;
                        velocityComponent.speedX = 0;
                        if (positionComponent.y > nextPos.y) pathComponent.currentPathIdx++;
                        break;
                    case GameConfig.DIRECTION.BOTTOM:
                        velocityComponent.speedY = -1*velocity;
                        velocityComponent.speedX = 0;
                        if (positionComponent.y < nextPos.y) pathComponent.currentPathIdx++;
                        break;
                    case GameConfig.DIRECTION.RIGHT_BOTTOM:
                        velocityComponent.speedY = -1*velocity;
                        velocityComponent.speedX = velocity;
                        if (positionComponent.y < nextPos.y && positionComponent.x > nextPos.x) pathComponent.currentPathIdx++;
                        break;
                    case GameConfig.DIRECTION.RIGHT_TOP:
                        velocityComponent.speedY = velocity;
                        velocityComponent.speedX = velocity;
                        if (positionComponent.y < nextPos.y && positionComponent.x > nextPos.x) pathComponent.currentPathIdx++;
                        break;
                }
            } else {
                entity.removeComponent(velocityComponent.typeID);
                entity.setActive(false);
            }
        }
    },

});