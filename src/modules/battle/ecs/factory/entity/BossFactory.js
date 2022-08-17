EntityFactory.createDemonTreeBoss = function (pixelPos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.DEMON_TREE;
    let entity = this._createEntity(typeID, mode);

    let monsterConfig = this.getMonsterConfigByEntityTypeID(typeID);

    let speed = monsterConfig.speed * GameConfig.TILE_WIDTH;
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, monsterConfig.monsterCategory, monsterConfig.monsterClass, monsterConfig.weight, monsterConfig.energy, monsterConfig.gainEnergy, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, speed, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, NodeFactory.createDemonTreeNodeAnimation(), mode);
    let collisionComponent = ComponentFactory.create(CollisionComponent, monsterConfig.hitRadius * GameConfig.TILE_WIDTH, monsterConfig.hitRadius * GameConfig.TILE_WIDTH);
    let lifeComponent = ComponentFactory.create(LifeComponent, monsterConfig.hp);
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

    return entity;
}

EntityFactory.createDemonTreeMinion = function (pixelPos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.DEMON_TREE_MINION;
    let entity = this._createEntity(typeID, mode);

    let monsterConfig = this.getMonsterConfigByEntityTypeID(typeID);

    let speed = monsterConfig.speed * GameConfig.TILE_WIDTH;
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, monsterConfig.monsterCategory, monsterConfig.monsterClass, monsterConfig.weight, monsterConfig.energy, monsterConfig.gainEnergy, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, speed, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, NodeFactory.createDemonTreeMinionNodeAnimation(), mode);
    let collisionComponent = ComponentFactory.create(CollisionComponent, monsterConfig.hitRadius * GameConfig.TILE_WIDTH, monsterConfig.hitRadius * GameConfig.TILE_WIDTH);
    let lifeComponent = ComponentFactory.create(LifeComponent, monsterConfig.hp);
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

    return entity;
}

EntityFactory.createDarkGiantBoss = function (pixelPos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.DARK_GIANT;
    let entity = this._createEntity(typeID, mode);

    let monsterConfig = this.getMonsterConfigByEntityTypeID(typeID);

    let speed = monsterConfig.speed * GameConfig.TILE_WIDTH;
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, monsterConfig.monsterCategory, monsterConfig.monsterClass, monsterConfig.weight, monsterConfig.energy, monsterConfig.gainEnergy, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, speed, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, NodeFactory.createDarkGiantNodeAnimation(), mode);
    let collisionComponent = ComponentFactory.create(CollisionComponent, monsterConfig.hitRadius * GameConfig.TILE_WIDTH, monsterConfig.hitRadius * GameConfig.TILE_WIDTH);
    let lifeComponent = ComponentFactory.create(LifeComponent, monsterConfig.hp);
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

    return entity;
}

EntityFactory.createSatyrBoss = function (pixelPos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.SATYR;
    let entity = this._createEntity(typeID, mode);

    let monsterConfig = this.getMonsterConfigByEntityTypeID(typeID);

    let speed = monsterConfig.speed * GameConfig.TILE_WIDTH;
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, monsterConfig.monsterCategory, monsterConfig.monsterClass, monsterConfig.weight, monsterConfig.energy, monsterConfig.gainEnergy, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, speed, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, NodeFactory.createSatyrNodeAnimation(), mode);
    let collisionComponent = ComponentFactory.create(CollisionComponent, monsterConfig.hitRadius * GameConfig.TILE_WIDTH, monsterConfig.hitRadius * GameConfig.TILE_WIDTH);
    let lifeComponent = ComponentFactory.create(LifeComponent, monsterConfig.hp);
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

    BattleAnimation.addAnimationHealing(entity);
    return entity;
}