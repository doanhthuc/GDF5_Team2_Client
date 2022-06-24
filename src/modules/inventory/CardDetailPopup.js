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
        this.initCardStatHolders();

        this.upgradeBtnState = InventoryResources.UPGRADE_BTN_STATE.NORMAL;
        this.upgradeBtnBackground.addTouchEventListener(this.onUpgradeBtnClick.bind(this), this);
    },

    initCardStatHolders: function () {
        let startX = 286.94;
        let startY = 667.45;
        let statHolderWidth = 257 * 0.7;
        let statHolderHeight = 74 * 0.7;
        this.cardStatHolders = [];
        for (let i = 0; i < 6; i++) {
            let cardStatHolder = new CardStatHolder();
            cardStatHolder.setScale(0.7);
            this.backgroundImg.addChild(cardStatHolder);
            if (i !== 0 && i % 2 === 0) {
                startX = 286.94;
                startY -= (i / 2) * statHolderHeight + 5;
            }
            cardStatHolder.setPosition(startX, startY);
            startX += statHolderWidth + 10;
            this.cardStatHolders.push(cardStatHolder);
        }
        this.setAllCardStatHoldersVisible(false);
    },

    setAllCardStatHoldersVisible: function (visible) {
        for (let i = 0; i < this.cardStatHolders.length; i++) {
            this.cardStatHolders[i].setVisible(visible);
        }
    },

    setCardStat: function () {
        let index = 0;
        this.setAllCardStatHoldersVisible(false);
        for (let [key, value] of Object.entries(this.cardModel.stat)) {
            let cardStat = {
                icon: CARD_STAT_ICON[key],
                name: CARD_STAT_NAME[key],
                value: value
            }
            this.cardStatHolders[index].setCardStatHolderTexture(cardStat);
            this.cardStatHolders[index].setVisible(true);
            index++;
        }
    },

    setCardModel: function (cardModel) {
        this.cardModel = cardModel;
        this.setCardDetailPopupTexture();
        this.setCardNodeModel(cardModel)
        this.setUpgradeBtnState(cardModel.accumulated);
        this.setUpgradeLevelTxt(cardModel.rank);
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

    onUpgradeBtnClick: function (sender, type) {
        if (this.upgradeBtnState === InventoryResources.UPGRADE_BTN_STATE.NORMAL && type === ccui.Widget.TOUCH_ENDED) {
            // cc.log('Card DetailPopup line 102 : onUpgradeBtnClick' + JSON.stringify(contextManager.getContext(ContextManagerConst.USER_CONTEXT)));
            if (this.cardModel.accumulated >= JsonReader.getCardUpgradeConfig()[this.cardModel.level + 1].fragments &&
                contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT).user.gold >=
                JsonReader.getCardUpgradeConfig()[this.cardModel.level + 1].gold) {
                //TODO: upgrade card
                contextManager.getContext(ContextManagerConst.CONTEXT_NAME.INVENTORY_CONTEXT).upgradeCard(this.cardModel.id);

            }
        }
    },

    setUpgradeBtnState: function (accumulatedCard) {
        if (accumulatedCard < JsonReader.getCardUpgradeConfig()[this.cardModel.level + 1].fragments) {
            this.upgradeBtnBackground.loadTextures(InventoryResources.UPGRADE_BTN_DISABLE_BACKGROUND, InventoryResources.UPGRADE_BTN_DISABLE_BACKGROUND);
            this.upgradeBtnState = InventoryResources.UPGRADE_BTN_STATE.DISABLE;
        } else if (accumulatedCard >= JsonReader.getCardUpgradeConfig()[this.cardModel.level + 1].fragments) {
            this.upgradeBtnBackground.loadTextures(InventoryResources.UPGRADE_BTN_BACKGROUND, InventoryResources.UPGRADE_BTN_BACKGROUND);
            this.upgradeBtnState = InventoryResources.UPGRADE_BTN_STATE.NORMAL;
        }
    }
    ,

    setUpgradeLevelTxt: function (rank) {
        this.upgradeLevelTxt.setString('Tiến hóa ' + rank);
    }
});