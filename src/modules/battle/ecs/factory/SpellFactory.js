let SpellFactory = EntityFactory.extend({});

SpellFactory.createFrozenSpell = function (pixelPos, mode) {
    let typeID = GameConfig.ENTITY_ID.FROZEN_SPELL;
    let entity = EntityFactory._createEntity(typeID, mode);

    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y + 100);

    let speed = Utils.calculateVelocityVector(cc.p(pixelPos.x, pixelPos.y + 100), pixelPos, 1000);
    let velocityComponent = ComponentFactory.create(VelocityComponent, speed.speedX, speed.speedY);

    let damageEffect = ComponentFactory.create(DamageEffect, 10);
    let frozenEffect = ComponentFactory.create(FrozenEffect, 5);

    let skeletonComponent = ComponentFactory.create(SkeletonAnimationComponent,
        "textures/potion/effect_atk_ice.json", "textures/potion/effect_atk_ice.atlas", [0, 0.1],
        ["animation_ice_ball", "animation_full"], [true, false], pixelPos, mode);
    let spellInfoComponent = ComponentFactory.create(SpellInfoComponent, pixelPos, [damageEffect, frozenEffect], 1.2 * GameConfig.TILE_WIDTH, 0.1);

    entity.addComponent(positionComponent)
        .addComponent(velocityComponent)
        .addComponent(skeletonComponent)
        .addComponent(spellInfoComponent);

    return entity;
}

SpellFactory.createFireSpell = function (pixelPos, mode) {
    let typeID = GameConfig.ENTITY_ID.FIRE_SPELL;
    let entity = EntityFactory._createEntity(typeID, mode);

    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y + 100);

    let speed = Utils.calculateVelocityVector(cc.p(pixelPos.x, pixelPos.y + 100), pixelPos, 1000);
    let velocityComponent = ComponentFactory.create(VelocityComponent, speed.speedX, speed.speedY);

    let damageEffect = ComponentFactory.create(DamageEffect, 50);

    let skeletonComponent = ComponentFactory.create(SkeletonAnimationComponent, "textures/potion/effect_atk_fire.json", "textures/potion/effect_atk_fire.atlas", [0, 0.1], ["animation_fireball", "animation_full"], [true, false], pixelPos, mode);
    let spellInfoComponent = ComponentFactory.create(SpellInfoComponent, pixelPos, [damageEffect], 1.2*GameConfig.TILE_WIDTH, 0.1);

    entity.addComponent(positionComponent)
        .addComponent(velocityComponent)
        .addComponent(skeletonComponent)
        .addComponent(spellInfoComponent);

    return entity;
}

SpellFactory.createTrap = function (tilePos, mode) {
    let typeID = GameConfig.ENTITY_ID.TRAP_SPELL;
    let entity = EntityFactory._createEntity(typeID, mode);

    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
    let positionComponent = ComponentFactory.create(PositionComponent, pixelPos.x, pixelPos.y);

    let appearanceComponent = ComponentFactory.create(AppearanceComponent, createTrapNode(), mode, pixelPos);
    let spriteComponent = ComponentFactory.create(SpriteSheetAnimationComponent, PotionAnimationConfig.trap);
    let collisionComponent = ComponentFactory.create(CollisionComponent, GameConfig.TILE_WIDTH, GameConfig.TILE_HEIGH);

    entity.addComponent(positionComponent)
        .addComponent(appearanceComponent)
        .addComponent(spriteComponent)
        .addComponent(collisionComponent);

    return entity;
}

function createTrapNode () {
    let node = new cc.Node();
    let trapSprite = new cc.Sprite();

    node.addChild(trapSprite, 0, "trap");
    return node;
}