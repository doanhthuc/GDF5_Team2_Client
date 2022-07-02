const ClientUIManager = cc.Class.extend({
    ctor: function () {
        this.UIMap = new Map();
    },

    registerUI: function (uiName, uiNode) {
        this.UIMap.set(uiName, uiNode);
        uiNode.setVisible(false);
    },

    getUI: function (uiName) {
        return this.UIMap.get(uiName);
    },

    showUI: function (uiName) {
        let uiNode = this.getUI(uiName);
        if (uiNode) {
            uiNode.setVisible(true);
        }
    },

});

ClientUIManager._instance = null;
ClientUIManager.getInstance = function () {
    if (!ClientUIManager._instance) {
        ClientUIManager._instance = new ClientUIManager();
    }
    return ClientUIManager._instance;
}