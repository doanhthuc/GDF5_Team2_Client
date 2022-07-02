const FinishedSlotNode = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
        this.treasureTypeId = 0;
    },

    setTrasureTypeId: function (id) {
        this.treasureTypeId = id;
    },

    init: function () {
        this.openingSlotNode = ccs.load(TreasureSlotResources.FINISHED_SLOT_RES, '').node;
        this.addChild(this.openingSlotNode);
        this.backgroundBtn = this.openingSlotNode.getChildByName('backgroundBtn');
        this.backgroundBtn.addTouchEventListener(this.onSlotClick.bind(this), this);

    },

    onSlotClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_TREASURE).setPopUpInfoFromTreasureType(this.treasureTypeId);
            PopupUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_TREASURE);
        }
    },


});