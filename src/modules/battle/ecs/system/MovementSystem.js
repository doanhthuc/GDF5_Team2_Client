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

            if (accelerationComponent && velocityComponent) {
                if (accelerationComponent.accTime < accelerationComponent.maxDuration) {
                    accelerationComponent.accTime += tick;
                    let newSpeed = (-1) * accelerationComponent.a * accelerationComponent.accTime + accelerationComponent.V0;
                    let newVelocity = Utils.calculateVelocityVector(accelerationComponent.startPos, accelerationComponent.endPos, newSpeed);
                    velocityComponent.speedX = newVelocity.speedX;
                    velocityComponent.speedY = newVelocity.speedY;

                } else {
                    entity.removeComponent(AccelerationComponent);
                    if (ValidatorECS.isMonster(entity)) {
                        let monsterPos = entity.getComponent(PositionComponent);
                        if (monsterPos) {
                            let tilePos = Utils.pixel2Tile(monsterPos.x, monsterPos.y, entity.mode);
                            if (!Utils.validateTilePos(tilePos)) continue;
                            let map = BattleManager.getInstance().getBattleData().getMap(entity.mode);
                            if (map[GameConfig.MAP_HEIGH - 1 - tilePos.y][tilePos.x] === GameConfig.MAP.HOLE) {
                                let lifeComponent = entity.getComponent(LifeComponent);
                                lifeComponent.hp = 0;
                            } else {
                                let shortestPathForEachTile = BattleManager.getInstance().getBattleData().getShortestPathForEachTile(entity.mode);
                                let pathTile = shortestPathForEachTile[GameConfig.MAP_HEIGH - 1 - tilePos.y][tilePos.x];
                                let newPath = ComponentFactory.create(PathComponent, pathTile, entity.mode);
                                entity.addComponent(newPath);
                            }
                        }
                        let velocityComp = entity.getComponent(VelocityComponent);
                        velocityComp.speedX = velocityComp.originSpeedX;
                        velocityComp.speedY = velocityComp.originSpeedY;
                    }
                }
            }

            if (velocityComponent.getActive()) {
                let moveDistanceX = velocityComponent.speedX * tick;
                let moveDistanceY = velocityComponent.speedY * tick;
                let tmpPos = {};
                tmpPos.x = positionComponent.x + moveDistanceX;
                tmpPos.y = positionComponent.y + moveDistanceY;

                if (ValidatorECS.isMonster(entity)) {
                    let tilePos = Utils.pixel2Tile(tmpPos.x, tmpPos.y, entity.mode);
                    let map = BattleManager.getInstance().getBattleData().getMap(entity.mode);
                    if ((!Utils.validateTilePos(tilePos, entity.mode))
                        || (map[GameConfig.MAP_HEIGH - 1 - tilePos.y][tilePos.x]  === GameConfig.MAP.TOWER)
                        || (map[GameConfig.MAP_HEIGH - 1 - tilePos.y][tilePos.x]  === GameConfig.MAP.TREE)) {

                    } else {
                        positionComponent.x = tmpPos.x;
                        positionComponent.y = tmpPos.y;
                        let moveDistance = Math.sqrt(Math.pow(moveDistanceX, 2) + Math.pow(moveDistanceY, 2))
                        positionComponent.moveDistance += moveDistance;
                    }
                } else {
                    positionComponent.x = tmpPos.x;
                    positionComponent.y = tmpPos.y;
                    let moveDistance = Math.sqrt(Math.pow(moveDistanceX, 2) + Math.pow(moveDistanceY, 2))
                    positionComponent.moveDistance += moveDistance;
                }
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
        }
    },
});
MovementSystem.typeID = GameConfig.SYSTEM_ID.MOVEMENT;
SystemManager.getInstance().registerClass(MovementSystem);