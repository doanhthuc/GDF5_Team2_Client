const ShopItemSlotNode = cc.Node.extend({
    ctor: function (type, price, unit, quantity = 1) {
        this.clientUIManager = ClientUIManager.getInstance();
        this._super();
        this.type = type;
        this.price = price;
        this.unit = unit;
        this.quantity = quantity;
        this.init();
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

    onBuyBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            let buyItemPopup = PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_CARD);
            PopupUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_CARD);
        }
    }
});