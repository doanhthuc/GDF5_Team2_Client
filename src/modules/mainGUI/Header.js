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

    }

});