let EntityFactory = cc.Class.extend({

});

EntityFactory.pool = new EntityPool()

EntityFactory.createEntity = function (typeID) {
    let entity = this.pool.getInActiveEntity(typeID);
    if (entity === null) {
        entity = new EntityECS(typeID);
        this.pool.push(entity);
        EntityManager.getInstance().addEntity(entity);
    }
    return entity;
}

EntityFactory.createSwordsmanMonster = function () {
    let typeID = GameConfig.ENTITY_ID.SWORD_MAN;
    let entity = this.createEntity(typeID);

    // NOTE: get component from pool
    let initPos = Utils.tile2Pixel(0, 4);
    let infoComponent = new MonsterInfoComponent("normal", "land", 30, 1, 1, undefined);
    let positionComponent = new PositionComponent(initPos.x, initPos.y);
    let velocityComponent = new VelocityComponent(0.8*GameConfig.TILE_WIDTH, 0);
    let appearanceComponent = new AppearanceComponent(new cc.Sprite("res/assets/monster/frame/swordsman/monster_swordsman_run_0019.png"));
    let pathComponent = new PathComponent([{x: 0, y: 4}, {x: 4, y: 4}, {x: 4, y: 2}, {x:6, y: 2}, {x: 6, y: 0}])
    let collisionComponent = new CollisionComponent(10, 10);
    let lifeComponent = new LifeComponent(18);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(velocityComponent)
        .addComponent(appearanceComponent)
        .addComponent(pathComponent)
        .addComponent(collisionComponent)
        .addComponent(lifeComponent);

    return entity;
};

EntityFactory.createCannonOwlTower = function () {
    let typeID = GameConfig.ENTITY_ID.CANNON_TOWER;
    let entity = this.createEntity(typeID);

    let initPos = Utils.tile2Pixel(3, 3);
    let node = createNodeAnimation();

    let damageEffect = new DamageEffect(10);
    // NOTE: get component from pool
    let infoComponent = new TowerInfoComponent(10, "bulletTargetType", [damageEffect], "attack", "monster", 1.5, "bulletType",
        GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, 0, 0.6, "damage");
    let positionComponent = new PositionComponent(initPos.x, initPos.y);
    let appearanceComponent = new AppearanceComponent(node);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(damageEffect);

    return entity;
};

EntityFactory.createIceGunPolarBearTower = function (pos) {
    let typeID = GameConfig.ENTITY_ID.BEAR_TOWER;
    let entity = this.createEntity(typeID);

    let initPos = Utils.tile2Pixel(pos.x, pos.y);
    let node = createBearNodeAnimation();

    // NOTE: get component from pool
    let infoComponent = new TowerInfoComponent(12, "bulletTargetType", [], "attack", "monster", 1.5, "bulletType",
        GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, 0, 3, "support");
    let positionComponent = new PositionComponent(initPos.x, initPos.y);
    let appearanceComponent = new AppearanceComponent(node);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(appearanceComponent)

    return entity;
}

EntityFactory.createBullet = function (towerType, startPosition, targetPosition, effects) {
    if (GameConfig.ENTITY_ID.CANNON_TOWER === towerType) {
        let typeID = GameConfig.ENTITY_ID.BULLET;
        let entity = this.createEntity(typeID);

        // NOTE: get component from pool
        let node = new cc.Sprite("res/assets/tower/frame/cannon_1_2/tower_cannon_bullet_0000.png");
        let infoComponent = new BulletInfoComponent(effects);
        let positionComponent = new PositionComponent(startPosition.x, startPosition.y);
        let appearanceComponent = new AppearanceComponent(node);
        let collisionComponent = new CollisionComponent(20, 20);

        let bulletVelocity = 5 * GameConfig.TILE_WIDTH;
        let speed = Utils.calculateVelocityVector(startPosition, targetPosition, bulletVelocity);
        let velocityComponent = new VelocityComponent(speed.speedX, speed.speedY, targetPosition, bulletVelocity);

        entity.addComponent(infoComponent)
            .addComponent(positionComponent)
            .addComponent(appearanceComponent)
            .addComponent(velocityComponent)
            .addComponent(collisionComponent);
        return entity;
    } else if (GameConfig.ENTITY_ID.BEAR_TOWER === towerType) {

    }
    return null;
}

function createNodeAnimation() {
    let node = new cc.Node();
    let owlSprite = new cc.Sprite("res/assets/tower/frame/cannon_1_2/tower_cannon_attack_0_0009.png");
    let cannonSprite = new cc.Sprite("res/assets/tower/frame/cannon_1_2/tower_cannon_attack_2_0009.png");
    let rangeAttackSprite = new cc.Sprite("res/assets/battle/battle_tower_range_player.png");
    rangeAttackSprite.setScale(2*1.5*GameConfig.TILE_WIDTH/687)

    // cannon animation
    let cannonAnimation = new cc.Animation();
    for (let i = 9; i <= 17; i++) {
        let fileName = "res/assets/tower/frame/cannon_1_2/tower_cannon_attack_2_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        cannonAnimation.addSpriteFrameWithFile(fileName);
    }
    cannonAnimation.setDelayPerUnit(1 / (17-9+1));
    cannonAnimation.setRestoreOriginalFrame(true);
    let cannonAction = cc.animate(cannonAnimation);

    // tower animation
    let owlAnimation = new cc.Animation();
    for (let i = 9; i <= 17; i++) {
        let fileName = "res/assets/tower/frame/cannon_1_2/tower_cannon_attack_0_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        owlAnimation.addSpriteFrameWithFile(fileName);
    }
    owlAnimation.setDelayPerUnit(1 / (17-9+1));
    owlAnimation.setRestoreOriginalFrame(true);
    let owlAction = cc.animate(owlAnimation);

    cannonSprite.runAction(cc.repeatForever(cannonAction));
    owlSprite.runAction(cc.repeatForever(owlAction));

    node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(owlSprite, 0, "owl");
    node.addChild(cannonSprite, 0, "cannon");
    return node;
}

function createBearNodeAnimation () {
    let node = new cc.Node();
    let towerSprite = new cc.Sprite("res/assets/tower/frame/ice_gun_1_2/tower_ice_gun_attack_0_0010.png");
    let weaponSprite = new cc.Sprite("res/assets/tower/frame/ice_gun_1_2/tower_ice_gun_attack_1_0010.png");
    let rangeAttackSprite = new cc.Sprite("res/assets/battle/battle_tower_range_player.png");
    rangeAttackSprite.setScale(2*1.5*GameConfig.TILE_WIDTH/687)

    // tower animation
    let towerAnimation = new cc.Animation();
    for (let i = 10; i <= 19; i++) {
        let fileName = "res/assets/tower/frame/ice_gun_1_2/tower_ice_gun_attack_0_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        towerAnimation.addSpriteFrameWithFile(fileName);
    }
    towerAnimation.setDelayPerUnit(1 / (19-10+1));
    towerAnimation.setRestoreOriginalFrame(true);
    let towerAction = cc.animate(towerAnimation);

    // weapon animation
    let weaponAnimation = new cc.Animation();
    for (let i = 10; i <= 19; i++) {
        let fileName = "res/assets/tower/frame/ice_gun_1_2/tower_ice_gun_attack_1_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        weaponAnimation.addSpriteFrameWithFile(fileName);
    }
    weaponAnimation.setDelayPerUnit(1 / (19-10+1));
    weaponAnimation.setRestoreOriginalFrame(true);
    let weaponAction = cc.animate(weaponAnimation);

    towerSprite.runAction(cc.repeatForever(towerAction));
    weaponSprite.runAction(cc.repeatForever(weaponAction));

    node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(towerSprite, 0, "tower");
    node.addChild(weaponSprite, 0, "weapon");
    return node;
}