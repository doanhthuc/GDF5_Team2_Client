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
        return this.battleMap[tilePos.x][tilePos.y].buildTower(entityId, towerType, towerLevel);
    },

    isHavingTowerInTile: function (tilePos) {
        return this.battleMap[tilePos.x][tilePos.y].isHavingTower();
    },

    getTowerInTile: function (tilePos) {
        if (this.objectInTileType === ObjectInCellType.TOWER) {
            return this.battleMap[tilePos.x][tilePos.y].getObjectInTile();
        }
        return null;
    },

    setTileObject: function (x, y, tileObject) {
        this.battleMap[x][y] = tileObject;
    },

    getTileObject: function (x, y) {
        return this.battleMap[x][y];
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