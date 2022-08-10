const TileObject = cc.Class.extend({
    ctor: function (tilePos, tileType, objectInTileType, objectInTile) {
        this.tilePos = tilePos;
        this.tileType = tileType;
        this.objectInTileType = objectInTileType;
        if (!objectInTile) {
            this.objectInTile = new ObjectInTile(ObjectInCellType.NONE);
        } else {
            this.objectInTile = objectInTile;
        }
    },

    buildTower: function (entityId, towerType, towerLevel, tilePos) {
        if (this.objectInTile.getObjectInTileType() === ObjectInCellType.NONE) {
            this.objectInTileType = ObjectInCellType.TOWER;
            this.objectInTile = new Tower(towerType, towerLevel, tilePos, entityId);
        } else {
            cc.log("Can't build tower on this tile");
        }
        return this.objectInTile;
    },

    destroyTower: function () {
        if (this.objectInTile.getObjectInTileType() === ObjectInCellType.TOWER) {
            this.objectInTileType = ObjectInCellType.NONE;
            this.objectInTile = new ObjectInTile(ObjectInCellType.NONE);
        } else {
            cc.log("This tile is not a tower");
        }
        return this.objectInTile;
    },

    isHavingTower: function () {
        return this.objectInTileType === ObjectInCellType.TOWER;
    },

    getObjectInTileType: function () {
        return this.objectInTileType;
    },

    getTilePos: function () {
        return this.tilePos;
    },

    getTileType: function () {
        return this.tileType;
    },

    getObjectInTile: function () {
        return this.objectInTile;
    },

    setTilePos: function (tilePos) {
        this.tilePos = tilePos;
    },

    setTileType: function (tileType) {
        this.tileType = tileType;
    },

    setObjectInTile: function (objectInTile) {
        this.objectInTile = objectInTile;
    },

    setObjectInTileType: function (objectInTileType) {
        this.objectInTileType = objectInTileType;
    },

    printLog: function () {
        cc.log("TileObject: tilePos: " + this.tilePos + " tileType: " + this.tileType +
            " objectInTileType: " + this.objectInTileType + " objectInTile: " + this.objectInTile.printLog());
    }
})