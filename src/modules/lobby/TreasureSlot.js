const TreasureSlot = cc.Node.extend({
    id: null,

    ctor: function () {
        this.DEFAULT_STATE = TreasureSlotResources.STATE.EMPTY;
        this.clientUIManager = ClientUIManager.getInstance();
        this.slotNodeMap = new Map();
        this.state = this.DEFAULT_STATE;
        this._super();
        // this.initAllSlotTypes();
        // this.setSlotVisibleByState(this.DEFAULT_STATE);
        this.init();
        this.setSlotTexturesByState(this.state);
    },

    init: function () {
        this.nodeSlot = ccs.load(TreasureSlotResources.OPENING_SLOT_RES).node;
        this.addChild(this.nodeSlot);
        this.backgroundBtn = this.nodeSlot.getChildByName("backgroundBtn");
        this.treasureImg = this.nodeSlot.getChildByName("treasureImg");
        this.openingActionTxt = this.nodeSlot.getChildByName("openingActionTxt");
        this.occupiedCountdownTxt = this.nodeSlot.getChildByName("occupiedCountdownTxt");
        this.skipGemTxt = this.nodeSlot.getChildByName("skipGemTxt");
        this.openingGemIcon = this.nodeSlot.getChildByName("openingGemIcon");
        this.countDownNode = this.nodeSlot.getChildByName("countDownNode");
        this.mapNameTxt = this.nodeSlot.getChildByName("mapNameTxt");
        this.emptySlotTxt = this.nodeSlot.getChildByName("emptySlotTxt");
        this.finishedActionTxt = this.nodeSlot.getChildByName("finishedActionTxt");
        this.backgroundBtn.addTouchEventListener(this.onSlotClick.bind(this), this);
    },

    initAllSlotTypes: function () {
        this.emptySlotNode = new EmptySlotNode();
        this.addChild(this.emptySlotNode);
        this.emptySlotNode.setVisible(false);
        this.slotNodeMap.set(TreasureSlotResources.STATE.EMPTY, this.emptySlotNode);

        this.openingSlotNode = new OpeningSlotNode();
        this.openingSlotNode.setVisible(false);
        this.addChild(this.openingSlotNode);
        this.slotNodeMap.set(TreasureSlotResources.STATE.OPENING, this.openingSlotNode);

        this.occupiedSlotNode = new OccupiedSlotNode();
        this.addChild(this.occupiedSlotNode);
        this.occupiedSlotNode.setVisible(false);
        this.slotNodeMap.set(TreasureSlotResources.STATE.OCCUPIED, this.occupiedSlotNode);

        this.finishedSlotNode = new FinishedSlotNode();
        this.addChild(this.finishedSlotNode);
        this.finishedSlotNode.setVisible(false);
        this.slotNodeMap.set(TreasureSlotResources.STATE.FINISHED, this.finishedSlotNode);
    },

    setStateOfSlot: function (state) {
        this.state = state;
    },

    setSlotVisibleByState: function (state) {
        if (this.state) {
            this.slotNodeMap.get(this.state).setVisible(false);
        }
        this.setStateOfSlot(state);
        this.slotNodeMap.get(this.state).setVisible(true);
    },

    setSlotTexturesByState: function (state) {
        this.setStateOfSlot(state);
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
        }
        this.emptySlotTxt.setVisible(shouldVisible);
    },

    setOccupiedSlotTextures: function (shouldVisible) {
        if (shouldVisible) {
            this.backgroundBtn.loadTextures(TreasureSlotResources.OCCUPIED_SLOT_BACKGROUND, TreasureSlotResources.OCCUPIED_SLOT_BACKGROUND);
            this.setEmptySlotTextures(false);
            this.setOpeningSlotTextures(false);
            this.setFinishedSlotTextures(false);
        }
        this.occupiedCountdownTxt.setVisible(shouldVisible);
        this.mapNameTxt.setVisible(shouldVisible);

    },

    setOpeningSlotTextures: function (shouldVisible) {
        if (shouldVisible) {
            this.backgroundBtn.loadTextures(TreasureSlotResources.OPENING_SLOT_BACKGROUND, TreasureSlotResources.OPENING_SLOT_BACKGROUND);
            this.setEmptySlotTextures(false);
            this.setOccupiedSlotTextures(false);
            this.setFinishedSlotTextures(false);
        }
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
        }
        this.finishedActionTxt.setVisible(shouldVisible);
    },

    onSlotClick: function (sender, type) {
        if (this.state !== TreasureSlotResources.STATE.EMPTY && type === ccui.Widget.TOUCH_ENDED) {
            ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_TREASURE).setPopUpInfoFromTreasureType(0);
            ClientUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_TREASURE);
        }
    },
})