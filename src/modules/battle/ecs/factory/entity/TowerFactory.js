EntityFactory.createCannonOwlTower = function (tilePos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.CANNON_TOWER;
    let entity = this._createEntity(typeID, mode);
    let towerConfig = TowerConfig.getTowerConfigFromJson(typeID, 1);
    cc.log("[EntityFactory line 458] create cannon tower: " + JSON.stringify(towerConfig));
    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
    let attackRange = 1.5 * GameConfig.TILE_WIDTH;
    let node = NodeFactory.createOwlNodeAnimation(attackRange);

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
    let node = NodeFactory.createBearNodeAnimation(attackRange);

    let frozenEffect = ComponentFactory.create(FrozenEffect, 1.5);

    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(TowerInfoComponent, 10, "bulletTargetType", "support", "monster", "bulletType");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
    let attackComponent = ComponentFactory.create(AttackComponent, 8, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, 2, 0, [frozenEffect])
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
    let node = NodeFactory.createFrogNodeAnimation(attackRange);

    let damageEffect = ComponentFactory.create(DamageEffect, 3);
    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(TowerInfoComponent, 10, "bulletTargetType", "attack", "monster", "bulletType");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
    let attackComponent = ComponentFactory.create(AttackComponent, 30, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, 1.5, 0, [])
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
    let node = NodeFactory.createBunnyNodeAnimation(attackRange);

    let slowEffect = ComponentFactory.create(SlowEffect, 1, 0.3);
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
    let node = NodeFactory.createWizardNodeAnimation(attackRange);

    
    let infoComponent = ComponentFactory.create(TowerInfoComponent, 10, "bulletTargetType", "attack", "monster", "bulletType");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
    let attackComponent = ComponentFactory.create(AttackComponent, 50, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, 1.2, 0, [])
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
    let node = NodeFactory.createSnakeAttackSpeedNodeAnimation(attackRange);

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
    let node = NodeFactory.createGoatDamageNodeAnimation(attackRange);

    let infoComponent = ComponentFactory.create(TowerInfoComponent, 10, "", "support", "aura", "");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let buffAttackDamageEffect = ComponentFactory.create(BuffAttackDamageEffect, 1.5);
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