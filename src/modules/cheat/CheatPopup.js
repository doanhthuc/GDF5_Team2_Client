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
        this.submitBtn = this.popUpNode.getChildByName('submitBtn');
        this.closeBtn = this.popUpNode.getChildByName('closeBtn');
        this.closeBtn.addTouchEventListener(this.onCloseBtnClick.bind(this), this);
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
            if (gold) {
                this.cheatContext.cheatGold(gold);
            }
            if (gem) {
                this.cheatContext.cheatGem(gem);
            }
            if (trophy) {
                this.cheatContext.cheatTrophy(trophy);
            }
            if (cardId) {
                this.cheatContext.cheatCardId(cardId);
                if (cardLevel) {
                    this.cheatContext.cheatCardLevel(cardLevel);
                }
                if (cardQuantity) {
                    this.cheatContext.cheatCardQuantity(cardQuantity);
                }
            }
            this.setVisible(false);
        }
    }
});
