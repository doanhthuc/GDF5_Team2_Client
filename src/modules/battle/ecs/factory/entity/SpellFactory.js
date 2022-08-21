EntityFactory.createFrozenSpell = function (pixelPos, mode, entityID) {
    let typeID = GameConfig.ENTITY_ID.FROZEN_SPELL;
    let entity = EntityFactory._createEntity(typeID, mode, entityID);

    let S = 300, V = 1000;
    let T = S / V;
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y + S);

    let speed = Utils.calculateVelocityVector(cc.p(pixelPos.x, pixelPos.y + S), pixelPos, V);
    let velocityComponent = ComponentFactory.create(VelocityComponent, speed.speedX, speed.speedY);

    let spellConfig = EntityFactory.getSpellConfigBySpellTypeID(typeID);
    let value = spellConfig.value;
    let radius = spellConfig.radius * GameConfig.TILE_WIDTH;

    let frozenEffect = ComponentFactory.create(FrozenEffect, value);

    let parent;
    if (mode === GameConfig.USER1()) {
        parent = BattleManager.getInstance().getBattleLayer().getPlayerMapNode();
    } else if (mode === GameConfig.USER2()) {
        parent = BattleManager.getInstance().getBattleLayer().getOpponentMapNode();
    }
    let skeletonComponent = ComponentFactory.create(SkeletonAnimationComponent,
        BattleResource.FROZEN_SKELETON_JSON, BattleResource.FROZEN_SKELETON_ATLAS, [0, T],
        ["animation_ice_ball", "animation_full"], [true, false], parent);
    let spellInfoComponent = ComponentFactory.create(SpellInfoComponent, pixelPos, [frozenEffect], radius, T);

    entity.addComponent(positionComponent)
        .addComponent(velocityComponent)
        .addComponent(skeletonComponent)
        .addComponent(spellInfoComponent);

    return entity;
}

EntityFactory.createFireSpell = function (pixelPos, mode, entityID) {
    let typeID = GameConfig.ENTITY_ID.FIRE_SPELL;
    let entity = EntityFactory._createEntity(typeID, mode, entityID);

    let S = 300, V = 1000;
    let T = S / V;
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y + S);

    let speed = Utils.calculateVelocityVector(cc.p(pixelPos.x, pixelPos.y + S), pixelPos, V);
    let velocityComponent = ComponentFactory.create(VelocityComponent, speed.speedX, speed.speedY);

    let spellConfig = EntityFactory.getSpellConfigBySpellTypeID(typeID);
    let damage = spellConfig.value;
    let radius = spellConfig.radius * GameConfig.TILE_WIDTH;
    let damageEffect = ComponentFactory.create(DamageEffect, damage);

    let parent;
    if (mode === GameConfig.USER1()) {
        parent = BattleManager.getInstance().getBattleLayer().getPlayerMapNode();
    } else if (mode === GameConfig.USER2()) {
        parent = BattleManager.getInstance().getBattleLayer().getOpponentMapNode();
    }
    let skeletonComponent = ComponentFactory.create(SkeletonAnimationComponent, BattleResource.FIRE_SKELETON_JSON, BattleResource.FIRE_SKELETON_ATLAS, [0, T], ["animation_fireball", "animation_full"], [true, false], parent);
    let spellInfoComponent = ComponentFactory.create(SpellInfoComponent, pixelPos, [damageEffect], radius, T);

    entity.addComponent(positionComponent)
        .addComponent(velocityComponent)
        .addComponent(skeletonComponent)
        .addComponent(spellInfoComponent);

    return entity;
}

EntityFactory.createTrap = function (tilePos, mode) {
    let typeID = GameConfig.ENTITY_ID.TRAP_SPELL;
    let entity = EntityFactory._createEntity(typeID, mode);

    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);

    let appearanceComponent = ComponentFactory.create(AppearanceComponent, NodeFactory.createTrapNode(), mode, pixelPos);
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, PotionAnimationConfig.trap);
    let collisionComponent = ComponentFactory.create(CollisionComponent, GameConfig.TILE_WIDTH, GameConfig.TILE_HEIGH);
    let trapInfo = ComponentFactory.create(TrapInfoComponent, 0.3);

    entity.addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(spriteComponent)
        .addComponent(trapInfo)
        .addComponent(collisionComponent);

    return entity;
}

EntityFactory.getSpellConfigBySpellTypeID = function (entityTypeID) {
    let spellIDInConfig = SpellEntityTypeIdToIdInJSONConfig[entityTypeID];
    let monsterConfigData = JsonReader.getPotionConfig()[spellIDInConfig]
    let name = monsterConfigData.name;
    let energy = monsterConfigData.energy;
    let value = monsterConfigData.adjust.player.value;
    let radius = monsterConfigData.radius;
    return {
        name : name,
        energy : energy,
        value : value,
        radius : radius,
    };
}