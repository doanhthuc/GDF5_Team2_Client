const inventoryLayer = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    battleDeck: [],

    init: function () {
        this.inventoryNode = ccs.load(InventoryResources.INVENTORY_NODE, '').node;
        this.addChild(this.inventoryNode);
        this.inventoryNode.setPosition(cc.winSize.width / 2, 0);
        this.setCardBattleDeckPosition();
        this.setCardCollectionPosition();
    },

    setCardBattleDeckPosition: function () {
        let startX = -cc.winSize.width / 2 + InventoryResources.CARD_WIDTH / 2 + InventoryResources.CARD_START_MARGIN;
        for (let i = 0; i < 8; i++) {
            let card = new cardNode();
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
            let card = new cardNode();
            this.inventoryNode.addChild(card);
            // let y = (cc.winSize.height / 2 - 300) * Math.floor(i / 4);
            if (i !== 0 && i % 4 === 0) {
                startX = -cc.winSize.width / 2 + InventoryResources.CARD_WIDTH / 2 + InventoryResources.CARD_START_MARGIN;
                startY -= (i / 4) * InventoryResources.CARD_HEIGHT + 30
            }
            card.setPosition(startX, startY);
            startX += InventoryResources.CARD_WIDTH + InventoryResources.CARD_BETWEEN_MARGIN;

        }
    }
});