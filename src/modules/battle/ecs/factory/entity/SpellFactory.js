EntityFactory.createFrozenSpell = function (pixelPos, mode) {
    let typeID = GameConfig.ENTITY_ID.FROZEN_SPELL;
    let entity = EntityFactory._createEntity(typeID, mode);

    let S = 300, V = 1000;
    let T = S / V;
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y + S);

    let speed = Utils.calculateVelocityVector(cc.p(pixelPos.x, pixelPos.y + S), pixelPos, V);
    let velocityComponent = ComponentFactory.create(VelocityComponent, speed.speedX, speed.speedY);

    let damageEffect = ComponentFactory.create(DamageEffect, 10);
    let frozenEffect = ComponentFactory.create(FrozenEffect, 5);

    let parent;
    if (mode === GameConfig.PLAYER) {
        parent = BattleManager.getInstance().getBattleLayer().getPlayerMapNode();
    } else if (mode === GameConfig.OPPONENT) {
        parent = BattleManager.getInstance().getBattleLayer().getOpponentMapNode();
    }
    let skeletonComponent = ComponentFactory.create(SkeletonAnimationComponent,
        BattleResource.FROZEN_SKELETON_JSON, BattleResource.FROZEN_SKELETON_ATLAS, [0, T],
        ["animation_ice_ball", "animation_full"], [true, false], parent);
    let spellInfoComponent = ComponentFactory.create(SpellInfoComponent, pixelPos, [damageEffect, frozenEffect], 1.2 * GameConfig.TILE_WIDTH, T);

    entity.addComponent(positionComponent)
        .addComponent(velocityComponent)
        .addComponent(skeletonComponent)
        .addComponent(spellInfoComponent);

    return entity;
}

EntityFactory.createFireSpell = function (pixelPos, mode) {
    let typeID = GameConfig.ENTITY_ID.FIRE_SPELL;
    let entity = EntityFactory._createEntity(typeID, mode);

    let S = 300, V = 1000;
    let T = S / V;
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y + S);

    let speed = Utils.calculateVelocityVector(cc.p(pixelPos.x, pixelPos.y + S), pixelPos, V);
    let velocityComponent = ComponentFactory.create(VelocityComponent, speed.speedX, speed.speedY);

    let damageEffect = ComponentFactory.create(DamageEffect, 100);

    let parent;
    if (mode === GameConfig.PLAYER) {
        parent = BattleManager.getInstance().getBattleLayer().getPlayerMapNode();
    } else if (mode === GameConfig.OPPONENT) {
        parent = BattleManager.getInstance().getBattleLayer().getOpponentMapNode();
    }
    let skeletonComponent = ComponentFactory.create(SkeletonAnimationComponent, BattleResource.FIRE_SKELETON_JSON, BattleResource.FIRE_SKELETON_ATLAS, [0, T], ["animation_fireball", "animation_full"], [true, false], parent);
    let spellInfoComponent = ComponentFactory.create(SpellInfoComponent, pixelPos, [damageEffect], 1.2 * GameConfig.TILE_WIDTH, T);

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
    let trapInfo = ComponentFactory.create(TrapInfoComponent, 0.55);

    entity.addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(spriteComponent)
        .addComponent(trapInfo)
        .addComponent(collisionComponent);

    return entity;
}