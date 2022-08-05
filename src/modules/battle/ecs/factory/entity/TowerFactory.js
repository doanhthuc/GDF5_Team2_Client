EntityFactory.createCannonOwlTower = function (tilePos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.CANNON_TOWER;
    let entity = this._createEntity(typeID, mode);
    let towerConfig = TowerConfig.getTowerConfigFromJson(typeID, 1);
    cc.log("[EntityFactory line 458] create cannon tower: " + JSON.stringify(towerConfig));
    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
    // let attackRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
    let attackRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
    let attackDamage = towerConfig.stat.damage;
    let attackSpeed = towerConfig.stat.attackSpeed / 1000;
    let bulletSpeed = towerConfig.stat.bulletSpeed * GameConfig.TILE_WIDTH / 10;
    let bulletRadius = towerConfig.stat.bulletRadius * GameConfig.TILE_WIDTH;
    let towerEnergy = CARD_CONST[typeID].energy;

    let node = NodeFactory.createOwlNodeAnimation(attackRange);

    // let frozenEffect = ComponentFactory.create(FrozenEffect, 1.5);
    // let slowEffect = ComponentFactory.create(SlowEffect, 3, 0.3);
    // let buffAttackDamageEffect = ComponentFactory.create(BuffAttackDamageEffect, 10);
    // let buffAttackSpeedEffect = ComponentFactory.create(BuffAttackSpeedEffect, 1.3);

    let infoComponent = ComponentFactory.create(TowerInfoComponent, towerEnergy, "bulletTargetType", "attack", "monster", "bulletType");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
    let attackComponent = ComponentFactory.create(AttackComponent, attackDamage, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, attackSpeed, 0, [], bulletSpeed, bulletRadius);
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
    let towerConfig = TowerConfig.getBearIceGunTowerConfigFromJson(1);
    let attackRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
    let attackDamage = towerConfig.stat.damage;
    let attackSpeed = towerConfig.stat.attackSpeed / 1000;
    let bulletSpeed = towerConfig.stat.bulletSpeed * GameConfig.TILE_WIDTH / 10;
    let bulletRadius = towerConfig.stat.bulletRadius * GameConfig.TILE_WIDTH;

    let frozenDuration = towerConfig.frozenDuration / 1000;

    let towerEnergy = CARD_CONST[typeID].energy;

    let node = NodeFactory.createBearNodeAnimation(attackRange);
    let frozenEffect = ComponentFactory.create(FrozenEffect, frozenDuration);

    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(TowerInfoComponent, towerEnergy, "bulletTargetType", "support", "monster", "bulletType");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
    let attackComponent = ComponentFactory.create(AttackComponent, attackDamage, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, attackSpeed, 0, [frozenEffect], bulletSpeed, bulletRadius);
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

    let towerConfig = TowerConfig.getTowerConfigFromJson(typeID, 1);
    let attackRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
    let attackDamage = towerConfig.stat.damage;
    let attackSpeed = towerConfig.stat.attackSpeed / 1000;
    let bulletSpeed = towerConfig.stat.bulletSpeed * GameConfig.TILE_WIDTH / 10;
    let bulletRadius = towerConfig.stat.bulletRadius * GameConfig.TILE_WIDTH;
    let towerEnergy = CARD_CONST[typeID].energy;

    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
    let node = NodeFactory.createFrogNodeAnimation(attackRange);

    let damageEffect = ComponentFactory.create(DamageEffect, 3);
    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(TowerInfoComponent, towerEnergy, "bulletTargetType", "attack", "monster", "bulletType");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
    let attackComponent = ComponentFactory.create(AttackComponent, attackDamage, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, attackSpeed, 0, [], bulletSpeed, bulletRadius);
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
    let towerConfig = TowerConfig.getBunnyOilGunTowerConfigFromJson(1);
    let attackRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
    let attackDamage = towerConfig.stat.damage;
    let attackSpeed = towerConfig.stat.attackSpeed / 1000;
    let bulletSpeed = towerConfig.stat.bulletSpeed * GameConfig.TILE_WIDTH / 10;
    let bulletRadius = towerConfig.stat.bulletRadius * GameConfig.TILE_WIDTH;
    let slowDuration = towerConfig.slowDuration / 1000;
    let slowValue = towerConfig.slowValue * -1;
    let towerEnergy = CARD_CONST[typeID].energy;
    let node = NodeFactory.createBunnyNodeAnimation(attackRange);

    let slowEffect = ComponentFactory.create(SlowEffect, slowDuration, slowValue);
    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(TowerInfoComponent, towerEnergy, "bulletTargetType", "attack", "monster", "bulletType");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
    let attackComponent = ComponentFactory.create(AttackComponent, attackDamage, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, attackSpeed, 0, [slowEffect], bulletSpeed, bulletRadius);
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
    let towerConfig = TowerConfig.getTowerConfigFromJson(typeID, 1);
    let attackRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
    let attackDamage = towerConfig.stat.damage;
    let attackSpeed = towerConfig.stat.attackSpeed / 1000;
    let bulletSpeed = towerConfig.stat.bulletSpeed * GameConfig.TILE_WIDTH / 10;
    let bulletRadius = towerConfig.stat.bulletRadius * GameConfig.TILE_WIDTH;
    let towerEnergy = CARD_CONST[typeID].energy;
    let node = NodeFactory.createWizardNodeAnimation(attackRange);


    let infoComponent = ComponentFactory.create(TowerInfoComponent, towerEnergy, "bulletTargetType", "attack", "monster", "bulletType");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
    let attackComponent = ComponentFactory.create(AttackComponent, attackDamage, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, attackSpeed, 0, [], bulletSpeed, bulletRadius);
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
    let towerConfig = TowerConfig.getAttackSpeedSnakeTowerConfigFromJson(1);
    let buffRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
    let attackSpeedUpValue = towerConfig.attackSpeedUpValue;
    let towerEnergy = CARD_CONST[typeID].energy;
    let node = NodeFactory.createSnakeAttackSpeedNodeAnimation(buffRange);

    let infoComponent = ComponentFactory.create(TowerInfoComponent, towerEnergy, "", "support", "aura", "");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let buffAttackSpeedEffect = ComponentFactory.create(BuffAttackSpeedEffect, attackSpeedUpValue);
    let towerAbilityComponent = ComponentFactory.create(TowerAbilityComponent, buffRange, buffAttackSpeedEffect);
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
    let towerConfig = TowerConfig.getDamageGoatTowerConfigFromJson(1);
    let buffRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
    let damageUpValue = towerConfig.damageUpValue;
    let node = NodeFactory.createGoatDamageNodeAnimation(buffRange);

    let infoComponent = ComponentFactory.create(TowerInfoComponent, 10, "", "support", "aura", "");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let buffAttackDamageEffect = ComponentFactory.create(BuffAttackDamageEffect, damageUpValue);
    let towerAbilityComponent = ComponentFactory.create(TowerAbilityComponent, buffRange, buffAttackDamageEffect);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);

    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, TowerAnimationConfig.goat.level.A);

    entity.addComponent(infoComponent)
        .addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(towerAbilityComponent)
        .addComponent(spriteComponent);

    return entity;
}

EntityFactory.onUpdateTowerLevel = function (entityId, towerLevel) {
    let towerEntity = EntityManager.getInstance().getEntity(entityId);
    cc.log("[TowerFactory.js line 233]: ======================== " + JSON.stringify(towerEntity));
    let towerRank = ReadConfigUtils.getTowerCharRankByLevel(towerLevel);
    let animationConfig = towerEntity.getComponent(SpriteSheetAnimationComponent);
    let towerName = TOWER_NAME[towerEntity.typeID];
    animationConfig.reset(TowerAnimationConfig[towerName].level[towerRank]);
    switch (towerEntity.typeID) {
        case GameConfig.ENTITY_ID.CANNON_TOWER:
        case GameConfig.ENTITY_ID.WIZARD_TOWER:
        case GameConfig.ENTITY_ID.FROG_TOWER: {
            let attackComponent = towerEntity.getComponent(AttackComponent);
            let towerConfig = TowerConfig.getTowerConfigFromJson(towerEntity.typeID, towerLevel);
            let attackRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
            let attackDamage = towerConfig.stat.damage;
            let attackSpeed = towerConfig.stat.attackSpeed / 1000;
            let bulletSpeed = towerConfig.stat.bulletSpeed * GameConfig.TILE_WIDTH / 10;
            let bulletRadius = towerConfig.stat.bulletRadius * GameConfig.TILE_WIDTH;
            cc.log("[TowerFactory.js line 275 ] attackDamage: " + attackDamage)
            attackComponent.updateAttackStatistic(attackDamage, attackRange, attackSpeed, [], bulletSpeed, bulletRadius);
            break;
        }
        case GameConfig.ENTITY_ID.BEAR_TOWER: {
            let attackComponent = towerEntity.getComponent(AttackComponent);
            let towerConfig = TowerConfig.getBearIceGunTowerConfigFromJson(towerLevel);
            let attackRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
            let attackDamage = towerConfig.stat.damage;
            let attackSpeed = towerConfig.stat.attackSpeed / 1000;
            let bulletSpeed = towerConfig.stat.bulletSpeed * GameConfig.TILE_WIDTH / 10;
            let bulletRadius = towerConfig.stat.bulletRadius * GameConfig.TILE_WIDTH;
            let frozenDuration = towerConfig.frozenDuration / 1000;
            let frozenEffect = ComponentFactory.create(FrozenEffect, frozenDuration);
            attackComponent.updateAttackStatistic(attackDamage, attackRange, attackSpeed, [frozenEffect], bulletSpeed, bulletRadius);
            break;
        }
        case GameConfig.ENTITY_ID.BUNNY_TOWER: {
            let attackComponent = towerEntity.getComponent(AttackComponent);
            let towerConfig = TowerConfig.getBunnyOilGunTowerConfigFromJson(towerLevel);
            let attackRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
            let attackDamage = towerConfig.stat.damage;
            let attackSpeed = towerConfig.stat.attackSpeed / 1000;
            let bulletSpeed = towerConfig.stat.bulletSpeed * GameConfig.TILE_WIDTH / 10;
            let bulletRadius = towerConfig.stat.bulletRadius * GameConfig.TILE_WIDTH;
            let slowDuration = towerConfig.slowDuration / 1000;
            let slowValue = towerConfig.slowValue * -1;
            let slowEffect = ComponentFactory.create(SlowEffect, slowDuration, slowValue);
            attackComponent.updateAttackStatistic(attackDamage, attackRange, attackSpeed, [slowEffect], bulletSpeed, bulletRadius);
            break;
        }
        case GameConfig.ENTITY_ID.GOAT_TOWER: {
            let towerAbilityComponent = towerEntity.getComponent(TowerAbilityComponent);
            let towerConfig = TowerConfig.getDamageGoatTowerConfigFromJson(towerLevel);
            let buffRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
            let damageUpValue = towerConfig.damageUpValue;
            towerAbilityComponent.reset(buffRange, damageUpValue);
            break;
        }
        case GameConfig.ENTITY_ID.SNAKE_TOWER: {
            let towerConfig = TowerConfig.getAttackSpeedSnakeTowerConfigFromJson(towerLevel);
            let buffRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
            let attackSpeedUpValue = towerConfig.attackSpeedUpValue;
            let towerAbilityComponent = towerEntity.getComponent(TowerAbilityComponent);
            towerAbilityComponent.reset(buffRange, attackSpeedUpValue);
            break;
        }
    }
}