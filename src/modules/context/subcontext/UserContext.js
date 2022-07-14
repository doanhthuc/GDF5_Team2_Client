const UserContext = cc.Class.extend({
    ctor: function () {
        this.user = {};
        this.isAuthenticated = false;
        this.isAuthenticating = false;
        this.clientUIManager = ClientUIManager.getInstance();
    },

    setUser: function (user) {
        this.user = user;
    },

    getUser: function () {
        return this.user;
    },

    getUsername: function () {
        return this.user.username;
    },

    getTrophy: function () {
        return this.user.trophy;
    },

    setAuthenticated: function (isAuthenticated) {
        this.isAuthenticated = isAuthenticated;
    },

    isAuthenticated: function () {
        return this.isAuthenticated;
    },

    setAuthenticating: function (isAuthenticating) {
        this.isAuthenticating = isAuthenticating;
    },

    isAuthenticating: function () {
        return this.isAuthenticating;
    },

    clear: function () {
        this.user = null;
        this.isAuthenticated = false;
        this.isAuthenticating = false;
    },

    login: function (userId) {

    },

    logout: function () {
        this.clear();
        // this.contextmanager.showUI('login');
    },

    updateUserGold: function (gold) {
        this.user.gold += gold;
        ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.HEADER_NODE).setUserGold(this.user.gold);

    },

    updateUserGem: function (gem) {
        this.user.gem += gem;
        ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.HEADER_NODE).setUserGem(this.user.gem);
    },

    updateUserInfoUI: function () {
        let HomeNode = this.clientUIManager.getUI(CLIENT_UI_CONST.NODE_NAME.HOME_NODE);
        HomeNode.setUsername(this.user.username);
        HomeNode.setUserTrophy(this.user.trophy);

        let headerNode = this.clientUIManager.getUI(CLIENT_UI_CONST.NODE_NAME.HEADER_NODE);
        headerNode.setUserGold(this.user.gold);
        headerNode.setUserGem(this.user.gem);
        cc.log(JSON.stringify(this.user));
    },

    setUserInfoFromPackage: function (packet) {
        this.user.id = packet.id;
        this.user.username = packet.username;
        this.user.gold = packet.gold;
        this.user.gem = packet.gem;
        this.user.trophy = packet.trophy;
    },

    resetContextData: function () {
        this.user = {};
        this.isAuthenticated = false;
        this.isAuthenticating = false;
        this.clientUIManager = ClientUIManager.getInstance();
    }
})