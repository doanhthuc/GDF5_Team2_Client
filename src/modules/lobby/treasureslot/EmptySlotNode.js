const EmptySlotNode = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
        this.backgroundBtn = this.emptySlotNode.getChildByName('backgroundBtn');
    },

    init: function () {
        this.emptySlotNode = ccs.load(TreasureSlotResources.EMPTY_SLOT_RES, '').node;
        this.addChild(this.emptySlotNode);
    }
});