const ClientUIManager = cc.Class.extend({
    ctor: function () {
        this.UIMap = new Map();
    },

    getInstance: function () {
        if (!this.instance) {
            this.instance = new ClientUIManager();
        }
        return this.instance;
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

const clientUIManager = new ClientUIManager();