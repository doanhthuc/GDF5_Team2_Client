const TreasurePopup = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this.name = CLIENT_UI_CONST.POPUPS_NAME.GUI_TREASURE;
        this.treasurePopupNode = ccs.load(res.TREASURE_POPUP_NODE, '').node;
        this.addChild(this.treasurePopupNode);
        this.closeBtn = this.treasurePopupNode.getChildByName('closeBtn');
        this.closeBtn.addTouchEventListener(this.onCloseClick.bind(this), this);
    },

    onCloseClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            cc.log("close click")
            this.setVisible(false);
        }
    },
});