const InventoryLayer = cc.Node.extend({
    ctor: function (headerHeight) {
        this.headerHeight = headerHeight
        this.cardNodeMap = new Map();
        this.cardNodeList = [];
        this._super();
        this.init();
    },

    heightNode: 0,

    init: function () {
        this.battleDeckNode = new BattleDeckNode();
        this.addChild(this.battleDeckNode);
        ClientUIManager.getInstance().registerUI(CLIENT_UI_CONST.NODE_NAME.BATTLE_DECK_NODE, this.battleDeckNode);
        ClientUIManager.getInstance().showUI(CLIENT_UI_CONST.NODE_NAME.BATTLE_DECK_NODE);

        this.cardCollectionNode = new CardCollectionNode();
        this.addChild(this.cardCollectionNode);
        ClientUIManager.getInstance().registerUI(CLIENT_UI_CONST.NODE_NAME.CARD_COLLECTION_NODE, this.cardCollectionNode);
        ClientUIManager.getInstance().showUI(CLIENT_UI_CONST.NODE_NAME.CARD_COLLECTION_NODE);

        this.battleDeckNode.setPosition(cc.winSize.width / 2, this.cardCollectionNode.heightNode + MainResources.BOTTOM_HEIGHT + this.cardCollectionNode.heightNode / 2);

        this.cardCollectionNode.setPosition(cc.winSize.width / 2, MainResources.BOTTOM_HEIGHT + this.cardCollectionNode.heightNode + InventoryResources.CARD_COLLECTION_TITLE_HEIGHT);

        this.setNodeHeight();
    },

    initCardNodeList: function () {
        this.cardNodeList = [];

    },

    setNodeHeight: function () {
        this.heightNode += this.battleDeckNode.height;
        this.heightNode += this.cardCollectionNode.height;
        this.heightNode += MainResources.BOTTOM_HEIGHT;
        this.heightNode += MainResources.HEADER_HEIGHT;
    }
});