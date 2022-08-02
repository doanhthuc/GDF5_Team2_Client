const ShopLayer = cc.Node.extend({
    ctor: function (headerHeight) {
        this.headerHeight = headerHeight;
        this._super();
        this._setupUI();
    },

    shopSectionList: [],

    _setupUI: function () {
        let startX = cc.winSize.width / 2;
        let startY = 820;

        // Daily section
        this.dailySection = new ShopSection("treasure");
        this.addChild(this.dailySection);
        this.dailySection.setPosition(cc.winSize.width / 2, cc.winSize.height - this.headerHeight - this.dailySection._height / 2);
        this.shopSectionList.push(this.dailySection);

        // Buy gold section
        this.goldSection = new ShopSection("gold");
        // this.goldSection.setPosition(startX, startY
        //     - (ShopResources.SHOP_SECTION_NODE_HEIGHT + ShopResources.SHOP_SECTION_MARGIN_BOTTOM))
        this.addChild(this.goldSection);
        this.goldSection.setPosition(cc.winSize.width / 2, cc.winSize.height - this.headerHeight - this.dailySection._height - this.goldSection._height / 2);
        this.shopSectionList.push(this.goldSection);
    },

    disableCardItemInDailySection: function (cardId) {
        this.dailySection.disableCardSlot(cardId);
    },

    closePopup: function () {
        PopupUIManager.getInstance().closeUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_CARD);
        PopupUIManager.getInstance().closeUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_GOLD);
    },

    renderDailySection: function (dailyShopData) {
        this.dailySection.addDataForDailySection(dailyShopData.itemList);
        this.dailySection.setDailyTime(dailyShopData.futureResetTime);
    },

    renderGoldSection: function (itemList) {
        this.goldSection.addDataForGoldSection(itemList);
    }
});