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
    const MSG_INVALID_SPELL = "Vị trí thả phép không hợp lệ.";
    const MSG_INVALID_TOWER = "Vị trí đặt trụ không hợp lệ.";
    const MSG_INVALID_TRAP = "Vị trí đặt bẫy không hợp lệ.";

    let tilePos = Utils.pixel2Tile(pixelPos.x, pixelPos.y, mode);
    if (ValidatorECS.isSpell(type)) {
        if (!Utils.isPixelPositionInMap(pixelPos, mode)) {
            cc.warn("put spell at pixel pos = " + JSON.stringify(pixelPos) + " is invalid")
            return {error: true, msg: MSG_INVALID_SPELL};
        }
    } else if (ValidatorECS.isTower(type)) {
        if (!Utils.validateTilePos(tilePos)) {
            return {error: true, msg: MSG_INVALID_TOWER};
        }

        let row = GameConfig.MAP_HEIGH - 1 - tilePos.y;
        let col = tilePos.x;
        let map = BattleManager.getInstance().getBattleData().getMap(mode);
        if (map[row][col] === GameConfig.MAP.TREE || map[row][col] === GameConfig.MAP.HOLE
            || (tilePos.x === GameConfig.HOUSE_POSITION.x && tilePos.y === GameConfig.HOUSE_POSITION.y)
            || (tilePos.x === GameConfig.MONSTER_BORN_POSITION.x && tilePos.y === GameConfig.MONSTER_BORN_POSITION.y)) {
            return {error: true, msg: MSG_INVALID_TOWER};
        }
        // let mapObject = BattleManager.getInstance().getBattleData().getMapObject(mode);
        // cc.log("mapObject height:  " + mapObject.length + " width: " + mapObject[0].length);
        // cc.log("mapObject = row: " + row + " col: " + col + " mapObject: " + mapObject);
        // if (mapObject[tilePos.x][tilePos.y].objectInCellType === ObjectInCellType.TOWER) {
        //     let tower = mapObject[tilePos.x][tilePos.y].tower;
        //     cc.log("ValidatorECS line 114: " + JSON.stringify(mapObject[tilePos.x][tilePos.y]));
        //     if (tower.towerId !== type || tower.level >= 3) {
        //         return {error: true, msg: MSG_INVALID_TOWER};
        //     }
        // }

        let checkMap = BattleManager.getInstance().getBattleData().cloneMap(mode);
        let clonedMap = BattleManager.getInstance().getBattleData().cloneMap(mode);
        let listMonster = EntityManager.getInstance().getEntitiesHasComponents(MonsterInfoComponent, PositionComponent);

        // tilePos is position put tower
        let roww = GameConfig.MAP_HEIGH - 1 - tilePos.y, coll = tilePos.x;
        checkMap[roww][coll] = GameConfig.MAP.TOWER;
        clonedMap[roww][coll] = GameConfig.MAP.TOWER;

        const CHECK_MARK = "x";
        roww = GameConfig.MAP_HEIGH - 1 - GameConfig.MONSTER_BORN_POSITION.y;
        coll = GameConfig.MONSTER_BORN_POSITION.x;
        checkMap[roww][coll] = CHECK_MARK;

        for (let monster of listMonster) {
            if (monster.mode !== mode) continue;
            let pos = monster.getComponent(PositionComponent);
            if (pos) {
                let tileMonsterPos = Utils.pixel2Tile(pos.x, pos.y, mode);
                if (Utils.validateTilePos(tileMonsterPos)) {
                    let row = GameConfig.MAP_HEIGH - 1 - tileMonsterPos.y;
                    let col = tileMonsterPos.x;
                    if (checkMap[row][col] !== GameConfig.MAP.TOWER) {
                        checkMap[row][col] = CHECK_MARK;
                    }
                }
            }
        }

        // cc.log("**xxx^^^^^^^^^")
        // for (let r = 0; r < checkMap.length; r++) {
        //     let str = "";
        //     for (let c = 0; c < checkMap[0].length; c++) {
        //         str += checkMap[r][c] + "\t";
        //     }
        //     cc.log(str);
        // }

        for (let row = 0; row < checkMap.length; row++) {
            for (let col = 0; col < checkMap[0].length; col++) {
                if (checkMap[row][col] !== CHECK_MARK) continue;

                let path = FindPathUtil.findShortestPath(clonedMap, cc.p(col, GameConfig.MAP_HEIGH - 1 - row), cc.p(GameConfig.HOUSE_POSITION.x, GameConfig.HOUSE_POSITION.y));
                if (!path || path.length <= 0) {
                    return {error: true, msg: MSG_INVALID_TOWER};
                }
            }
        }

    } else if (ValidatorECS.isTrap(type)) {
        if (!Utils.validateTilePos(tilePos)) {
            return {error: true, msg: MSG_INVALID_TRAP};
        }

        let row = GameConfig.MAP_HEIGH - 1 - tilePos.y;
        let col = tilePos.x;
        let map = BattleManager.getInstance().getBattleData().getMap(mode);
        if (map[row][col] === GameConfig.MAP.TOWER || map[row][col] === GameConfig.MAP.TREE || map[row][col] === GameConfig.MAP.HOLE
            || (tilePos.x === GameConfig.HOUSE_POSITION.x && tilePos.y === GameConfig.HOUSE_POSITION.y)
            || (tilePos.x === GameConfig.MONSTER_BORN_POSITION.x && tilePos.y === GameConfig.MONSTER_BORN_POSITION.y)) {
            return {error: true, msg: MSG_INVALID_TRAP};
        }
    } else {
        return {error: true, msg: MSG_INVALID_TRAP};
    }
    return {error: false};
}