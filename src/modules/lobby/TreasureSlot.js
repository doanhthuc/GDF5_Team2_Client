const TreasureSlot = cc.Node.extend({
    ctor: function (id) {
        this.id = id;
        this.DEFAULT_STATE = TreasureSlotResources.STATE.EMPTY;
        this.clientUIManager = ClientUIManager.getInstance();
        this.state = this.DEFAULT_STATE;
        this._super();
        // this.initAllSlotTypes();
        // this.setSlotVisibleByState(this.DEFAULT_STATE);
        this.init();
        this.setSlotTexturesByState(this.state);
    },

    init: function () {
        this.nodeSlot = ccs.load(TreasureSlotResources.OPENING_SLOT_RES, '').node;
        this.addChild(this.nodeSlot);
        this.backgroundBtn = this.nodeSlot.getChildByName("backgroundBtn");
        this.treasureImg = this.nodeSlot.getChildByName("treasureImg");
        this.openingActionTxt = this.nodeSlot.getChildByName("openingActionTxt");
        this.occupiedCountdownTxt = this.nodeSlot.getChildByName("occupiedCountdownTxt");
        this.skipGemTxt = this.nodeSlot.getChildByName("skipGemTxt");
        this.openingGemIcon = this.nodeSlot.getChildByName("openingGemIcon");
        this.countDownNode = this.nodeSlot.getChildByName("countDownNode");
        this.openingCountDownTxt = this.countDownNode.getChildByName("countdownTxt");
        this.mapNameTxt = this.nodeSlot.getChildByName("mapNameTxt");
        this.emptySlotTxt = this.nodeSlot.getChildByName("emptySlotTxt");
        this.finishedActionTxt = this.nodeSlot.getChildByName("finishedActionTxt");
        this.backgroundBtn.addTouchEventListener(this.onSlotClick.bind(this), this);
    },

    setStateOfSlot: function (state, claimTime = 0) {
        this.state = state;
        cc.log('TreasureSlot line 35 setStateOfSlot: ' + this.state);
        if (state === TreasureSlotResources.STATE.OPENING && claimTime > 0) {
            this.setClaimTime(claimTime);
        }
        this.onStateOfSlotUpdated();
    },

    onStateOfSlotUpdated: function () {
        this.setSlotTexturesByState(this.state);
    },

    setSlotTexturesByState: function (state) {
        switch (state) {
            case TreasureSlotResources.STATE.EMPTY:
                this.setEmptySlotTextures(true);
                break;
            case TreasureSlotResources.STATE.OCCUPIED:
                this.setOccupiedSlotTextures(true)
                break;
            case TreasureSlotResources.STATE.OPENING:
                this.setOpeningSlotTextures(true)
                break;
            case TreasureSlotResources.STATE.FINISHED:
                this.setFinishedSlotTextures(true)
                break;
        }
    },

    setEmptySlotTextures: function (shouldVisible) {
        if (shouldVisible) {
            this.backgroundBtn.loadTextures(TreasureSlotResources.EMPTY_SLOT_BACKGROUND, TreasureSlotResources.EMPTY_SLOT_BACKGROUND);
            this.setOccupiedSlotTextures(false);
            this.setOpeningSlotTextures(false);
            this.setFinishedSlotTextures(false);
            this.treasureImg.setVisible(false);
        }
        this.emptySlotTxt.setVisible(shouldVisible);
    },

    setOccupiedSlotTextures: function (shouldVisible) {
        if (shouldVisible) {
            this.backgroundBtn.loadTextures(TreasureSlotResources.OCCUPIED_SLOT_BACKGROUND, TreasureSlotResources.OCCUPIED_SLOT_BACKGROUND);
            this.setEmptySlotTextures(false);
            this.setOpeningSlotTextures(false);
            this.setFinishedSlotTextures(false);
            this.treasureImg.setVisible(true);
        }
        this.occupiedCountdownTxt.setVisible(shouldVisible);
        this.mapNameTxt.setVisible(shouldVisible);
        this.treasureImg.setVisible(shouldVisible);
    },

    setOpeningSlotTextures: function (shouldVisible) {
        if (shouldVisible) {
            this.backgroundBtn.loadTextures(TreasureSlotResources.OPENING_SLOT_BACKGROUND, TreasureSlotResources.OPENING_SLOT_BACKGROUND);
            this.setEmptySlotTextures(false);
            this.setOccupiedSlotTextures(false);
            this.setFinishedSlotTextures(false);
            this.treasureImg.setVisible(true);
        }
        this.countDownNode.setVisible(shouldVisible);
        this.openingActionTxt.setVisible(shouldVisible);
        this.openingGemIcon.setVisible(shouldVisible);
        this.skipGemTxt.setVisible(shouldVisible);
    },

    setFinishedSlotTextures: function (shouldVisible) {
        if (shouldVisible) {
            this.backgroundBtn.loadTextures(TreasureSlotResources.FINISHED_SLOT_BACKGROUND, TreasureSlotResources.FINISHED_SLOT_BACKGROUND);
            this.setEmptySlotTextures(false);
            this.setOccupiedSlotTextures(false);
            this.setOpeningSlotTextures(false);
            this.treasureImg.setVisible(true);
        }
        this.finishedActionTxt.setVisible(shouldVisible);
    },

    onSlotClick: function (sender, type) {

        if (this.state !== TreasureSlotResources.STATE.EMPTY && type === ccui.Widget.TOUCH_ENDED) {
            let treasureSlotNodeList = ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.HOME_NODE).treasureSlotNodeList;
            let openingSlot = treasureSlotNodeList.reduce((acc, curr) => {
                return curr.state === TreasureSlotResources.STATE.OPENING ? acc + 1 : acc;
            }, 0);
            let action = 0;
            switch (this.state) {
                case TreasureSlotResources.STATE.OCCUPIED:
                    if (openingSlot > 0) {
                        action = ChestConst.ACTION.SPEED_UP;
                    } else {
                        action = ChestConst.ACTION.OPEN;
                    }
                    break;
                case TreasureSlotResources.STATE.OPENING:
                    action = ChestConst.ACTION.SPEED_UP;
                    break;
                case TreasureSlotResources.STATE.FINISHED:
                    action = ChestConst.ACTION.CLAIM;
                    break;
                default:
                    break;
            }
            PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_TREASURE).setPopUpInfoFromTreasureType(this.id, action, 0, this.state);
            PopupUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_TREASURE);
        }
    },

    setClaimTime: function (claimTime) {
        this.claimTime = claimTime;
        this.setCountDownString();
        this.schedule(this.setCountDownString, 1);
    },

    setCountDownString: function () {
        let distance = this.claimTime - TimeUtil.getServerTime();
        this.skipGemTxt.setString(exchangeDurationToGem(distance));
        this.openingCountDownTxt.setString(millisecondToTimeString(distance));
        if (distance < 0) {
            this.onFinishCountDown();
            this.setStateOfSlot(TreasureSlotResources.STATE.FINISHED, 0);
        }
    },

    onFinishCountDown: function () {
        this.unschedule(this.setCountDownString);
        this.openingCountDownTxt.setString("0m 0s");
    }
})