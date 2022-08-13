const Tower = ObjectInTile.extend({
    ctor: function (type, level, tilePos, entityId = -1) {
        this._super(ObjectInCellType.TOWER, entityId);
        this.type = type;
        this.level = level;
        this.tilePos = tilePos;
    },

    getType: function () {
        return this.type;
    },

    getLevel: function () {
        return this.level;
    },

    getTilePos: function () {
        return this.tilePos;
    },

    setType: function (type) {
        this.type = type;
    },

    setLevel: function (level) {
        this.level = level;
    },

    setTilePos: function (tilePos) {
        this.tilePos = tilePos;
    },

    printLog: function () {
        cc.log("Tower: type: " + this.type + " level: " + this.level + " tilePos: " + this.tilePos + " entityId: " + this.entityId);
    }
})