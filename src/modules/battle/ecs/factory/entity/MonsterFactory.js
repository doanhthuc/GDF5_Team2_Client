// Create Monster
EntityFactory.createSwordsmanMonster = function (pixelPos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.SWORD_MAN;
    let entity = this._createEntity(typeID, mode);

    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, "normal", "land", 30, 1, 1, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, 0.8 * GameConfig.TILE_WIDTH, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, NodeFactory.createSwordmanNodeAnimation(), mode, pixelPos);
    let collisionComponent = ComponentFactory.create(CollisionComponent, 20, 30);
    let lifeComponent = ComponentFactory.create(LifeComponent, 300);
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, MonsterAnimationConfig.sword_man);

    // let frozenEffect = ComponentFactory.create(FrozenEffect, 1.5);
    // let slowEffect = ComponentFactory.create(SlowEffect, 3, 0.3);

    let tilePos = Utils.pixel2Tile(pixelPos.x, pixelPos.y, mode);
    let path = BattleManager.getInstance().getBattleData().getShortestPathForEachTile(mode)[GameConfig.MAP_HEIGH - 1 - tilePos.y][tilePos.x];
    let pathComponent = ComponentFactory.create(PathComponent, path, mode);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(velocityComponent)
        .addComponent(appearanceComponent)
        .addComponent(pathComponent)
        .addComponent(collisionComponent)
        .addComponent(lifeComponent)
        .addComponent(spriteComponent)
    // .addComponent(slowEffect)
    // .addComponent(frozenEffect)

    //AnimationMap.changeMonsterDirectionAnimation(entity, path[0], path[1]);
    return entity;
};

EntityFactory.createAssassinMonster = function (pixelPos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.ASSASSIN;
    let entity = this._createEntity(typeID, mode);

    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, "normal", "land", 15, 1, 1, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, 1.4 * GameConfig.TILE_WIDTH, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, NodeFactory.createAssassinNodeAnimation(), mode, pixelPos);
    let collisionComponent = ComponentFactory.create(CollisionComponent, 20, 30);
    let lifeComponent = ComponentFactory.create(LifeComponent, 120);
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, MonsterAnimationConfig.assasin);

    let tilePos = Utils.pixel2Tile(pixelPos.x, pixelPos.y, mode);
    let path = BattleManager.getInstance().getBattleData().getShortestPathForEachTile(mode)[GameConfig.MAP_HEIGH - 1 - tilePos.y][tilePos.x];
    let pathComponent = ComponentFactory.create(PathComponent, path, mode);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(velocityComponent)
        .addComponent(appearanceComponent)
        .addComponent(pathComponent)
        .addComponent(collisionComponent)
        .addComponent(lifeComponent)
        .addComponent(spriteComponent)
    // .addComponent(slowEffect)
    // .addComponent(frozenEffect)

    //AnimationMap.changeMonsterDirectionAnimation(entity, path[0], path[1]);
    return entity;
};

EntityFactory.createBatMonster = function (pixelPos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.BAT;
    let entity = this._createEntity(typeID, mode);

    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, "normal", "air", 25, 1, 1, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, 0.7 * GameConfig.TILE_WIDTH, 0.7 * GameConfig.TILE_WIDTH);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, NodeFactory.createBatNodeAnimation(), mode);
    let collisionComponent = ComponentFactory.create(CollisionComponent, 20, 30);
    let lifeComponent = ComponentFactory.create(LifeComponent, 140);
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, MonsterAnimationConfig.bat);
    let path = []

    // FIXME: PathMonsterSystem check currentPos and NextPos is same => velocity.SpeedX = 0
    // path.push(Utils.tile2Pixel(0,4,mode));
    path.push(Utils.tile2Pixel(2, 2, mode));
    path.push(Utils.tile2Pixel(4, 0, mode));
    path.push(Utils.tile2Pixel(6, 0, mode));
    let pathComponent = ComponentFactory.create(PathComponent, path, mode, false);
    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(velocityComponent)
        .addComponent(appearanceComponent)
        .addComponent(pathComponent)
        .addComponent(collisionComponent)
        .addComponent(lifeComponent)
        .addComponent(spriteComponent)
    //AnimationMap.changeMonsterDirectionAnimation(entity, path[0], path[1]);
    return entity;
}

EntityFactory.createGiantMonster = function (pixelPos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.GIANT;
    let entity = this._createEntity(typeID, mode);

    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, "normal", "land", 200, 1, 1, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, 0.5 * GameConfig.TILE_WIDTH, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, NodeFactory.createGiantNodeAnimation(), mode);
    let collisionComponent = ComponentFactory.create(CollisionComponent, 20, 30);
    let lifeComponent = ComponentFactory.create(LifeComponent, 820);
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, MonsterAnimationConfig.giant);


    let tilePos = Utils.pixel2Tile(pixelPos.x, pixelPos.y, mode);
    let path = BattleManager.getInstance().getBattleData().getShortestPathForEachTile(mode)[GameConfig.MAP_HEIGH - 1 - tilePos.y][tilePos.x];
    let pathComponent = ComponentFactory.create(PathComponent, path, mode);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(velocityComponent)
        .addComponent(appearanceComponent)
        .addComponent(pathComponent)
        .addComponent(collisionComponent)
        .addComponent(lifeComponent)
        .addComponent(spriteComponent)
    // .addComponent(slowEffect)
    // .addComponent(frozenEffect)

    //AnimationMap.changeMonsterDirectionAnimation(entity, path[0], path[1]);
    return entity;
}

EntityFactory.createNinjaMonster = function (pixelPos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.NINJA;
    let entity = this._createEntity(typeID, mode);

    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, "normal", "land", 30, 1, 1, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, 0.8 * GameConfig.TILE_WIDTH, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, NodeFactory.createNinjaNodeAnimation(), mode);
    let collisionComponent = ComponentFactory.create(CollisionComponent, 20, 30);
    let lifeComponent = ComponentFactory.create(LifeComponent, 60);
    let underGroundComponent = ComponentFactory.create(UnderGroundComponent);
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, MonsterAnimationConfig.ninja)

    let tilePos = Utils.pixel2Tile(pixelPos.x, pixelPos.y, mode);
    let path = BattleManager.getInstance().getBattleData().getShortestPathForEachTile(mode)[GameConfig.MAP_HEIGH - 1 - tilePos.y][tilePos.x];
    let pathComponent = ComponentFactory.create(PathComponent, path, mode);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(velocityComponent)
        .addComponent(appearanceComponent)
        .addComponent(pathComponent)
        .addComponent(collisionComponent)
        .addComponent(lifeComponent)
        .addComponent(underGroundComponent)
        .addComponent(spriteComponent)
    // .addComponent(slowEffect)
    // .addComponent(frozenEffect)

    //AnimationMap.changeMonsterDirectionAnimation(entity, path[0], path[1]);
    return entity;
}