const ShopItemSlotNode = cc.Node.extend({
    ctor: function (type, price, unit, quantity = 1) {
        this._super();
        this.type = type;
        this.price = price;
        this.unit = unit;
        this.quantity = quantity;
        this.init();
    },

    init: function () {
        this.shopItemSlotNode = ccs.load(ShopResources.SHOP_ITEM_SLOT_NODE, '').node;
        this.addChild(this.shopItemSlotNode);
        this.slotItemBtn = this.shopItemSlotNode.getChildByName('slotItemBtn');
        this.slotItemNode = this.shopItemSlotNode.getChildByName('slotItemNode');
    }
});