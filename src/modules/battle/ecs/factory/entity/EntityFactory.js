let EntityFactory = cc.Class.extend({});

EntityFactory.pool = new EntityPool()

EntityFactory._createEntity = function (typeID, mode) {
    Utils.validateMode(mode);
    // TODO: create pool object for each type bullet
    // let entity = this.pool.getInActiveEntity(typeID);
    let entity = null;
    if (entity === null) {
        entity = new EntityECS(typeID, mode);
        // this.pool.push(entity);
        EntityManager.getInstance().addEntity(entity);
    }
    return entity;
}

EntityFactory.createBullet = function (towerType, startPosition, targetEntity, staticPosition, effects, mode, bulletSpeed, bulletRadius, canTargetAirMonster) {
    Utils.validateMode(mode);
    if (towerType === GameConfig.ENTITY_ID.CANNON_TOWER) {
        let typeID = GameConfig.ENTITY_ID.BULLET;
        let entity = this._createEntity(typeID, mode);

        let bulletNode = new cc.Sprite("#tower_cannon_bullet_0000.png");
        let infoComponent = ComponentFactory.create(BulletInfoComponent, effects, "cannon", 0, canTargetAirMonster);
        let positionComponent = ComponentFactory.create(PositionComponent, startPosition.x, startPosition.y);
        let appearanceComponent = ComponentFactory.create(AppearanceComponent, bulletNode, mode);
        let collisionComponent = ComponentFactory.create(CollisionComponent, 0, 0, 10, 10);

        // let bulletSpeed = 5 * GameConfig.TILE_WIDTH;
        let chasingPosition = targetEntity.getComponent(PositionComponent);
        let speed = Utils.calculateVelocityVector(startPosition, chasingPosition, bulletSpeed);

        // BattleAnimation.createCannonBullet(startPosition, chasingPosition, bulletNode, bulletSpeed, mode);

        let velocityComponent = ComponentFactory.create(VelocityComponent, speed.speedX, speed.speedY, targetEntity.id);

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
    } else if (towerType === GameConfig.ENTITY_ID.FROG_TOWER) {
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
    } else if (towerType === GameConfig.ENTITY_ID.BUNNY_TOWER) {
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
    } else if (towerType === GameConfig.ENTITY_ID.WIZARD_TOWER) {
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
    return null;
}

EntityFactory.createTree = function (tilePos, mode) {
    let typeID = GameConfig.ENTITY_ID.TREE;
    let entity = this._createEntity(typeID, mode);

    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);

    let node = new cc.Node();
    let sp = new cc.Sprite(BattleResource.OBSTACLE_IMG_2);
    sp.setAnchorPoint(cc.p(0.5, 0.2));

    let treeShadow = new cc.Sprite(BattleResource.OBSTACLE_IMG_2);

    treeShadow.setColor(cc.color.BLACK);
    treeShadow.setOpacity(80);
    treeShadow.setScale(0.7, 0.7);
    treeShadow.setSkewX(-140);
    // treeShadow.setSkewY(0);
    treeShadow.setAnchorPoint(cc.p(0.3, 0.2))


    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "").node;
    hpBarNode.setPosition(cc.p(0, 50));

    let zOrder = 1;
    if (mode === GameConfig.PLAYER) {
        zOrder = GameConfig.MAP_HEIGH - tilePos.y;
    } else {
        zOrder = tilePos.y;
    }

    node.addChild(treeShadow, zOrder, "tree_shadow");
    node.addChild(sp, zOrder, "tree");
    node.addChild(hpBarNode, zOrder, "hp");

    if (mode === GameConfig.PLAYER)
        node.setName("PlayerTree");
    else node.setName("OpponentTree");
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode, pixelPos, zOrder);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let lifeComponent = ComponentFactory.create(LifeComponent, 100, 100);

    entity.addComponent(appearanceComponent)
        .addComponent(positionComponent)
        .addComponent(lifeComponent);

    return entity;
}

EntityFactory.createHole = function (tilePos, mode) {
    let typeID = GameConfig.ENTITY_ID.HOLE;
    let entity = this._createEntity(typeID, mode);

    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);

    let node = new cc.Node();
    let sp = new cc.Sprite(BattleResource.HOLE_IMG);
    node.addChild(sp, 1, "hole");
    if (mode === GameConfig.PLAYER)
        node.setName("PlayerHole");
    else node.setName("OpponentHole");
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode, pixelPos);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);

    entity.addComponent(appearanceComponent)
        .addComponent(positionComponent);

    return entity;
}