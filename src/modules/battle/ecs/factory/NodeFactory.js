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
    let monsterShadow = new cc.Sprite();

    monsterShadow.x = -10;
    monsterShadow.y = -10;
    monsterShadow.setColor(cc.color.BLACK);
    monsterShadow.setOpacity(80);
    monsterShadow.setScale(0.8, 0.8);
    monsterShadow.setSkewX(20);

    node.addChild(monsterSprite, 1, "monster");
    node.addChild(hpBarNode.node, 1, "hp");
    node.addChild(monsterShadow, 0, "monster_shadow");

    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    hpBarNode.node.setVisible(false);
    return node;
}

NodeFactory.createAssassinNodeAnimation = function () {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/assassin/monster_assassin_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");
    let monsterShadow = new cc.Sprite();

    monsterShadow.x = -10;
    monsterShadow.y = -10;
    monsterShadow.setColor(cc.color.BLACK);
    monsterShadow.setOpacity(80);
    monsterShadow.setScale(0.8, 0.8);
    monsterShadow.setSkewX(20);

    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    hpBarNode.node.setVisible(false);

    node.addChild(monsterSprite, 1, "monster");
    node.addChild(hpBarNode.node, 1, "hp");
    node.addChild(monsterShadow, 0, "monster_shadow");

    return node;
}

NodeFactory.createBatNodeAnimation = function () {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/bat/monster_bat_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");
    let monsterShadow = new cc.Sprite();

    monsterShadow.x = -10;
    monsterShadow.y = -30;
    monsterShadow.setColor(cc.color.BLACK);
    monsterShadow.setOpacity(60);

    node.addChild(monsterSprite, 1, "monster");
    node.addChild(hpBarNode.node, 1, "hp");
    node.addChild(monsterShadow, 0, "monster_shadow");

    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    hpBarNode.node.setVisible(false);
    return node;
}

NodeFactory.createGiantNodeAnimation = function () {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/giant/monster_giant_run_0036.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");
    let monsterShadow = new cc.Sprite();

    monsterShadow.x = -10;
    monsterShadow.y = -10;
    monsterShadow.setColor(cc.color.BLACK);
    monsterShadow.setOpacity(80);
    monsterShadow.setScale(0.8, 0.8);
    monsterShadow.setSkewX(20);

    node.addChild(monsterSprite, 1, "monster");
    node.addChild(hpBarNode.node, 1, "hp");
    node.addChild(monsterShadow, 0, "monster_shadow");

    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    hpBarNode.node.setVisible(false);
    return node;
}

NodeFactory.createNinjaNodeAnimation = function () {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/ninja/monster_ninja_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");
    let monsterShadow = new cc.Sprite();

    monsterShadow.x = -10;
    monsterShadow.y = -10;
    monsterShadow.setColor(cc.color.BLACK);
    monsterShadow.setOpacity(80);
    monsterShadow.setScale(0.8, 0.8);
    monsterShadow.setSkewX(20);

    node.addChild(monsterSprite, 1, "monster");
    node.addChild(hpBarNode.node, 1, "hp");
    node.addChild(monsterShadow, 0, "monster_shadow");

    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    hpBarNode.node.setVisible(false);
    return node;
}

NodeFactory.createDemonTreeNodeAnimation = function () {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/demon_tree/monster_demon_tree_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");
    let monsterShadow = new cc.Sprite();

    monsterShadow.x = -10;
    monsterShadow.y = -10;
    monsterShadow.setColor(cc.color.BLACK);
    monsterShadow.setOpacity(80);
    monsterShadow.setScale(0.8, 0.8);
    monsterShadow.setSkewX(20);

    node.addChild(monsterSprite, 1, "monster");
    node.addChild(hpBarNode.node, 1, "hp");
    node.addChild(monsterShadow, 0, "monster_shadow");

    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    hpBarNode.node.setVisible(false);
    return node;
}

NodeFactory.createDemonTreeMinionNodeAnimation = function () {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/demon_tree_minion/monster_demon_tree_minion_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");
    let monsterShadow = new cc.Sprite();

    monsterShadow.x = -10;
    monsterShadow.y = -10;
    monsterShadow.setColor(cc.color.BLACK);
    monsterShadow.setOpacity(80);
    monsterShadow.setScale(0.8, 0.8);
    monsterShadow.setSkewX(20);

    node.addChild(monsterSprite, 1, "monster");
    node.addChild(hpBarNode.node, 1, "hp");
    node.addChild(monsterShadow, 0, "monster_shadow");

    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    hpBarNode.node.setVisible(false);
    return node;
}

NodeFactory.createDarkGiantNodeAnimation = function () {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/dark_giant/monster_dark_giant_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");
    let monsterShadow = new cc.Sprite();

    monsterShadow.x = -10;
    monsterShadow.y = -10;
    monsterShadow.setColor(cc.color.BLACK);
    monsterShadow.setOpacity(80);
    monsterShadow.setScale(0.8, 0.8);
    monsterShadow.setSkewX(20);

    node.addChild(monsterSprite, 1, "monster");
    node.addChild(hpBarNode.node, 1, "hp");
    node.addChild(monsterShadow, 0, "monster_shadow");

    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    hpBarNode.node.setVisible(false);
    return node;
}

NodeFactory.createSatyrNodeAnimation = function () {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("res/textures/monster/frame/satyr/monster_satyr_run_0020.png");
    let hpBarNode = ccs.load(BattleResource.HP_BAR_NODE, "");
    let monsterShadow = new cc.Sprite();

    monsterShadow.x = -10;
    monsterShadow.y = -10;
    monsterShadow.setColor(cc.color.BLACK);
    monsterShadow.setOpacity(80);
    monsterShadow.setScale(0.8, 0.8);
    monsterShadow.setSkewX(20);

    node.addChild(monsterSprite, 1, "monster");
    node.addChild(hpBarNode.node, 1, "hp");
    node.addChild(monsterShadow, 0, "monster_shadow");

    hpBarNode.node.x = 0;
    hpBarNode.node.y = 50;
    hpBarNode.node.setVisible(false);
    return node;
}

NodeFactory.createOwlNodeAnimation = function (range) {
    let node = new cc.Node();
    let pedestalSprite = new cc.Sprite("res/textures/battle/battle_tower_pedestal_wood.png");
    let towerSprite = new cc.Sprite("res/textures/tower/frame/cannon_1_2/tower_cannon_attack_0_0009.png");
    let weaponSprite = new cc.Sprite("res/textures/tower/frame/cannon_1_2/tower_cannon_attack_2_0009.png");
    let rangeAttackSprite = new cc.Sprite("res/textures/battle/battle_tower_range_player.png");
    rangeAttackSprite.setScale(2 * range / 687)

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