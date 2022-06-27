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
        this.treasureGoldQuantityTxt = this.treasurePopupNode.getChildByName('treasureGoldQuantityTxt');
        this.treasureCardQuantityTxt = this.treasurePopupNode.getChildByName('treasureCardQuantityTxt');
        this.primaryBtn = this.treasurePopupNode.getChildByName('primaryBtn');
        this.primaryBtn.addTouchEventListener(this.onPrimartBtnClick.bind(this), this);
    },

    setPopUpInfoFromTreasureType: function (treasureTypeId) {
        let treasureReward = JsonReader.getTreasureConfig().treasures[treasureTypeId].rewards[0];
        this.treasureGoldQuantityTxt.setString(treasureReward.minGold + " - " + treasureReward.maxGold);
        this.treasureCardQuantityTxt.setString(treasureReward.minFragment + " - " + treasureReward.maxFragment);
    },

    onCloseClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
    },

    onPrimartBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            cc.log("primary click")
            this.setVisible(false);
        }
    }
});