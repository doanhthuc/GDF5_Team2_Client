const ShopSection = cc.Node.extend({
    ctor: function (type) {
        this.dailyItemSlot = new Map();
        this.type = type;
        this._super();
        this._setupUI();
    },

    _setupUI: function () {
        this.shopSectionNode = ccs.load(ShopResources.SHOP_SECTION_NODE, '').node;
        this.addChild(this.shopSectionNode);
        this.backgroundImg = this.shopSectionNode.getChildByName('shopPanelBackgroundImg');
        this.categoryNode = this.shopSectionNode.getChildByName('ShopSectionTitleNode');
        this.categoryBackgroundImg = this.categoryNode.getChildByName('categoryBackgroundImg');
        this.shopRefreshNode = this.shopSectionNode.getChildByName('shopRefreshNode');
        this.countDownTimeStr = this.shopRefreshNode.getChildByName("countdownTimeTxt");
        this._height = this.backgroundImg.height + this.categoryBackgroundImg.height;

        if (this.type === "gold") {
            // change title of section to "Mua vang"
            this.categoryNode.getChildByName('categoryBackgroundImg')
                .getChildByName('categoryTitleImg')
                .setTexture(ShopResources.SHOP_SECTION_TITLE_GOLD_TXT);
            this.shopRefreshNode.setVisible(false);
        }

        this._spriteContainerActive = [];
    },

    /**
     *
     * @param futureTime - server time
     */
    setDailyTime: function (futureResetTime) {
        // daily shop
        // this.futureTime = TimeUtil.getServerTime() + (60 * 1000) * 1 / 10; // plus + 1 minute
        this.futureResetTime = futureResetTime;
        this.schedule(this.updateTimeDailyShop, 0.1);
    },

    updateTimeDailyShop: function () {
        let distanceTime = this.futureResetTime - TimeUtil.getServerTime();
        if (distanceTime >= 0) {
            this.countDownTimeStr.setString(millisecondToTimeString(distanceTime));
        } else {
            // call get daily shop
            cc.error("Call get daily shop")
            ShopNetwork.connector.sendGetUserDailyShop();
            this.unschedule(this.updateTimeDailyShop);
        }
    },

    addDataForDailySection: function (itemList) {
        while (this._spriteContainerActive.length > 0) {
            let activeSp = this._spriteContainerActive.pop();
            activeSp.removeFromParent();
        }

        let startX = ShopResources.SHOP_ITEM_SLOT_START_X;
        let startY = ShopResources.SHOP_ITEM_SLOT_START_Y;
        for (let itemData of itemList) {
            let item;
            item = new ShopItemSlotNode(itemData.type, itemData.price, itemData.unit, itemData.quantity, itemData.state, itemData.id);
            item.setPosition(startX, startY);
            this.dailyItemSlot.set(item.id, item);
            this.backgroundImg.addChild(item);
            this._spriteContainerActive.push(item);

            startX += ShopResources.SHOP_ITEM_SLOT_WIDTH + ShopResources.SHOP_ITEM_SLOT_MARGIN_BETWEEN;
        }
    },

    addDataForGoldSection: function (itemList) {
        let startX = ShopResources.SHOP_ITEM_SLOT_START_X;
        let startY = ShopResources.SHOP_ITEM_SLOT_START_Y;

        for (let item of itemList) {
            let shopGoldSlot = new ShopGoldSlot(item.id, item.quantity, item.price);
            shopGoldSlot.setPosition(startX, startY);
            this.backgroundImg.addChild(shopGoldSlot);
            startX += ShopResources.SHOP_ITEM_SLOT_WIDTH + ShopResources.SHOP_ITEM_SLOT_MARGIN_BETWEEN;
        }
    },

    getDailyItemSlotById: function (id) {
        return this.dailyItemSlot.get(id);
    },

    disableCardSlot: function (id) {
        let card = this.getDailyItemSlotById(id);
        // FIXME: hardcode
        let PURCHASED = 0;
        card.setState(PURCHASED);
    }
});