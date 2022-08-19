const CardNode = cc.Node.extend({
    ctor: function (cardModel) {
        this._super();
        this.init();
        if (cardModel) this.setModel(cardModel);
    },

    setModel: function (cardModel) {
        this.cardModel = cardModel
        this.setName("card_type_" + cardModel.id);
        this.updateCardNodeUI(this.cardModel.accumulated);
    },

    onUpgradeCard: function (cardLevel, accumulatedCard) {
        this.cardModel.upgradeCardModel(cardLevel, accumulatedCard);
        this.updateCardNodeUI(this.cardModel.accumulated);
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
        this.upgradeReadyAnimationTxt = new ccui.Text("", "res/textures/font/SVN-Supercell Magic.ttf", 17);
        this.upgradeReadyAnimationTxt.setName("accumulateTxt");
        this.upgradeReadyAnimation.addChild(this.upgradeReadyAnimationTxt);
        this.upgradeReadyAnimation.setVisible(false);

        this._width = this.cardBorderImg.getContentSize().width;
        this._height = this.cardBorderImg.getContentSize().height;
    },

    setCardEnergyTxt: function (energy) {
        this.cardEnergyNode.getChildByName('energyTxt').setString(energy);
    },

    setCardTexture: function () {
        let cardType = CARD_CONST[this.cardModel.id];

        this.cardBackgroundBtn.loadTextures(cardType.background, cardType.background);
        this.cardImage.setTexture(cardType.cardImage);
        this.cardBorderImg.setTexture(CARD_RANK[getRankCharacter(this.cardModel.level)].BORDER);
        this.setCardEnergyTxt(this.cardModel.energy);
        this.levelTxt.setString('Level.' + this.cardModel.level);
    },

    onCardClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED && this.cardModel) {
            if (ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.INVENTORY_NODE).isSelectingCardToBattleDeck) {
                ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.INVENTORY_NODE).onSelectCardInBattleDeckToSwap(this.cardModel);
            } else {
                PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_CARD_DETAIL).setCardModel(this.cardModel);
                PopupUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_CARD_DETAIL);
            }
        }
    },

    setCardClickEnabled: function (enabled) {
        this.cardBackgroundBtn.setTouchEnabled(enabled);
    },

    setUpgradeProgressBar: function (accumulatedCard) {
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
    },

    setUpgradeProgressBarVisible: function (visible) {
        this.progressBorderImg.setVisible(visible);
        this.upgradeReadyAnimation.setVisible(visible);
        this.accumulateTxt.setVisible(visible);
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
