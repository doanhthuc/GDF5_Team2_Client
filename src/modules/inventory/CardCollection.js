const CardCollectionNode = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    heightNode: 0,
    cardCollection: [],
    init: function () {
        this.node = ccs.load(InventoryResources.CARD_COLLECTION_NODE, '').node;
        this.addChild(this.node);
        this.setPositionForCardList();
        this.backgroundImg = this.node.getChildByName('cardCollectionTitle');
        this.setNodeHeight();
    },

    setPositionForCardList: function () {
        let startX = -cc.winSize.width / 2 + InventoryResources.CARD_WIDTH / 2 + InventoryResources.CARD_START_MARGIN;
        let startY = -164;
        for (let i = 0; i < 16; i++) {
            let card = new CardNode();
            this.cardCollection.push(card);
            this.node.addChild(card);
            if (i !== 0 && i % 4 === 0) {
                startX = -cc.winSize.width / 2 + InventoryResources.CARD_WIDTH / 2 + InventoryResources.CARD_START_MARGIN;
                startY -= InventoryResources.CARD_HEIGHT + 15;
            }
            card.setPosition(startX, startY);
            startX += InventoryResources.CARD_WIDTH + InventoryResources.CARD_RIGHT_MARGIN;
        }
    },

    setNodeHeight: function () {
        this.heightNode += this.backgroundImg.getContentSize().height;
        this.heightNode += (InventoryResources.CARD_HEIGHT + 15) * Math.ceil(16 / InventoryResources.NUM_CARD_ONE_LINE);
        // this.height +=
    }
})