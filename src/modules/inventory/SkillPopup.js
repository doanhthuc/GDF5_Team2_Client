const SkillPopup = cc.Node.extend({
    ctor: function (cardId) {
        this.name = CLIENT_UI_CONST.POPUPS_NAME.GUI_CARD_SKILL;
        this.Z_ORDER = CLIENT_UI_CONST.Z_ORDER.NOTIFY_POPUP
        this._super();
        this.init();
        if (cardId) this.setCardId(cardId);
    },

    init: function () {
        this.node = ccs.load(InventoryResources.SKILL_POPUP_NODE, '').node;
        this.addChild(this.node);
        this.skillNameTxt = this.node.getChildByName('skillNameTxt');
        this.skillNameTxt.ignoreContentAdaptWithSize(true);
        this.skillDescTxt = this.node.getChildByName('skillDescTxt');
        this.skillImg = this.node.getChildByName('skillImg');
        this.constraintTxt = this.node.getChildByName('constraintTxt');
        this.padLockImg = this.node.getChildByName('padLockImg');
        this.closeBtn = this.node.getChildByName('closeBtn');
        this.modal = this.node.getChildByName('modal');
        this.modal.addTouchEventListener(this.onModalClick.bind(this), this);
        this.closeBtn.addTouchEventListener(this.onCloseBtnClick.bind(this), this);
        UiUtil.setImageFullScreen(this.modal);
        this.initCardStatHolders();
    },

    setCardId: function (cardId) {
        this.cardId = cardId;
        this.setPopupTexture(this.cardId);
    },

    setPopupTexture: function (cardId) {
        this.skillNameTxt.setString(SKILL_CONST[cardId].name);
        this.skillDescTxt.setString(SKILL_CONST[cardId].description);
        this.skillImg.setTexture(SKILL_CONST[cardId].image);
        let shouldUnlockSkillTexture = this.shouldUnlockSkillTexture(cardId);
        this.constraintTxt.setVisible(!shouldUnlockSkillTexture);
        this.padLockImg.setVisible(!shouldUnlockSkillTexture);

        this.setCardStat(cardId);
    },

    shouldUnlockSkillTexture: function (cardId) {
        return contextManager.getContext(ContextManagerConst.CONTEXT_NAME.INVENTORY_CONTEXT)
            .cardCollectionList[cardId]
            .cardLevel >= 7;
    },

    setCardStat: function (cardId) {
        let index = 0;
        this.setAllCardStatHoldersVisible(false);
        for (let [key, value] of Object.entries(SKILL_CONST[cardId].stat)) {
            if (key === 'damageUpPercent' || key === 'potionHealthPercent') {
                value = value + '%';
            } else if (key === 'stunTime' || key === 'time') {
                value = value + 's';
            }
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

    initCardStatHolders: function () {
        let startX = -132.45;
        let startY = -228.07;
        let statHolderWidth = 257;
        let statHolderHeight = 74;
        this.cardStatHolders = [];
        for (let i = 0; i < 4; i++) {
            let cardStatHolder = new CardStatHolder();
            this.node.addChild(cardStatHolder);
            if (i !== 0 && i % 2 === 0) {
                startX = -132.45;
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

    onCloseBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
    },

    onModalClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
    },
});