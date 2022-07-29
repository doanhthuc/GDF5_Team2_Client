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
            let accelerationComponent = entity.getComponent(AccelerationComponent);

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
                let moveDistance = Math.sqrt(Math.pow(moveDistanceX, 2) + Math.pow(moveDistanceY, 2))
                positionComponent.moveDistance += moveDistance;
            }

            if (velocityComponent && appearanceComponent) {
                let spriteList = appearanceComponent.sprite.getChildren();
                let speed = VelocityComponent.calculateSpeed(velocityComponent.speedX, velocityComponent.speedY);
                for (let sprite of spriteList) {
                    if (sprite.getActionByTag(0)) {
                        sprite.getActionByTag(0).setSpeed(speed / 50);
                    }
                }
            }

            if (accelerationComponent && velocityComponent) {
                if (accelerationComponent.accTime < accelerationComponent.maxDuration) {
                    accelerationComponent.accTime += tick;
                    let newSpeed = (-1) * accelerationComponent.a * accelerationComponent.accTime + accelerationComponent.V0;
                    let newVelocity = Utils.calculateVelocityVector(accelerationComponent.startPos, accelerationComponent.endPos, newSpeed);
                    velocityComponent.speedX = newVelocity.speedX;
                    velocityComponent.speedY = newVelocity.speedY;
                    cc.log("new speed = " + VelocityComponent.calculateSpeed(velocityComponent.speedX, velocityComponent.speedY));

                } else {
                    entity.removeComponent(AccelerationComponent);
                    entity.removeComponent(VelocityComponent);
                    // if (ValidatorECS.isMonster(entity)) {
                    //     let monsterPos = entity.getComponent(PositionComponent);
                    //     if (monsterPos) {
                    //         let tilePos = Utils.pixel2Tile(monsterPos.x, monsterPos.y, entity.mode);
                    //         if (!Utils.validateTilePos(tilePos)) continue;
                    //         let shortestPathForEachTile = BattleManager.getInstance().getBattleData().getShortestPathForEachTile(entity.mode);
                    //         let pathTile = shortestPathForEachTile[GameConfig.MAP_HEIGH - 1 - tilePos.y][tilePos.x];
                    //         let newPath = ComponentFactory.create(PathComponent, pathTile, entity.mode);
                    //         entity.addComponent(newPath);
                    //     }
                    // }
                    cc.warn("remove acc, vel")
                }
            }
        }
    },
});
MovementSystem.typeID = GameConfig.SYSTEM_ID.MOVEMENT;
SystemManager.getInstance().registerClass(MovementSystem);