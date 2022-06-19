const ShopTreasureSlot = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this.shopTreasureSlotNode = ccs.load(ShopResources.SHOP_TREASURE_SLOT_NODE, '').node;
        this.addChild(this.shopTreasureSlotNode);
        this.shopItemBtn = this.shopTreasureSlotNode.getChildByName('shopItemBtn');
        this.treasureImg = this.shopTreasureSlotNode.getChildByName('treasureImg');
        this.treasureNameTxt = this.shopTreasureSlotNode.getChildByName('treasureNameTxt');
    },


})