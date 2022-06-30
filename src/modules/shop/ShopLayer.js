const ShopLayer = cc.Node.extend({
    ctor: function () {
        this._super();
        this._setupUI();
    },

    shopSectionList: [],

    _setupUI: function () {
        let startX = cc.winSize.width / 2;
        let startY = 820;

        this.dailySection = new ShopSection("treasure");
        this.dailySection.setPosition(startX, startY);
        this.addChild(this.dailySection);
        this.shopSectionList.push(this.dailySection);

        this.goldSection = new ShopSection("gold");
        this.goldSection.setPosition(startX, startY
            - (ShopResources.SHOP_SECTION_NODE_HEIGHT + ShopResources.SHOP_SECTION_MARGIN_BOTTOM))
        this.addChild(this.goldSection);
        this.shopSectionList.push(this.goldSection);
    },

    renderDailySection: function (itemList) {
        this.dailySection.setShopItemSlotPosition(itemList);
    },

    renderGoldSection: function (itemList) {
        this.goldSection.setShopGoldSlotPosition(itemList);
    }

})