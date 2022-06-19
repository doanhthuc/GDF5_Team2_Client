const TreasureSlot = cc.Node.extend({
    id: null,
    DEFAULT_STATE: TreasureSlotResources.STATE.EMPTY,
    // state: this.DEFAULT_STATE,
    timeRemaining: 0,
    countdownTxt: 0,
    node: null,


    ctor: function () {
        this.clientUIManager = clientUIManager.getInstance();
        this.state = this.DEFAULT_STATE;
        this._super();
        this.init();
        this.setNodeByState(this.state);

    },

    init: function () {
        this.emptySlotNode = ccs.load(TreasureSlotResources.EMPTY_SLOT_RES, '').node;
        this.emptySlotNode.retain();
        this.occupiedSlotNode = ccs.load(TreasureSlotResources.OCCUPIED_SLOT_RES, '').node;
        this.occupiedSlotNode.retain();
        this.openingSlotNode = ccs.load(TreasureSlotResources.OPENING_SLOT_RES, '').node;
        this.openingSlotNode.retain();
        this.finishedSlotNode = ccs.load(TreasureSlotResources.FINISHED_SLOT_RES, '').node;
        this.finishedSlotNode.retain();
    },

    setNodeByState: function (state) {
        this.state = state;
        if (this.node !== null) {
            this.node.removeFromParent(false)
        }
        switch (state) {
            case TreasureSlotResources.STATE.EMPTY:
                this.node = this.emptySlotNode;
                break;
            case TreasureSlotResources.STATE.OCCUPIED:
                this.node = this.occupiedSlotNode;
                break;
            case TreasureSlotResources.STATE.OPENING:
                this.node = this.openingSlotNode;
                break;
            case TreasureSlotResources.STATE.FINISHED:
                this.node = this.finishedSlotNode;
                break;
        }
        this.addChild(this.node)
        this.setSlotProperties();
    },


    setTimeRemainingTxt: function (time) {
        if (this.state === TreasureSlotResources.STATE.OCCUPIED) {
            this.timeRemaining = time;
            this.node.getChildByName('countdownTxt').setString(time);
        }
    },

    setCountdownTxt: function (countdownTxt) {
        if (this.state === TreasureSlotResources.STATE.OPENING) {
            this.countdownTxt = countdownTxt;
            this.node.getChildByName('countdownTxt').setString(countdownTxt);
        }
    },

    setSlotProperties: function () {
        this.backgroundBtn = this.node.getChildByName('backgroundBtn');
        this.backgroundBtn.addTouchEventListener(this.onSlotClick.bind(this));
    },

    onSlotClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.clientUIManager.showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_TREASURE);
        }
    },


})