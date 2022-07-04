const BuyCardPopup = cc.Node.extend({
    ctor: function () {
        this._super();
        this._setupUI();
    },

    _setupUI: function () {
        this.name = CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_CARD;
        this.popupNode = ccs.load(ShopResources.BUY_CARD_POPUP_NODE, '').node;
        this.addChild(this.popupNode);

        this.closeBtn = this.popupNode.getChildByName('closeBtn');
        this.buyBtn = this.popupNode.getChildByName("buy_btn");
        this.closeBtn.addTouchEventListener(this.onCloseClick.bind(this), this);
        this.buyBtn.getChildByName("backgroundBtn").addTouchEventListener(this.onBuyBtnClick.bind(this), this);

        this.upgradeProgressNode = this.popupNode.getChildByName('progress');
        this.progressBorderImg = this.upgradeProgressNode.getChildByName('progressBorderImg');
        this.progressBackgroundImg = this.progressBorderImg.getChildByName('progressBackgroundImg');
        this.accumulateTxt = this.progressBorderImg.getChildByName('accumulateTxt');
    },

    setId: function (id) {
        this.id = id;
    },

    setType: function (type) {
        this.type = type;
        let card = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.INVENTORY_CONTEXT)
            .getCardById(this.type);
        let amount = 0;
        if (card) {
            amount = card.amount;
        }
        let percent = amount / JsonReader.getCardUpgradeConfig()[card.cardLevel + 1].fragments;
        percent = percent > 1 ? 1 : percent;
        this.progressBackgroundImg.setScaleX(percent);
        this.accumulateTxt.setString(amount + '/' + JsonReader.getCardUpgradeConfig()[card.cardLevel + 1].fragments);
    },

    setTitle: function (title) {
        this.popupNode.getChildByName("cardNameTxt").ignoreContentAdaptWithSize(false);
        this.popupNode.getChildByName("cardNameTxt").setString(title);
    },

    setQuantity: function (quantity) {
        this.popupNode.getChildByName("quantity").setString("x" + quantity);
    },

    setPrice: function (price) {
        this.buyBtn.getChildByName("priceTxt").setString(price);
    },

    setImage: function (image) {
        this.popupNode.getChildByName("card").getChildByName("cardImage").setTexture(image);
    },

    setQuantity: function (quantity) {
        this.popupNode.getChildByName("quantity").setString("x" + quantity);
    },

    onCloseClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
    },

    onBuyBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            cc.log("[BuyCardPopup.js] click on buy btn, card id = " + this.id);
            ShopNetwork.connector.sendBuyDailyShop(this.id)
        }
    },
})