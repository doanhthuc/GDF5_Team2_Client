const Pit = ObjectInTile.extend({
    ctor: function (entityId= -1) {
        this._super(ObjectInCellType.PIT, entityId);
    },

    printLog: function () {
        cc.log("Pit");
    }
})