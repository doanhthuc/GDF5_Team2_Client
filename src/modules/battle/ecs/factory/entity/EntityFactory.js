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

EntityFactory.createBullet = function (towerType, startPosition, targetPosition, effects, mode, bulletSpeed, bulletRadius) {
    Utils.validateMode(mode);
    if (towerType === GameConfig.ENTITY_ID.CANNON_TOWER) {
        let typeID = GameConfig.ENTITY_ID.BULLET;
        let entity = this._createEntity(typeID, mode);

        // NOTE: get component from pool
        let bulletNode = new cc.Sprite("res/textures/tower/frame/cannon_1_2/tower_cannon_bullet_0000.png");
        let infoComponent = ComponentFactory.create(BulletInfoComponent, effects, 0.6);
        let positionComponent = ComponentFactory.create(PositionComponent, startPosition.x, startPosition.y);
        // let appearanceComponent = ComponentFactory.create(AppearanceComponent, bulletNode, mode);
        let collisionComponent = ComponentFactory.create(CollisionComponent, 0, 0, 1, 1);

        // let bulletSpeed = 5 * GameConfig.TILE_WIDTH;
        let speed = Utils.calculateVelocityVector(startPosition, targetPosition, bulletSpeed);

        BattleAnimation.createCannonBullet(startPosition, targetPosition, bulletNode, bulletSpeed, mode);

        let velocityComponent = ComponentFactory.create(VelocityComponent, speed.speedX, speed.speedY, targetPosition);

        entity.addComponent(infoComponent)
            .addComponent(positionComponent)
            // .addComponent(appearanceComponent)
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
        let collisionComponent = ComponentFactory.create(CollisionComponent, 0, 0, 1, 1);

        // let bulletSpeed = 4 * GameConfig.TILE_WIDTH;
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
        let infoComponent = ComponentFactory.create(BulletInfoComponent, effects, "frog", bulletRadius);
        let positionComponent = ComponentFactory.create(PositionComponent, startPosition.x, startPosition.y);
        let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
        let collisionComponent = ComponentFactory.create(CollisionComponent, 20, 20, 20, 20);

        let path = []

        // FIXME: PathMonsterSystem check currentPos and NextPos is same => velocity.SpeedX = 0
        // path.push(Utils.tile2Pixel(0,4,mode));
        let dividePath = Utils.divideCellPath(startPosition, targetPosition, 5);
        path.push({x: startPosition.x, y: startPosition.y});
        for (let i = 0; i < dividePath.length; i++) {
            path.push(dividePath[i]);
        }
        path.push({x: targetPosition.x, y: targetPosition.y});
        for (let i = dividePath.length - 1; i >= 0; i--) {
            path.push(dividePath[i]);
        }
        path.push({x: startPosition.x, y: startPosition.y});


        let pathComponent = ComponentFactory.create(PathComponent, path, mode, false);

        // let bulletSpeed = 4 * GameConfig.TILE_WIDTH;
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
        let typeID = GameConfig.ENTITY_ID.SLOW_BULLET;
        let entity = this._createEntity(typeID, mode);

        let node = new cc.Node();
        let bulletNode = new cc.Sprite("textures/tower/frame/oil_gun_1_2/tower_oil_gun_bullet_0000.png");
        node.addChild(bulletNode, 0, "bullet");
        let infoComponent = ComponentFactory.create(BulletInfoComponent, effects, "bunny", bulletRadius);
        let positionComponent = ComponentFactory.create(PositionComponent, startPosition.x, startPosition.y);
        let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
        let collisionComponent = ComponentFactory.create(CollisionComponent, 0, 0, 1, 1);

        // let bulletSpeed = 4 * GameConfig.TILE_WIDTH;
        let speed = Utils.calculateVelocityVector(startPosition, targetPosition, bulletSpeed);
        let staticPosition = cc.p(targetPosition.x, targetPosition.y)
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
        // let particle = new cc.ParticleSystem("res/textures/tower/fx/wizard_particle_1.plist");
        let bulletNode = new cc.Sprite("res/textures/tower/frame/wizard_1_2/tower_wizard_bullet_0000.png");
        node.addChild(bulletNode, 1);
        // node.addChild(particle, 22);

        // particle.resetSystem();
        // particle.setDuration(10)
        // particle.setSpeed(200)
        // particle.setBlendAdditive(true)
        // particle.setPositionType(cc.ParticleSystem.TYPE_FREE);
        // // particle.setScale(1, 1);
        // particle.setPosition(cc.p(0, 0));

        let infoComponent = ComponentFactory.create(BulletInfoComponent, effects, "wizard", bulletRadius);
        let positionComponent = ComponentFactory.create(PositionComponent, startPosition.x, startPosition.y);
        let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
        let collisionComponent = ComponentFactory.create(CollisionComponent, 0, 0, 20, 20);

        // let bulletSpeed = 3 * GameConfig.TILE_WIDTH;
        let speed = Utils.calculateVelocityVector(startPosition, targetPosition, bulletSpeed);
        let velocityComponent = ComponentFactory.create(VelocityComponent, speed.speedX, speed.speedY, null, cc.p(targetPosition.x, targetPosition.y));

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
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "").node;
    hpBarNode.setPosition(cc.p(0, 50));
    node.addChild(sp, 1, "tree");
    node.addChild(hpBarNode, 1, "hp");

    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode, pixelPos);
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

    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode, pixelPos);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);

    entity.addComponent(appearanceComponent)
        .addComponent(positionComponent);

    return entity;
}