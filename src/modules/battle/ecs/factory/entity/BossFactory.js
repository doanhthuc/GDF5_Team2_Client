// Create Boss
EntityFactory.createDemonTreeBoss = function (pixelPos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.DEMON_TREE;
    let entity = this._createEntity(typeID, mode);

    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, "boss", "land", 400, 1, 1, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, 0.4 * GameConfig.TILE_WIDTH, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, NodeFactory.createDemonTreeNodeAnimation(), mode);
    let collisionComponent = ComponentFactory.create(CollisionComponent, 20, 30);
    let lifeComponent = ComponentFactory.create(LifeComponent, 400);
    let spawnMinionComponent = ComponentFactory.create(SpawnMinionComponent, 2);
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, MonsterAnimationConfig.demon_tree)

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
        .addComponent(spawnMinionComponent)
        .addComponent(spriteComponent)
    // .addComponent(slowEffect)
    // .addComponent(frozenEffect)

    //AnimationMap.changeMonsterDirectionAnimation(entity, path[0], path[1]);
    return entity;
}

EntityFactory.createDemonTreeMinion = function (pixelPos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.DEMON_TREE_MINION;
    let entity = this._createEntity(typeID, mode);

    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, "normal", "land", 50, 1, 1, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, 0.8 * GameConfig.TILE_WIDTH, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, NodeFactory.createDemonTreeMinionNodeAnimation(), mode);
    let collisionComponent = ComponentFactory.create(CollisionComponent, 20, 30);
    let lifeComponent = ComponentFactory.create(LifeComponent, 30);
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, MonsterAnimationConfig.demon_tree_minion)

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

EntityFactory.createDarkGiantBoss = function (pixelPos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.DARK_GIANT;
    let entity = this._createEntity(typeID, mode);

    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, "boss", "land", 500, 1, 1, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, 0.4 * GameConfig.TILE_WIDTH, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, NodeFactory.createDarkGiantNodeAnimation(), mode);
    let collisionComponent = ComponentFactory.create(CollisionComponent, 20, 30);
    let lifeComponent = ComponentFactory.create(LifeComponent, 800);
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, MonsterAnimationConfig.dark_giant)

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

EntityFactory.createSatyrBoss = function (pixelPos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.SATYR;
    let entity = this._createEntity(typeID, mode);

    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, "boss", "land", 300, 1, 1, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, 0.4 * GameConfig.TILE_WIDTH, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, NodeFactory.createSatyrNodeAnimation(), mode);
    let collisionComponent = ComponentFactory.create(CollisionComponent, 20, 30);
    let lifeComponent = ComponentFactory.create(LifeComponent, 1000);
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, MonsterAnimationConfig.satyr)

    let healingAbilityComponent = ComponentFactory.create(HealingAbility, 2 * GameConfig.TILE_WIDTH, 0.03);
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
        .addComponent(healingAbilityComponent)
        .addComponent(spriteComponent)
    // .addComponent(slowEffect)
    // .addComponent(frozenEffect)

    //AnimationMap.changeMonsterDirectionAnimation(entity, path[0], path[1]);
    return entity;
}