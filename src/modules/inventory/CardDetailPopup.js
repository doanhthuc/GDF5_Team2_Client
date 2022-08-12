const CardDetailPopup = cc.Node.extend({
    ctor: function () {
        this.name = CLIENT_UI_CONST.POPUPS_NAME.GUI_CARD_DETAIL;
        this.Z_ORDER = CLIENT_UI_CONST.Z_ORDER.HIGHER_POPUP;
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
        this.selectBtnNode = this.backgroundImg.getChildByName('selectBtnlNode');
        this.selectBtnBackground = this.selectBtnNode.getChildByName('backgroundBtn');
        this.skillBtnNode = this.backgroundImg.getChildByName('skillBtnNode');
        this.skillBtnBackground = this.skillBtnNode.getChildByName('backgroundBtn')
        this.cardNameTxt = this.backgroundImg.getChildByName('cardNameTxt');
        this.cardNameTxt.ignoreContentAdaptWithSize(true);
        this.upgradeLevelTxt = this.backgroundImg.getChildByName('upgradeLevelTxt');
        this.upgradeLevelTxt.ignoreContentAdaptWithSize(true);
        this.towerImg = this.backgroundImg.getChildByName('towerImg');
        this.modal = this.cardDetailPopupNode.getChildByName('modal');
        this.nextTowerImgBtn = this.cardDetailPopupNode.getChildByName('nextTowerImgBtn');
        this.nextTowerImgBtn.addTouchEventListener(this.onNextTowerImgBtnClick.bind(this), this);
        this.prevTowerImgBtn = this.cardDetailPopupNode.getChildByName('prevTowerImgBtn');
        this.prevTowerImgBtn.addTouchEventListener(this.onPrevTowerImgBtnClick.bind(this), this);
        this.constraintTxt = this.cardDetailPopupNode.getChildByName('constraintTxt');
        UiUtil.setImageFullScreen(this.modal);
        this.modal.addTouchEventListener(this.onModalClick.bind(this), this);
        this.initCardStatHolders();

        this.upgradeBtnState = InventoryResources.UPGRADE_BTN_STATE.NORMAL;
        this.upgradeBtnBackground.addTouchEventListener(this.onUpgradeBtnClick.bind(this), this);
        this.skillBtnBackground.addTouchEventListener(this.onSkillBtnClick.bind(this), this);
        this.selectBtnBackground.addTouchEventListener(this.onSelectBtnClick.bind(this), this);

        this.DEFAULT_RANK_INDEX = 0;
        this.currentRankIndex = this.DEFAULT_RANK_INDEX;
        this.rankArr = ['C', 'B', 'A'];
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
                startY -= statHolderHeight + 5;
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
        for (let [key, value] of Object.entries(this.cardModel.getCardStat())) {
            if (key === 'attackSpeed') {
                value = value / 1000 + 's';
            } else if (key === 'slowPercent') {
                value = value + '%';
            } else if (key === 'frozenTime') {
                value = value / 1000 + 's';
            }
            let cardStat = {
                icon: CARD_STAT_ICON[key],
                name: CARD_STAT_NAME[key],
                value: value,
                nameField: key
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
        this.currentRankIndex = this.DEFAULT_RANK_INDEX;
        this.constraintTxt.setVisible(this.shouldConstraintVisible());
        this.towerImg.setTexture(CARD_CONST[this.cardModel.id].image[this.rankArr[this.DEFAULT_RANK_INDEX]]);
        this.setNextAndPrevTowerImgBtnOpacity();
        // TODO: check condition card from where click
        cardModel.isBattleDeck
            ? this.setBtnPosPopupFromBattleDeck()
            : this.setBtnPosPopupFromCardCollection();
        // this.setBtnPosPopupFromBattleDeck()
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
        this.cardNameTxt.setString(CARD_NAME_VI[this.cardModel.id]);
        // this.towerImg.setTexture(CARD_CONST[this.cardModel.id].image['A']);

        this.setCardStat()
    },

    onCloseClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
    },

    onUpgradeBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            switch (this.upgradeBtnState) {
                case InventoryResources.UPGRADE_BTN_STATE.DISABLE:
                    if (this.cardModel.level < MAX_CARD_LEVEL) {
                        PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_NOT_ENOUGH_UPGRADE_RES).setType(InventoryResources.RESOURCE_TYPE.CARD)
                        PopupUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_NOT_ENOUGH_UPGRADE_RES);
                    }
                    break;
                case InventoryResources.UPGRADE_BTN_STATE.NOT_ENOUGH_GOLD:
                    PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_NOT_ENOUGH_UPGRADE_RES).setType(InventoryResources.RESOURCE_TYPE.GOLD)
                    PopupUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_NOT_ENOUGH_UPGRADE_RES);
                    break;
                case InventoryResources.UPGRADE_BTN_STATE.NORMAL:
                    //TODO: upgrade card
                    contextManager.getContext(ContextManagerConst.CONTEXT_NAME.INVENTORY_CONTEXT).upgradeCard(this.cardModel.id);
                    break;
                default:
                    break;
            }
        }
    },

    onSelectBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            let inventoryLayer = ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.INVENTORY_NODE);
            inventoryLayer.onSelectCardBtnClick(this.cardModel);
            this.setVisible(false);
        }
    },

    onSkillBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_CARD_SKILL).setCardId(this.cardModel.id);
            PopupUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_CARD_SKILL);
        }
    },

    setBtnPosPopupFromBattleDeck: function () {
        if (this.cardModel.id >= 7 && this.cardModel.id <= 9) {
            this.selectBtnNode.setVisible(false);
            this.skillBtnNode.setVisible(false);
            this.upgradeBtnNode.setPosition(310, 105.55);
        } else {
            this.skillBtnNode.setVisible(true);
            this.selectBtnNode.setVisible(false);
            this.upgradeBtnNode.setPosition(198.12, 105.55);
            this.skillBtnNode.setPosition(435.80, 105.55);
            this.skillBtnNode.setScaleX(1);
        }
    },

    setBtnPosPopupFromCardCollection: function () {
        if (this.cardModel.id >= 7 && this.cardModel.id <= 9) {
            this.selectBtnNode.setVisible(true);
            this.skillBtnNode.setVisible(false);
            this.selectBtnNode.setPosition(198.12, 105.55);
            this.upgradeBtnNode.setPosition(435.80, 105.55);
            this.selectBtnNode.setScaleX(1);
        } else {
            this.skillBtnNode.setVisible(true);
            this.selectBtnNode.setVisible(true);
            this.selectBtnNode.setPosition(133.68, 105.55);
            this.upgradeBtnNode.setPosition(313.81, 105.55);
            this.skillBtnNode.setPosition(495.02, 105.55);

            this.skillBtnNode.setScaleX(0.8);
            this.selectBtnNode.setScaleX(0.8);
        }
    },

    setUpgradeBtnState: function (accumulatedCard) {
        if (this.cardModel.level >= MAX_CARD_LEVEL) {
            this.setUpgradeBtnTexture(InventoryResources.UPGRADE_BTN_DISABLE_BACKGROUND, cc.color(255, 255, 255));
            this.upgradeBtnState = InventoryResources.UPGRADE_BTN_STATE.DISABLE;
        } else if (accumulatedCard < JsonReader.getCardUpgradeConfig()[this.cardModel.level + 1].fragments) {
            this.setUpgradeBtnTexture(InventoryResources.UPGRADE_BTN_DISABLE_BACKGROUND, cc.color(255, 255, 255));
            this.upgradeBtnState = InventoryResources.UPGRADE_BTN_STATE.DISABLE;
        } else if (accumulatedCard >= JsonReader.getCardUpgradeConfig()[this.cardModel.level + 1].fragments &&
            contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT).user.gold
            < JsonReader.getCardUpgradeConfig()[this.cardModel.level + 1].gold) {
            {
                this.setUpgradeBtnTexture(InventoryResources.UPGRADE_BTN_BACKGROUND, cc.color(255, 0, 0));
                this.upgradeBtnState = InventoryResources.UPGRADE_BTN_STATE.NOT_ENOUGH_GOLD;
            }
        } else {
            this.setUpgradeBtnTexture(InventoryResources.UPGRADE_BTN_BACKGROUND, cc.color(255, 255, 255));
            this.upgradeBtnState = InventoryResources.UPGRADE_BTN_STATE.NORMAL;
        }
    },

    setUpgradeBtnTexture: function (backgroundImg, goldValueTxtColor) {
        this.upgradeBtnBackground.loadTextures(backgroundImg, backgroundImg);
        this.upgradeBtnBackground.getChildByName('goldValueTxt').setColor(goldValueTxtColor);
        if (this.cardModel.level >= MAX_CARD_LEVEL) {
            this.upgradeBtnBackground.getChildByName('goldValueTxt').setString('MAX');
        } else {
            this.upgradeBtnBackground.getChildByName('goldValueTxt').setString(JsonReader.getCardUpgradeConfig()[this.cardModel.level + 1].gold);
        }
    },

    setUpgradeLevelTxt: function (rank) {
        this.upgradeLevelTxt.setString('Tiến hóa ' + rank);
    },

    updateUIByLevelAndAccumulatedCard: function (level, accumulated) {
        this.cardModel.upgradeCardModel(level, accumulated);
        this.cardNode.updateCardNodeUI(this.cardModel.accumulated);
        // this.setCardStat();
        this.setCardDetailPopupTexture();
        // this.setUpgradeLevelTxt(this.cardModel.rank);
        this.setUpgradeBtnState(accumulated)
    },

    onModalClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
    },

    onNextTowerImgBtnClick: function (sender, type) {
        if (this.currentRankIndex < 2 && type === ccui.Widget.TOUCH_ENDED) {
            let rank = this.rankArr[this.currentRankIndex + 1];
            this.towerImg.setTexture(CARD_CONST[this.cardModel.id].image[rank]);
            this.currentRankIndex++;
            this.constraintTxt.setString('Yêu càu tiến hoá ' + (this.currentRankIndex + 1));
            this.upgradeLevelTxt.setString('Tiến hóa ' + (this.currentRankIndex + 1));
            this.constraintTxt.setVisible(this.shouldConstraintVisible());
            this.setNextAndPrevTowerImgBtnOpacity();
        }
    },

    onPrevTowerImgBtnClick: function (sender, type) {
        if (this.currentRankIndex > 0 && type === ccui.Widget.TOUCH_ENDED) {
            let rank = this.rankArr[this.currentRankIndex - 1];
            this.towerImg.setTexture(CARD_CONST[this.cardModel.id].image[rank]);
            this.currentRankIndex--;
            this.constraintTxt.setString('Yêu càu tiến hoá ' + (this.currentRankIndex + 1));
            this.upgradeLevelTxt.setString('Tiến hóa ' + (this.currentRankIndex + 1));
            this.constraintTxt.setVisible(this.shouldConstraintVisible());
            this.setNextAndPrevTowerImgBtnOpacity();
        }
    },

    shouldConstraintVisible: function () {
        return this.cardModel.level < CARD_RANK[this.rankArr[this.currentRankIndex]].LEVEL;
    },

    setNextAndPrevTowerImgBtnOpacity: function () {
        if (this.currentRankIndex === 0) {
            this.prevTowerImgBtn.setOpacity(128);
        } else {
            this.prevTowerImgBtn.setOpacity(255);
        }
        if (this.currentRankIndex === 2) {
            this.nextTowerImgBtn.setOpacity(128);
        } else {
            this.nextTowerImgBtn.setOpacity(255);
        }
    }
});