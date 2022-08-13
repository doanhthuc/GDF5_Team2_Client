let MovementSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.MOVEMENT,
    name: "MovementSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    _run: function () {
        const dt = tickManager.getDeltaFromLatestTickToNow() / 1000;
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(VelocityComponent, PositionComponent);

        let battleMap = BattleManager.getInstance().getBattleData().getSimpleMap();

        for (let entity of entityList) {
            let positionComponent = entity.getComponent(PositionComponent);
            let velocityComponent = entity.getComponent(VelocityComponent);
            let appearanceComponent = entity.getComponent(AppearanceComponent);
            let fireballEffect = entity.getComponent(FireBallEffect);

            if (velocityComponent.getActive()) {
                let moveDistanceX = velocityComponent.speedX * dt;
                let moveDistanceY = velocityComponent.speedY * dt;

                let tmpPos = {};
                tmpPos.x = positionComponent.x + moveDistanceX;
                tmpPos.y = positionComponent.y + moveDistanceY;

                // only update position of monster when the future position is valid
                if (ValidatorECS.isMonster(entity) && entity.getComponent(FireBallEffect)) {
                    let currentTilePos = Utils.pixel2Tile(positionComponent.x, positionComponent.y, entity.mode);
                    let futureTilePos = Utils.pixel2Tile(tmpPos.x, tmpPos.y, entity.mode);
                    let map = battleMap[entity.mode];
                    if (Utils.validateTilePos(currentTilePos, entity.mode)
                        && (
                            !Utils.validateTilePos(futureTilePos, entity.mode)
                            || (map[GameConfig.MAP_HEIGH - 1 - futureTilePos.y][futureTilePos.x] === GameConfig.MAP.TOWER)
                            || (map[GameConfig.MAP_HEIGH - 1 - futureTilePos.y][futureTilePos.x] === GameConfig.MAP.TREE)
                        )
                    ) {
                        // position is invalid
                    } else {
                        positionComponent.__x = tmpPos.x;
                        positionComponent.__y = tmpPos.y;
                        let moveDistance = Math.sqrt(Math.pow(moveDistanceX, 2) + Math.pow(moveDistanceY, 2))
                        positionComponent.moveDistance += moveDistance;
                    }
                } else {
                    positionComponent.__x = tmpPos.x;
                    positionComponent.__y = tmpPos.y;
                    let moveDistance = Math.sqrt(Math.pow(moveDistanceX, 2) + Math.pow(moveDistanceY, 2))
                    positionComponent.moveDistance += moveDistance;
                }
            }
        }
    },

    updateData: function () {
        const tick = tickManager.getTickRate() / 1000;
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(VelocityComponent, PositionComponent);
        let battleMap = BattleManager.getInstance().getBattleData().getSimpleMap();

        for (let entity of entityList) {
            let positionComponent = entity.getComponent(PositionComponent);
            let velocityComponent = entity.getComponent(VelocityComponent);
            let appearanceComponent = entity.getComponent(AppearanceComponent);
            let fireballEffect = entity.getComponent(FireBallEffect);

            if (velocityComponent.getDynamicPosition() && velocityComponent.getDynamicPosition().getActive()) {
                let newVelocity = Utils.calculateVelocityVector(positionComponent, velocityComponent.getDynamicPosition(),
                    velocityComponent.originSpeed);
                velocityComponent.speedX = newVelocity.speedX;
                velocityComponent.speedY = newVelocity.speedY;
            }

            // start handle fireball effect
            if (fireballEffect && velocityComponent) {
                if (fireballEffect.accTime < fireballEffect.maxDuration) {
                    fireballEffect.accTime += tick;
                    let newSpeed = (-1) * fireballEffect.a * fireballEffect.accTime + fireballEffect.V0;
                    let newVelocity = Utils.calculateVelocityVector(fireballEffect.startPos, fireballEffect.endPos, newSpeed);
                    velocityComponent.speedX = newVelocity.speedX;
                    velocityComponent.speedY = newVelocity.speedY;

                } else {
                    entity.removeComponent(FireBallEffect);
                    if (ValidatorECS.isMonster(entity)) {
                        let monsterPos = entity.getComponent(PositionComponent);
                        if (monsterPos) {
                            let tilePos = Utils.pixel2Tile(monsterPos.x, monsterPos.y, entity.mode);
                            if (!Utils.validateTilePos(tilePos)) continue;
                            let map = battleMap[entity.mode];
                            if (map[GameConfig.MAP_HEIGH - 1 - tilePos.y][tilePos.x] === GameConfig.MAP.HOLE && entity.typeID !== GameConfig.ENTITY_ID.BAT) {
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
            // end handle fireball effect

            if (velocityComponent.getActive()) {
                let moveDistanceX = velocityComponent.speedX * tick;
                let moveDistanceY = velocityComponent.speedY * tick;

                let tmpPos = {};
                tmpPos.x = positionComponent.x + moveDistanceX;
                tmpPos.y = positionComponent.y + moveDistanceY;

                // only update position of monster when the future position is valid
                if (ValidatorECS.isMonster(entity) && entity.getComponent(FireBallEffect)) {
                    let currentTilePos = Utils.pixel2Tile(positionComponent.x, positionComponent.y, entity.mode);
                    let futureTilePos = Utils.pixel2Tile(tmpPos.x, tmpPos.y, entity.mode);
                    let map = battleMap[entity.mode];
                    if (Utils.validateTilePos(currentTilePos, entity.mode)
                        && (
                            !Utils.validateTilePos(futureTilePos, entity.mode)
                            || (map[GameConfig.MAP_HEIGH - 1 - futureTilePos.y][futureTilePos.x] === GameConfig.MAP.TOWER)
                            || (map[GameConfig.MAP_HEIGH - 1 - futureTilePos.y][futureTilePos.x] === GameConfig.MAP.TREE)
                        )
                    ) {
                        // position is invalid
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
    }
});
MovementSystem.typeID = GameConfig.SYSTEM_ID.MOVEMENT;
SystemManager.getInstance().registerClass(MovementSystem);