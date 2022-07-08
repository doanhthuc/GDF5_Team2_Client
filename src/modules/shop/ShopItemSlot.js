const ShopItemSlotNode = cc.Node.extend({
    ctor: function (type, price, unit, quantity, state, id) {
        this._super();
        this._setupUI();

        this.setType(type)
        this.setPrice(price);
        this.setQuantity(quantity);
        this.setUnit(unit);
        this.setState(state);
        this.id = id;
    },

    _setupUI: function () {
        let rootNode = ccs.load(ShopResources.SHOP_ITEM_SLOT_NODE, '').node;
        this.itemNode = rootNode.getChildByName("item");
        this.buyBtn = rootNode.getChildByName("buy_btn");
        this.addChild(rootNode);
    },

    setType: function (type) {
        this.type = type;

        if (type === ItemDefine.CHESTYPE) {
            this.itemNode = ccs.load(ShopResources.SHOP_TREASURE_SLOT_NODE, "").node;
            this.itemNode.setName("item")
            this.addChild(this.itemNode);
            return;
        }

        this.texture = CARD_CONST[type]["cardImage"];
        this.slotName = CARD_NAME_VI[type];

        this.itemNode = ccs.load(ShopResources.SHOP_CARD_ITEM_NODE, "").node;
        this.itemNode.setName("item")
        this.itemNode.attr({x: 0, y: 25, scaleX: 0.7, scaleY: 0.7});
        this.addChild(this.itemNode);
        this.itemNode.getChildByName("image").setTexture(this.texture);
    },

    setPrice: function (price) {
        this.price = price;
        this.buyBtn.getChildByName("priceTxt").setString(this.price);
    },

    setQuantity: function (quantity) {
        this.quantity = quantity;
        this.itemNode.getChildByName("quantity").setString("x" + this.quantity);
    },

    setUnit: function (unit) {
        this.unit = unit;
        if (this.unit === "gem") {
            this.buyBtn.getChildByName("unitIconImg").setTexture(ShopResources.GEM_ICON_SMALL);
        }
    },

    setState: function (state) {
        this.state = state;

        // FIXME: define
        const CAN_BUY = 1;

        if (state === CAN_BUY) {
            this.buyBtn.getChildByName("backgroundBtn").addTouchEventListener(this._onBuyBtnClick.bind(this), this);
        } else {
            this.buyBtn.removeAllChildren();
            // FIXME: hardcode
            let label = new ccui.Text("Đã mua", ShopResources.FONT_SUPERCELL, 20);
            this.buyBtn.addChild(label);
        }
    },

    _onBuyBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            cc.log("[ShopItemSlot] Click on buy btn")
            let buyItemPopup = PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_CARD);
            buyItemPopup.setId(this.id);
            buyItemPopup.setTitle(this.slotName);
            buyItemPopup.setPrice(this.price);
            buyItemPopup.setImage(this.texture);
            buyItemPopup.setQuantity(this.quantity);
            buyItemPopup.setType(this.type);
            PopupUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_CARD);
        }
    },
});