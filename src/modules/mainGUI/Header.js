const Header = cc.Node.extend({
    ctor: function () {
        this._super();
        this.userContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT);
        this.init();
    },

    init: function () {
        this.headerNode = ccs.load(MainResources.HEADER_NODE, '').node;
        this.addChild(this.headerNode);
        this.headerBackgroundImg = this.headerNode.getChildByName('headerBackgroundImg');
        this.userGoldTxt = this.headerNode.getChildByName('goldTxt');
        this.userGemTxt = this.headerNode.getChildByName('gemTxt');
        this.goldTopUpBtn = this.headerNode.getChildByName('goldTopUpBtn');
        this.gemTopUpBtn = this.headerNode.getChildByName('gemTopUpBtn');

        this.goldTopUpBtn.addClickEventListener(this.onGoldTopUpBtnClicked.bind(this));
        this.gemTopUpBtn.addClickEventListener(this.onGemTopUpBtnClicked.bind(this));

        this.setPosition(cc.winSize.width / 2, cc.winSize.height - this.headerBackgroundImg.getSize().height / 2);

        this.addCheatButton();
    },

    setUserGold: function (gold) {
        this.userGoldTxt.setString(gold);
    },

    setUserGem: function (gem) {
        this.userGemTxt.setString(gem);
    },

    onGoldTopUpBtnClicked: function () {
        // this.userGoldTxt.setString((this.userGoldTxt.getString() - 0) + 100);
    },

    onGemTopUpBtnClicked: function () {

    },

    addCheatButton: function () {
        this.cheatBtnNode = ccs.load('ui/cheat/cheatButton.json', '').node;
        this.addChild(this.cheatBtnNode);
        this.cheatBtn = this.cheatBtnNode.getChildByName('cheatBtn');
        this.cheatBtn.addTouchEventListener(this.onCheatBtnClicked.bind(this), this);
        this.cheatBtnNode.setPosition(cc.winSize.width / 2 - this.cheatBtn.getSize().width / 2, 0);
    },

    onCheatBtnClicked: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            ClientUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_CHEAT);
        }
    }

});