let EntityFactory = cc.Class.extend({});

EntityFactory.pool = new EntityPool()

EntityFactory._createEntity = function (typeID, mode, entityId) {
    Utils.validateMode(mode);
    // TODO: create pool object for each type bullet
    // let entity = this.pool.getInActiveEntity(typeID);
    let entity = null;
    if (entity === null) {
        entity = new EntityECS(typeID, mode, entityId);
        // this.pool.push(entity);
        EntityManager.getInstance().addEntity(entity);
    }
    return entity;
}

EntityFactory.createBullet = function (towerType, startPosition, targetEntity, staticPosition, effects, mode, bulletSpeed, bulletRadius, canTargetAirMonster , entityId) {
    Utils.validateMode(mode);
    switch (towerType) {
        case GameConfig.ENTITY_ID.CANNON_TOWER:
            return this.createCannonOwlBullet(startPosition, targetEntity, staticPosition, effects, mode, bulletSpeed, bulletRadius, canTargetAirMonster);
        case GameConfig.ENTITY_ID.BEAR_TOWER:
            return this.createBearBullet(startPosition, targetEntity, staticPosition, effects, mode, bulletSpeed, bulletRadius, canTargetAirMonster);
        case GameConfig.ENTITY_ID.FROG_TOWER:
            return this.createBoomerangFrogBullet(startPosition, targetEntity, staticPosition, effects, mode, bulletSpeed, bulletRadius, canTargetAirMonster);
        case GameConfig.ENTITY_ID.BUNNY_TOWER:
            return this.createBunnyOilGunBullet(startPosition, targetEntity, staticPosition, effects, mode, bulletSpeed, bulletRadius, canTargetAirMonster);
        case GameConfig.ENTITY_ID.WIZARD_TOWER:
            return this.createWizardBullet(startPosition, targetEntity, staticPosition, effects, mode, bulletSpeed, bulletRadius, canTargetAirMonster);
        default:
            return null;
    }
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
    if (mode === GameConfig.USER1()) {
        zOrder = GameConfig.MAP_HEIGH - tilePos.y;
    } else {
        zOrder = tilePos.y;
    }

    node.addChild(treeShadow, zOrder, "tree_shadow");
    node.addChild(sp, zOrder, "tree");
    node.addChild(hpBarNode, zOrder, "hp");

    if (mode === GameConfig.USER1())
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
    if (mode === GameConfig.USER1())
        node.setName("PlayerHole");
    else node.setName("OpponentHole");
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode, pixelPos);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);

    entity.addComponent(appearanceComponent)
        .addComponent(positionComponent);

    return entity;
}