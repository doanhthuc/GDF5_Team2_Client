const playerInfoHolderUtils = cc.Class({
    ctor: function (node) {
        this.userInfo = null;
        this.node = node;
        this.init();
    },

    init: function () {
        this.usernameTxt = this.node.getChildByName('usernameTxt');
        this.userTrophyTxt = this.node.getChildByName('userTrophyTxt');
    },

    setUserInfo: function (username, trophy) {
        this.usernameTxt.setString(username);
        this.userTrophyTxt.setString(trophy);
    }

})