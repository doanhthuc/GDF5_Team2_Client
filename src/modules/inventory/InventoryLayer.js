const InventoryLayer = cc.Node.extend({
    ctor: function (headerHeight) {
        this.headerHeight = headerHeight;
        this.cardNodeMap = new Map();
        this.cardNodeList = [];
        this._super();
        this.init();
    },

    init: function () {
        this.battleDeckNode = new BattleDeckNode();
        this.addChild(this.battleDeckNode);
        ClientUIManager.getInstance().registerUI(CLIENT_UI_CONST.NODE_NAME.BATTLE_DECK_NODE, this.battleDeckNode);
        ClientUIManager.getInstance().showUI(CLIENT_UI_CONST.NODE_NAME.BATTLE_DECK_NODE);
        this.cardCollectionNode = new CardCollectionNode();
        this.addChild(this.cardCollectionNode);
        ClientUIManager.getInstance().registerUI(CLIENT_UI_CONST.NODE_NAME.CARD_COLLECTION_NODE, this.cardCollectionNode);
        ClientUIManager.getInstance().showUI(CLIENT_UI_CONST.NODE_NAME.CARD_COLLECTION_NODE);
        this.setNodeHeight();
        if (this.heightNode > cc.winSize.height) {
            this.battleDeckNode.setPosition(cc.winSize.width / 2, this.heightNode - this.headerHeight - this.battleDeckNode.heightNode / 2);
            this.cardCollectionNode.setPosition(cc.winSize.width / 2, this.heightNode - this.headerHeight - this.battleDeckNode.heightNode - this.cardCollectionNode.backgroundImg.height / 2);
        } else {
            this.battleDeckNode.setPosition(cc.winSize.width / 2, cc.winSize.height - this.headerHeight - this.battleDeckNode.heightNode / 2);
            this.cardCollectionNode.setPosition(cc.winSize.width / 2, cc.winSize.height - this.headerHeight - this.battleDeckNode.heightNode - this.cardCollectionNode.backgroundImg.height / 2);
        }

        this.isSelectingCardToBattleDeck = false;
        this.fakeCardImageFromBattleDeck = new CardNode();
        this.addChild(this.fakeCardImageFromBattleDeck);
        this.fakeCardImageFromBattleDeck.setVisible(false);
        this.fakeCardImageFromCardCollection = new CardNode();
        this.addChild(this.fakeCardImageFromCardCollection);
        this.fakeCardImageFromCardCollection.setVisible(false);
    },

    initCardNodeList: function () {
        this.cardNodeList = [];

    },

    setNodeHeight: function () {
        this.heightNode = 0;
        this.heightNode += this.battleDeckNode.heightNode;
        this.heightNode += this.cardCollectionNode.heightNode;
        this.heightNode += MainResources.BOTTOM_HEIGHT;
        this.heightNode += MainResources.HEADER_HEIGHT;
    },

    onSelectCardBtnClick: function (cardModel) {
        this.fakeCardImageFromCardCollection.setModel(cardModel);
        this.fakeCardImageFromCardCollection.setUpgradeProgressBarVisible(false);
        this.fakeCardImageFromCardCollection.setVisible(true);
        this.isSelectingCardToBattleDeck = true;
        this.cardCollectionNode.setVisible(false);
        let cardSize = this.fakeCardImageFromCardCollection.cardBorderImg.getContentSize();
        let posY = cc.winSize.height - (this.headerHeight + this.battleDeckNode.heightNode + cardSize.height / 2 + 10);
        this.fakeCardImageFromCardCollection.setPosition(cc.winSize.width / 2 , posY);
    },

    onSelectCardInBattleDeckToSwap: function (cardModel) {
        let cardNode = this.cardNodeMap.get(cardModel.id);
        let wordPos = cardNode.getParent().convertToWorldSpace(cardNode.getPosition());
        this.fakeCardImageFromBattleDeck.setModel(cardModel);
        this.fakeCardImageFromBattleDeck.setUpgradeProgressBarVisible(false);
        this.fakeCardImageFromBattleDeck.setVisible(true);
        this.fakeCardImageFromBattleDeck.setPosition(wordPos);
        this.isSelectingCardToBattleDeck = false;
        let cardInCollection = this.cardNodeMap.get(this.fakeCardImageFromCardCollection.cardModel.id);
        let cardInCollectionWordPos = cardInCollection.getParent().convertToWorldSpace(cardInCollection.getPosition());
        this.cardCollectionNode.setVisible(true);
        this.fakeCardImageFromCardCollection.setPosition(cardInCollectionWordPos);
        cardNode.setVisible(false);
        cardInCollection.setVisible(false);
        this.fakeCardImageFromBattleDeck.runAction(cc.Sequence(cc.moveTo(1, cardInCollectionWordPos), cc.CallFunc(function () {
            this.fakeCardImageFromBattleDeck.setVisible(false);
            cardNode.setModel(this.fakeCardImageFromCardCollection.cardModel);
            cardNode.setVisible(true);
        }.bind(this))));
        // this.fakeCardImageFromCardCollection.runAction(cc.moveTo(1, wordPos));
        this.fakeCardImageFromCardCollection.runAction(cc.Sequence(cc.moveTo(1, wordPos), cc.CallFunc(function () {
            this.fakeCardImageFromCardCollection.setVisible(false);
            cardInCollection.setModel(this.fakeCardImageFromBattleDeck.cardModel);
            cardInCollection.setVisible(true);
        }.bind(this))));
        // this.fakeCardImageFromBattleDeck.setVisible(false);
        // this.fakeCardImageFromCardCollection.setVisible(false);
    }
});