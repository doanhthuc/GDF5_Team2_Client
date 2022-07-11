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
    }
});