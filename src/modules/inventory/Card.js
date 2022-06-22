var CardNode = cc.Node.extend({
    ctor: function (cardModel) {
        this._super();
        this.cardModel = cardModel
        this.init();
    },

    init: function () {
        this.cardNode = ccs.load(InventoryResources.CARD_NODE, '').node;
        this.addChild(this.cardNode);
        this.upgradeProgressNode = this.cardNode.getChildByName('upgradeProgressNode');
        this.cardImageNode = this.cardNode.getChildByName('cardImageNode');
        this.cardEnergyNode = this.cardNode.getChildByName('cardEnergyNode');
        this.levelTxt = this.cardNode.getChildByName('levelTxt');

        this.cardBackgroundBtn = this.cardImageNode.getChildByName('cardBackgroundBtn');
        this.cardImage = this.cardImageNode.getChildByName('cardImage');
        this.cardBorderImg = this.cardImageNode.getChildByName('cardBorderImg');
        if (this.cardModel) {
            this.setCardTexture();
        }
    },

    setCardEnergyTxt: function (energy) {
        this.cardEnergyNode.getChildByName('energyTxt').setString(energy);
    },

    setCardTexture: function () {
        let cardType = CARD_TYPE.TOWER[this.cardModel.id];
        this.cardBackgroundBtn.loadTextures(cardType.background, cardType.background);
        this.cardImage.setTexture(cardType.cardImage);
        this.setCardEnergyTxt(this.cardModel.energy);
        this.levelTxt.setString('Level.' + this.cardModel.level);
    }


});

var Card = cc.Class.extend({
    cardType: 0,
    cardLevel: 0,
    cardAmount: 0,
    ctor: function () {

    },
    ctor: function (type, level, amount) {
        this.cardType = type;
        this.cardLevel = level;
        this.amount = amount;
    },
    show: function () {
        cc.log(this.cardType + " " + this.cardLevel + " " + this.cardAmount);
    }
})
