const UserContext = cc.Class.extend({
    ctor: function () {
        this._super();
        this.user = null;
        this.isAuthenticated = false;
        this.isAuthenticating = false;
        this.contextmanager = contextManager.getInstance();
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
    }
})