const PopupUIManager = ClientUIManager.extend({
    showUI: function (uiName) {
        cc.log('PopupUIManager.showUI: ' + uiName);
        let uiNode = this.getUI(uiName);
        if (uiNode) {
            if (!uiNode.parent) {
                this.addUIToCurrentScene(uiName);
            }
            uiNode.setVisible(true);
            /*uiNode.setScale(0.8);
            let scale = cc.ScaleTo(0.4, 1).easing(cc.easeBackInOut());
            uiNode.runAction(scale);*/
        }
    },

    closeUI: function (uiName) {
        cc.log('PopupUIManager.closeUI: ' + uiName);
        let uiNode = this.getUI(uiName);
        if (uiNode) {
            // can add animation here
            uiNode.setVisible(false);
        }
    },

    addUIToCurrentScene: function (uiName) {
        let uiNode = this.getUI(uiName);
        let Z_ORDER = uiNode.Z_ORDER || CLIENT_UI_CONST.Z_ORDER.NORMAL_POPUP;
        if (uiNode) {
            fr.getCurrentScreen().addChild(uiNode, Z_ORDER);
            uiNode.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        }
    },

    setAllPopupVisible: function (visible) {
        for (let [key, value] of Object.entries(CLIENT_UI_CONST.POPUPS_NAME)) {
                this.getUI(value).setVisible(visible);
        }
    },

    isHavingAnyPopupVisible: function() {
        for (let [key, value] of Object.entries(CLIENT_UI_CONST.POPUPS_NAME)) {
            if (this.getUI(value) && this.getUI(value).isVisible()) {
                return true;
            }
        }
        return false;
    }
});

PopupUIManager._instance = null;
PopupUIManager.getInstance = function () {
    if (!PopupUIManager._instance) {
        PopupUIManager._instance = new PopupUIManager();
    }
    return PopupUIManager._instance;
}