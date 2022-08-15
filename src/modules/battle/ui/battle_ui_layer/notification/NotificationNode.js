let NotificationNode = cc.Sprite.extend({
    ctor: function (width) {
        this._super();

        let rootNode = ccs.load("ui/battle/battle_ui_layer/notification/NotificationNode.json", "").node;
        this.addChild(rootNode, 1);

        this.backgroundImg = rootNode.getChildByName("background");
        this.text = rootNode.getChildByName("text");
        this.setName("Notification");
        this.active = false;
        if (width) {
            this.setWidth(width);
        }
    },

    setWidth: function (width) {
        this.backgroundImg.width = width;
        this.text.width = width;
    },

    setText: function (txt) {
        this.text.setString(txt);
    },

    toggle: function () {
        this.active = !this.active;
        this.setVisible(this.active);
    },

    show: function () {
        this.setVisible(true);
    },

    hide: function () {
        this.setVisible(false);
    }
})