const inventoryLayer = cc.Node.extend({
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

    setCardBattleDeckPosition: function () {
        let startX = -cc.winSize.width / 2 + InventoryResources.CARD_WIDTH / 2 + InventoryResources.CARD_START_MARGIN;
        for (let i = 0; i < 8; i++) {
            let card = new CardNode();
            this.battleDeck.push(card);
            this.inventoryNode.addChild(card);
            if (i % 4 === 0) {
                startX = -cc.winSize.width / 2 + InventoryResources.CARD_WIDTH / 2 + InventoryResources.CARD_START_MARGIN;
            }
            if (i >= 4) {
                card.setPosition(startX, cc.winSize.height / 2 + 105 - 30);
            } else {
                card.setPosition(startX, cc.winSize.height / 2 + 105 + 186);
            }
            startX += InventoryResources.CARD_WIDTH + InventoryResources.CARD_BETWEEN_MARGIN;

        }
    },

    setCardCollectionPosition: function () {
        let startX = -cc.winSize.width / 2 + InventoryResources.CARD_WIDTH / 2 + InventoryResources.CARD_START_MARGIN;
        let startY = (cc.winSize.height / 2 - 300)
        for (let i = 0; i < 16; i++) {
            let card = new CardNode();
            this.inventoryNode.addChild(card);
            // let y = (cc.winSize.height / 2 - 300) * Math.floor(i / 4);
            if (i !== 0 && i % 4 === 0) {
                startX = -cc.winSize.width / 2 + InventoryResources.CARD_WIDTH / 2 + InventoryResources.CARD_START_MARGIN;
                startY -= (i / 4) * InventoryResources.CARD_HEIGHT + 30
            }
            card.setPosition(startX, startY);
            startX += InventoryResources.CARD_WIDTH + InventoryResources.CARD_BETWEEN_MARGIN;

        }
    },

    setNodeHeight: function () {
        this.heightNode += this.battleDeckNode.height;
        this.heightNode += this.cardCollectionNode.height;
        this.heightNode += MainResources.BOTTOM_HEIGHT;
        this.heightNode += MainResources.HEADER_HEIGHT;
    }
});