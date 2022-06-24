const CardNode = cc.Node.extend({
    ctor: function (cardModel) {
        this._super();
        this.init();
        if (cardModel) this.setModel(cardModel)
    },

    setModel: function (cardModel) {
        this.cardModel = cardModel
        this.setUpgradeProgressBar(this.cardModel.accumulated)
        this.setCardTexture();
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

        this.progressBorderImg = this.upgradeProgressNode.getChildByName('progressBorderImg');
        this.progressBackgroundImg = this.progressBorderImg.getChildByName('progressBackgroundImg');
        this.accumulateTxt = this.progressBorderImg.getChildByName('accumulateTxt');

        this.cardBackgroundBtn.addTouchEventListener(this.onCardClick.bind(this), this);
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
    },

    onCardClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED && this.cardModel) {
            ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_CARD_DETAIL).setCardModel(this.cardModel);
            ClientUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_CARD_DETAIL);
        }
    },

    setCardClickEnabled: function (enabled) {
        this.cardBackgroundBtn.setTouchEnabled(enabled);
    },

    setUpgradeProgressBar: function (accumulatedCard) {
        //TODO: exception when max level
        if (accumulatedCard < JsonReader.getCardUpgradeConfig()[this.cardModel.level + 1].fragments) {
            this.progressBackgroundImg.setScaleX(accumulatedCard / JsonReader.getCardUpgradeConfig()[this.cardModel.level + 1].fragments);
            this.accumulateTxt.setString(accumulatedCard + '/' + JsonReader.getCardUpgradeConfig()[this.cardModel.level + 1].fragments);
        } else {
            this.progressBackgroundImg.setScaleX(1);
            this.accumulateTxt.setString(accumulatedCard + '/' + JsonReader.getCardUpgradeConfig()[this.cardModel.level + 1].fragments);
        }
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
