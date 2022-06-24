let EntityFactory = cc.Class.extend({});

EntityFactory.pool = new EntityPool()

EntityFactory.createEntity = function (typeID) {
    // TODO: create pool object for each type bullet
    // let entity = this.pool.getInActiveEntity(typeID);
    let entity = null;
    if (entity === null) {
        entity = new EntityECS(typeID);
        this.pool.push(entity);
        EntityManager.getInstance().addEntity(entity);
    }
    return entity;
}

EntityFactory.createBullet = function (towerType, startPosition, targetPosition, effects) {
    if (towerType === GameConfig.ENTITY_ID.CANNON_TOWER) {
        let typeID = GameConfig.ENTITY_ID.BULLET;
        let entity = this.createEntity(typeID);

        // NOTE: get component from pool
        let bulletNode = new cc.Sprite("res/assets/tower/frame/cannon_1_2/tower_cannon_bullet_0000.png");
        let infoComponent = new BulletInfoComponent(effects, 0.6);
        let positionComponent = new PositionComponent(startPosition.x, startPosition.y);
        let appearanceComponent = new AppearanceComponent(bulletNode);
        let collisionComponent = new CollisionComponent(0, 0);

        let bulletSpeed = 5 * GameConfig.TILE_WIDTH;
        let speed = Utils.calculateVelocityVector(startPosition, targetPosition, bulletSpeed);
        let velocityComponent = new VelocityComponent(speed.speedX, speed.speedY, targetPosition);

        entity.addComponent(infoComponent)
            .addComponent(positionComponent)
            .addComponent(appearanceComponent)
            .addComponent(velocityComponent)
            .addComponent(collisionComponent);
        return entity;
    } else if (towerType === GameConfig.ENTITY_ID.BEAR_TOWER) {
        let typeID = GameConfig.ENTITY_ID.BULLET;
        let entity = this.createEntity(typeID);

        let bulletNode = new cc.Sprite("res/assets/tower/frame/ice_gun_1_2/tower_ice_gun_bullet_0000.png");
        let infoComponent = new BulletInfoComponent(effects);
        let positionComponent = new PositionComponent(startPosition.x, startPosition.y);
        let appearanceComponent = new AppearanceComponent(bulletNode);
        let collisionComponent = new CollisionComponent(1, 1);

        let bulletSpeed = 4 * GameConfig.TILE_WIDTH;
        let speed = Utils.calculateVelocityVector(startPosition, targetPosition, bulletSpeed);
        let velocityComponent = new VelocityComponent(speed.speedX, speed.speedY, targetPosition);

        entity.addComponent(infoComponent)
            .addComponent(positionComponent)
            .addComponent(appearanceComponent)
            .addComponent(velocityComponent)
            .addComponent(collisionComponent);
        return entity;
    } else if (towerType === GameConfig.ENTITY_ID.FROG_TOWER) {
        let typeID = GameConfig.ENTITY_ID.BULLET;
        let entity = this.createEntity(typeID);

        let bulletNode = new cc.Sprite("res/assets/tower/frame/boomerang_1_2/tower_boomerang_bullet_1_0000.png");
        let infoComponent = new BulletInfoComponent(effects, "frog");
        let positionComponent = new PositionComponent(startPosition.x, startPosition.y);
        let appearanceComponent = new AppearanceComponent(bulletNode);
        let collisionComponent = new CollisionComponent(20, 20);
        let pathComponent = new PathComponent([
            {x: startPosition.x, y: startPosition.y},
            {x: targetPosition.x, y: targetPosition.y},
            {x: startPosition.x, y: startPosition.y}
        ]);

        let bulletSpeed = 4 * GameConfig.TILE_WIDTH;
        let speed = Utils.calculateVelocityVector(startPosition, targetPosition, bulletSpeed);
        let velocityComponent = new VelocityComponent(speed.speedX, speed.speedY);

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

EntityFactory.createSwordsmanMonster = function (initPos) {
    let typeID = GameConfig.ENTITY_ID.SWORD_MAN;
    let entity = this.createEntity(typeID);

    // NOTE: get component from pool
    let infoComponent = new MonsterInfoComponent("normal", "land", 30, 1, 1, undefined);
    let positionComponent = new PositionComponent(initPos.x, initPos.y);
    let velocityComponent = new VelocityComponent(0.8 * GameConfig.TILE_WIDTH, 0);
    let appearanceComponent = new AppearanceComponent(createSwordmanNodeAnimation());
    let pathComponent = new PathComponent(GameConfig.gameLayer.mapLayer.path);
    let collisionComponent = new CollisionComponent(20, 30);
    let lifeComponent = new LifeComponent(300);

    let frozenEffect = new FrozenEffect(1.5);
    let slowEffect = new SlowEffect(3, 0.3);
    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(velocityComponent)
        .addComponent(appearanceComponent)
        .addComponent(pathComponent)
        .addComponent(collisionComponent)
        .addComponent(lifeComponent)
        // .addComponent(slowEffect)
        // .addComponent(frozenEffect)

    return entity;
};

EntityFactory.createCannonOwlTower = function (pos) {
    let typeID = GameConfig.ENTITY_ID.CANNON_TOWER;
    let entity = this.createEntity(typeID);

    let initPos = Utils.tile2Pixel(pos.x, pos.y);
    let attackRange = 1.5 * GameConfig.TILE_WIDTH;
    let node = createOwlNodeAnimation(attackRange);

    let frozenEffect = new FrozenEffect(1.5);
    let slowEffect = new SlowEffect(3, 0.3);
    let buffAttackDamageEffect = new BuffAttackDamageEffect(1.3);
    let buffAttackSpeedEffect = new BuffAttackSpeedEffect(1.3);
    // TODO: get component from pool
    let infoComponent = new TowerInfoComponent(10, "bulletTargetType", "attack", "monster", "bulletType");
    let positionComponent = new PositionComponent(initPos.x, initPos.y);
    let appearanceComponent = new AppearanceComponent(node);
    let attackComponent = new AttackComponent(10, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, 0.4, 0, [])

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(attackComponent)
        // .addComponent(buffAttackDamageEffect)
        // .addComponent(buffAttackSpeedEffect)
    return entity;
};

EntityFactory.createIceGunPolarBearTower = function (pos) {
    let typeID = GameConfig.ENTITY_ID.BEAR_TOWER;
    let entity = this.createEntity(typeID);

    let initPos = Utils.tile2Pixel(pos.x, pos.y);
    let attackRange = 1.5 * GameConfig.TILE_WIDTH;
    let node = createBearNodeAnimation(attackRange);

    let frozenEffect = new FrozenEffect(1.5);
    let damageEffect = new DamageEffect(8);
    // NOTE: get component from pool
    let infoComponent = new TowerInfoComponent(10, "bulletTargetType", "support", "monster", "bulletType");
    let positionComponent = new PositionComponent(initPos.x, initPos.y);
    let appearanceComponent = new AppearanceComponent(node);
    let attackComponent = new AttackComponent(3, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, 3.4, 0, [frozenEffect])

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(attackComponent)

    return entity;
}

EntityFactory.createBoomerangFrogTower = function (pos) {
    let typeID = GameConfig.ENTITY_ID.FROG_TOWER;
    let entity = this.createEntity(typeID);

    let attackRange = 2 * GameConfig.TILE_WIDTH;
    let initPos = Utils.tile2Pixel(pos.x, pos.y);
    let node = createFrogNodeAnimation(attackRange);

    let damageEffect = new DamageEffect(3);
    // NOTE: get component from pool
    let infoComponent = new TowerInfoComponent(10, "bulletTargetType", "attack", "monster", "bulletType");
    let positionComponent = new PositionComponent(initPos.x, initPos.y);
    let appearanceComponent = new AppearanceComponent(node);
    let attackComponent = new AttackComponent(3, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, 1.5, 0, [])

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(attackComponent)

    return entity;
}

function createSwordmanNodeAnimation() {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/assets/monster/frame/swordsman/monster_swordsman_run_0012.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "")

    // monster animation
    let monsterAnimation = new cc.Animation();
    for (let i = 12; i <= 23; i++) {
        let fileName = "res/assets/monster/frame/swordsman/monster_swordsman_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
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
    let towerSprite = new cc.Sprite("res/assets/tower/frame/cannon_1_2/tower_cannon_attack_0_0009.png");
    let weaponSprite = new cc.Sprite("res/assets/tower/frame/cannon_1_2/tower_cannon_attack_2_0009.png");
    let rangeAttackSprite = new cc.Sprite("res/assets/battle/battle_tower_range_player.png");
    rangeAttackSprite.setScale(2 * range / 687)

    // cannon animation
    let weaponAnimation = new cc.Animation();
    for (let i = 9; i <= 17; i++) {
        let fileName = "res/assets/tower/frame/cannon_1_2/tower_cannon_attack_2_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        weaponAnimation.addSpriteFrameWithFile(fileName);
    }
    weaponAnimation.setDelayPerUnit(1 / (17 - 9 + 1));
    weaponAnimation.setRestoreOriginalFrame(true);
    let weaponAction = cc.animate(weaponAnimation);

    // tower animation
    let towerAnimation = new cc.Animation();
    for (let i = 9; i <= 17; i++) {
        let fileName = "res/assets/tower/frame/cannon_1_2/tower_cannon_attack_0_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        towerAnimation.addSpriteFrameWithFile(fileName);
    }
    towerAnimation.setDelayPerUnit(1 / (17 - 9 + 1));
    towerAnimation.setRestoreOriginalFrame(true);
    let towerAction = cc.animate(towerAnimation);

    weaponSprite.runAction(cc.repeatForever(weaponAction));
    towerSprite.runAction(cc.repeatForever(towerAction));

    node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(towerSprite, 0, "tower");
    node.addChild(weaponSprite, 0, "weapon");
    return node;
}

function createBearNodeAnimation(attackRange) {
    let node = new cc.Node();
    let towerSprite = new cc.Sprite("res/assets/tower/frame/ice_gun_1_2/tower_ice_gun_attack_0_0010.png");
    let weaponSprite = new cc.Sprite("res/assets/tower/frame/ice_gun_1_2/tower_ice_gun_attack_1_0010.png");
    let rangeAttackSprite = new cc.Sprite("res/assets/battle/battle_tower_range_player.png");
    rangeAttackSprite.setScale(2 * attackRange / 687)

    // tower animation
    let towerAnimation = new cc.Animation();
    for (let i = 10; i <= 19; i++) {
        let fileName = "res/assets/tower/frame/ice_gun_1_2/tower_ice_gun_attack_0_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        towerAnimation.addSpriteFrameWithFile(fileName);
    }
    towerAnimation.setDelayPerUnit(1 / (19 - 10 + 1));
    towerAnimation.setRestoreOriginalFrame(true);
    let towerAction = cc.animate(towerAnimation);

    // weapon animation
    let weaponAnimation = new cc.Animation();
    for (let i = 10; i <= 19; i++) {
        let fileName = "res/assets/tower/frame/ice_gun_1_2/tower_ice_gun_attack_1_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        weaponAnimation.addSpriteFrameWithFile(fileName);
    }
    weaponAnimation.setDelayPerUnit(1 / (19 - 10 + 1));
    weaponAnimation.setRestoreOriginalFrame(true);
    let weaponAction = cc.animate(weaponAnimation);

    towerSprite.runAction(cc.repeatForever(towerAction));
    weaponSprite.runAction(cc.repeatForever(weaponAction));

    node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(towerSprite, 0, "tower");
    node.addChild(weaponSprite, 0, "weapon");
    return node;
}

function createFrogNodeAnimation(attackRange) {
    let node = new cc.Node();
    let towerSprite = new cc.Sprite("res/assets/tower/frame/boomerang_1_2/tower_boomerang_attack_0_0011.png");
    let weaponSprite = new cc.Sprite("res/assets/tower/frame/boomerang_1_2/tower_boomerang_attack_1_0011.png");
    let rangeAttackSprite = new cc.Sprite("res/assets/battle/battle_tower_range_player.png");
    rangeAttackSprite.setScale(2 * attackRange / 687)

    // tower animation
    let towerAnimation = new cc.Animation();
    for (let i = 11; i <= 22; i++) {
        let fileName = "res/assets/tower/frame/boomerang_1_2/tower_boomerang_attack_0_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        towerAnimation.addSpriteFrameWithFile(fileName);
    }
    towerAnimation.setDelayPerUnit(1 / (22 - 11 + 1));
    towerAnimation.setRestoreOriginalFrame(true);
    let towerAction = cc.animate(towerAnimation);

    // weapon animation
    let weaponAnimation = new cc.Animation();
    for (let i = 11; i <= 22; i++) {
        let fileName = "res/assets/tower/frame/boomerang_1_2/tower_boomerang_attack_1_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        weaponAnimation.addSpriteFrameWithFile(fileName);
    }
    weaponAnimation.setDelayPerUnit(1 / (22 - 11 + 1));
    weaponAnimation.setRestoreOriginalFrame(true);
    let weaponAction = cc.animate(weaponAnimation);

    towerSprite.runAction(cc.repeatForever(towerAction));
    weaponSprite.runAction(cc.repeatForever(weaponAction));

    node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(towerSprite, 0, "tower");
    node.addChild(weaponSprite, 0, "weapon");
    return node;
}