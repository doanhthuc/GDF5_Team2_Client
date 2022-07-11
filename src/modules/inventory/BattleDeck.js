const BattleDeckNode = cc.Node.extend({
    ctor: function () {
        this.battleDeck = [];
        this.cardNodeList = [];
        this._super();
        this.init();
    },

    init: function () {
        this.node = ccs.load(InventoryResources.BATTLE_DECK_HOLDER, '').node;
        this.addChild(this.node);
        this.battleDeckHolder = this.node.getChildByName("battleDeckHolderImg")

        this.setNodeHeight();
    },

    setNodeHeight: function () {
        this.heightNode = this.battleDeckHolder.height;
        cc.log('BattleDeckNode line 21 heightNode: ' + this.heightNode);
    },

    updateBattleDeck: function (battleDeck) {
        this.setBattleDeck(battleDeck);
        this.setCardInBattleDeckPosition();
    },

    setBattleDeck: function (battleDeck) {
        this.battleDeck = battleDeck;
        this.setCardNodeListByBattleDeck(this.battleDeck);
    },

    setCardNodeListByBattleDeck: function (battleDeck) {
        battleDeck.forEach(card => {
            let cardModel = CardFactory.createCard(
                card.cardType,
                card.cardLevel,
                card.amount,
                card.isBattleDeck
            );
            // this.battleDeckHolder.addChild(card);
            this.addCardNode(cardModel);
        });
    },

    addCardNode: function (cardModel) {
        let cardNode = new CardNode(cardModel);
        // this.node.addChild(cardNode);
        this.cardNodeList.push(cardNode);
        ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.INVENTORY_NODE).cardNodeMap.set(cardModel.id, cardNode);
        ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.INVENTORY_NODE).cardNodeList.push(cardNode);
        this.battleDeckHolder.addChild(cardNode);

    },

    setCardInBattleDeckPosition: function () {
        let startX = InventoryResources.CARD_WIDTH / 2 + InventoryResources.CARD_START_MARGIN;
        let startY = InventoryResources.BATTLE_DECK_HOLDER_BOTTOM_BORDER_WIDTH + 1.5 * InventoryResources.CARD_HEIGHT
            + InventoryResources.CARD_BOTTOM_MARGIN + InventoryResources.CARD_BOTTOM_HOLDER_MARGIN;
        for (let i = 0; i < this.cardNodeList.length; i++) {
            if (i !== 0 && i % InventoryResources.NUM_CARD_ONE_LINE === 0) {
                startX = InventoryResources.CARD_WIDTH / 2 + InventoryResources.CARD_START_MARGIN;
                startY -= (i / InventoryResources.NUM_CARD_ONE_LINE) * InventoryResources.CARD_HEIGHT + InventoryResources.CARD_BOTTOM_MARGIN;
            }
            this.cardNodeList[i].setPosition(startX, startY);
            startX += InventoryResources.CARD_RIGHT_MARGIN + InventoryResources.CARD_WIDTH;
        }
    }
});