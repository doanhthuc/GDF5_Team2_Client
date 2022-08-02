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
        this.addLogoutButton();
    },

    getNodeHeight: function () {
        return this.headerBackgroundImg.getSize().height;
    },

    setUserGold: function (gold) {
        gold = UiUtil.convertIntToString(gold);
        this.userGoldTxt.setString(gold);
    },

    setUserGem: function (gem) {
        gem = UiUtil.convertIntToString(gem);
        this.userGemTxt.setString(gem);
    },

    onGoldTopUpBtnClicked: function () {
        // this.userGoldTxt.setString((this.userGoldTxt.getString() - 0) + 100);
        // let userContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT);
        // contextManager.getContext(ContextManagerConst.CONTEXT_NAME.CHEAT_CONTEXT).cheatUserInfo(userContext.user.gold + 1000, userContext.user.gem, userContext.user.trophy);
        this.parent.mainPageView.scrollToPage(NavResources.TAB_LIST.SHOP_TAB.index)
    },

    onGemTopUpBtnClicked: function () {
        // let userContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT);
        // contextManager.getContext(ContextManagerConst.CONTEXT_NAME.CHEAT_CONTEXT).cheatUserInfo(userContext.user.gold, userContext.user.gem + 1000, userContext.user.trophy);
        this.parent.mainPageView.scrollToPage(NavResources.TAB_LIST.SHOP_TAB.index)
    },

    addCheatButton: function () {
        this.cheatBtnNode = ccs.load('ui/cheat/cheatButton.json', '').node;
        this.addChild(this.cheatBtnNode);
        this.cheatBtn = this.cheatBtnNode.getChildByName('cheatBtn');
        this.cheatBtn.addTouchEventListener(this.onCheatBtnClicked.bind(this), this);
        this.cheatBtnNode.setPosition(cc.winSize.width / 2 - (this.cheatBtn.getSize().width * 0.8) / 2 + 3, this.cheatBtn.getSize().height * 0.2 / 2);
    },
    addLogoutButton: function () {
        this.logoutButtonNode = ccs.load('ui/login/LogoutButton.json', "").node;
        this.addChild(this.logoutButtonNode);
        this.logoutButton = this.logoutButtonNode.getChildByName("LogoutButton");
        this.logoutButton.addTouchEventListener(this.onLogoutButtonClicked.bind(this), this);
        this.logoutButtonNode.setPosition(-(cc.winSize.width / 2 - (this.logoutButton.getSize().width * 0.8) / 2 + 15), this.cheatBtn.getSize().height * 0.2 / 2);
    },

    onCheatBtnClicked: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            PopupUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_CHEAT);
            PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_CHEAT).resetCheatForm();
        }
    },
    onLogoutButtonClicked: function () {
        // this.logoutButton.setEnable();
        testnetwork.connector.sendLogout();
    }

});