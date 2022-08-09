const Tree = ObjectInTile.extend({
    ctor: function (hp, entityId = -1) {
        this._super(ObjectInCellType.TREE, entityId);
        this.hp = hp;
    },

    getHp: function () {
        return this.hp;
    },

    setHp: function (hp) {
        this.hp = hp;
    },

    printLog: function () {
        cc.log("Tree: entityId = " + this.entityId + ", hp = " + this.hp);
    }
});