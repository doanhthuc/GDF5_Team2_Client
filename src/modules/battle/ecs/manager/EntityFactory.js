let EntityFactory = cc.Class.extend({

});

EntityFactory.pool = new EntityPool()

// Static method
EntityFactory.createSwordsmanMonster = function () {
    let typeID = GameConfig.ENTITY_ID.SWORD_MAN;
    let entity = this.pool.getInvisibleEntity(typeID);
    if (entity === null) {
        entity = new EntityECS(typeID);

        // NOTE: get component from pool
        let initPos = Utils.tile2Pixel(0, 4);
        let infoComponent = new MonsterInfoComponent("normal", "land", 30, 1, 1, undefined);
        let positionComponent = new PositionComponent(initPos.x, initPos.y);
        let velocityComponent = new VelocityComponent(2*GameConfig.TILE_WIDTH, 0);
        let appearanceComponent = new AppearanceComponent(new cc.Sprite("res/assets/monster/frame/swordsman/monster_swordsman_run_0019.png"));
        let pathComponent = new PathComponent([{x: 0, y: 4}, {x: 3, y: 4}, {x: 3, y: 2}, {x:6, y: 2}, {x: 6, y: 0}])

        entity.addComponent(infoComponent)
            .addComponent(positionComponent)
            .addComponent(velocityComponent)
            .addComponent(appearanceComponent)
            .addComponent(pathComponent);
        this.pool.push(entity);
        EntityManager.getInstance().addEntity(entity);
    }

    return entity;
};

EntityFactory.createCannonOwlTower = function () {
    let typeID = GameConfig.ENTITY_ID.CANNON_TOWER;
    let entity = this.pool.getInvisibleEntity(typeID);
    if (entity === null) {
        entity = new EntityECS(typeID);

        // NOTE: get component from pool
        let initPos = Utils.tile2Pixel(3, 3);
        let node = createNodeAnimation();

        let infoComponent = new TowerInfoComponent("normal", "land", 30, 1, 1, undefined);
        let positionComponent = new PositionComponent(initPos.x, initPos.y);
        let appearanceComponent = new AppearanceComponent(node);

        entity.addComponent(infoComponent)
            .addComponent(positionComponent)
            .addComponent(appearanceComponent)

        this.pool.push(entity);
        EntityManager.getInstance().addEntity(entity);
    }

    return entity;
};

function createNodeAnimation() {
    let node = new cc.Node();
    let owlSprite = new cc.Sprite("res/assets/tower/frame/cannon_1_2/tower_cannon_attack_0_0009.png");
    let cannonSprite = new cc.Sprite("res/assets/tower/frame/cannon_1_2/tower_cannon_attack_2_0009.png");

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

    node.addChild(owlSprite, 0, "owl");
    node.addChild(cannonSprite, 0, "cannon");
    return node;
}