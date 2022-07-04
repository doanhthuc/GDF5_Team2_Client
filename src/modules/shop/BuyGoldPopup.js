const BuyGoldPopup = cc.Node.extend({
    ctor: function () {
        this._super();
        this._setupUI();
    },

    _setupUI: function () {
        this.name = CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_GOLD;
        this.popup = ccs.load(ShopResources.BUY_GOLD_POPUP_NODE, '').node;
        this.addChild(this.popup);

        this.quantityTxt = this.popup.getChildByName("quantity");
        this.imageSprite = this.popup.getChildByName("image");
        this.closeBtn = this.popup.getChildByName('closeBtn');
        this.buyBtn = this.popup.getChildByName("buy_btn").getChildByName("backgroundBtn");
        this.popup.getChildByName("buy_btn").getChildByName("unitIconImg").setTexture(ShopResources.GEM_ICON_SMALL);
        this.buyBtn.addTouchEventListener(this._onBuyBtnClick.bind(this), this);
        this.closeBtn.addTouchEventListener(this._onCloseClick.bind(this), this);
    },

    _onBuyBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            cc.log("[BuyGoldPopup.js] buy btn clicked");
            ShopNetwork.connector.sendBuyGoldShop(this.id);
        }
    },

    _onCloseClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
    },

    setId: function (id) {
        this.id = id;
    },

    setImage: function (image) {
        this.imageSprite.setTexture(image);
    },

    setQuantity: function (quantity) {
        this.quantity = quantity;
        this.quantityTxt.setString(this.quantity);
    },

    setPrice: function (price) {
        this.price = price;
        cc.log(this.popup.getChildByName("buy_btn").getChildByName("priceTxt"))
        cc.log(this.price)
        this.popup.getChildByName("buy_btn").getChildByName("priceTxt").setString(this.price);
    },


})