const UpgradeSuccessPopup = cc.Node.extend({
    ctor: function () {
        this.name = CLIENT_UI_CONST.POPUPS_NAME.UPGRADE_SUCCESS_POPUP;
        this.cardModel = null;
        this._super();
        this.init();
    },

    init: function () {
        this.node = ccs.load(InventoryResources.UPGRADE_SUCCESS_POPUP, '').node;
        this.addChild(this.node);
        this.backgroundImg = this.node.getChildByName("backgroundImg");
        UiUtil.setImageFullScreen(this.backgroundImg);
        this.cardNameTxt = this.node.getChildByName("cardNameTxt");
        this.cardNameTxt.ignoreContentAdaptWithSize(true);
        this.cardLevel = this.node.getChildByName("cardLevel");
        this.cardLevel.getChildByName('levelTxt').ignoreContentAdaptWithSize(true);
        this.upgradeProgressNode = this.node.getChildByName("upgradeProgressNode");
        this.cardImageNode = this.node.getChildByName("cardImageNode");
        this.cardImage = this.cardImageNode.getChildByName("cardImage");
        this.cardBackgroundBtn = this.cardImageNode.getChildByName("cardBackgroundBtn");
        this.cardBorderImg = this.cardImageNode.getChildByName("cardBorderImg");
        this.acceptBtn = this.node.getChildByName("acceptBtn");
        this.upgradeProgressNode = this.node.getChildByName("upgradeProgressNode");
        this.progressBorderImg = this.upgradeProgressNode.getChildByName('progressBorderImg');
        this.progressBackgroundImg = this.progressBorderImg.getChildByName('progressBackgroundImg');
        this.accumulateTxt = this.progressBorderImg.getChildByName('accumulateTxt');
        this.acceptBtn.addTouchEventListener(this.onAcceptBtnClick.bind(this), this);
        this.initCardStatHolders();
    },

    setCardModel: function (cardModel) {
        this.cardModel = cardModel;
        this.setPopupTexture();
        this.setUpgradeProgressBar(this.cardModel.accumulated);
    },

    setPopupTexture: function () {
        this.cardNameTxt.setString(CARD_NAME_VI[this.cardModel.id]);
        this.cardLevel.getChildByName('levelTxt').setString('Level ' + this.cardModel.level);
        this.cardImage.setTexture(CARD_CONST[this.cardModel.id].cardImage);
        this.cardBackgroundBtn.loadTextures(CARD_CONST[this.cardModel.id].background, CARD_CONST[this.cardModel.id].background);
        this.setCardStat();
    },

    initCardStatHolders: function () {
        this.cardStatHolders = [];
        this.cardStatHolders = [];
        for (let i = 0; i < 6; i++) {
            let cardStatHolder = new CardStatHolder();
            cardStatHolder.statBackgroundImg.setVisible(false);
            cardStatHolder.statNameTxt.setColor(cc.color(0, 0, 0));
            this.node.addChild(cardStatHolder);

            cardStatHolder.setPosition(this.getPositionByIndex(i));
            this.cardStatHolders.push(cardStatHolder);
        }
        this.setAllCardStatHoldersVisible(false);
    },

    getPositionByIndex: function (index) {
        let startX = 0;
        let startY = 97;
        let statHolderHeight = 74;
        return cc.p(startX, startY - (index * (statHolderHeight + 20)));
    },

    setAllCardStatHoldersVisible: function (visible) {
        for (let i = 0; i < this.cardStatHolders.length; i++) {
            this.cardStatHolders[i].setVisible(visible);
        }
    },

    setCardStat: function () {
        let index = 0;
        this.acctionArray = [];
        let showUp = cc.sequence(cc.show(), cc.moveBy(0.3, cc.p(0, 20)));
        this.setAllCardStatHoldersVisible(false);
        for (let [key, value] of Object.entries(this.cardModel.stat)) {
            let cardStat = {
                icon: CARD_STAT_ICON[key],
                name: CARD_STAT_NAME[key],
                value: value,
            }
            this.cardStatHolders[index].setCardStatHolderTexture(cardStat);
            this.cardStatHolders[index].setPosition(this.getPositionByIndex(index));
            this.acctionArray.push(cc.targetedAction(this.cardStatHolders[index], showUp.clone()));
            index++;
        }
        this.cardStatHolders[0].runAction(cc.sequence(this.acctionArray));
    },

    setUpgradeProgressBar: function (accumulatedCard) {
        //TODO: exception when max level

        this.progressBackgroundImg.setScaleX(accumulatedCard / (JsonReader.getCardUpgradeConfig()[this.cardModel.level].fragments + accumulatedCard));
        this.accumulateTxt.setString('');

    },

    onAcceptBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
    }
});