const CardWithQuantity = cc.Node.extend({
    ctor: function (cardId, quantity) {
        this.cardId = cardId;
        this.quantity = quantity;
        this._super();
        this.init();
        this.setCardTexture();
    },

    init: function () {
        this.node = ccs.load('ui/lobby/cardWithQuantity.json', '').node;
        this.addChild(this.node);
        this.cardBorder = this.node.getChildByName('cardBorder');
        this.cardImg = this.cardBorder.getChildByName('cardImg');
        this.cardQuantityTxt = this.cardBorder.getChildByName('cardQuantityTxt');
    },

    setCardTexture: function (cardId = 0, quantity = 10) {
        this.cardImg.setTexture(CARD_CONST[cardId].cardImage);
        this.cardQuantityTxt.setString('x' + quantity);
    }
});