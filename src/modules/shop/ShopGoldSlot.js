const ShopGoldSlot = cc.Node.extend({
    ctor: function (gold, price) {
        this.gold = gold;
        this.price = price;
        this._super();
        this.init();
    },

    init: function () {
        this.shopGoldSlotNode = ccs.load(ShopResources.SHOP_GOLD_SLOT_NODE, '').node;
        this.addChild(this.shopGoldSlotNode);
        this.shopItemBackgroundImg = this.shopGoldSlotNode.getChildByName('shopItemBackgroundImg');
        this.shopItemBtn = this.shopItemBackgroundImg.getChildByName('shopItemBtn');
        this.goldImg = this.shopItemBackgroundImg.getChildByName('goldImg');
        this.goldSlotValueTxt = this.shopItemBackgroundImg.getChildByName('goldSlotValueTxt');
        this.unitIconImg = this.shopItemBtn.getChildByName('unitIconImg');
        this.unitIconImg.setTexture(ShopResources.GEM_ICON_SMALL);
        this.unitIconImg.setScale(0.5);
    }
});