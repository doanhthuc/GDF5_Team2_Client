NodeFactory.createTrapNode = function () {
    let node = new cc.Node();
    let trapSprite = new cc.Sprite();

    node.addChild(trapSprite, 0, "trap");
    return node;
}

NodeFactory.createSwordmanNodeAnimation = function () {
    let node = new cc.Node();
    let monsterSprite = new cc.Sprite("#monster_swordsman_run_0012.png");
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
    let monsterSprite = new cc.Sprite("#monster_assassin_run_0020.png");
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
    let monsterSprite = new cc.Sprite("#monster_bat_run_0020.png");
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
    let monsterSprite = new cc.Sprite("#monster_giant_run_0036.png");
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
    let monsterSprite = new cc.Sprite("#monster_ninja_run_0020.png");
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
    let monsterSprite = new cc.Sprite("#monster_demon_tree_run_0020.png");
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
    let monsterSprite = new cc.Sprite("#monster_demon_tree_minion_run_0020.png");
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
    let monsterSprite = new cc.Sprite("#monster_dark_giant_run_0020.png");
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
    let monsterSprite = new cc.Sprite("#monster_satyr_run_0020.png");
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