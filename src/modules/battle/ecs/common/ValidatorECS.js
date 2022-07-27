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

    return GameConfig.ENTITY_ID.TRAP_SPELL === type;
}

/**
 *
 * @param type
 * @param pixelPos
 * @param mode
 * @returns {{error: boolean}|{msg: string, error: boolean}}
 */
ValidatorECS.validatePositionPutCard = function (type, pixelPos, mode) {
    const MSG_1 = "Vị trí thả phép không hợp lệ.";
    const MSG_2 = "Vị trí đặt trụ không hợp lệ.";
    const MSG_3 = "Vị trí đặt bẫy không hợp lệ.";

    let tilePos = Utils.pixel2Tile(pixelPos.x, pixelPos.y, mode);
    if (ValidatorECS.isSpell(type)) {
        if (!Utils.isPixelPositionInMap(pixelPos, mode)) {
            cc.warn("put spell at pixel pos = " + JSON.stringify(pixelPos) + " is invalid")
            return {error: true, msg: MSG_1};
        }
    } else if (ValidatorECS.isTower(type)) {
        if (!Utils.validateTilePos(tilePos)) {
            return {error: true, msg: MSG_2};
        }

        let row = GameConfig.MAP_HEIGH - 1 - tilePos.y;
        let col = tilePos.x;
        let map = BattleManager.getInstance().getBattleData().getMap(mode);
        if (map[row][col] === GameConfig.MAP.TREE || map[row][col] === GameConfig.MAP.HOLE
            || (tilePos.x === GameConfig.HOUSE_POSITION.x && tilePos.y === GameConfig.HOUSE_POSITION.y)
            || (tilePos.x === GameConfig.MONSTER_BORN_POSITION.x && tilePos.y === GameConfig.MONSTER_BORN_POSITION.y)) {
            return {error: true, msg: MSG_2};
        }



    } else if (ValidatorECS.isTrap(type)) {
        if (!Utils.validateTilePos(tilePos)) {
            return {error: true, msg: MSG_3};
        }

        let row = GameConfig.MAP_HEIGH - 1 - tilePos.y;
        let col = tilePos.x;
        let map = BattleManager.getInstance().getBattleData().getMap(mode);
        if (map[row][col] === GameConfig.MAP.TOWER || map[row][col] === GameConfig.MAP.TREE || map[row][col] === GameConfig.MAP.HOLE
            || (tilePos.x === GameConfig.HOUSE_POSITION.x && tilePos.y === GameConfig.HOUSE_POSITION.y)
            || (tilePos.x === GameConfig.MONSTER_BORN_POSITION.x && tilePos.y === GameConfig.MONSTER_BORN_POSITION.y)) {
            return {error: true, msg: MSG_3};
        }
    } else {
        return {error: true, msg: MSG_3};
    }
    return {error: false};
}