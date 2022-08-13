const ObjectInTile = cc.Class.extend({
    ctor: function (objectInTileType, entityId = -1) {
        this.entityId = entityId;
        this.objectInTileType = objectInTileType;
    },

    getEntityId: function () {
        return this.entityId;
    },

    getObjectInTileType: function () {
        return this.objectInTileType;
    },

    setEntityId: function (entityId) {
        this.entityId = entityId;
    },

    setObjectInTileType: function (objectInTileType) {
        this.objectInTileType = objectInTileType;
    },

    printLog: function () {
        cc.log("ObjectInTile: entityId: " + this.entityId + " objectInTileType: " + this.objectInTileType);
    }
});