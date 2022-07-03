let CardDeckNode = cc.Node.extend({
    ctor: function () {
        this._super();

        this.rootNode = ccs.load(BattleResource.CARD_DECK_NODE, "").node;
        this.addChild(this.rootNode);

        let background = this.rootNode.getChildByName("background");
        this.width = background.width;
        this.height = background.height;

        this.cardBattleNodeList = [];
        this.initCardBattleList();
    },

    initCardBattleList: function () {
        let startX = -156.82;
        let startY = 14.76;
        for (let i = 0; i < 4; i++) {
            let cardBattleNode = new CardBattleNode(0);
            this.rootNode.addChild(cardBattleNode);
            cardBattleNode.setPosition(startX, startY);
            startX += cardBattleNode._width + 24.34;
            this.cardBattleNodeList.push(cardBattleNode);
        }
    }
})