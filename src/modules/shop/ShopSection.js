const ShopSection = cc.Node.extend({
    ctor: function (type) {
        this.shopItemSlotList = [];
        this.type = type;
        this._super();
        this.init();
    },

    init: function () {
        this.shopSectionNode = ccs.load(ShopResources.SHOP_SECTION_NODE, '').node;
        this.addChild(this.shopSectionNode);
        this.backgroundImg = this.shopSectionNode.getChildByName('shopPanelBackgroundImg');
        this.categoryNode = this.shopSectionNode.getChildByName('ShopSectionTitleNode');
        this.shopRefreshNode = this.shopSectionNode.getChildByName('shopRefreshNode');

        if (this.type === "gold") {
                this.categoryNode.getChildByName('categoryBackgroundImg')
                    .getChildByName('categoryTitleImg')
                    .setTexture(ShopResources.SHOP_SECTION_TITLE_GOLD_TXT);
            this.shopRefreshNode.setVisible(false);
            this.setShopGoldSlotPosition()
        }
    },

    setShopItemSlotPosition: function (itemList) {
        let startX = ShopResources.SHOP_ITEM_SLOT_START_X;
        let startY = ShopResources.SHOP_ITEM_SLOT_START_Y;
        for (let itemData of itemList) {
            let item;
            item = new ShopItemSlotNode(itemData.type, itemData.price, itemData.unit, itemData.quantity, itemData.state);
            item.setPosition(startX, startY);
            this.shopItemSlotList.push(item);
            this.backgroundImg.addChild(item);
            startX += ShopResources.SHOP_ITEM_SLOT_WIDTH + ShopResources.SHOP_ITEM_SLOT_MARGIN_BETWEEN;
        }
    },

    setShopGoldSlotPosition: function (itemList) {
        let startX = ShopResources.SHOP_ITEM_SLOT_START_X;
        let startY = ShopResources.SHOP_ITEM_SLOT_START_Y;
        for (let i = 0; i < ShopResources.SHOP_ITEM_SLOT_PER_LINE; i++) {
            let shopGoldSlot = new ShopGoldSlot(i + 1);
            shopGoldSlot.setPosition(startX, startY);
            this.backgroundImg.addChild(shopGoldSlot);
            startX += ShopResources.SHOP_ITEM_SLOT_WIDTH + ShopResources.SHOP_ITEM_SLOT_MARGIN_BETWEEN;
        }
    }
});