const OpeningSlotNode = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
        this.treasureTypeId = 0;
    },

    init: function () {
        this.openingSlotNode = ccs.load(TreasureSlotResources.OPENING_SLOT_RES, '').node;
        this.addChild(this.openingSlotNode);
        this.countdownTxt = this.openingSlotNode.getChildByName('countdownTxt');
        this.backgroundBtn = this.openingSlotNode.getChildByName('backgroundBtn');
        this.backgroundBtn.addTouchEventListener(this.onSlotClick.bind(this), this);
        this.countDownNode = this.openingSlotNode.getChildByName('countDownNode');
        this.countdownTxt = this.countDownNode.getChildByName('countdownTxt');
    },

    setTrasureTypeId: function (id) {
        this.treasureTypeId = id;
        this.setSlotInfoByTreasureTypeId();
    },

    setSlotInfoByTreasureTypeId: function () {
        let treasureConfig = JsonReader.getInstance().getTreasureConfig();
        let treasureType = treasureConfig.treasures[this.treasureTypeId];
        this.countdownTxt.setString(treasureType.unlockDuration/(60 * 60) + "h");
    },

    onSlotClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            ClientUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_TREASURE);
        }
    },
})