const ShopItemSlotNode = cc.Node.extend({
    ctor: function (type, price, unit, quantity, state) {
        this._super();
        this._setupUI();

        this.setType(type)
        this.setPrice(price);
        this.setQuantity(quantity);
        this.setUnit(unit);
        this.setState(state);
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

        let texture = null;
        switch (type) {
            case ItemDefine.OWL:
                texture = ShopResources.SHOP_CARD_CANNON_IMG;
                break;
            case ItemDefine.CROW:
                texture = ShopResources.SHOP_CARD_CROW_IMG;
                break;
            case ItemDefine.FROG:
                texture = ShopResources.SHOP_CARD_FROG_IMG;
                break;
            case ItemDefine.BUNNY:
                texture = ShopResources.SHOP_CARD_BUNNY_IMG;
                break;
            case ItemDefine.POLAR:
                texture = ShopResources.SHOP_CARD_POLAR_IMG;
                break;
            case ItemDefine.GOAT:
                texture = ShopResources.SHOP_CARD_GOAT_IMG;
                break;
            case ItemDefine.SNAKE:
                texture = ShopResources.SHOP_CARD_SNAKE_IMG;
                break;
            case ItemDefine.FIRE:
                texture = ShopResources.SHOP_CARD_FIRE_IMG;
                break;
            case ItemDefine.SNOW:
                texture = ShopResources.SHOP_CARD_SNOW_IMG;
                break;
        }

        this.itemNode = ccs.load(ShopResources.SHOP_CARD_ITEM_NODE, "").node;
        this.itemNode.setName("item")
        this.itemNode.attr({x: 0, y: 25, scaleX: 0.7, scaleY: 0.7});
        this.addChild(this.itemNode);
        this.itemNode.getChildByName("image").setTexture(texture);
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
            this.buyBtn.getChildByName("backgroundBtn").setTouchEnabled(false);
            this.buyBtn.getChildByName("backgroundBtn").setBright(false);
            this.buyBtn.getChildByName("backgroundBtn").setEnabled(false);
        }
    },

    _onBuyBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            let buyItemPopup = ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_CARD);
            ClientUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_CARD);
        }
    }
});