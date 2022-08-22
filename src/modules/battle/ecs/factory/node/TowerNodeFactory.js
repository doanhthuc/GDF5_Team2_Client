NodeFactory.createOwlNodeAnimation = function (range, mode) {
    let node = new cc.Node();
    let pedestalSprite = new cc.Sprite("res/textures/battle/battle_tower_pedestal_wood.png");
    let towerSprite = new cc.Sprite("res/textures/tower/frame/cannon_1_2/tower_cannon_attack_0_0009.png");
    let weaponSprite = new cc.Sprite("res/textures/tower/frame/cannon_1_2/tower_cannon_attack_2_0009.png");
    let rangeAttackSprite = new cc.Sprite("res/textures/battle/battle_tower_range_player.png");
    rangeAttackSprite.setScale(2 * range / GameConfig.RANGE_SIZE)

    // node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(pedestalSprite, 1, "pedestal");
    node.addChild(towerSprite, 1, "tower");
    node.addChild(weaponSprite, 1, "weapon");
    if (mode === GameConfig.USER1())
        node.setName("PlayerTower_0_level_1")
    else node.setName("OpponentTower_0_level_1")
    return node;
}

NodeFactory.createBearNodeAnimation = function (attackRange,mode) {
    let node = new cc.Node();
    let pedestalSprite = new cc.Sprite("res/textures/battle/battle_tower_pedestal_rock.png");
    let towerSprite = new cc.Sprite("#tower_ice_gun_attack_0_0010.png");
    let weaponSprite = new cc.Sprite("#tower_ice_gun_attack_1_0010.png");
    let rangeAttackSprite = new cc.Sprite("res/textures/battle/battle_tower_range_player.png");
    rangeAttackSprite.setScale(2 * attackRange / GameConfig.RANGE_SIZE)

    // if (isShowRange) {
    //     node.addChild(rangeAttackSprite, 0, "rangeAttack");
    // }
    node.addChild(pedestalSprite, 1, "pedestal");
    node.addChild(towerSprite, 1, "tower");
    node.addChild(weaponSprite, 1, "weapon");
    if (mode === GameConfig.USER1())
        node.setName("PlayerTower_4_level_1")
    else node.setName("OpponentTower_4_level_1")

    return node;
}

NodeFactory.createFrogNodeAnimation = function (attackRange,mode) {
    let node = new cc.Node();
    let pedestalSprite = new cc.Sprite("res/textures/battle/battle_tower_pedestal_steel.png");
    let towerSprite = new cc.Sprite("#tower_boomerang_attack_0_0011.png");
    let weaponSprite = new cc.Sprite("#tower_boomerang_attack_1_0011.png");
    let rangeAttackSprite = new cc.Sprite("res/textures/battle/battle_tower_range_player.png");
    rangeAttackSprite.setScale(2 * attackRange / GameConfig.RANGE_SIZE)


    // node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(pedestalSprite, 1, "pedestal");
    node.addChild(towerSprite, 1, "tower");
    node.addChild(weaponSprite, 1, "weapon");
    if (mode === GameConfig.USER1())
        node.setName("PlayerTower_2_level_1")
    else node.setName("OpponentTower_2_level_1")

    return node;
}

NodeFactory.createBunnyNodeAnimation = function (attackRange,mode) {
    let node = new cc.Node();
    let pedestalSprite = new cc.Sprite("res/textures/battle/battle_tower_pedestal_rock.png");
    let towerSprite = new cc.Sprite("#tower_oil_gun_attack_0_0011.png");
    let weaponSprite = new cc.Sprite("#tower_oil_gun_attack_1_0011.png");

    // node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(pedestalSprite, 1, "pedestal");
    node.addChild(towerSprite, 1, "tower");
    node.addChild(weaponSprite, 1, "weapon");
    if (mode === GameConfig.USER1())
        node.setName("PlayerTower_3_level_1")
    else node.setName("OpponentTower_3_level_1")

    return node;
}

NodeFactory.createWizardNodeAnimation = function (attackRange,mode) {
    let node = new cc.Node();
    let pedestalSprite = new cc.Sprite("res/textures/battle/battle_tower_pedestal_steel.png");
    let towerSprite = new cc.Sprite("#tower_wizard_attack_0_0000.png");
    let weaponSprite = new cc.Sprite("#tower_wizard_attack_1_0000.png");

    // node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(pedestalSprite, 1, "pedestal");
    node.addChild(towerSprite, 1, "tower");
    node.addChild(weaponSprite, 1, "weapon");
    if (mode === GameConfig.USER1())
        node.setName("PlayerTower_1_level_1")
    else node.setName("OpponentTower_1_level_1")

    return node;
}

NodeFactory.createSnakeAttackSpeedNodeAnimation = function (attackRange,mode) {
    let node = new cc.Node();
    let pedestalSprite = new cc.Sprite("res/textures/battle/battle_tower_pedestal_rock.png");
    let towerSprite = new cc.Sprite("#tower_attack_speed_attack_0_0000.png");
    let weaponSprite = new cc.Sprite("#tower_attack_speed_attack_1_0000.png");

    // node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(pedestalSprite, 1, "pedestal");
    node.addChild(towerSprite, 1, "tower");
    node.addChild(weaponSprite, 1, "weapon");
    node.setName("Tower_6")
    if (mode === GameConfig.USER1())
        node.setName("PlayerTower_6_level_1")
    else node.setName("OpponentTower_6_level_1")
    return node;
}

NodeFactory.createGoatDamageNodeAnimation = function (attackRange,mode) {
    let node = new cc.Node();
    let pedestalSprite = new cc.Sprite("res/textures/battle/battle_tower_pedestal_rock.png");
    let towerSprite = new cc.Sprite("#tower_damage_attack_0_0000.png");
    let weaponSprite = new cc.Sprite("#tower_damage_attack_1_0000.png");

    // node.addChild(rangeAttackSprite, 1, "rangeAttack");
    node.addChild(pedestalSprite, 1, "pedestal");
    node.addChild(towerSprite, 1, "tower");
    node.addChild(weaponSprite, 1, "weapon");
    if (mode === GameConfig.USER1())
        node.setName("PlayerTower_5_level_1")
    else node.setName("OpponentTower_5_level_1")
    return node;
}

NodeFactory.createDragTowerNode = function (towerId) {
    let node = new cc.Node();
    let towerName = TOWER_NAME[towerId];
    let animationConfig = TowerAnimationConfig[towerName].level.A.animation.IDLE_270;
    let towerConfig = TowerConfig.getTowerConfigFromJson(towerId, 1);
    let attackRange = towerConfig.stat.range * GameConfig.TILE_WIDTH;
    let numberDigits = animationConfig.tower.start.toString().length;
    let towerSprite = new cc.Sprite("#" + animationConfig.tower.prefix + "0".repeat(4 - numberDigits) + animationConfig.tower.start + ".png");
    let weaponSprite = new cc.Sprite("#" + animationConfig.weapon.prefix + "0".repeat(4 - numberDigits) + animationConfig.weapon.start + ".png");
    let rangeAttackSprite = new cc.Sprite("res/textures/battle/battle_tower_range_player.png");
    rangeAttackSprite.setScale(2 * attackRange / GameConfig.RANGE_SIZE)
    node.addChild(towerSprite, 1, "tower");
    node.addChild(weaponSprite, 1, "weapon");
    node.addChild(rangeAttackSprite, 1, "rangeAttack");
    return node;
}

NodeFactory.createBuildingTowerTimer = function (tilePos, mode) {
    // create timer
    let mapNode = BattleManager.getInstance().getBattleLayer().getMapNode(mode);

    let timer = new NormalTimerNode(GameConfig.DELAY_BUILD_TOWER);
    tickManager.addNormalTimerNodeToContainer(timer);

    let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, mode);
    timer.setPosition(pixelPos);
    mapNode.addChild(timer);
}