const ShopGoldSlot = cc.Node.extend({
    ctor: function (gold, price) {
        this.gold = gold;
        this.price = price;
        this._super();
        this.init();
    },

    init: function () {
        this.clientUIManager = ClientUIManager.getInstance();
        this.shopGoldSlotNode = ccs.load(ShopResources.SHOP_GOLD_SLOT_NODE, '').node;
        this.addChild(this.shopGoldSlotNode);
        this.shopItemBackgroundImg = this.shopGoldSlotNode.getChildByName('shopItemBackgroundImg');
        this.shopItemBtnNode = this.shopItemBackgroundImg.getChildByName('shopItemBtn');
        this.backgroundBtn = this.shopItemBtnNode.getChildByName('backgroundBtn');
        this.goldImg = this.shopItemBackgroundImg.getChildByName('goldImg');
        this.goldSlotValueTxt = this.shopItemBackgroundImg.getChildByName('goldSlotValueTxt');
        this.unitIconImg = this.shopItemBtnNode.getChildByName('unitIconImg');
        this.unitIconImg.setTexture(ShopResources.GEM_ICON_SMALL);
        this.unitIconImg.setScale(0.5);

        this.backgroundBtn.addTouchEventListener(this.onBuyBtnClick.bind(this));
    },

    onBuyBtnClick: function(sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            let buyGoldPopup = this.clientUIManager.getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_GOLD);
            this.clientUIManager.showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_GOLD);
        }
    }
});