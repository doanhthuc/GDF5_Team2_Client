const ShopItemSlotNode = cc.Node.extend({
    ctor: function (type, price, unit, quantity = 1) {
        this._super();
        this.init();

        this.clientUIManager = ClientUIManager.getInstance();

        this.type = type;
        this.setPrice(price);
        this.unit = unit;
        this.quantity = quantity;
    },

    init: function () {
        this.shopItemSlotNode = ccs.load(ShopResources.SHOP_ITEM_SLOT_NODE, '').node;
        this.addChild(this.shopItemSlotNode);
        this.shopItemBackgroundImg = this.shopItemSlotNode.getChildByName('shopItemBackgroundImg');
        this.shopItemBtnNode = this.shopItemBackgroundImg.getChildByName('shopItemBtn');
        this.backgroundBtn = this.shopItemBtnNode.getChildByName('backgroundBtn');
        this.shopItemNode = this.shopItemBackgroundImg.getChildByName('shopItemNode');

        this.backgroundBtn.addTouchEventListener(this.onBuyBtnClick.bind(this), this);
    },

    setPrice: function (price) {
        this.price = price;
        this.shopItemBtnNode.getChildByName("priceTxt").setString(this.price);
    },

    setType: function (type) {
        this.type = type;
        // this.shopItemNode.
    },

    onBuyBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            let buyItemPopup = this.clientUIManager.getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_CARD);
            this.clientUIManager.showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_CARD);
        }
    }
});