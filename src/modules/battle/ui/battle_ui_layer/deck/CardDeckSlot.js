let CardDeckSlot = cc.Node.extend({
    ctor: function (cardType) {
        this._super();
        this._setupUI();

        // this.setCardImg(cardImg);
        // this.setBackground(cardBackground);
        // this.setEnergy(energy);
        this.setCardTexture(cardType);
        this.type = cardType;
        this.isUp = false;
        this.isSelected = false;
    },

    _setupUI: function () {
        let rootNode = ccs.load(BattleResource.BATTLE_CARD_NODE, "").node;

        this.backgroundSprite = rootNode.getChildByName("card_background");
        this.cardSlotBackground = rootNode.getChildByName("card_slot_background");
        this.width = this.cardSlotBackground.width;
        this.height = this.cardSlotBackground.height;
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
        this.cardImgSprite.setTexture(cardImg);
    },

    setBackground: function (cardBackground) {
        this.backgroundSprite.setTexture(cardBackground);
    },

    setEnergy: function (energy) {
        if (energy < 0)
            return;
        this.energyNode.getChildByName("value").setString(energy);
    },

    setIsSelected: function (isSelected) {
        this.isSelected = isSelected;
    },

    setIsUp: function (isUp) {
        this.isUp = isUp;
    }
});