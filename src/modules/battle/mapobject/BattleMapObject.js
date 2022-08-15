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
                } else if (objectInTileType === ObjectInCellType.PIT){
                    simpleMap[row][j] = GameConfig.MAP.HOLE;
                } else if (objectInTileType === ObjectInCellType.TREE) {
                    simpleMap[row][j] = GameConfig.MAP.TREE;
                }
                else if (tileType === TileType.ATTACK_SPEED_UP) {
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