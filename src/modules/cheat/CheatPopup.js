const CheatPopup = cc.Node.extend({
    ctor: function () {
        this.name = CLIENT_UI_CONST.POPUPS_NAME.GUI_CHEAT;
        this._super();
        this.init();
    },

    init: function () {
        this.popUpNode = ccs.load('ui/cheat/cheatPopup.json', '').node;
        this.addChild(this.popUpNode);
        this.goldCheatInput = this.popUpNode.getChildByName('goldCheatInput');
        this.gemCheatInput = this.popUpNode.getChildByName('gemCheatInput');
        this.trophyCheatInput = this.popUpNode.getChildByName('trophyCheatInput');
        this.cardIdCheatInput = this.popUpNode.getChildByName('cardIdCheatInput');
        this.cardLevelCheatInput = this.popUpNode.getChildByName('cardLevelCheatInput');
        this.cardQuantityCheatInput = this.popUpNode.getChildByName('cardQuantityCheatInput');
        this.cardImg = this.popUpNode.getChildByName('cardImg');
        this.cardImg.setVisible(false);
        this.lelelTxt = this.popUpNode.getChildByName('levelTxt');
        this.lelelTxt.ignoreContentAdaptWithSize(true);
        this.lelelTxt.setString('');
        this.submitBtn = this.popUpNode.getChildByName('submitBtn');
        this.closeBtn = this.popUpNode.getChildByName('closeBtn');
        this.chestCheatBtn = this.popUpNode.getChildByName('chestCheatBtn');
        this.closeBtn.addTouchEventListener(this.onCloseBtnClick.bind(this), this);
        this.submitBtn.addTouchEventListener(this.onSubmitBtnClick.bind(this), this);
        this.cardIdCheatInput.addEventListener(this.cardIdCheatInputListener.bind(this), this);
        this.chestCheatBtn.addTouchEventListener(this.onChestCheatBtnClick.bind(this), this);
    },

    onCloseBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
    },

    onSubmitBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            let gold = this.goldCheatInput.getString();
            let gem = this.gemCheatInput.getString();
            let trophy = this.trophyCheatInput.getString();
            let cardId = this.cardIdCheatInput.getString();
            let cardLevel = this.cardLevelCheatInput.getString();
            let cardQuantity = this.cardQuantityCheatInput.getString();
            if (gold || gem || trophy) {
                contextManager.getContext(ContextManagerConst.CONTEXT_NAME.CHEAT_CONTEXT).cheatUserInfo(gold, gem, trophy);
            }
            if (cardId && cardLevel || cardQuantity) {
                contextManager.getContext(ContextManagerConst.CONTEXT_NAME.CHEAT_CONTEXT).cheatUserCard(cardId, cardLevel, cardQuantity);
            }
            this.setVisible(false);
        }
    },

    cardIdCheatInputListener: function (sender, type) {
        if (type === ccui.TextField.EVENT_INSERT_TEXT) {
            let cardId = sender.getString();
            if (cardId < 10) {
                let inventoryContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.INVENTORY_CONTEXT);
                let card = inventoryContext.getCardById(+cardId);
                this.cardImg.setTexture(CARD_CONST[cardId].cardImage);
                this.cardImg.setVisible(true);
                this.lelelTxt.setString('Level ' + card.cardLevel);
                this.cardLevelCheatInput.setString(card.cardLevel);
                this.cardQuantityCheatInput.setString(card.amount);
            } else {
                this.cardImg.setVisible(false);
                this.lelelTxt.setString('');
                this.cardLevelCheatInput.setString('');
                this.cardQuantityCheatInput.setString('');
            }
        }
    },

    onChestCheatBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            contextManager.getContext(ContextManagerConst.CONTEXT_NAME.CHEAT_CONTEXT).cheatFullChest();
        }
    }
});
