let EntityFactory = cc.Class.extend({});

EntityFactory.pool = new EntityPool()

EntityFactory._createEntity = function (typeID, mode) {
    Utils.validateMode(mode);
    // TODO: create pool object for each type bullet
    // let entity = this.pool.getInActiveEntity(typeID);
    let entity = null;
    if (entity === null) {
        entity = new EntityECS(typeID, mode);
        this.pool.push(entity);
        EntityManager.getInstance().addEntity(entity);
    }
    return entity;
}

EntityFactory.createBullet = function (towerType, startPosition, targetPosition, effects, mode) {
    Utils.validateMode(mode);
    if (towerType === GameConfig.ENTITY_ID.CANNON_TOWER) {
        let typeID = GameConfig.ENTITY_ID.BULLET;
        let entity = this._createEntity(typeID, mode);

        // NOTE: get component from pool
        let bulletNode = new cc.Sprite("res/textures/tower/frame/cannon_1_2/tower_cannon_bullet_0000.png");
        let infoComponent = ComponentFactory.create(BulletInfoComponent, effects, 0.6);
        let positionComponent = ComponentFactory.create(PositionComponent, startPosition.x, startPosition.y);
        let appearanceComponent = ComponentFactory.create(AppearanceComponent, bulletNode, mode);
        let collisionComponent = ComponentFactory.create(CollisionComponent, 0, 0);

        let bulletSpeed = 5 * GameConfig.TILE_WIDTH;
        let speed = Utils.calculateVelocityVector(startPosition, targetPosition, bulletSpeed);
        let velocityComponent = ComponentFactory.create(VelocityComponent, speed.speedX, speed.speedY, targetPosition);

        entity.addComponent(infoComponent)
            .addComponent(positionComponent)
            .addComponent(appearanceComponent)
            .addComponent(velocityComponent)
            .addComponent(collisionComponent);
        return entity;
    } else if (towerType === GameConfig.ENTITY_ID.BEAR_TOWER) {
        let typeID = GameConfig.ENTITY_ID.BULLET;
        let entity = this._createEntity(typeID, mode);

        let bulletNode = new cc.Sprite("res/textures/tower/frame/ice_gun_1_2/tower_ice_gun_bullet_0000.png");
        let infoComponent = ComponentFactory.create(BulletInfoComponent, effects);
        let positionComponent = ComponentFactory.create(PositionComponent, startPosition.x, startPosition.y);
        let appearanceComponent = ComponentFactory.create(AppearanceComponent, bulletNode, mode);
        let collisionComponent = ComponentFactory.create(CollisionComponent, 0, 0);

        let bulletSpeed = 4 * GameConfig.TILE_WIDTH;
        let speed = Utils.calculateVelocityVector(startPosition, targetPosition, bulletSpeed);
        let velocityComponent = ComponentFactory.create(VelocityComponent, speed.speedX, speed.speedY, targetPosition);

        entity.addComponent(infoComponent)
            .addComponent(positionComponent)
            .addComponent(appearanceComponent)
            .addComponent(velocityComponent)
            .addComponent(collisionComponent);
        return entity;
    } else if (towerType === GameConfig.ENTITY_ID.FROG_TOWER) {
        let typeID = GameConfig.ENTITY_ID.BULLET;
        let entity = this._createEntity(typeID, mode);

        let node = new cc.Node();
        let bulletNode = new cc.Sprite("res/textures/tower/frame/boomerang_1_2/tower_boomerang_bullet_1_0000.png");
        node.addChild(bulletNode, 0, "weapon");
        let infoComponent = ComponentFactory.create(BulletInfoComponent, effects, "frog");
        let positionComponent = ComponentFactory.create(PositionComponent, startPosition.x, startPosition.y);
        let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
        let collisionComponent = ComponentFactory.create(CollisionComponent, 20, 20);
        let path = []

        // FIXME: PathMonsterSystem check currentPos and NextPos is same => velocity.SpeedX = 0
        // path.push(Utils.tile2Pixel(0,4,mode));
        path.push(Utils.tile2Pixel(startPosition.x, startPosition.x, mode));
        path.push(Utils.tile2Pixel(targetPosition.x, targetPosition.y, mode));
        path.push(Utils.tile2Pixel(startPosition.x, startPosition.y, mode));
        let pathComponent = ComponentFactory.create(PathComponent, path, mode, false);

        let bulletSpeed = 4 * GameConfig.TILE_WIDTH;
        let speed = Utils.calculateVelocityVector(startPosition, targetPosition, bulletSpeed);
        let velocityComponent = ComponentFactory.create(VelocityComponent, speed.speedX, speed.speedY);
        let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, BulletAnimationConfig.boomerang.level.A);

        entity.addComponent(infoComponent)
            .addComponent(positionComponent)
            .addComponent(appearanceComponent)
            .addComponent(velocityComponent)
            .addComponent(collisionComponent)
            .addComponent(pathComponent)
            .addComponent(spriteComponent);
        return entity;
    } else if (towerType === GameConfig.ENTITY_ID.BUNNY_TOWER) {
        let typeID = GameConfig.ENTITY_ID.BULLET;
        let entity = this._createEntity(typeID, mode);

        let node = new cc.Node();
        let bulletNode = new cc.Sprite("textures/tower/frame/oil_gun_1_2/tower_oil_gun_bullet_0000.png");
        node.addChild(bulletNode, 0, "bullet");
        let infoComponent = ComponentFactory.create(BulletInfoComponent, effects);
        let positionComponent = ComponentFactory.create(PositionComponent, startPosition.x, startPosition.y);
        let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
        let collisionComponent = ComponentFactory.create(CollisionComponent, 0, 0);

        let bulletSpeed = 4 * GameConfig.TILE_WIDTH;
        let speed = Utils.calculateVelocityVector(startPosition, targetPosition, bulletSpeed);
        let velocityComponent = ComponentFactory.create(VelocityComponent, speed.speedX, speed.speedY, targetPosition);
        let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, BulletAnimationConfig.oil.level.A);

        entity.addComponent(infoComponent)
            .addComponent(positionComponent)
            .addComponent(appearanceComponent)
            .addComponent(velocityComponent)
            .addComponent(collisionComponent)
            .addComponent(spriteComponent);
        return entity;
    } else if (towerType === GameConfig.ENTITY_ID.WIZARD_TOWER) {
        let typeID = GameConfig.ENTITY_ID.BULLET;
        let entity = this._createEntity(typeID, mode);

        // NOTE: get component from pool
        let bulletNode = new cc.Sprite("res/textures/tower/frame/wizard_1_2/tower_wizard_bullet_0000.png");
        let infoComponent = ComponentFactory.create(BulletInfoComponent, effects, "wizard", GameConfig.TILE_WIDTH);
        let positionComponent = ComponentFactory.create(PositionComponent, startPosition.x, startPosition.y);
        let appearanceComponent = ComponentFactory.create(AppearanceComponent, bulletNode, mode);
        let collisionComponent = ComponentFactory.create(CollisionComponent, 0, 0);

        let bulletSpeed = 5 * GameConfig.TILE_WIDTH;
        let speed = Utils.calculateVelocityVector(startPosition, targetPosition, bulletSpeed);
        let velocityComponent = ComponentFactory.create(VelocityComponent, speed.speedX, speed.speedY, targetPosition);

        entity.addComponent(infoComponent)
            .addComponent(positionComponent)
            .addComponent(appearanceComponent)
            .addComponent(velocityComponent)
            .addComponent(collisionComponent);
        return entity;
    }
    return null;
}

// Create Monster
EntityFactory.createSwordsmanMonster = function (pixelPos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.SWORD_MAN;
    let entity = this._createEntity(typeID, mode);

    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, "normal", "land", 30, 1, 1, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, 0.8 * GameConfig.TILE_WIDTH, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, createSwordmanNodeAnimation(), mode, pixelPos);
    let collisionComponent = ComponentFactory.create(CollisionComponent, 20, 30);
    let lifeComponent = ComponentFactory.create(LifeComponent, 200);
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
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, createAssassinNodeAnimation(), mode, pixelPos);
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
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, createBatNodeAnimation(), mode);
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
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, createGiantNodeAnimation(), mode);
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
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, createNinjaNodeAnimation(), mode);
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


// Create Boss
EntityFactory.createDemonTreeBoss = function (pixelPos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.DEMON_TREE;
    let entity = this._createEntity(typeID, mode);

    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, "boss", "land", 400, 1, 1, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, 0.4 * GameConfig.TILE_WIDTH, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, createDemonTreeNodeAnimation(), mode);
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
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, createDemonTreeMinionNodeAnimation(), mode);
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
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, createDarkGiantNodeAnimation(), mode);
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
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, createSatyrNodeAnimation(), mode);
    let collisionComponent = ComponentFactory.create(CollisionComponent, 20, 30);
    let lifeComponent = ComponentFactory.create(LifeComponent, 400);
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


//Create Tower

EntityFactory.createCannonOwlTower = function (tilePos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.CANNON_TOWER;
    let entity = this._createEntity(typeID, mode);
    let towerConfig = TowerConfig.getTowerConfigFromJson(typeID, 1);
    cc.log("[EntityFactory line 458] create cannon tower: " + JSON.stringify(towerConfig));
    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
    let attackRange = 1.5 * GameConfig.TILE_WIDTH;
    let node = createOwlNodeAnimation(attackRange);

    // let frozenEffect = ComponentFactory.create(FrozenEffect, 1.5);
    // let slowEffect = ComponentFactory.create(SlowEffect, 3, 0.3);
    // let buffAttackDamageEffect = ComponentFactory.create(BuffAttackDamageEffect, 10);
    // let buffAttackSpeedEffect = ComponentFactory.create(BuffAttackSpeedEffect, 1.3);

    let infoComponent = ComponentFactory.create(TowerInfoComponent, 10, "bulletTargetType", "attack", "monster", "bulletType");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
    let attackComponent = ComponentFactory.create(AttackComponent, 10, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, 0.6, 0, [])
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, TowerAnimationConfig.cannon.level.A);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(attackComponent)
        .addComponent(spriteComponent);

    // .addComponent(buffAttackDamageEffect)
    // .addComponent(buffAttackSpeedEffect)
    return entity;
};

EntityFactory.createIceGunPolarBearTower = function (tilePos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.BEAR_TOWER;
    let entity = this._createEntity(typeID, mode);

    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
    let attackRange = 1.5 * GameConfig.TILE_WIDTH;
    let node = createBearNodeAnimation(attackRange);

    let frozenEffect = ComponentFactory.create(FrozenEffect, 1.5);
    let damageEffect = ComponentFactory.create(DamageEffect, 8);

    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(TowerInfoComponent, 10, "bulletTargetType", "support", "monster", "bulletType");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
    let attackComponent = ComponentFactory.create(AttackComponent, 1, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, 3.4, 0, [frozenEffect, damageEffect])
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, TowerAnimationConfig.bear.level.A);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(attackComponent)
        .addComponent(spriteComponent);

    return entity;
}

EntityFactory.createBoomerangFrogTower = function (tilePos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.FROG_TOWER;
    let entity = this._createEntity(typeID, mode);

    let attackRange = 2 * GameConfig.TILE_WIDTH;
    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
    let node = createFrogNodeAnimation(attackRange);

    let damageEffect = ComponentFactory.create(DamageEffect, 3);
    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(TowerInfoComponent, 10, "bulletTargetType", "attack", "monster", "bulletType");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
    let attackComponent = ComponentFactory.create(AttackComponent, 3, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, 1.5, 0, [])
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, TowerAnimationConfig.boomerang.level.A);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(attackComponent)
        .addComponent(spriteComponent);

    return entity;
}

EntityFactory.createBunnyOilGunTower = function (tilePos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.BUNNY_TOWER;
    let entity = this._createEntity(typeID, mode);

    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
    let attackRange = 1.5 * GameConfig.TILE_WIDTH;
    let node = createBunnyNodeAnimation(attackRange);

    let slowEffect = ComponentFactory.create(SlowEffect, 5, 0.3);
    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(TowerInfoComponent, 10, "bulletTargetType", "attack", "monster", "bulletType");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
    let attackComponent = ComponentFactory.create(AttackComponent, 25, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, 1.5, 0, [slowEffect])
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, TowerAnimationConfig.bunnyOil.level.A);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(attackComponent)
        .addComponent(spriteComponent);

    return entity;
}

EntityFactory.createWizardTower = function (tilePos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.WIZARD_TOWER;
    let entity = this._createEntity(typeID, mode);

    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
    let attackRange = 1.5 * GameConfig.TILE_WIDTH;
    let node = createWizardNodeAnimation(attackRange);

    let damageEffect = ComponentFactory.create(DamageEffect, 3);

    let infoComponent = ComponentFactory.create(TowerInfoComponent, 10, "bulletTargetType", "attack", "monster", "bulletType");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
    let attackComponent = ComponentFactory.create(AttackComponent, 50, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, 0.6, 0, [])
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, TowerAnimationConfig.wizard.level.A);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(attackComponent)
        .addComponent(spriteComponent);

    return entity;
}

EntityFactory.createSnakeAttackSpeedTower = function (tilePos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.SNAKE_TOWER;
    let entity = this._createEntity(typeID, mode);

    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
    let attackRange = 1.5 * GameConfig.TILE_WIDTH;
    let node = createSnakeAttackSpeedNodeAnimation(attackRange);

    let infoComponent = ComponentFactory.create(TowerInfoComponent, 10, "", "support", "aura", "");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let buffAttackSpeedEffect = ComponentFactory.create(BuffAttackSpeedEffect, 0.2);
    let towerAbilityComponent = ComponentFactory.create(TowerAbilityComponent, 1.5 * GameConfig.TILE_WIDTH, buffAttackSpeedEffect);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);

    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, TowerAnimationConfig.snake.level.A);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(towerAbilityComponent)
        .addComponent(spriteComponent);

    return entity;
}

EntityFactory.createGoatDamageTower = function (tilePos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.GOAT_TOWER;
    let entity = this._createEntity(typeID, mode);

    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
    let attackRange = 1.5 * GameConfig.TILE_WIDTH;
    let node = createGoatDamageNodeAnimation(attackRange);

    let infoComponent = ComponentFactory.create(TowerInfoComponent, 10, "", "support", "aura", "");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let buffAttackDamageEffect = ComponentFactory.create(BuffAttackDamageEffect, 1000);
    let towerAbilityComponent = ComponentFactory.create(TowerAbilityComponent, 1.5 * GameConfig.TILE_WIDTH, buffAttackDamageEffect);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);

    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, TowerAnimationConfig.goat.level.A);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(towerAbilityComponent)
        .addComponent(spriteComponent);

    return entity;
}

// Animation
// TODO: replace this function to another place, and cache it (can prefetch when begin the match)
function createSwordmanNodeAnimation() {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/swordsman/monster_swordsman_run_0012.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "")

    // monster animation
    let monsterAnimation = new cc.Animation();
    for (let i = 12; i <= 23; i++) {
        let fileName = "res/textures/monster/frame/swordsman/monster_swordsman_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        monsterAnimation.addSpriteFrameWithFile(fileName);
    }
    monsterAnimation.setDelayPerUnit(1 / (23 - 12 + 1));
    monsterAnimation.setRestoreOriginalFrame(true);
    let monsterAction = cc.animate(monsterAnimation);

    monsterSprite.runAction(cc.repeatForever(monsterAction));

    node.addChild(monsterSprite, 0, "monster");
    node.addChild(hpBarNode.node, 0, "hp");
    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    return node;
}

function createAssassinNodeAnimation() {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/assassin/monster_assassin_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");

    let monsterAnimation = new cc.Animation();
    for (let i = 20; i <= 29; i++) {
        let fileName = "res/textures/monster/frame/assassin/monster_assassin_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        monsterAnimation.addSpriteFrameWithFile(fileName);
    }
    monsterAnimation.setDelayPerUnit(1 / (29 - 20 + 1));
    monsterAnimation.setRestoreOriginalFrame(true);
    let monsterAction = cc.animate(monsterAnimation);
    monsterSprite.runAction(cc.repeatForever(monsterAction));
    node.addChild(monsterSprite, 0, "monster");
    node.addChild(hpBarNode.node, 0, "hp");
    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    return node;
}

function createBatNodeAnimation() {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/bat/monster_bat_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");

    let monsterAnimation = new cc.Animation();
    for (let i = 16; i <= 22; i++) {
        let fileName = "res/textures/monster/frame/bat/monster_bat_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        monsterAnimation.addSpriteFrameWithFile(fileName);
    }
    monsterAnimation.setDelayPerUnit(1 / (22 - 16 + 1));
    monsterAnimation.setRestoreOriginalFrame(true);
    let monsterAction = cc.animate(monsterAnimation);
    monsterSprite.runAction(cc.repeatForever(monsterAction));
    node.addChild(monsterSprite, 0, "monster");
    node.addChild(hpBarNode.node, 0, "hp");
    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    return node;
}

function createGiantNodeAnimation() {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/giant/monster_giant_run_0036.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");

    let monsterAnimation = new cc.Animation();
    for (let i = 36; i <= 47; i++) {
        let fileName = "res/textures/monster/frame/giant/monster_giant_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        monsterAnimation.addSpriteFrameWithFile(fileName);
    }
    monsterAnimation.setDelayPerUnit(1 / (47 - 36 + 1));
    monsterAnimation.setRestoreOriginalFrame(true);
    let monsterAction = cc.animate(monsterAnimation);
    monsterSprite.runAction(cc.repeatForever(monsterAction));
    node.addChild(monsterSprite, 0, "monster");
    node.addChild(hpBarNode.node, 0, "hp");
    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    return node;
}

function createNinjaNodeAnimation() {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/ninja/monster_ninja_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");

    let monsterAnimation = new cc.Animation();
    for (let i = 20; i <= 28; i++) {
        let fileName = "res/textures/monster/frame/ninja/monster_ninja_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        monsterAnimation.addSpriteFrameWithFile(fileName);
    }
    monsterAnimation.setDelayPerUnit(1 / (28 - 20 + 1));
    monsterAnimation.setRestoreOriginalFrame(true);
    let monsterAction = cc.animate(monsterAnimation);
    monsterSprite.runAction(cc.repeatForever(monsterAction));
    node.addChild(monsterSprite, 0, "monster");
    node.addChild(hpBarNode.node, 0, "hp");
    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    return node;
}

function createDemonTreeNodeAnimation() {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/demon_tree/monster_demon_tree_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");

    let monsterAnimation = new cc.Animation();
    for (let i = 22; i <= 32; i++) {
        let fileName = "res/textures/monster/frame/demon_tree/monster_demon_tree_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        monsterAnimation.addSpriteFrameWithFile(fileName);
    }
    monsterAnimation.setDelayPerUnit(1 / (32 - 22 + 1));
    monsterAnimation.setRestoreOriginalFrame(true);
    let monsterAction = cc.animate(monsterAnimation);
    monsterSprite.runAction(cc.repeatForever(monsterAction));
    node.addChild(monsterSprite, 0, "monster");
    node.addChild(hpBarNode.node, 0, "hp");
    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    return node;
}

function createDemonTreeMinionNodeAnimation() {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/demon_tree_minion/monster_demon_tree_minion_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");

    let monsterAnimation = new cc.Animation();
    for (let i = 25; i <= 32; i++) {
        let fileName = "res/textures/monster/frame/demon_tree_minion/monster_demon_tree_minion_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        monsterAnimation.addSpriteFrameWithFile(fileName);
    }
    monsterAnimation.setDelayPerUnit(1 / (32 - 25 + 1));
    monsterAnimation.setRestoreOriginalFrame(true);
    let monsterAction = cc.animate(monsterAnimation);
    monsterSprite.runAction(cc.repeatForever(monsterAction));
    node.addChild(monsterSprite, 0, "monster");
    node.addChild(hpBarNode.node, 0, "hp");
    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    return node;
}

function createDarkGiantNodeAnimation() {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/dark_giant/monster_dark_giant_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");

    let monsterAnimation = new cc.Animation();
    for (let i = 28; i <= 41; i++) {
        let fileName = "res/textures/monster/frame/dark_giant/monster_dark_giant_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        monsterAnimation.addSpriteFrameWithFile(fileName);
    }
    monsterAnimation.setDelayPerUnit(1 / (41 - 28 + 1));
    monsterAnimation.setRestoreOriginalFrame(true);
    let monsterAction = cc.animate(monsterAnimation);
    monsterSprite.runAction(cc.repeatForever(monsterAction));
    node.addChild(monsterSprite, 0, "monster");
    node.addChild(hpBarNode.node, 0, "hp");
    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    return node;
}

function createSatyrNodeAnimation() {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/satyr/monster_satyr_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");

    let monsterAnimation = new cc.Animation();
    for (let i = 13; i <= 25; i++) {
        let fileName = "res/textures/monster/frame/satyr/monster_satyr_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        monsterAnimation.addSpriteFrameWithFile(fileName);
    }
    monsterAnimation.setDelayPerUnit(1 / (25 - 13 + 1));
    monsterAnimation.setRestoreOriginalFrame(true);
    let monsterAction = cc.animate(monsterAnimation);
    monsterSprite.runAction(cc.repeatForever(monsterAction));
    node.addChild(monsterSprite, 0, "monster");
    node.addChild(hpBarNode.node, 0, "hp");
    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    return node;
}

function createOwlNodeAnimation(range) {
    let node = new cc.Node();
    let towerSprite = new cc.Sprite("res/textures/tower/frame/cannon_1_2/tower_cannon_attack_0_0009.png");
    let weaponSprite = new cc.Sprite("res/textures/tower/frame/cannon_1_2/tower_cannon_attack_2_0009.png");
    let rangeAttackSprite = new cc.Sprite("res/textures/battle/battle_tower_range_player.png");
    rangeAttackSprite.setScale(2 * range / 687)

    // cannon animation
    let weaponAnimation = new cc.Animation();
    for (let i = 9; i <= 17; i++) {
        let fileName = "res/textures/tower/frame/cannon_1_2/tower_cannon_attack_2_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        weaponAnimation.addSpriteFrameWithFile(fileName);
    }
    weaponAnimation.setDelayPerUnit(1 / (17 - 9 + 1));
    weaponAnimation.setRestoreOriginalFrame(true);
    let weaponAction = cc.animate(weaponAnimation);

    // tower animation
    let towerAnimation = new cc.Animation();
    for (let i = 9; i <= 17; i++) {
        let fileName = "res/textures/tower/frame/cannon_1_2/tower_cannon_attack_0_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        towerAnimation.addSpriteFrameWithFile(fileName);
    }
    towerAnimation.setDelayPerUnit(1 / (17 - 9 + 1));
    towerAnimation.setRestoreOriginalFrame(true);
    let towerAction = cc.animate(towerAnimation);

    weaponSprite.runAction(cc.repeatForever(weaponAction));
    towerSprite.runAction(cc.repeatForever(towerAction));

    // node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(towerSprite, 0, "tower");
    node.addChild(weaponSprite, 0, "weapon");
    return node;
}

function createBearNodeAnimation(attackRange, isShowRange) {
    let node = new cc.Node();
    let towerSprite = new cc.Sprite("res/textures/tower/frame/ice_gun_1_2/tower_ice_gun_attack_0_0010.png");
    let weaponSprite = new cc.Sprite("res/textures/tower/frame/ice_gun_1_2/tower_ice_gun_attack_1_0010.png");
    let rangeAttackSprite = new cc.Sprite("res/textures/battle/battle_tower_range_player.png");
    rangeAttackSprite.setScale(2 * attackRange / 687)

    // tower animation
    let towerAnimation = new cc.Animation();
    for (let i = 10; i <= 19; i++) {
        let fileName = "res/textures/tower/frame/ice_gun_1_2/tower_ice_gun_attack_0_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        towerAnimation.addSpriteFrameWithFile(fileName);
    }
    towerAnimation.setDelayPerUnit(1 / (19 - 10 + 1));
    towerAnimation.setRestoreOriginalFrame(true);
    let towerAction = cc.animate(towerAnimation);

    // weapon animation
    let weaponAnimation = new cc.Animation();
    for (let i = 10; i <= 19; i++) {
        let fileName = "res/textures/tower/frame/ice_gun_1_2/tower_ice_gun_attack_1_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        weaponAnimation.addSpriteFrameWithFile(fileName);
    }
    weaponAnimation.setDelayPerUnit(1 / (19 - 10 + 1));
    weaponAnimation.setRestoreOriginalFrame(true);
    let weaponAction = cc.animate(weaponAnimation);

    towerSprite.runAction(cc.repeatForever(towerAction));
    weaponSprite.runAction(cc.repeatForever(weaponAction));

    if (isShowRange) {
        node.addChild(rangeAttackSprite, 0, "rangeAttack");
    }
    node.addChild(towerSprite, 0, "tower");
    node.addChild(weaponSprite, 0, "weapon");
    return node;
}

function createFrogNodeAnimation(attackRange) {
    let node = new cc.Node();
    let towerSprite = new cc.Sprite("res/textures/tower/frame/boomerang_1_2/tower_boomerang_attack_0_0011.png");
    let weaponSprite = new cc.Sprite("res/textures/tower/frame/boomerang_1_2/tower_boomerang_attack_1_0011.png");
    let rangeAttackSprite = new cc.Sprite("res/textures/battle/battle_tower_range_player.png");
    rangeAttackSprite.setScale(2 * attackRange / 687)

    // tower animation
    let towerAnimation = new cc.Animation();
    for (let i = 11; i <= 22; i++) {
        let fileName = "res/textures/tower/frame/boomerang_1_2/tower_boomerang_attack_0_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        towerAnimation.addSpriteFrameWithFile(fileName);
    }
    towerAnimation.setDelayPerUnit(1 / (22 - 11 + 1));
    towerAnimation.setRestoreOriginalFrame(true);
    let towerAction = cc.animate(towerAnimation);

    // weapon animation
    let weaponAnimation = new cc.Animation();
    for (let i = 11; i <= 22; i++) {
        let fileName = "res/textures/tower/frame/boomerang_1_2/tower_boomerang_attack_1_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        weaponAnimation.addSpriteFrameWithFile(fileName);
    }
    weaponAnimation.setDelayPerUnit(1 / (22 - 11 + 1));
    weaponAnimation.setRestoreOriginalFrame(true);
    let weaponAction = cc.animate(weaponAnimation);

    towerSprite.runAction(cc.repeatForever(towerAction));
    weaponSprite.runAction(cc.repeatForever(weaponAction));

    // node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(towerSprite, 0, "tower");
    node.addChild(weaponSprite, 0, "weapon");
    return node;
}

function createBunnyNodeAnimation(attackRange) {
    let node = new cc.Node();
    let towerSprite = new cc.Sprite("res/textures/tower/frame/oil_gun_1_2/tower_oil_gun_attack_0_0011.png");
    let weaponSprite = new cc.Sprite("res/textures/tower/frame/oil_gun_1_2/tower_oil_gun_attack_1_0011.png");

    // node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(towerSprite, 0, "tower");
    node.addChild(weaponSprite, 0, "weapon");
    return node;
}

function createWizardNodeAnimation(attackRange) {
    let node = new cc.Node();
    let towerSprite = new cc.Sprite("res/textures/tower/frame/wizard_1_2/tower_wizard_attack_0_0000.png");
    let weaponSprite = new cc.Sprite("res/textures/tower/frame/wizard_1_2/tower_wizard_attack_1_0000.png");

    // node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(towerSprite, 0, "tower");
    node.addChild(weaponSprite, 0, "weapon");
    return node;
}

function createSnakeAttackSpeedNodeAnimation(attackRange) {
    let node = new cc.Node();
    let towerSprite = new cc.Sprite("res/textures/tower/frame/attack_speed_1_2/tower_attack_speed_attack_0_0000.png");
    let weaponSprite = new cc.Sprite("res/textures/tower/frame/attack_speed_1_2/tower_attack_speed_attack_1_0000.png");

    // node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(towerSprite, 0, "tower");
    node.addChild(weaponSprite, 0, "weapon");
    return node;
}

function createGoatDamageNodeAnimation(attackRange) {
    let node = new cc.Node();
    let towerSprite = new cc.Sprite("res/textures/tower/frame/damage_1_2/tower_damage_attack_0_0000.png");
    let weaponSprite = new cc.Sprite("res/textures/tower/frame/damage_1_2/tower_damage_attack_1_0000.png");

    // node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(towerSprite, 0, "tower");
    node.addChild(weaponSprite, 0, "weapon");
    return node;
}

function createDragTowerNode(towerId) {
    let node = new cc.Node();
    let towerName = TOWER_NAME[towerId];
    let config = TowerAnimationConfig[towerName].level.A.animation.IDLE_270;
    let numberDigits = config.tower.start.toString().length;
    let towerSprite = new cc.Sprite("#" + config.tower.prefix + "0".repeat(4 - numberDigits) + config.tower.start + ".png");
    let weaponSprite = new cc.Sprite("#" + config.weapon.prefix + "0".repeat(4 - numberDigits) + config.weapon.start + ".png");
    let rangeAttackSprite = new cc.Sprite("res/textures/battle/battle_tower_range_player.png");
    rangeAttackSprite.setScale(2 * 1.5 * GameConfig.TILE_WIDTH / 687)
    node.addChild(towerSprite, 0, "tower");
    node.addChild(weaponSprite, 0, "weapon");
    node.addChild(rangeAttackSprite, 0, "rangeAttack");
    return node;
}