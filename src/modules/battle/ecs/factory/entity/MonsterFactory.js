EntityFactory.createSwordsmanMonster = function (pixelPos, mode, id) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.SWORD_MAN;
    let entity = this._createEntity(typeID, mode, id);

    let monsterConfig = this.getMonsterConfigByEntityTypeID(typeID);

    const speed = monsterConfig.speed * GameConfig.TILE_WIDTH;
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, monsterConfig.monsterCategory, monsterConfig.monsterClass, monsterConfig.weight, monsterConfig.energy, monsterConfig.gainEnergy, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, speed, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, NodeFactory.createSwordmanNodeAnimation(), mode, pixelPos);
    let collisionComponent = ComponentFactory.create(CollisionComponent, monsterConfig.hitRadius * GameConfig.TILE_WIDTH, monsterConfig.hitRadius * GameConfig.TILE_WIDTH);
    let lifeComponent = ComponentFactory.create(LifeComponent, monsterConfig.hp);
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, MonsterAnimationConfig.sword_man);


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
};

EntityFactory.createAssassinMonster = function (pixelPos, mode, id) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.ASSASSIN;
    let entity = this._createEntity(typeID, mode, id);

    let monsterConfig = this.getMonsterConfigByEntityTypeID(typeID);

    const speed = monsterConfig.speed * GameConfig.TILE_WIDTH;
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, monsterConfig.monsterCategory, monsterConfig.monsterClass, monsterConfig.weight, monsterConfig.energy, monsterConfig.gainEnergy, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, speed, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, NodeFactory.createAssassinNodeAnimation(), mode, pixelPos);
    let collisionComponent = ComponentFactory.create(CollisionComponent, monsterConfig.hitRadius * GameConfig.TILE_WIDTH, monsterConfig.hitRadius * GameConfig.TILE_WIDTH);
    let lifeComponent = ComponentFactory.create(LifeComponent, monsterConfig.hp);
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

    return entity;
};

EntityFactory.createBatMonster = function (pixelPos, mode, id) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.BAT;
    let entity = this._createEntity(typeID, mode, id);

    let monsterConfig = this.getMonsterConfigByEntityTypeID(typeID);

    const speed = monsterConfig.speed * GameConfig.TILE_WIDTH;
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, monsterConfig.monsterCategory, monsterConfig.monsterClass, monsterConfig.weight, monsterConfig.energy, monsterConfig.gainEnergy, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, speed, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, NodeFactory.createBatNodeAnimation(), mode, pixelPos);
    let collisionComponent = ComponentFactory.create(CollisionComponent, monsterConfig.hitRadius * GameConfig.TILE_WIDTH, monsterConfig.hitRadius * GameConfig.TILE_WIDTH);
    let lifeComponent = ComponentFactory.create(LifeComponent, monsterConfig.hp);
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, MonsterAnimationConfig.bat);
    let path = []

    // FIXME: PathMonsterSystem check currentPos and NextPos is same => velocity.SpeedX = 0
    // path.push(Utils.tile2Pixel(0,4,mode));
    path.push(Utils.tile2Pixel(1, 3, mode));
    path.push(Utils.tile2Pixel(2, 2, mode));
    path.push(Utils.tile2Pixel(3, 1, mode));
    path.push(Utils.tile2Pixel(4, 0, mode));
    path.push(Utils.tile2Pixel(4.1, 0, mode));
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
    return entity;
}

EntityFactory.createGiantMonster = function (pixelPos, mode, id) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.GIANT;
    let entity = this._createEntity(typeID, mode, id);

    let monsterConfig = this.getMonsterConfigByEntityTypeID(typeID);

    const speed = monsterConfig.speed * GameConfig.TILE_WIDTH;
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, monsterConfig.monsterCategory, monsterConfig.monsterClass, monsterConfig.weight, monsterConfig.energy, monsterConfig.gainEnergy, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, speed, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, NodeFactory.createGiantNodeAnimation(), mode, pixelPos);
    let collisionComponent = ComponentFactory.create(CollisionComponent, monsterConfig.hitRadius * GameConfig.TILE_WIDTH, monsterConfig.hitRadius * GameConfig.TILE_WIDTH);
    let lifeComponent = ComponentFactory.create(LifeComponent, monsterConfig.hp);
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

    return entity;
}

EntityFactory.createNinjaMonster = function (pixelPos, mode, id) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.NINJA;
    let entity = this._createEntity(typeID, mode, id);

    let monsterConfig = this.getMonsterConfigByEntityTypeID(typeID);

    const speed = monsterConfig.speed * GameConfig.TILE_WIDTH;
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, monsterConfig.monsterCategory, monsterConfig.monsterClass, monsterConfig.weight, monsterConfig.energy, monsterConfig.gainEnergy, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, speed, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, NodeFactory.createNinjaNodeAnimation(), mode, pixelPos);
    let collisionComponent = ComponentFactory.create(CollisionComponent, monsterConfig.hitRadius * GameConfig.TILE_WIDTH, monsterConfig.hitRadius * GameConfig.TILE_WIDTH);
    let lifeComponent = ComponentFactory.create(LifeComponent, monsterConfig.hp);
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

EntityFactory.getMonsterConfigByEntityTypeID = function (entityTypeID) {
    let monsterIdInConfig = MonsterEntityTypeIdToIdInJSONConfig[entityTypeID];
    let monsterConfigData = JsonReader.getMonsterConfig()[monsterIdInConfig]
    let monsterCategory = monsterConfigData.category;
    let monsterClass = monsterConfigData.monsterClass
    let hp = monsterConfigData.hp;
    let speed = monsterConfigData.speed;
    let hitRadius = monsterConfigData.hitRadius;
    let weight = monsterConfigData.weight;
    let energy = +monsterConfigData.energy;
    let gainEnergy = +monsterConfigData.gainEnergy;
    return {
        monsterCategory: monsterCategory,
        monsterClass: monsterClass,
        hp: hp,
        speed: speed,
        hitRadius: hitRadius,
        weight: weight,
        energy: energy,
        gainEnergy: gainEnergy
    };
}