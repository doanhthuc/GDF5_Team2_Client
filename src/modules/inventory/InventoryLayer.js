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
        this.cardBackgroundBtn = this.fakeCardImageFromCardCollection.cardBackgroundBtn;
        this.cardBackgroundBtn.addTouchEventListener(this.onFakeCardImageFromCardCollectionClick.bind(this), this);


        let cardSize = this.fakeCardImageFromCardCollection.cardBorderImg.getContentSize();
        let posY = cc.winSize.height - (this.headerHeight + this.battleDeckNode.heightNode + cardSize.height / 2 + 10);
        this.fakeCardImageFromCardCollection.setPosition(cc.winSize.width / 2, posY);

        this.cancelSelectBtn = new ccui.Button();
        this.cancelSelectBtn.loadTextures("res/textures/common/common_panel_btn_close.png", "res/textures/common/common_panel_btn_close.png");
        this.addChild(this.cancelSelectBtn);
        this.cancelSelectBtn.setVisible(false);
        this.cancelSelectBtn.setPosition(this.fakeCardImageFromCardCollection.x, posY - (cardSize.height / 2 + 20));
        this.cancelSelectBtn.addTouchEventListener(this.onCancelSelectCardBtnClick, this);
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
        this.cancelSelectBtn.setVisible(true);
        this.isSelectingCardToBattleDeck = true;
        this.cardCollectionNode.setVisible(false);
        let cardSize = this.fakeCardImageFromCardCollection.cardBorderImg.getContentSize();
        let posY = cc.winSize.height - (this.headerHeight + this.battleDeckNode.heightNode + cardSize.height / 2 + 10);
        this.fakeCardImageFromCardCollection.setPosition(cc.winSize.width / 2, posY);
    },

    onSelectCardInBattleDeckToSwap: function (cardModelFromBattleDeck) {
        let cardNodeInBattleDeck = this.cardNodeMap.get(cardModelFromBattleDeck.id);
        let wordPos = cardNodeInBattleDeck.getParent().convertToWorldSpace(cardNodeInBattleDeck.getPosition());
        this.fakeCardImageFromBattleDeck.setModel(cardModelFromBattleDeck);
        this.fakeCardImageFromBattleDeck.setUpgradeProgressBarVisible(false);
        this.cancelSelectBtn.setVisible(false);
        this.fakeCardImageFromBattleDeck.setVisible(true);
        this.fakeCardImageFromBattleDeck.setPosition(wordPos);
        this.isSelectingCardToBattleDeck = false;
        let cardModelFromCardCollection = this.fakeCardImageFromCardCollection.cardModel;
        let cardInCollection = this.cardNodeMap.get(cardModelFromCardCollection.id);
        let cardInCollectionWordPos = cardInCollection.getParent().convertToWorldSpace(cardInCollection.getPosition());
        this.cardCollectionNode.setVisible(true);
        this.fakeCardImageFromCardCollection.setPosition(cardInCollectionWordPos);
        cardNodeInBattleDeck.setVisible(false);
        cardInCollection.setVisible(false);
        this.fakeCardImageFromBattleDeck.runAction(cc.Sequence(cc.moveTo(0.3, cardInCollectionWordPos), cc.CallFunc(function () {
            this.fakeCardImageFromBattleDeck.setVisible(false);
            cardNodeInBattleDeck.setModel(cardModelFromCardCollection);
            cardNodeInBattleDeck.setVisible(true);
        }.bind(this))));
        // this.fakeCardImageFromCardCollection.runAction(cc.moveTo(1, wordPos));
        this.fakeCardImageFromCardCollection.runAction(cc.Sequence(cc.moveTo(0.3, wordPos), cc.CallFunc(function () {
            this.fakeCardImageFromCardCollection.setVisible(false);
            cardInCollection.setModel(cardModelFromBattleDeck);
            cardInCollection.setVisible(true);
        }.bind(this))));
        cardModelFromCardCollection.isBattleDeck = true;
        cardModelFromBattleDeck.isBattleDeck = false;
        ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.INVENTORY_NODE).cardNodeMap.set(cardModelFromCardCollection.id, cardNodeInBattleDeck);
        ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.INVENTORY_NODE).cardNodeMap.set(cardModelFromBattleDeck.id, cardInCollection);
        // this.fakeCardImageFromBattleDeck.setVisible(false);
        // this.fakeCardImageFromCardCollection.setVisible(false);
    },

    onCancelSelectCardBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.isSelectingCardToBattleDeck = false;
            this.cardCollectionNode.setVisible(true);
            this.fakeCardImageFromCardCollection.setVisible(false);
            this.cancelSelectBtn.setVisible(false);
        }
    },

    onFakeCardImageFromCardCollectionClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            if (this.isSelectingCardToBattleDeck) {
                this.isSelectingCardToBattleDeck = false;
                this.cardCollectionNode.setVisible(true);
                this.fakeCardImageFromCardCollection.setVisible(false);
                this.cancelSelectBtn.setVisible(false);
            }
        }
    }
});