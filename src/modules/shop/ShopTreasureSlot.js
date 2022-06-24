const ShopTreasureSlot = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this.clientUIManager = ClientUIManager.getInstance();
        this.shopTreasureSlotNode = ccs.load(ShopResources.SHOP_TREASURE_SLOT_NODE, '').node;
        this.addChild(this.shopTreasureSlotNode);
        this.shopItemBackgroundImg = this.shopTreasureSlotNode.getChildByName('shopItemBackgroundImg');
        this.shopItemBtn = this.shopItemBackgroundImg.getChildByName('shopItemBtn');
        this.backgroundBtn = this.shopItemBtn.getChildByName('backgroundBtn');

        this.treasureImg = this.shopItemBackgroundImg.getChildByName('treasureImg');
        this.treasureNameTxt = this.shopItemBackgroundImg.getChildByName('treasureNameTxt');

        this.backgroundBtn.addTouchEventListener(this.onBuyBtnClick.bind(this));
    },

    onBuyBtnClick: function(sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            let treasurePopup = this.clientUIManager.getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_TREASURE);
            this.clientUIManager.showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_GOLD);
        }
    }


})