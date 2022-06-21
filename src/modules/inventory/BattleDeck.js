const BattleDeckNode = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    battleDeck: [],
    heightNode: 0,

    init: function () {
        this.node = ccs.load(InventoryResources.BATTLE_DECK_HOLDER, '').node;
        this.addChild(this.node);
        this.battleDeckHolder = this.node.getChildByName("battleDeckHolderImg")
        let startX = InventoryResources.CARD_WIDTH / 2 + InventoryResources.CARD_START_MARGIN;
        let startY = InventoryResources.BATTLE_DECK_HOLDER_BOTTOM_BORDER_WIDTH + 1.5 * InventoryResources.CARD_HEIGHT
            + InventoryResources.CARD_BOTTOM_MARGIN + InventoryResources.CARD_BOTTOM_HOLDER_MARGIN;
        for (let i = 0; i < 8; i++) {
            let card = new CardNode();
            card.retain();
            this.battleDeckHolder.addChild(card);
            this.battleDeck.push(card);
            if (i !== 0 && i % InventoryResources.NUM_CARD_ONE_LINE === 0) {
                startX = InventoryResources.CARD_WIDTH / 2 + InventoryResources.CARD_START_MARGIN;
                startY -= (i / InventoryResources.NUM_CARD_ONE_LINE) * InventoryResources.CARD_HEIGHT + InventoryResources.CARD_BOTTOM_MARGIN;
            }
            card.setPosition(startX, startY);
            startX += InventoryResources.CARD_RIGHT_MARGIN + InventoryResources.CARD_WIDTH;
        }
        this.setNodeHeight();
    },

    setNodeHeight: function () {
        this.nodeHeight += this.battleDeckHolder.getContentSize().height;
    }
});