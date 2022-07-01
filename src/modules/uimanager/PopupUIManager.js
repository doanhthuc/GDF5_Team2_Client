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

    addUIToCurrentScene: function (uiName) {
        let uiNode = this.getUI(uiName);
        if (uiNode) {
            fr.getCurrentScreen().addChild(uiNode, CLIENT_UI_CONST.Z_ORDER.POP_UP);
            uiNode.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        }
    },
});

PopupUIManager._instance = null;
PopupUIManager.getInstance = function () {
    if (!PopupUIManager._instance) {
        PopupUIManager._instance = new PopupUIManager();
    }
    return PopupUIManager._instance;
}