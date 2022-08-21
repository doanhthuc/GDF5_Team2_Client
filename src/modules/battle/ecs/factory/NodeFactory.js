let NodeFactory = NodeFactory || {};

NodeFactory.createTowerNode = function (entityTypeId, range, mode) {
    switch (entityTypeId) {
        case GameConfig.ENTITY_ID.CANNON_TOWER:
            return NodeFactory.createOwlNodeAnimation(range, mode);
        case GameConfig.ENTITY_ID.BEAR_TOWER:
            return NodeFactory.createBearNodeAnimation(range , mode);
        case GameConfig.ENTITY_ID.FROG_TOWER:
            return NodeFactory.createFrogNodeAnimation(range , mode);
        case GameConfig.ENTITY_ID.BUNNY_TOWER:
            return NodeFactory.createBunnyNodeAnimation(range , mode);
        case GameConfig.ENTITY_ID.WIZARD_TOWER:
            return NodeFactory.createWizardNodeAnimation(range , mode);
        case GameConfig.ENTITY_ID.SNAKE_TOWER:
            return NodeFactory.createSnakeAttackSpeedNodeAnimation(range , mode);
        case GameConfig.ENTITY_ID.GOAT_TOWER:
            return NodeFactory.createGoatDamageNodeAnimation(range , mode);
    }
}

NodeFactory.createMonsterNode = function (entityTypeId) {
    switch (entityTypeId) {
        case GameConfig.ENTITY_ID.TRAP:
            return NodeFactory.createTrapNode();
        case GameConfig.ENTITY_ID.SWORD_MAN:
            return NodeFactory.createSwordmanNodeAnimation();
        case GameConfig.ENTITY_ID.ASSASSIN:
            return NodeFactory.createAssassinNodeAnimation();
        case GameConfig.ENTITY_ID.BAT:
            return NodeFactory.createBatNodeAnimation();
        case GameConfig.ENTITY_ID.GIANT:
            return NodeFactory.createGiantNodeAnimation();
        case GameConfig.ENTITY_ID.NINJA:
            return NodeFactory.createNinjaNodeAnimation();
        case GameConfig.ENTITY_ID.DEMON_TREE:
            return NodeFactory.createDemonTreeNodeAnimation();
        case GameConfig.ENTITY_ID.DEMON_TREE_MINION:
            return NodeFactory.createDemonTreeMinionNodeAnimation();
        case GameConfig.ENTITY_ID.SATYR:
            return NodeFactory.createSatyrNodeAnimation();
    }
}
