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
    },

    setId: function (id) {
        this.id = id;
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
            ShopNetwork.connector.sendBuyDailyShop(this.id)
        }
    },
})