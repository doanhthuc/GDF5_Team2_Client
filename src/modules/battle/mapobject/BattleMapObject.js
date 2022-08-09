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
                simpleMap[i][j] = this.battleMap[i][j].getObjectInTileType();
            }
        }
        return simpleMap;
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