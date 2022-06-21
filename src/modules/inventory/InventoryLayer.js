const InventoryLayer = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    battleDeck: [],
    heightNode: 0,

    init: function () {
        // this.inventoryNode = ccs.load(InventoryResources.INVENTORY_NODE, '').node;
        // this.addChild(this.inventoryNode);
        // this.inventoryNode.setPosition(cc.winSize.width / 2, 0);
        this.battleDeckNode = new BattleDeckNode();
        this.addChild(this.battleDeckNode);

        this.cardCollectionNode = new CardCollectionNode();
        this.addChild(this.cardCollectionNode);

        this.battleDeckNode.setPosition(cc.winSize.width / 2, this.cardCollectionNode.heightNode + MainResources.BOTTOM_HEIGHT + this.cardCollectionNode.heightNode / 2);

        this.cardCollectionNode.setPosition(cc.winSize.width / 2, MainResources.BOTTOM_HEIGHT + this.cardCollectionNode.heightNode + InventoryResources.CARD_COLLECTION_TITLE_HEIGHT);

        this.setNodeHeight();

        // this.setCardBattleDeckPosition();
        // this.setCardCollectionPosition();
    },

    setNodeHeight: function () {
        this.heightNode += this.battleDeckNode.height;
        this.heightNode += this.cardCollectionNode.height;
        this.heightNode += MainResources.BOTTOM_HEIGHT;
        this.heightNode += MainResources.HEADER_HEIGHT;
    }
});