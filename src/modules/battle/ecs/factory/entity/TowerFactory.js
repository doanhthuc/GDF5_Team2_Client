EntityFactory.createAttackTowerBasicComponent = function (typeID, level, tilePos, mode, effectList, spriteAnimationConfig, canTargetAirMonster = true) {
    let basicTowerInfo = this.getAttackTowerBasicInfo(typeID, level);
    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
    let defaultTowerTargetStrategy = GameConfig.TOWER_TARGET_STRATEGY.MAX_HP;

    let infoComponent = ComponentFactory.create(TowerInfoComponent, basicTowerInfo.towerEnergy, basicTowerInfo.bulletTargetBuffType,
        basicTowerInfo.archetype, basicTowerInfo.targetType, basicTowerInfo.bulletType);

    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);

    let node = NodeFactory.createTowerNode(typeID, basicTowerInfo.attackRange, mode);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);

    let attackComponent = ComponentFactory.create(AttackComponent, basicTowerInfo.attackDamage, defaultTowerTargetStrategy,
        basicTowerInfo.attackRange, basicTowerInfo.attackSpeed, 0, effectList, basicTowerInfo.bulletSpeed, basicTowerInfo.bulletRadius, canTargetAirMonster);

    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, spriteAnimationConfig);

    return {
        infoComponent: infoComponent,
        positionComponent: positionComponent,
        appearanceComponent: appearanceComponent,
        attackComponent: attackComponent,
        spriteComponent: spriteComponent
    }
};

EntityFactory.addBasicTowerComponentToEntity = function (entity, basicTowerComponents) {
    for (let key in basicTowerComponents) {
        entity.addComponent(basicTowerComponents[key]);
    }
}

EntityFactory.createCannonOwlTower = function (tilePos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.CANNON_TOWER;
    let entity = this._createEntity(typeID, mode);

    let spriteAnimationConfig = TowerAnimationConfig.cannon.level.A;
    let effectList = [];
    let initialLevel = 1;

    let basicTowerComponent = this.createAttackTowerBasicComponent(typeID, initialLevel, tilePos, mode, effectList, spriteAnimationConfig);

    this.addBasicTowerComponentToEntity(entity, basicTowerComponent);

    return entity;
};

EntityFactory.createIceGunPolarBearTower = function (tilePos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.BEAR_TOWER;
    let entity = this._createEntity(typeID, mode);
    let initialLevel = 1;

    let towerConfig = TowerConfig.getBearIceGunTowerConfigFromJson(initialLevel);

    let frozenDuration = towerConfig.frozenDuration / 1000;
    let frozenEffect = ComponentFactory.create(FrozenEffect, frozenDuration);

    let canTargetAirMonster = false;

    let spriteAnimationConfig = TowerAnimationConfig.bear.level.A;
    let effectList = [frozenEffect];

    let basicTowerComponent = this.createAttackTowerBasicComponent(typeID, initialLevel, tilePos, mode, effectList, spriteAnimationConfig, canTargetAirMonster);

    this.addBasicTowerComponentToEntity(entity, basicTowerComponent);

    return entity;
}

EntityFactory.createBoomerangFrogTower = function (tilePos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.FROG_TOWER;
    let entity = this._createEntity(typeID, mode);

    let spriteAnimationConfig = TowerAnimationConfig.boomerang.level.A;
    let effectList = [];
    let initialLevel = 1;

    let basicTowerComponent = this.createAttackTowerBasicComponent(typeID, initialLevel, tilePos, mode, effectList, spriteAnimationConfig);

    this.addBasicTowerComponentToEntity(entity, basicTowerComponent);

    return entity;
}

EntityFactory.createBunnyOilGunTower = function (tilePos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.BUNNY_TOWER;
    let entity = this._createEntity(typeID, mode);

    let towerConfig = TowerConfig.getBunnyOilGunTowerConfigFromJson(1);
    let slowDuration = towerConfig.slowDuration / 1000;
    let slowValue = towerConfig.slowValue * -1;

    let slowEffect = ComponentFactory.create(SlowEffect, slowDuration, slowValue);

    let spriteAnimationConfig = TowerAnimationConfig.bunnyOil.level.A;
    let effectList = [slowEffect];
    let initialLevel = 1;

    let basicTowerComponent = this.createAttackTowerBasicComponent(typeID, initialLevel, tilePos, mode, effectList, spriteAnimationConfig);

    this.addBasicTowerComponentToEntity(entity, basicTowerComponent);

    return entity;
}

EntityFactory.createWizardTower = function (tilePos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.WIZARD_TOWER;
    let entity = this._createEntity(typeID, mode);

    let canTargetAirMonster = false;
    let spriteAnimationConfig = TowerAnimationConfig.wizard.level.A;
    let effectList = [];
    let initialLevel = 1;

    let basicTowerComponent = this.createAttackTowerBasicComponent(typeID, initialLevel, tilePos, mode, effectList, spriteAnimationConfig, canTargetAirMonster);

    this.addBasicTowerComponentToEntity(entity, basicTowerComponent);

    return entity;
}

EntityFactory.createSupportTowerBasicComponent = function (typeID, initialLevel, tilePos, mode, spriteAnimationConfig, effect) {
    let basicTowerInfo = this.getSupportTowerBasicInfo(typeID, initialLevel);
    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
    let buffRange = basicTowerInfo.buffRange;

    let infoComponent = ComponentFactory.create(TowerInfoComponent, basicTowerInfo.towerEnergy, basicTowerInfo.bulletTargetBuffType,
        basicTowerInfo.archetype, basicTowerInfo.targetType, basicTowerInfo.bulletType);

    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);

    let node = NodeFactory.createTowerNode(typeID, buffRange, mode);
    let appearanceComponent = ComponentFactory.create(AppearanceComponent, node, mode);
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, spriteAnimationConfig);
    let towerAbilityComponent = ComponentFactory.create(TowerAbilityComponent, buffRange, effect);

    return {
        infoComponent: infoComponent,
        positionComponent: positionComponent,
        appearanceComponent: appearanceComponent,
        spriteComponent: spriteComponent,
        towerAbilityComponent: towerAbilityComponent
    }
}

EntityFactory.createSnakeAttackSpeedTower = function (tilePos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.SNAKE_TOWER;
    let entity = this._createEntity(typeID, mode);
    let initialLevel = 1;

    let towerConfig = TowerConfig.getAttackSpeedSnakeTowerConfigFromJson(initialLevel);
    let attackSpeedUpValue = towerConfig.attackSpeedUpValue;
    let spriteAnimationConfig = TowerAnimationConfig.snake.level.A;
    let effect = ComponentFactory.create(BuffAttackSpeedEffect, attackSpeedUpValue);

    let basicTowerComponents = this.createSupportTowerBasicComponent(typeID, initialLevel, tilePos, mode, spriteAnimationConfig, effect);

    this.addBasicTowerComponentToEntity(entity, basicTowerComponents);


    return entity;
}

EntityFactory.createGoatDamageTower = function (tilePos, mode) {
    Utils.validateMode(mode);
    let typeID = GameConfig.ENTITY_ID.GOAT_TOWER;
    let entity = this._createEntity(typeID, mode);
    let initialLevel = 1;

    let towerConfig = TowerConfig.getDamageGoatTowerConfigFromJson(initialLevel);
    let damageUpValue = towerConfig.damageUpValue;
    let effect = ComponentFactory.create(BuffAttackDamageEffect, damageUpValue);
    let spriteAnimationConfig = TowerAnimationConfig.goat.level.A;

    let basicTowerComponents = this.createSupportTowerBasicComponent(typeID, initialLevel, tilePos, mode, spriteAnimationConfig, effect);

    this.addBasicTowerComponentToEntity(entity, basicTowerComponents);

    return entity;
}

EntityFactory.getAttackTowerBasicInfo = function (towerType, towerLevel) {
    let towerConfig = TowerConfig.getTowerConfigFromJson(towerType, towerLevel);
    let attackRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
    let attackDamage = towerConfig.stat.damage;
    let attackSpeed = towerConfig.stat.attackSpeed / 1000;
    let bulletSpeed = towerConfig.stat.bulletSpeed * GameConfig.TILE_WIDTH / 10;
    let bulletRadius = towerConfig.stat.bulletRadius * GameConfig.TILE_WIDTH;
    let towerEnergy = towerConfig.energy;
    let archetype = towerConfig.archetype;
    let targetType = towerConfig.targetType;
    let bulletType = towerConfig.bulletType;
    let bulletTargetBuffType = towerConfig.bulletTargetBuffType;

    return {
        attackRange: attackRange,
        attackDamage: attackDamage,
        attackSpeed: attackSpeed,
        bulletSpeed: bulletSpeed,
        bulletRadius: bulletRadius,
        towerEnergy: towerEnergy,
        archetype: archetype,
        targetType: targetType,
        bulletType: bulletType,
        bulletTargetBuffType: bulletTargetBuffType
    }
}

EntityFactory.getSupportTowerBasicInfo = function (towerType, towerLevel) {
    let towerConfig = TowerConfig.getTowerConfigFromJson(towerType, towerLevel);
    let buffRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
    let towerEnergy = towerConfig.energy;
    let archetype = towerConfig.archetype;
    let targetType = towerConfig.targetType;
    let auraTowerBuffType = towerConfig.auraTowerBuffType;

    return {
        buffRange: buffRange,
        towerEnergy: towerEnergy,
        archetype: archetype,
        targetType: targetType,
        auraTowerBuffType: auraTowerBuffType
    }
}

EntityFactory.updateTowerAttackComponent = function (attackComponent, towerEntityTypeId, towerLevel, effect) {
    let basicTowerInfo = this.getAttackTowerBasicInfo(towerEntityTypeId, towerLevel);
    let attackDamage = basicTowerInfo.attackDamage;
    let attackSpeed = basicTowerInfo.attackSpeed;
    let bulletSpeed = basicTowerInfo.bulletSpeed;
    let bulletRadius = basicTowerInfo.bulletRadius;
    let attackRange = basicTowerInfo.attackRange;
    attackComponent.updateAttackStatistic(attackDamage, attackRange, attackSpeed, effect, bulletSpeed, bulletRadius);
}

EntityFactory.onUpdateTowerLevel = function (entityId, towerLevel, tilePos, mode) {
    let towerEntity = EntityManager.getInstance().getEntity(entityId);
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
            this.updateTowerAttackComponent(attackComponent, towerEntity.typeID, towerLevel, []);
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

            this.updateTowerAttackComponent(attackComponent, towerEntity.typeID, towerLevel, []);
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

            this.updateTowerAttackComponent(attackComponent, towerEntity.typeID, towerLevel, []);
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

            let frozenDuration = towerConfig.frozenDuration / 1000;
            let frozenEffect = ComponentFactory.create(FrozenEffect, frozenDuration);
            this.updateTowerAttackComponent(attackComponent, towerEntity.typeID, towerLevel, [frozenEffect]);
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

            let slowDuration = towerConfig.slowDuration / 1000;
            let slowValue = towerConfig.slowValue * -1;
            let slowEffect = ComponentFactory.create(SlowEffect, slowDuration, slowValue);
            this.updateTowerAttackComponent(attackComponent, towerEntity.typeID, towerLevel, [slowEffect]);

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
            let buffAttackDamageEffect = ComponentFactory.create(BuffAttackDamageEffect, damageUpValue);
            towerAbilityComponent.reset(buffRange, buffAttackDamageEffect);
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
            let buffAttackSpeedEffect = ComponentFactory.create(BuffAttackSpeedEffect, attackSpeedUpValue);
            towerAbilityComponent.reset(buffRange, buffAttackSpeedEffect);
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
                attackComponent.originRange += attackComponent.originRange * 0.25;
                attackComponent.range = Math.max(attackComponent.originRange, attackComponent.range)
                break;
            }
            case TileType.ATTACK_SPEED_UP: {
                attackComponent.originSpeed -= attackComponent.originSpeed * 0.25;
                attackComponent.setSpeed(Math.min(attackComponent.originSpeed, attackComponent.getSpeed()));
                break;
            }
            case TileType.DAMAGE_UP: {
                attackComponent.originDamage += attackComponent.originDamage * 0.25;
                attackComponent.setDamage(Math.max(attackComponent.getDamage(), attackComponent.originDamage));
                break;
            }
        }
    }
}