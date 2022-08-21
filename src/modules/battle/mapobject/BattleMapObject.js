const BattleMapObject = cc.Class.extend({
    ctor: function (height, width) {
        this.width = width;
        this.height = height;
        this.battleMap = [];
        for (let i = 0; i < this.height; i++) {
            this.battleMap[i] = new Array(width);
        }
    },

    putTowerIntoMap: function (entityId, towerType, towerLevel, tilePos) {
        return this.battleMap[tilePos.x][tilePos.y].buildTower(entityId, towerType, towerLevel, tilePos);
    },

    destroyTowerInMapObject: function (tilePos) {
        return this.getTileObjectByTilePos(tilePos).destroyTower();
    },

    convertBattleMapObjectToSimpleMap: function () {
        let simpleMap = [];
        for (let i = 0; i < this.height; i++) {
            simpleMap[i] = new Array(this.width);
        }
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                // let row = GameConfig.MAP_HEIGH - 1 - i;
                let row = i;
                let objectInTileType = this.battleMap[i][j].getObjectInTileType();
                let tileType = this.battleMap[i][j].getTileType();
                if (objectInTileType === ObjectInCellType.TOWER) {
                    simpleMap[row][j] = GameConfig.MAP.TOWER;
                } else if (objectInTileType === ObjectInCellType.PIT) {
                    simpleMap[row][j] = GameConfig.MAP.HOLE;
                } else if (objectInTileType === ObjectInCellType.TREE) {
                    simpleMap[row][j] = GameConfig.MAP.TREE;
                } else if (tileType === TileType.ATTACK_SPEED_UP) {
                    simpleMap[row][j] = GameConfig.MAP.ATTACK_SPEED
                } else if (tileType === TileType.ATTACK_RANGE_UP) {
                    simpleMap[row][j] = GameConfig.MAP.ATTACK_RANGE
                } else if (tileType === TileType.DAMAGE_UP) {
                    simpleMap[row][j] = GameConfig.MAP.ATTACK_DAMAGE
                } else {
                    simpleMap[row][j] = GameConfig.MAP.NONE;
                }
            }
        }
        let transposeMatrix = [];
        for (let i = 0; i < this.width; i++) {
            transposeMatrix[i] = new Array(this.height);
        }
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                transposeMatrix[j][i] = simpleMap[i][j];
            }
        }

        return transposeMatrix.reverse();
    },

    isHavingTowerInTile: function (tilePos) {
        return this.battleMap[tilePos.x][tilePos.y].isHavingTower();
    },

    getTowerInTile: function (tilePos) {
        if (this.getObjectInTileByTilePos(tilePos).getObjectInTileType() === ObjectInCellType.TOWER) {
            return this.battleMap[tilePos.x][tilePos.y].getObjectInTile();
        }
        return null;
    },

    getEntityIdByTilePos: function (tilePos) {
        return this.battleMap[tilePos.x][tilePos.y].getObjectInTile().getEntityId();
    },

    setTileObject: function (x, y, tileObject) {
        this.battleMap[x][y] = tileObject;
    },

    getTileObject: function (x, y) {
        if (x < 0 || x >= this.height || y < 0 || y >= this.width) {
            return null;
        }
        return this.battleMap[x][y];
    },

    getTileObjectByTilePos: function (tilePos) {
        return this.battleMap[tilePos.x][tilePos.y];
    },

    getBuffType: function (tilePos) {
        let tileObject = this.getTileObjectByTilePos(tilePos);
        return tileObject.getTileType();
    },

    getBattleMap: function () {
        return this.battleMap;
    },

    getObjectInTile: function (x, y) {
        return this.battleMap[x][y].getObjectInTile();
    },

    getObjectInTileByTilePos: function (tilePos) {
        return this.battleMap[tilePos.x][tilePos.y].getObjectInTile();
    }
});

BattleMapObject.unpackData = function (inPacket) {
    let mapHeight = inPacket.getInt();
    let mapWidth = inPacket.getInt();
    let battleMapObject = new BattleMapObject(mapHeight, mapWidth);
    let battleMap = battleMapObject.getBattleMap();
    for (let i = 0; i < mapHeight; i++) {
        for (let j = 0; j < mapWidth; j++) {
            battleMap[i][j] = BattleMapObject._unpackTileObject(inPacket);
        }
    }
    return battleMapObject;
},

BattleMapObject._unpackTileObject = function (inPacket) {
    let tilePos = {
        x: inPacket.getInt(),
        y: inPacket.getInt()
    };
    let tileType = inPacket.getInt();
    let objectInTileType = inPacket.getInt();
    let tileObject = new TileObject(tilePos, tileType, objectInTileType);
    BattleMapObject._unpackObjectInTile(tileObject, inPacket);
    return tileObject;
},

BattleMapObject._unpackObjectInTile = function (tileObject, inPacket) {
    switch (tileObject.getObjectInTileType()) {
        case ObjectInCellType.TREE:
            let hp = inPacket.getDouble();
            let tree = new Tree(hp);
            tileObject.setObjectInTile(tree);
            break;
        case ObjectInCellType.TOWER:
            let towerType = inPacket.getInt();
            let towerLevel = inPacket.getInt();
            let entityId = inPacket.getLong();
            let tower = new Tower(towerType, towerLevel, tileObject.getTilePos());
            tower.setEntityId(entityId);
            tileObject.setObjectInTile(tower);
            break;
        case ObjectInCellType.PIT:
            let pit = inPacket.getInt();
            let pitObject = new Pit();
            tileObject.setObjectInTile(pitObject);
            break;
        default:
            break;
    }
}