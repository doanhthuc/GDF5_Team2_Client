let ValidatorECS = ValidatorECS || {};

ValidatorECS.isMonster = function (entity) {
    for (let id of GameConfig.GROUP_ID.MONSTER_ENTITY) {
        if (id === entity.typeID) {
            return true;
        }
    }
    return false;
}

ValidatorECS.isTower = function (entity) {
    for (let id of GameConfig.GROUP_ID.TOWER_ENTITY) {
        if (id === entity.typeID) {
            return true;
        }
    }
    return false;
}

ValidatorECS.isBullet = function (entity) {
    for (let id of GameConfig.GROUP_ID.BULLET_ENTITY) {
        if (id === entity.typeID) {
            return true;
        }
    }
    return false;
}