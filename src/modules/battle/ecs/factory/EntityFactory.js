let EntityFactory = cc.Class.extend({});

EntityFactory.pool = new EntityPool()

EntityFactory._createEntity = function (typeID, mode) {
    // TODO: create pool object for each type bullet
    // let entity = this.pool.getInActiveEntity(typeID);
    // FIXME: add mode = GameConfig.PLAYER or GameConfig.OPPONENT
    let entity = null;
    if (entity === null) {
        entity = new EntityECS(typeID, mode);
        this.pool.push(entity);
        EntityManager.getInstance().addEntity(entity);
    }
    return entity;
}

EntityFactory.createBullet = function (towerType, startPosition, targetPosition, effects, mode) {
    if (towerType === GameConfig.ENTITY_ID.CANNON_TOWER) {
        let typeID = GameConfig.ENTITY_ID.BULLET;
        let entity = this._createEntity(typeID, mode);

        // NOTE: get component from pool
        let bulletNode = new cc.Sprite("res/textures/tower/frame/cannon_1_2/tower_cannon_bullet_0000.png");
        let infoComponent = ComponentFactory.create(BulletInfoComponent, effects, 0.6);
        let positionComponent = ComponentFactory.create(PositionComponent, startPosition.x, startPosition.y);
        let appearanceComponent = ComponentFactory.create(AppearanceComponent, bulletNode);
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
        let appearanceComponent = ComponentFactory.create(AppearanceComponent, bulletNode);
        let collisionComponent = ComponentFactory.create(CollisionComponent, 1, 1);

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

        let bulletNode = new cc.Sprite("res/textures/tower/frame/boomerang_1_2/tower_boomerang_bullet_1_0000.png");
        let infoComponent = ComponentFactory.create(BulletInfoComponent, effects, "frog");
        let positionComponent = ComponentFactory.create(PositionComponent, startPosition.x, startPosition.y);
        let appearanceComponent = ComponentFactory.create(AppearanceComponent, bulletNode);
        let collisionComponent = ComponentFactory.create(CollisionComponent, 20, 20);
        let pathComponent = ComponentFactory.create(PathComponent, [
            {x: startPosition.x, y: startPosition.y},
            {x: targetPosition.x, y: targetPosition.y},
            {x: startPosition.x, y: startPosition.y}
        ]);

        let bulletSpeed = 4 * GameConfig.TILE_WIDTH;
        let speed = Utils.calculateVelocityVector(startPosition, targetPosition, bulletSpeed);
        let velocityComponent = ComponentFactory.create(VelocityComponent, speed.speedX, speed.speedY);

        entity.addComponent(infoComponent)
            .addComponent(positionComponent)
            .addComponent(appearanceComponent)
            .addComponent(velocityComponent)
            .addComponent(collisionComponent)
            .addComponent(pathComponent);
        return entity;
    }
    return null;
}

EntityFactory.createSwordsmanMonster = function (pixelPos, mode) {
    let typeID = GameConfig.ENTITY_ID.SWORD_MAN;
    let entity = this._createEntity(typeID, mode);

    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, "normal", "land", 30, 1, 1, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, 0.8 * GameConfig.TILE_WIDTH, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, createSwordmanNodeAnimation());
    let collisionComponent = ComponentFactory.create(CollisionComponent, 20, 30);
    let lifeComponent = ComponentFactory.create(LifeComponent, 140);

    let frozenEffect = ComponentFactory.create(FrozenEffect, 1.5);
    let slowEffect = ComponentFactory.create(SlowEffect, 3, 0.3);

    let tilePos = Utils.pixel2Tile(pixelPos.x, pixelPos.y, mode);
    let path = GameConfig.battleData.getShortestPathForEachTile(mode)[GameConfig.MAP_HEIGH - 1 - tilePos.y][tilePos.x];
    let pathComponent = ComponentFactory.create(PathComponent, path);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(velocityComponent)
        .addComponent(appearanceComponent)
        .addComponent(pathComponent)
        .addComponent(collisionComponent)
        .addComponent(lifeComponent)
    // .addComponent(slowEffect)
    // .addComponent(frozenEffect)

    AnimationMap.changeMonsterDirectionAnimation(entity, path[0], path[1]);
    return entity;
};

EntityFactory.createAssassinMonster = function (pixelPos, mode) {
    let typeID = GameConfig.ENTITY_ID.ASSASSIN;
    let entity = this._createEntity(typeID, mode);

    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(MonsterInfoComponent, "normal", "land", 30, 1, 1, undefined);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let velocityComponent = ComponentFactory.create(VelocityComponent, 1.4 * GameConfig.TILE_WIDTH, 0);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, creatAssassinNodeAnimation());
    let collisionComponent = ComponentFactory.create(CollisionComponent, 20, 30);
    let lifeComponent = ComponentFactory.create(LifeComponent, 120);

    let frozenEffect = ComponentFactory.create(FrozenEffect, 1.5);
    let slowEffect = ComponentFactory.create(SlowEffect, 3, 0.3);

    let tilePos = Utils.pixel2Tile(pixelPos.x, pixelPos.y, mode);
    let path = GameConfig.battleData.getShortestPathForEachTile(mode)[GameConfig.MAP_HEIGH - 1 - tilePos.y][tilePos.x];
    let pathComponent = ComponentFactory.create(PathComponent, path);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(velocityComponent)
        .addComponent(appearanceComponent)
        .addComponent(pathComponent)
        .addComponent(collisionComponent)
        .addComponent(lifeComponent)
    // .addComponent(slowEffect)
    // .addComponent(frozenEffect)

    AnimationMap.changeMonsterDirectionAnimation(entity, path[0], path[1]);
    return entity;
};

EntityFactory.createCannonOwlTower = function (tilePos, mode) {
    let typeID = GameConfig.ENTITY_ID.CANNON_TOWER;
    let entity = this._createEntity(typeID, mode);

    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
    let attackRange = 1.5 * GameConfig.TILE_WIDTH;
    let node = createOwlNodeAnimation(attackRange);

    let frozenEffect = ComponentFactory.create(FrozenEffect, 1.5);
    let slowEffect = ComponentFactory.create(SlowEffect, 3, 0.3);
    let buffAttackDamageEffect = ComponentFactory.create(BuffAttackDamageEffect, 10);
    let buffAttackSpeedEffect = ComponentFactory.create(BuffAttackSpeedEffect, 1.3);

    // TODO: get component from pool
    let infoComponent = ComponentFactory.create(TowerInfoComponent, 10, "bulletTargetType", "attack", "monster", "bulletType");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node);
    let attackComponent = ComponentFactory.create(AttackComponent, 10, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, 0.6, 0, [])

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(attackComponent)
    // .addComponent(buffAttackDamageEffect)
    // .addComponent(buffAttackSpeedEffect)
    return entity;
};

EntityFactory.createIceGunPolarBearTower = function (tilePos, mode) {
    let typeID = GameConfig.ENTITY_ID.BEAR_TOWER;
    let entity = this._createEntity(typeID);

    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
    let attackRange = 1.5 * GameConfig.TILE_WIDTH;
    let node = createBearNodeAnimation(attackRange);

    let frozenEffect = ComponentFactory.create(FrozenEffect, 1.5);
    let damageEffect = ComponentFactory.create(DamageEffect, 8);
    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(TowerInfoComponent, 10, "bulletTargetType", "support", "monster", "bulletType");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node);
    let attackComponent = ComponentFactory.create(AttackComponent, 1, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, 3.4, 0, [frozenEffect])

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(attackComponent)

    return entity;
}

EntityFactory.createBoomerangFrogTower = function (tilePos, mode) {
    let typeID = GameConfig.ENTITY_ID.FROG_TOWER;
    let entity = this._createEntity(typeID, mode);

    let attackRange = 2 * GameConfig.TILE_WIDTH;
    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
    let node = createFrogNodeAnimation(attackRange);

    let damageEffect = ComponentFactory.create(DamageEffect, 3);
    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(TowerInfoComponent, 10, "bulletTargetType", "attack", "monster", "bulletType");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node);
    let attackComponent = ComponentFactory.create(AttackComponent, 3, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, 1.5, 0, [])

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(attackComponent)

    return entity;
}

function creatAssassinNodeAnimation() {
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
    return node;
}

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