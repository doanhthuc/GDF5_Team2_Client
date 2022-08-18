EntityFactory.createCannonOwlBullet = function (towerType, startPosition, targetEntity, staticPosition, effects, mode, bulletSpeed, bulletRadius, canTargetAirMonster) {
    let typeID = GameConfig.ENTITY_ID.BULLET;
    let entity = this._createEntity(typeID, mode);

    let bulletNode = new cc.Sprite("#tower_cannon_bullet_0000.png");
    let infoComponent = ComponentFactory.create(BulletInfoComponent, effects, "cannon", 0, canTargetAirMonster);
    let positionComponent = ComponentFactory.create(PositionComponent, startPosition.x, startPosition.y);
    // let appearanceComponent = ComponentFactory.create(AppearanceComponent, bulletNode, mode);
    let collisionComponent = ComponentFactory.create(CollisionComponent, 0, 0, 10, 10);

    // let bulletSpeed = 5 * GameConfig.TILE_WIDTH;
    let chasingPosition = targetEntity.getComponent(PositionComponent);
    let speed = Utils.calculateVelocityVector(startPosition, chasingPosition, bulletSpeed);

    BattleAnimation.createCannonBullet(startPosition, chasingPosition, bulletNode, bulletSpeed, mode);

    let velocityComponent = ComponentFactory.create(VelocityComponent, speed.speedX, speed.speedY, targetEntity.id);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        // .addComponent(appearanceComponent)
        .addComponent(velocityComponent)
        .addComponent(collisionComponent);
    return entity;
}

EntityFactory.createBearBullet = function (towerType, startPosition, targetEntity, staticPosition, effects, mode, bulletSpeed, bulletRadius, canTargetAirMonster) {
    let typeID = GameConfig.ENTITY_ID.BULLET;
    let entity = this._createEntity(typeID, mode);

    let bulletNode = new cc.Sprite("res/textures/tower/frame/ice_gun_1_2/tower_ice_gun_bullet_0000.png");
    let infoComponent = ComponentFactory.create(BulletInfoComponent, effects, "bear", 0, canTargetAirMonster);
    let positionComponent = ComponentFactory.create(PositionComponent, startPosition.x, startPosition.y);
    // let appearanceComponent = ComponentFactory.create(AppearanceComponent, bulletNode, mode);
    let collisionComponent = ComponentFactory.create(CollisionComponent, 0, 0, 10, 10);

    // let bulletSpeed = 4 * GameConfig.TILE_WIDTH;
    let chasingPosition = targetEntity.getComponent(PositionComponent);
    let speed = Utils.calculateVelocityVector(startPosition, chasingPosition, bulletSpeed);
    let velocityComponent = ComponentFactory.create(VelocityComponent, speed.speedX, speed.speedY, targetEntity.id);

    BattleAnimation.createBearBullet(startPosition, chasingPosition, bulletNode, bulletSpeed, mode);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        // .addComponent(appearanceComponent)
        .addComponent(velocityComponent)
        .addComponent(collisionComponent);
    return entity;
}

EntityFactory.createBoomerangFrogBullet = function (towerType, startPosition, targetEntity, staticPosition, effects, mode, bulletSpeed, bulletRadius, canTargetAirMonster) {
    let typeID = GameConfig.ENTITY_ID.BULLET;
    let entity = this._createEntity(typeID, mode);

    let node = new cc.Node();
    let bulletNode = new cc.Sprite("#tower_boomerang_bullet_1_0000.png");
    node.addChild(bulletNode, 0, "weapon");
    let infoComponent = ComponentFactory.create(BulletInfoComponent, effects, "frog", bulletRadius, canTargetAirMonster);
    let positionComponent = ComponentFactory.create(PositionComponent, startPosition.x, startPosition.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode, cc.p(startPosition.x, staticPosition.y), 10);
    let collisionComponent = ComponentFactory.create(CollisionComponent, 40, 40, 40, 40);

    let path = []

    // FIXME: PathMonsterSystem check currentPos and NextPos is same => velocity.SpeedX = 0
    // path.push(Utils.tile2Pixel(0,4,mode));
    let dividePath = Utils.divideCellPath(startPosition, staticPosition, 5);
    path.push({x: startPosition.x, y: startPosition.y});
    for (let i = 0; i < dividePath.length; i++) {
        path.push(dividePath[i]);
    }
    path.push({x: staticPosition.x, y: staticPosition.y});
    for (let i = dividePath.length - 1; i >= 0; i--) {
        path.push(dividePath[i]);
    }
    path.push({x: startPosition.x, y: startPosition.y});


    let pathComponent = ComponentFactory.create(PathComponent, path, mode, false);

    // let bulletSpeed = 4 * GameConfig.TILE_WIDTH;
    let speed = Utils.calculateVelocityVector(startPosition, staticPosition, bulletSpeed);
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
}

EntityFactory.createBunnyOilGunBullet = function (towerType, startPosition, targetEntity, staticPosition, effects, mode, bulletSpeed, bulletRadius, canTargetAirMonster) {
    let typeID = GameConfig.ENTITY_ID.SLOW_BULLET;
    let entity = this._createEntity(typeID, mode);

    let node = new cc.Node();
    let bulletNode = new cc.Sprite("#tower_oil_gun_bullet_0000.png");
    node.addChild(bulletNode, 0, "bullet");
    let infoComponent = ComponentFactory.create(BulletInfoComponent, effects, "bunny", bulletRadius, canTargetAirMonster);
    let positionComponent = ComponentFactory.create(PositionComponent, startPosition.x, startPosition.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
    let collisionComponent = ComponentFactory.create(CollisionComponent, 0, 0, 10, 10);

    let speed = Utils.calculateVelocityVector(startPosition, staticPosition, bulletSpeed);
    let velocityComponent = ComponentFactory.create(VelocityComponent, speed.speedX, speed.speedY, null, staticPosition);
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, BulletAnimationConfig.oil.level.A);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(velocityComponent)
        .addComponent(collisionComponent)
        .addComponent(spriteComponent);
    return entity;
}

EntityFactory.createWizardBullet = function (towerType, startPosition, targetEntity, staticPosition, effects, mode, bulletSpeed, bulletRadius, canTargetAirMonster) {
    let typeID = GameConfig.ENTITY_ID.WIZARD_BULLET;
    let entity = this._createEntity(typeID, mode);

    let node = new cc.Node();
    let bulletNode = new cc.Sprite("#tower_wizard_bullet_0000.png");
    node.addChild(bulletNode, 1);

    let infoComponent = ComponentFactory.create(BulletInfoComponent, effects, "wizard", bulletRadius, canTargetAirMonster);
    let positionComponent = ComponentFactory.create(PositionComponent, startPosition.x, startPosition.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
    let collisionComponent = ComponentFactory.create(CollisionComponent, 0, 0, 20, 20);

    // let bulletSpeed = 3 * GameConfig.TILE_WIDTH;
    let speed = Utils.calculateVelocityVector(startPosition, staticPosition, bulletSpeed);
    let velocityComponent = ComponentFactory.create(VelocityComponent, speed.speedX, speed.speedY, null, cc.p(staticPosition.x, staticPosition.y));

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(velocityComponent)
        .addComponent(collisionComponent);
    return entity;
}