const bottomNav = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this.loadTab();

    },

    loadTab: function () {
        let sceneWidth = cc.director.getWinSize().width;

        for (let i = 0; i < 5; i++) {
            let tab = ccs.load(NavResources.NAV_TAB, '').node;
            this.addChild(tab);
            tab.setPosition(tab.getChildByName('backgroundBtn').getPositionX() + i * sceneWidth / 5,
                tab.getChildByName('backgroundBtn').getPositionY());
        }

    }
})