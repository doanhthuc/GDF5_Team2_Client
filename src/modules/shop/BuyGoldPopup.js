const BuyGoldPopup = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this.name = CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_GOLD;
         this.buyGoldPopupNode = ccs.load(ShopResources.BUY_GOLD_POPUP_NODE, '').node;
        this.addChild(this.buyGoldPopupNode);

        this.closeBtn = this.buyGoldPopupNode.getChildByName('closeBtn');
        this.closeBtn.addTouchEventListener(this.onCloseClick.bind(this), this);
    },

    onCloseClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
    },
})