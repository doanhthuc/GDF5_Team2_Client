const BuyCardPopup = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this.name = CLIENT_UI_CONST.POPUPS_NAME.GUI_BUY_CARD;
        this.buyCardPopupNode = ccs.load(ShopResources.BUY_CARD_POPUP_NODE, '').node;
        this.addChild(this.buyCardPopupNode);

        this.closeBtn = this.buyCardPopupNode.getChildByName('closeBtn');
        this.closeBtn.addTouchEventListener(this.onCloseClick.bind(this), this);
    },

    onCloseClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
    },
})