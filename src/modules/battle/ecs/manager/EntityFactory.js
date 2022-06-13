let EntityFactory = cc.Class.extend({

});

EntityFactory.pool = new EntityPool()

// Static method
EntityFactory.createSwordsmanMonster = function () {
    let id = GameConfig.ENTITY_ID.SWORD_MAN;
    let entity = this.pool.getInvisibleEntity(id);
    if (entity === null) {
        entity = new EntityECS(id);

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
    let id = GameConfig.ENTITY_ID.CANNON_TOWER;
    let entity = this.pool.getInvisibleEntity(id);
    if (entity === null) {
        entity = new EntityECS(id);

        // NOTE: get component from pool
        let initPos = Utils.tile2Pixel(3, 3);
        let node = new cc.Node();
        node.addChild(new cc.Sprite("res/assets/tower/frame/cannon_1_2/tower_cannon_attack_0_0000.png"));
        node.addChild(new cc.Sprite("res/assets/tower/frame/cannon_1_2/tower_cannon_attack_1_0000.png"));

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