const CardDeckSlot2 = cc.Node.extend({
    ctor: function (cardType) {
        this._super();
        this._setupUI();

        this.setCardTexture(cardType);
        this.type = cardType;
        this.isUp = false;
        this.isSelected = false;
    },

    _setupUI: function () {
        let rootNode = ccs.load(BattleResource.BATTLE_CARD_NODE_2, "").node;

        this.cardBackgroundBtn = rootNode.getChildByName("cardBackgroundBtn");
        this.cardBorderImg = rootNode.getChildByName("cardBorderImg");
        this.cardImage = rootNode.getChildByName("cardImage");
        this.energyNode = rootNode.getChildByName("energyNode");
        this.energyTxt = this.energyNode.getChildByName("energyTxt");

        this.width = this.cardBackgroundBtn.width;
        this.height = this.cardBackgroundBtn.height;
        this.energyNode = rootNode.getChildByName("energy");
        this.cardImgSprite = rootNode.getChildByName("entity_image");
        this.addChild(rootNode);
    },

    setCardType: function (cardType) {
        this.type = cardType;
        this.setCardTexture(cardType);
    },

    setCardTexture: function (cardId) {
        let cardAsset = CARD_CONST[cardId];

        this.setBackground(cardAsset.background);
        this.setCardImg(cardAsset.cardImage);
        this.setEnergy(cardAsset.energy);
    },

    setCardImg: function (cardImg) {
        this.cardImage.setTexture(cardImg);
    },

    setBackground: function (cardBackground) {
        this.cardBackgroundBtn.loadTextures(cardBackground, cardBackground);
    },

    setEnergy: function (energy) {
        if (energy < 0)
            return;
        this.energyTxt.setString(energy);
    },

    setIsSelected: function (isSelected) {
        this.isSelected = isSelected;
    },

    setIsUp: function (isUp) {
        this.isUp = isUp;
    }
});