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

    let node = NodeFactory.createOwlNodeAnimation(attackRange, mode);

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
    let canTargetAirMonster = false;

    let frozenDuration = towerConfig.frozenDuration / 1000;

    let towerEnergy = CARD_CONST[typeID].energy;

    let node = NodeFactory.createBearNodeAnimation(attackRange, false, mode);
    let frozenEffect = ComponentFactory.create(FrozenEffect, frozenDuration);

    // NOTE: get component from pool
    let infoComponent = ComponentFactory.create(TowerInfoComponent, towerEnergy, "bulletTargetType", "support", "monster", "bulletType");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
    let attackComponent = ComponentFactory.create(AttackComponent, attackDamage, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, attackSpeed, 0, [frozenEffect], bulletSpeed, bulletRadius, canTargetAirMonster);
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
    let node = NodeFactory.createFrogNodeAnimation(attackRange, mode);

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
    let node = NodeFactory.createBunnyNodeAnimation(attackRange, mode);

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
    let canTargetAirMonster = false;
    let towerEnergy = CARD_CONST[typeID].energy;
    let node = NodeFactory.createWizardNodeAnimation(attackRange, mode);


    let infoComponent = ComponentFactory.create(TowerInfoComponent, towerEnergy, "bulletTargetType", "attack", "monster", "bulletType");
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
    let attackComponent = ComponentFactory.create(AttackComponent, attackDamage, GameConfig.TOWER_TARGET_STRATEGY.MAX_HP, attackRange, attackSpeed, 0, [], bulletSpeed, bulletRadius, canTargetAirMonster);
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
    let node = NodeFactory.createSnakeAttackSpeedNodeAnimation(buffRange, mode);

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
    let node = NodeFactory.createGoatDamageNodeAnimation(buffRange, mode);

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

EntityFactory.onUpdateTowerLevel = function (entityId, towerLevel, tilePos, mode) {
    let towerEntity = EntityManager.getInstance().getEntity(entityId);
    cc.log("[TowerFactory.js line 233]: ======================== " + JSON.stringify(towerEntity));
    let towerRank = ReadConfigUtils.getTowerCharRankByLevel(towerLevel);
    let animationConfig = towerEntity.getComponent(SpriteSheetAnimationComponent);
    let appearanceComponent = towerEntity.getComponent(AppearanceComponent);
    let node = appearanceComponent.sprite;
    let towerName = TOWER_NAME[towerEntity.typeID];
    animationConfig.reset(TowerAnimationConfig[towerName].level[towerRank]);
    let towerInfoComponent = towerEntity.getComponent(TowerInfoComponent);
    towerInfoComponent.level = towerLevel;
    switch (towerEntity.typeID) {
        case GameConfig.ENTITY_ID.CANNON_TOWER: {
            let attackComponent = towerEntity.getComponent(AttackComponent);
            let towerConfig = TowerConfig.getTowerConfigFromJson(towerEntity.typeID, towerLevel);
            let attackRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
            let attackDamage = towerConfig.stat.damage;
            let attackSpeed = towerConfig.stat.attackSpeed / 1000;
            let bulletSpeed = towerConfig.stat.bulletSpeed * GameConfig.TILE_WIDTH / 10;
            let bulletRadius = towerConfig.stat.bulletRadius * GameConfig.TILE_WIDTH;
            cc.log("[TowerFactory.js line 275 ] attackDamage: " + attackDamage)
            attackComponent.updateAttackStatistic(attackDamage, attackRange, attackSpeed, [], bulletSpeed, bulletRadius);
            //Add BulletSkill
            if (towerLevel === GameConfig.TOWER_MAX_LEVEL) {
                let frozenEffect = ComponentFactory.create(FrozenEffect, 0.2);
                attackComponent.addEffect(frozenEffect);
            }
            // change Node name
            if (mode === GameConfig.PLAYER)
                node.setName("PlayerTower_0_level_" + towerLevel);
            else node.setName("OpponentTower_0_level_" + towerLevel);
            break;
        }
        case GameConfig.ENTITY_ID.WIZARD_TOWER: {
            let attackComponent = towerEntity.getComponent(AttackComponent);
            let towerConfig = TowerConfig.getTowerConfigFromJson(towerEntity.typeID, towerLevel);
            let attackRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
            let attackDamage = towerConfig.stat.damage;
            let attackSpeed = towerConfig.stat.attackSpeed / 1000;
            let bulletSpeed = towerConfig.stat.bulletSpeed * GameConfig.TILE_WIDTH / 10;
            let bulletRadius = towerConfig.stat.bulletRadius * GameConfig.TILE_WIDTH;
            cc.log("[TowerFactory.js line 275 ] attackDamage: " + attackDamage)
            attackComponent.updateAttackStatistic(attackDamage, attackRange, attackSpeed, [], bulletSpeed, bulletRadius);
            //Add BulletSkill
            if (towerLevel === GameConfig.TOWER_MAX_LEVEL) {
                let wizardBulletSkill = ComponentFactory.create(WizardBulletSkillComponent, 5);
                attackComponent.addEffect(wizardBulletSkill);
            }
            if (mode === GameConfig.PLAYER)
                node.setName("PlayerTower_1_level_" + towerLevel);
            else node.setName("OpponentTower_1_level_" + towerLevel);
            break;
        }
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
            //Add BulletSkill
            if (towerLevel === GameConfig.TOWER_MAX_LEVEL) {
                let frogBulletSkill = ComponentFactory.create(FrogBulletSkillComponent);
                attackComponent.addEffect(frogBulletSkill);
            }
            if (mode === GameConfig.PLAYER)
                node.setName("PlayerTower_2_level_" + towerLevel);
            else node.setName("OpponentTower_2_level_" + towerLevel);
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
            //Add BulletSkill
            if (towerLevel === GameConfig.TOWER_MAX_LEVEL) {
                let damageAmplifyComponent = ComponentFactory.create(DamageAmplifyComponent, 1.5);
                attackComponent.addEffect(damageAmplifyComponent);
            }
            if (mode === GameConfig.PLAYER)
                node.setName("PlayerTower_3_level_" + towerLevel);
            else node.setName("OpponentTower_3_level_" + towerLevel);
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
            //Add BulletSkill
            if (towerLevel === GameConfig.TOWER_MAX_LEVEL) {
                let poisonEffect = ComponentFactory.create(PoisonEffect, 2, 3);
                attackComponent.addEffect(poisonEffect);
            }
            if (mode === GameConfig.PLAYER)
                node.setName("PlayerTower_4_level_" + towerLevel);
            else node.setName("OpponentTower_4_level_" + towerLevel);
            break;
        }
        case GameConfig.ENTITY_ID.GOAT_TOWER: {
            let towerAbilityComponent = towerEntity.getComponent(TowerAbilityComponent);
            let towerConfig = TowerConfig.getDamageGoatTowerConfigFromJson(towerLevel);
            let buffRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
            let damageUpValue = towerConfig.damageUpValue;
            towerAbilityComponent.reset(buffRange, damageUpValue);
            //Add SpecialSkill
            if (towerLevel === GameConfig.TOWER_MAX_LEVEL) {
                let goatSlowAuraComponent = ComponentFactory.create(GoatSlowAuraComponent, 0.2, buffRange);
                towerEntity.addComponent(goatSlowAuraComponent);
            }
            if (mode === GameConfig.PLAYER)
                node.setName("PlayerTower_5_level_" + towerLevel);
            else node.setName("OpponentTower_5_level_" + towerLevel);
            break;
        }
        case GameConfig.ENTITY_ID.SNAKE_TOWER: {
            let towerAbilityComponent = towerEntity.getComponent(TowerAbilityComponent);
            let towerConfig = TowerConfig.getAttackSpeedSnakeTowerConfigFromJson(towerLevel);
            let buffRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
            let attackSpeedUpValue = towerConfig.attackSpeedUpValue;
            towerAbilityComponent.reset(buffRange, attackSpeedUpValue);
            if (towerLevel === GameConfig.TOWER_MAX_LEVEL) {
                let snakeBurnHpAuraComponent = ComponentFactory.create(SnakeBurnHpAuraComponent, 0.01, 5, buffRange);
                towerEntity.addComponent(snakeBurnHpAuraComponent);
            }
            if (mode === GameConfig.PLAYER)
                node.setName("PlayerTower_6_level_" + towerLevel);
            else node.setName("OpponentTower_6_level_" + towerLevel);
            break;
        }
    }


    let mapObject = BattleManager.getInstance().getBattleData().getMapObject(mode);
    let buffType = mapObject.getBuffType(tilePos);
    EntityFactory.buffTower(towerEntity, buffType);
    BattleAnimation.upgradeTower(towerEntity);
}

EntityFactory.buffTower = function (towerEntity, buffType) {
    let attackComponent = towerEntity.getComponent(AttackComponent);
    if (attackComponent) {
        switch (buffType) {
            case TileType.ATTACK_RANGE_UP: {
                attackComponent.originRange += attackComponent.originRange * 1;
                attackComponent.range = Math.max(attackComponent.originRange, attackComponent.range)
                break;
            }
            case TileType.ATTACK_SPEED_UP: {
                attackComponent.originSpeed -= attackComponent.originSpeed * 0.7;
                attackComponent.setSpeed(Math.min(attackComponent.originSpeed, attackComponent.getSpeed()));
                break;
            }
            case TileType.DAMAGE_UP: {
                attackComponent.originDamage += attackComponent.originDamage * 10;
                attackComponent.setDamage(Math.max(attackComponent.getDamage(), attackComponent.originDamage));
                break;
            }
        }
    }
}