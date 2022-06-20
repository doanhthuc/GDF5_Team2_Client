const UserContext = cc.Class.extend({
    ctor: function () {
        this.user = {};
        this.isAuthenticated = false;
        this.isAuthenticating = false;
        this.contextmanager = contextManager.getInstance();
        this.clientUIManager = clientUIManager.getInstance();
    },

    setUser: function (user) {
        this.user = user;
    },

    getUser: function () {
        return this.user;
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

    },

    updateUserGem: function (gem) {
        this.user.gem += gem;
    },

    updateUserInfoUI: function ()  {
        this.clientUIManager.getUI(CLIENT_UI_CONST.NODE_NAME.HOME_NODE).setUsername(this.user.username);
        cc.log(JSON.stringify(this.user));
    },

    setUserInfoFromPackage: function (package) {
        this.user.id = package.id;
        this.user.username = package.username;
        this.user.gold = package.gold;
        this.user.gem = package.gem;
        this.user.trophy = package.trophy;
    }
})