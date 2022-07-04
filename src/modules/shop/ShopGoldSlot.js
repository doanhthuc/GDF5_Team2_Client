const ShopGoldSlot = cc.Node.extend({
    ctor: function (id, quantity, price) {
        this._super();
        this._setupUI();
        this.setId(id);
        this.setQuantity(quantity);
        this.setPrice(price);
    },

    _setupUI: function () {
        this.clientUIManager = ClientUIManager.getInstance();
        this.shopGoldSlotNode = ccs.load(ShopResources.SHOP_GOLD_SLOT_NODE, '').node;
        this.addChild(this.shopGoldSlotNode);
        this.shopItemBackgroundImg = this.shopGoldSlotNode.getChildByName('shopItemBackgroundImg');
        this.shopItemBtnNode = this.shopItemBackgroundImg.getChildByName('shopItemBtn');
        this.backgroundBtn = this.shopItemBtnNode.getChildByName('backgroundBtn');
        this.goldImg = this.shopGoldSlotNode.getChildByName('goldImg');
        this.goldSlotValueTxt = this.shopItemBackgroundImg.getChildByName('goldSlotValueTxt');
        this.unitIconImg = this.shopItemBtnNode.getChildByName('unitIconImg');
        this.unitIconImg.setTexture(ShopResources.GEM_ICON_SMALL);
        this.unitIconImg.setScale(0.5);

        this.backgroundBtn.addTouchEventListener(this._onBuyBtnClick.bind(this));
    },

    setId: function (id) {
        this.id = id;
    },

    setQuantity: function (quantity) {
        this.quantity = quantity;
        if (quantity <= 1000) {
            this.goldImg.setTexture("textures/lobby/lobby_shop_item_gold_1.png");
        } else if (quantity < 10000) {
            this.goldImg.setTexture("textures/lobby/lobby_shop_item_gold_2.png");
        } else {
            this.goldImg.setTexture("textures/lobby/lobby_shop_item_gold_3.png");
        }
        this.goldSlotValueTxt.setString(this.quantity);
    },

    setPrice: function (price) {
        this.price = price;
        this.shopItemBtnNode.getChildByName("priceTxt").setString(this.price);
    },

    _onBuyBtnClick: function(sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            let buyGoldPopup = PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_GOLD);
            PopupUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_GOLD);
            buyGoldPopup.setId(this.id);
            buyGoldPopup.setPrice(this.price);
            buyGoldPopup.setQuantity(this.quantity);
            buyGoldPopup.setImage(this.goldImg.getTexture());
        }
    }
});