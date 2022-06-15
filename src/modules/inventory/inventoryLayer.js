const inventoryLayer = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this.inventoryNode = ccs.load(InventoryResources.INVENTORY_NODE, '').node;
        this.addChild(this.inventoryNode);
        this.inventoryNode.setPosition(cc.winSize.width / 2, 0);
    }


});