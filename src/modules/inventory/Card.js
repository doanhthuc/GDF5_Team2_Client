const CardNode = cc.Node.extend({
    ctor: function (cardModel) {
        this._super();
        this.init();
        if (cardModel) this.setModel(cardModel);
    },

    setModel: function (cardModel) {
        this.cardModel = cardModel
        this.updateCardNodeUI(this.cardModel.accumulated);
    },

    onUpgradeCard: function (cardLevel, accumulatedCard) {
        this.cardModel.upgradeCardModel(cardLevel, accumulatedCard);
        this.updateCardNodeUI(this.cardModel.accumulated);
        cc.log('CardNode.js line 16 onUpgradeCard: ' + CLIENT_UI_CONST.POPUPS_NAME.UPGRADE_SUCCESS_POPUP)
        PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.UPGRADE_SUCCESS_POPUP).setCardModel(this.cardModel);
        PopupUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.UPGRADE_SUCCESS_POPUP);
    },

    onUpdateCard: function (accumulatedCardChange) {
        this.cardModel.upgradeCardModel(this.cardModel.level, this.cardModel.accumulated + accumulatedCardChange);
        this.updateCardNodeUI(this.cardModel.accumulated);
    },

    updateCardNodeUI: function (accumulatedCard) {
        this.setUpgradeProgressBar(accumulatedCard)
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

        this.upgradeReadyAnimation = new sp.SkeletonAnimation('textures/lobby/fx/card_upgrade_ready.json', 'textures/lobby/fx/card_upgrade_ready.atlas');
        this.upgradeReadyAnimation.setPosition(0, -this.cardBorderImg.height / 2);
        this.upgradeReadyAnimation.setAnimation(0, 'card_upgrade_ready', true);
        this.addChild(this.upgradeReadyAnimation, 4);
        this.upgradeReadyAnimationTxt = new cc.LabelTTF( "", "font/SVN-Supercell Magic.ttf" );
        this.upgradeReadyAnimation.addChild(this.upgradeReadyAnimationTxt);
        this.upgradeReadyAnimation.setVisible(false);
    },

    setCardEnergyTxt: function (energy) {
        this.cardEnergyNode.getChildByName('energyTxt').setString(energy);
    },

    setCardTexture: function () {
        let cardType = CARD_TYPE.TOWER[this.cardModel.id];
        if (!cardType) {
            cardType = CARD_TYPE.SPELL[this.cardModel.id];
        }
        this.cardBackgroundBtn.loadTextures(cardType.background, cardType.background);
        this.cardImage.setTexture(cardType.cardImage);
        this.setCardEnergyTxt(this.cardModel.energy);
        this.levelTxt.setString('Level.' + this.cardModel.level);
    },

    onCardClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED && this.cardModel) {
            PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_CARD_DETAIL).setCardModel(this.cardModel);
            PopupUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_CARD_DETAIL);
        }
    },

    setCardClickEnabled: function (enabled) {
        this.cardBackgroundBtn.setTouchEnabled(enabled);
    },

    setUpgradeProgressBar: function (accumulatedCard) {
        //TODO: exception when max level
        if (this.cardModel.level >= MAX_CARD_LEVEL) {
            this.progressBorderImg.setVisible(true);
            this.upgradeReadyAnimation.setVisible(false);
            this.accumulateTxt.setString('MAX');
            this.progressBackgroundImg.setScaleX(1);
        } else if (accumulatedCard < JsonReader.getCardUpgradeConfig()[this.cardModel.level + 1].fragments) {
            this.progressBorderImg.setVisible(true);
            this.upgradeReadyAnimation.setVisible(false);
            this.progressBackgroundImg.setScaleX(accumulatedCard / JsonReader.getCardUpgradeConfig()[this.cardModel.level + 1].fragments);
            this.accumulateTxt.setString(accumulatedCard + '/' + JsonReader.getCardUpgradeConfig()[this.cardModel.level + 1].fragments);
        } else {
            this.progressBorderImg.setVisible(false);
            this.upgradeReadyAnimation.setVisible(true);
            this.upgradeReadyAnimationTxt.setString(accumulatedCard + '/' + JsonReader.getCardUpgradeConfig()[this.cardModel.level + 1].fragments);
        }


    }
});

var Card = cc.Class.extend({
    cardType: 0,
    cardLevel: 0,
    amount: 0,
    ctor: function () {

    },
    ctor: function (type, level, amount) {
        this.cardType = type;
        this.cardLevel = level;
        this.amount = amount;
    },
    show: function () {
        cc.log(this.cardType + " " + this.cardLevel + " " + this.amount);
    }
})
