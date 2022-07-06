let CardDeckSlot = cc.Node.extend({
    ctor: function (cardImg, cardBackground, energy, cardType) {
        this._super();
        this._setupUI();

        this.setCardImg(cardImg);
        this.setBackground(cardBackground);
        this.setEnergy(energy);
        this.type = cardType;
    },

    _setupUI: function () {
        let rootNode = ccs.load(BattleResource.BATTLE_CARD_NODE, "").node;

        this.backgroundSprite = rootNode.getChildByName("card_background");
        this.energyNode = rootNode.getChildByName("energy");
        this.cardImgSprite = rootNode.getChildByName("entity_image");
        this.addChild(rootNode);
    },

    setCardImg: function (cardImg) {
        this.cardImgSprite.setTexture(cardImg);
    },

    setBackground: function (cardBackground) {
        this.backgroundSprite.setTexture(cardBackground);
    },

    setEnergy: function (energy) {
        if (energy < 0)
            return;
        this.energyNode.getChildByName("value").setString(energy);
    }
});