let NodeFactory = NodeFactory || {};

NodeFactory.createTrapNode = function () {
    let node = new cc.Node();
    let trapSprite = new cc.Sprite();

    node.addChild(trapSprite, 0, "trap");
    return node;
}

NodeFactory.createSwordmanNodeAnimation = function () {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/swordsman/monster_swordsman_run_0012.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "")

    // monster animation
    let monsterAnimation = new cc.Animation();
    for (let i = 12; i <= 23; i++) {
        let fileName = "res/textures/monster/frame/swordsman/monster_swordsman_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        monsterAnimation.addSpriteFrameWithFile(fileName);
    }
    monsterAnimation.setDelayPerUnit(1 / (23 - 12 + 1));
    monsterAnimation.setRestoreOriginalFrame(true);
    let monsterAction = cc.animate(monsterAnimation);

    monsterSprite.runAction(cc.repeatForever(monsterAction));

    node.addChild(monsterSprite, 0, "monster");
    node.addChild(hpBarNode.node, 0, "hp");
    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    return node;
}

NodeFactory.createAssassinNodeAnimation = function () {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/assassin/monster_assassin_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");

    let monsterAnimation = new cc.Animation();
    for (let i = 20; i <= 29; i++) {
        let fileName = "res/textures/monster/frame/assassin/monster_assassin_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        monsterAnimation.addSpriteFrameWithFile(fileName);
    }
    monsterAnimation.setDelayPerUnit(1 / (29 - 20 + 1));
    monsterAnimation.setRestoreOriginalFrame(true);
    let monsterAction = cc.animate(monsterAnimation);
    monsterSprite.runAction(cc.repeatForever(monsterAction));
    node.addChild(monsterSprite, 1, "monster");
    node.addChild(hpBarNode.node, 0, "hp");
    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    return node;
}

NodeFactory.createBatNodeAnimation = function () {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/bat/monster_bat_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");

    let monsterAnimation = new cc.Animation();
    for (let i = 16; i <= 22; i++) {
        let fileName = "res/textures/monster/frame/bat/monster_bat_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        monsterAnimation.addSpriteFrameWithFile(fileName);
    }
    monsterAnimation.setDelayPerUnit(1 / (22 - 16 + 1));
    monsterAnimation.setRestoreOriginalFrame(true);
    let monsterAction = cc.animate(monsterAnimation);
    monsterSprite.runAction(cc.repeatForever(monsterAction));
    node.addChild(monsterSprite, 1, "monster");
    node.addChild(hpBarNode.node, 1, "hp");
    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    return node;
}

NodeFactory.createGiantNodeAnimation = function () {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/giant/monster_giant_run_0036.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");

    let monsterAnimation = new cc.Animation();
    for (let i = 36; i <= 47; i++) {
        let fileName = "res/textures/monster/frame/giant/monster_giant_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        monsterAnimation.addSpriteFrameWithFile(fileName);
    }
    monsterAnimation.setDelayPerUnit(1 / (47 - 36 + 1));
    monsterAnimation.setRestoreOriginalFrame(true);
    let monsterAction = cc.animate(monsterAnimation);
    monsterSprite.runAction(cc.repeatForever(monsterAction));
    node.addChild(monsterSprite, 0, "monster");
    node.addChild(hpBarNode.node, 0, "hp");
    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    return node;
}

NodeFactory.createNinjaNodeAnimation = function () {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/ninja/monster_ninja_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");

    let monsterAnimation = new cc.Animation();
    for (let i = 20; i <= 28; i++) {
        let fileName = "res/textures/monster/frame/ninja/monster_ninja_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        monsterAnimation.addSpriteFrameWithFile(fileName);
    }
    monsterAnimation.setDelayPerUnit(1 / (28 - 20 + 1));
    monsterAnimation.setRestoreOriginalFrame(true);
    let monsterAction = cc.animate(monsterAnimation);
    monsterSprite.runAction(cc.repeatForever(monsterAction));
    node.addChild(monsterSprite, 0, "monster");
    node.addChild(hpBarNode.node, 0, "hp");
    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    return node;
}

NodeFactory.createDemonTreeNodeAnimation = function () {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/demon_tree/monster_demon_tree_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");

    let monsterAnimation = new cc.Animation();
    for (let i = 22; i <= 32; i++) {
        let fileName = "res/textures/monster/frame/demon_tree/monster_demon_tree_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        monsterAnimation.addSpriteFrameWithFile(fileName);
    }
    monsterAnimation.setDelayPerUnit(1 / (32 - 22 + 1));
    monsterAnimation.setRestoreOriginalFrame(true);
    let monsterAction = cc.animate(monsterAnimation);
    monsterSprite.runAction(cc.repeatForever(monsterAction));
    node.addChild(monsterSprite, 0, "monster");
    node.addChild(hpBarNode.node, 0, "hp");
    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    return node;
}

NodeFactory.createDemonTreeMinionNodeAnimation = function () {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/demon_tree_minion/monster_demon_tree_minion_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");

    let monsterAnimation = new cc.Animation();
    for (let i = 25; i <= 32; i++) {
        let fileName = "res/textures/monster/frame/demon_tree_minion/monster_demon_tree_minion_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        monsterAnimation.addSpriteFrameWithFile(fileName);
    }
    monsterAnimation.setDelayPerUnit(1 / (32 - 25 + 1));
    monsterAnimation.setRestoreOriginalFrame(true);
    let monsterAction = cc.animate(monsterAnimation);
    monsterSprite.runAction(cc.repeatForever(monsterAction));
    node.addChild(monsterSprite, 0, "monster");
    node.addChild(hpBarNode.node, 0, "hp");
    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    return node;
}

NodeFactory.createDarkGiantNodeAnimation = function () {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/dark_giant/monster_dark_giant_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");

    let monsterAnimation = new cc.Animation();
    for (let i = 28; i <= 41; i++) {
        let fileName = "res/textures/monster/frame/dark_giant/monster_dark_giant_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        monsterAnimation.addSpriteFrameWithFile(fileName);
    }
    monsterAnimation.setDelayPerUnit(1 / (41 - 28 + 1));
    monsterAnimation.setRestoreOriginalFrame(true);
    let monsterAction = cc.animate(monsterAnimation);
    monsterSprite.runAction(cc.repeatForever(monsterAction));
    node.addChild(monsterSprite, 0, "monster");
    node.addChild(hpBarNode.node, 0, "hp");
    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    return node;
}

NodeFactory.createSatyrNodeAnimation = function () {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/satyr/monster_satyr_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");

    let monsterAnimation = new cc.Animation();
    for (let i = 13; i <= 25; i++) {
        let fileName = "res/textures/monster/frame/satyr/monster_satyr_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        monsterAnimation.addSpriteFrameWithFile(fileName);
    }
    monsterAnimation.setDelayPerUnit(1 / (25 - 13 + 1));
    monsterAnimation.setRestoreOriginalFrame(true);
    let monsterAction = cc.animate(monsterAnimation);
    monsterSprite.runAction(cc.repeatForever(monsterAction));
    node.addChild(monsterSprite, 1, "monster");
    node.addChild(hpBarNode.node, 0, "hp");
    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    return node;
}

NodeFactory.createOwlNodeAnimation = function (range) {
    let node = new cc.Node();
    let pedestalSprite = new cc.Sprite("res/textures/battle/battle_tower_pedestal_wood.png");
    let towerSprite = new cc.Sprite("res/textures/tower/frame/cannon_1_2/tower_cannon_attack_0_0009.png");
    let weaponSprite = new cc.Sprite("res/textures/tower/frame/cannon_1_2/tower_cannon_attack_2_0009.png");
    let rangeAttackSprite = new cc.Sprite("res/textures/battle/battle_tower_range_player.png");
    rangeAttackSprite.setScale(2 * range / 687)

    // cannon animation
    let weaponAnimation = new cc.Animation();
    for (let i = 9; i <= 17; i++) {
        let fileName = "res/textures/tower/frame/cannon_1_2/tower_cannon_attack_2_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        weaponAnimation.addSpriteFrameWithFile(fileName);
    }
    weaponAnimation.setDelayPerUnit(1 / (17 - 9 + 1));
    weaponAnimation.setRestoreOriginalFrame(true);
    let weaponAction = cc.animate(weaponAnimation);

    // tower animation
    let towerAnimation = new cc.Animation();
    for (let i = 9; i <= 17; i++) {
        let fileName = "res/textures/tower/frame/cannon_1_2/tower_cannon_attack_0_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        towerAnimation.addSpriteFrameWithFile(fileName);
    }
    towerAnimation.setDelayPerUnit(1 / (17 - 9 + 1));
    towerAnimation.setRestoreOriginalFrame(true);
    let towerAction = cc.animate(towerAnimation);

    weaponSprite.runAction(cc.repeatForever(weaponAction));
    towerSprite.runAction(cc.repeatForever(towerAction));

    // node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(pedestalSprite, 1, "pedestal");
    node.addChild(towerSprite, 1, "tower");
    node.addChild(weaponSprite, 1, "weapon");
    return node;
}

NodeFactory.createBearNodeAnimation = function (attackRange, isShowRange) {
    let node = new cc.Node();
    let pedestalSprite = new cc.Sprite("res/textures/battle/battle_tower_pedestal_rock.png");
    let towerSprite = new cc.Sprite("res/textures/tower/frame/ice_gun_1_2/tower_ice_gun_attack_0_0010.png");
    let weaponSprite = new cc.Sprite("res/textures/tower/frame/ice_gun_1_2/tower_ice_gun_attack_1_0010.png");
    let rangeAttackSprite = new cc.Sprite("res/textures/battle/battle_tower_range_player.png");
    rangeAttackSprite.setScale(2 * attackRange / 687)

    // tower animation
    let towerAnimation = new cc.Animation();
    for (let i = 10; i <= 19; i++) {
        let fileName = "res/textures/tower/frame/ice_gun_1_2/tower_ice_gun_attack_0_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        towerAnimation.addSpriteFrameWithFile(fileName);
    }
    towerAnimation.setDelayPerUnit(1 / (19 - 10 + 1));
    towerAnimation.setRestoreOriginalFrame(true);
    let towerAction = cc.animate(towerAnimation);

    // weapon animation
    let weaponAnimation = new cc.Animation();
    for (let i = 10; i <= 19; i++) {
        let fileName = "res/textures/tower/frame/ice_gun_1_2/tower_ice_gun_attack_1_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        weaponAnimation.addSpriteFrameWithFile(fileName);
    }
    weaponAnimation.setDelayPerUnit(1 / (19 - 10 + 1));
    weaponAnimation.setRestoreOriginalFrame(true);
    let weaponAction = cc.animate(weaponAnimation);

    towerSprite.runAction(cc.repeatForever(towerAction));
    weaponSprite.runAction(cc.repeatForever(weaponAction));

    if (isShowRange) {
        node.addChild(rangeAttackSprite, 0, "rangeAttack");
    }
    node.addChild(pedestalSprite, 1, "pedestal");
    node.addChild(towerSprite, 1, "tower");
    node.addChild(weaponSprite, 1, "weapon");
    return node;
}

NodeFactory.createFrogNodeAnimation = function (attackRange) {
    let node = new cc.Node();
    let pedestalSprite = new cc.Sprite("res/textures/battle/battle_tower_pedestal_steel.png");
    let towerSprite = new cc.Sprite("res/textures/tower/frame/boomerang_1_2/tower_boomerang_attack_0_0011.png");
    let weaponSprite = new cc.Sprite("res/textures/tower/frame/boomerang_1_2/tower_boomerang_attack_1_0011.png");
    let rangeAttackSprite = new cc.Sprite("res/textures/battle/battle_tower_range_player.png");
    rangeAttackSprite.setScale(2 * attackRange / 687)

    // tower animation
    let towerAnimation = new cc.Animation();
    for (let i = 11; i <= 22; i++) {
        let fileName = "res/textures/tower/frame/boomerang_1_2/tower_boomerang_attack_0_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        towerAnimation.addSpriteFrameWithFile(fileName);
    }
    towerAnimation.setDelayPerUnit(1 / (22 - 11 + 1));
    towerAnimation.setRestoreOriginalFrame(true);
    let towerAction = cc.animate(towerAnimation);

    // weapon animation
    let weaponAnimation = new cc.Animation();
    for (let i = 11; i <= 22; i++) {
        let fileName = "res/textures/tower/frame/boomerang_1_2/tower_boomerang_attack_1_00" + ((i < 10) ? ("0" + i) : i) + ".png";
        weaponAnimation.addSpriteFrameWithFile(fileName);
    }
    weaponAnimation.setDelayPerUnit(1 / (22 - 11 + 1));
    weaponAnimation.setRestoreOriginalFrame(true);
    let weaponAction = cc.animate(weaponAnimation);

    towerSprite.runAction(cc.repeatForever(towerAction));
    weaponSprite.runAction(cc.repeatForever(weaponAction));

    // node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(pedestalSprite, 1, "pedestal");
    node.addChild(towerSprite, 1, "tower");
    node.addChild(weaponSprite, 1, "weapon");
    return node;
}

NodeFactory.createBunnyNodeAnimation = function (attackRange) {
    let node = new cc.Node();
    let pedestalSprite = new cc.Sprite("res/textures/battle/battle_tower_pedestal_rock.png");
    let towerSprite = new cc.Sprite("res/textures/tower/frame/oil_gun_1_2/tower_oil_gun_attack_0_0011.png");
    let weaponSprite = new cc.Sprite("res/textures/tower/frame/oil_gun_1_2/tower_oil_gun_attack_1_0011.png");

    // node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(pedestalSprite, 1, "pedestal");
    node.addChild(towerSprite, 1, "tower");
    node.addChild(weaponSprite, 1, "weapon");
    return node;
}

NodeFactory.createWizardNodeAnimation = function (attackRange) {
    let node = new cc.Node();
    let pedestalSprite = new cc.Sprite("res/textures/battle/battle_tower_pedestal_steel.png");
    let towerSprite = new cc.Sprite("res/textures/tower/frame/wizard_1_2/tower_wizard_attack_0_0000.png");
    let weaponSprite = new cc.Sprite("res/textures/tower/frame/wizard_1_2/tower_wizard_attack_1_0000.png");

    // node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(pedestalSprite, 1, "pedestal");
    node.addChild(towerSprite, 1, "tower");
    node.addChild(weaponSprite, 1, "weapon");
    return node;
}

NodeFactory.createSnakeAttackSpeedNodeAnimation = function (attackRange) {
    let node = new cc.Node();
    let pedestalSprite = new cc.Sprite("res/textures/battle/battle_tower_pedestal_rock.png");
    let towerSprite = new cc.Sprite("res/textures/tower/frame/attack_speed_1_2/tower_attack_speed_attack_0_0000.png");
    let weaponSprite = new cc.Sprite("res/textures/tower/frame/attack_speed_1_2/tower_attack_speed_attack_1_0000.png");

    // node.addChild(rangeAttackSprite, 0, "rangeAttack");
    node.addChild(pedestalSprite, 1, "pedestal");
    node.addChild(towerSprite, 1, "tower");
    node.addChild(weaponSprite, 1, "weapon");
    return node;
}

NodeFactory.createGoatDamageNodeAnimation = function (attackRange) {
    let node = new cc.Node();
    let pedestalSprite = new cc.Sprite("res/textures/battle/battle_tower_pedestal_rock.png");
    let towerSprite = new cc.Sprite("res/textures/tower/frame/damage_1_2/tower_damage_attack_0_0000.png");
    let weaponSprite = new cc.Sprite("res/textures/tower/frame/damage_1_2/tower_damage_attack_1_0000.png");

    // node.addChild(rangeAttackSprite, 1, "rangeAttack");
    node.addChild(pedestalSprite, 1, "pedestal");
    node.addChild(towerSprite, 1, "tower");
    node.addChild(weaponSprite, 1, "weapon");
    return node;
}

NodeFactory.createDragTowerNode = function (towerId) {
    let node = new cc.Node();
    let towerName = TOWER_NAME[towerId];
    let config = TowerAnimationConfig[towerName].level.A.animation.IDLE_270;
    let numberDigits = config.tower.start.toString().length;
    let towerSprite = new cc.Sprite("#" + config.tower.prefix + "0".repeat(4 - numberDigits) + config.tower.start + ".png");
    let weaponSprite = new cc.Sprite("#" + config.weapon.prefix + "0".repeat(4 - numberDigits) + config.weapon.start + ".png");
    let rangeAttackSprite = new cc.Sprite("res/textures/battle/battle_tower_range_player.png");
    rangeAttackSprite.setScale(2 * 1.5 * GameConfig.TILE_WIDTH / 687)
    node.addChild(towerSprite, 1, "tower");
    node.addChild(weaponSprite, 1, "weapon");
    node.addChild(rangeAttackSprite, 1, "rangeAttack");
    return node;
}