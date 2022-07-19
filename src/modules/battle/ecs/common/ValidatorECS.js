let ValidatorECS = ValidatorECS || {};

ValidatorECS.isMonster = function (entityOrTypeID) {
    let type;
    if (typeof entityOrTypeID === "number") {
        type = entityOrTypeID;
    } else {
        type = entityOrTypeID.typeID;
    }

    for (let typeID of GameConfig.GROUP_ID.MONSTER_ENTITY) {
        if (typeID === type) {
            return true;
        }
    }
    return false;
}

ValidatorECS.isTower = function (entityOrTypeID) {
    let type;
    if (typeof entityOrTypeID === "number") {
        type = entityOrTypeID;
    } else {
        type = entityOrTypeID.typeID;
    }

    for (let typeID of GameConfig.GROUP_ID.TOWER_ENTITY) {
        if (typeID === type) {
            return true;
        }
    }
    return false;
}

ValidatorECS.isBullet = function (entityOrTypeID) {
    let type;
    if (typeof entityOrTypeID === "number") {
        type = entityOrTypeID;
    } else {
        type = entityOrTypeID.typeID;
    }

    for (let typeID of GameConfig.GROUP_ID.BULLET_ENTITY) {
        if (typeID === type) {
            return true;
        }
    }
    return false;
}

ValidatorECS.isSpell = function (entityOrTypeID) {
    let type;
    if (typeof entityOrTypeID === "number") {
        type = entityOrTypeID;
    } else {
        type = entityOrTypeID.typeID;
    }

    for (let typeID of GameConfig.GROUP_ID.SPELL_ENTITY) {
        if (typeID === type) {
            return true;
        }
    }
    return false;
}

ValidatorECS.isTrap = function (entityOrTypeID) {
    let type;
    if (typeof entityOrTypeID === "number") {
        type = entityOrTypeID;
    } else {
        type = entityOrTypeID.typeID;
    }

    return GameConfig.ENTITY_ID.TRAP === type;
}