const TreasureSlot = cc.Node.extend({
    id: null,
    DEFAULT_STATE: TreasureSlotResources.STATE.EMPTY,
    // state: this.DEFAULT_STATE,
    node: null,


    ctor: function () {
        this.clientUIManager = ClientUIManager.getInstance();
        this.slotNodeMap = new Map();
        this.state = null;
        this._super();
        this.initAllSlotTypes();
        this.setSlotVisibleByState(this.DEFAULT_STATE);
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

    setStateOfSlot: function(state) {
        this.state = state;
    },

    setSlotVisibleByState: function (state) {
        if (this.state) {
            this.slotNodeMap.get(this.state).setVisible(false);
        }
        this.setStateOfSlot(state);
        this.slotNodeMap.get(this.state).setVisible(true);
    },


})