const CardDetailPopup = cc.Node.extend({
    ctor: function () {
        this.name = CLIENT_UI_CONST.POPUPS_NAME.GUI_CARD_DETAIL;
        this.cardModel = null;
        this.cardNode = null;
        this._super();
        this.init();
    },

    init: function () {
        this.cardDetailPopupNode = ccs.load(InventoryResources.CARD_DETAIL_POPUP_NODE, '').node;
        this.addChild(this.cardDetailPopupNode);
        this.backgroundImg = this.cardDetailPopupNode.getChildByName('backgroundImg');
        this.closeBtn = this.backgroundImg.getChildByName('closeBtn');
        this.closeBtn.addTouchEventListener(this.onCloseClick.bind(this), this);
        this.upgradeBtnNode = this.backgroundImg.getChildByName('upgradeBtnNode');
        this.upgradeBtnBackground = this.upgradeBtnNode.getChildByName('backgroundBtn');
        this.cardNameTxt = this.backgroundImg.getChildByName('cardNameTxt');
        this.cardNameTxt.ignoreContentAdaptWithSize(true);
        this.upgradeLevelTxt = this.backgroundImg.getChildByName('upgradeLevelTxt');
        this.towerImg = this.backgroundImg.getChildByName('towerImg');
    },

    setCardStat: function () {
        let startX = 286.94;
        let startY = 667.45;
        let statHolderWidth = 257 * 0.7;
        let statHolderHeight = 74 * 0.7;
        let count = 0;
        for (let [key, value] of Object.entries(this.cardModel.stat)) {
            let cardStatHolder = new CardStatHolder();
            cardStatHolder.setScale(0.7);
            this.backgroundImg.addChild(cardStatHolder);
            if (count !== 0 && count % 2 === 0) {
                startX = 286.94;
                startY -= (count / 2) * statHolderHeight + 5;
            }
            cardStatHolder.setPosition(startX, startY);
            count++;
            startX += statHolderWidth + 10;
            let cardStat = {
                icon: CARD_STAT_ICON[key],
                name: CARD_STAT_NAME[key],
                value: value
            }
            cardStatHolder.setCardStatHolderTexture(cardStat);
        }
    },

    setCardModel: function (cardModel) {
        this.cardModel = cardModel;
        this.setCardDetailPopupTexture();
        this.setCardNodeModel(cardModel)
    },

    setCardNodeModel: function (cardModel) {
        if (!this.cardNode) {
            this.cardNode = new CardNode();
            this.cardNode.setCardClickEnabled(false);
            this.backgroundImg.addChild(this.cardNode);
            this.cardNode.setPosition(118.31, 639.11);
        }
        this.cardNode.setModel(cardModel);
    },

    setCardDetailPopupTexture: function () {
        let cardType = CARD_TYPE.TOWER[this.cardModel.id];
        this.cardNameTxt.setString(CARD_NAME_VI[this.cardModel.id]);
        this.towerImg.setTexture(CARD_TYPE.TOWER[this.cardModel.id].image['C']);
        // this.backgroundImg.loadTexture(cardType.background, ccui.Widget.PLIST_TEXTURE);
        this.setCardStat()
    },

    onCloseClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
    },

    setUpgradeBtnState: function () {
        if (this.cardModel.accumulated < JsonReader.getCardUpgradeConfig()[this.cardModel.level] + 1) {
            this.upgradeBtnBackground.loadTexture(InventoryResources.UPGRADE_BTN_DISABLE_BACKGROUND, InventoryResources.UPGRADE_BTN_DISABLE_BACKGROUND);
        }
    }
});