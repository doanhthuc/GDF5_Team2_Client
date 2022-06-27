const OccupiedSlotNode = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
        this.treasureTypeId = 0;
    },

    init: function () {
        this.occupiedSlotNode = ccs.load(TreasureSlotResources.OCCUPIED_SLOT_RES, '').node;
        this.addChild(this.occupiedSlotNode);
        this.countdownTxt = this.occupiedSlotNode.getChildByName('countdownTxt');
        this.backgroundBtn = this.occupiedSlotNode.getChildByName('backgroundBtn');
        this.backgroundBtn.addTouchEventListener(this.onSlotClick.bind(this), this);
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
            ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_TREASURE).setPopUpInfoFromTreasureType(this.treasureTypeId);
            ClientUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_TREASURE);
        }
    },


})