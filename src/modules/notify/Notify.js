const NotifyNode = cc.Node.extend({
    ctor: function () {
        this.name = CLIENT_UI_CONST.POPUPS_NAME.GUI_NOTIFY;
        this.Z_ORDER = CLIENT_UI_CONST.Z_ORDER.NOTIFY;
        this._super();
        this.init();
    },

    init: function () {
        this.node = ccs.load(MainResources.NOTIFY_NODE, '').node;
        this.addChild(this.node);
        this.notifyTxt = this.node.getChildByName("notifyTxt");
        this.background = this.node.getChildByName("Image_1");
        this.background.width = cc.winSize.width;
    },

    setNotifyTxt: function (notify) {
        this.notifyTxt.setString(notify);
    },

    showNotify: function () {
        if (!this.parent) {
            fr.getCurrentScreen().addChild(this, this.Z_ORDER);
            this.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        }
        let showThenHide = cc.sequence(cc.targetedAction(this, cc.show()), cc.delayTime(3), cc.targetedAction(this,cc.hide()));
        this.runAction(showThenHide);
    },
})