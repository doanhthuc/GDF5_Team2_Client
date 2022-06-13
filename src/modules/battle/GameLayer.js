let GameLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        let rootNode = ccs.load("ui/battle/BattleScene.json", "");
        this.addChild(rootNode.node);
        this.handleEvent();
    },

    handleEvent: function () {
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (key, event) {
                cc.log("Key down:" + key);
                cc.log(this.getChildrenCount());
            }.bind(this),
            onKeyReleased: function (key, event) {
                cc.log("Key up:" + key);
            }.bind(this)
        }, this);
    }
});