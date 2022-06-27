const ShopLayer = cc.Node.extend({
    ctor: function () {
        this._super();
        this._init();
    },

    shopSectionList: [],

    _init: function () {
        let startX = cc.winSize.width / 2;
        let startY = 820;

        this.dailySection = new ShopSection("treasure");
        this.addChild(this.dailySection);
        this.shopSectionList.push(this.dailySection);
        this.dailySection.setPosition(startX, startY);

        let goldSection = new ShopSection("gold");
        this.addChild(goldSection);
        this.shopSectionList.push(goldSection);
        goldSection.setPosition(startX, startY - 1 * (ShopResources.SHOP_SECTION_NODE_HEIGHT + ShopResources.SHOP_SECTION_MARGIN_BOTTOM))
    },

    renderDailySection: function (itemList) {
        this.dailySection.setShopItemSlotPosition(itemList);
    }

})