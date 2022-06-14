const bottomNav = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    DEFAULT_TAB: 'HOME_TAB',

    init: function () {
        this.activeTab = this.DEFAULT_TAB;
        this.loadTabList();
    },

    loadTabList: function () {
        this.tabMap = new Map();
        let currentWidth = 0;
        for (let tab in NavResources.TAB_LIST) {
            let node = ccs.load(NavResources.NAV_TAB, '').node;
            this.addChild(node);
            node.getChildByName('iconImg').loadTexture(NavResources.TAB_LIST[tab].icon);
            node.getChildByName('nameTxt').setString(NavResources.TAB_LIST[tab].text);
            let backgroundBtn = node.getChildByName('backgroundBtn')
            if (tab !== this.activeTab) {
                backgroundBtn.loadTextureNormal(
                    NavResources.TAB_LIST[tab].backgroundImg
                );
                node.setPosition(
                    NavResources.NORMAL_BUTTON_HEIGHT * 0.5 + currentWidth,
                    NavResources.NORMAL_BUTTON_HEIGHT / 2
                );
                currentWidth += backgroundBtn.getSize().width;
            } else {
                backgroundBtn.loadTextureNormal(
                    NavResources.ACTIVE_TAB_BG
                )
                node.setPosition(
                    NavResources.ACTIVE_BUTTON_WIDTH * 0.5 + currentWidth,
                    NavResources.NORMAL_BUTTON_HEIGHT / 2 - 5
                );
                currentWidth += backgroundBtn.getSize().width;

            }

            // cc.log(node.getChildByName('backgroundBtn'));

            this.tabMap.set(tab, node);
        }
        // cc.log(JSON.stringify(NavResources.TAB_LIST))
        // NavResources.TAB_LIST.entries().forEach(tab => {
        //     let node = ccs.load(res.BOTTOM_NAV, '').node;
        //     this.addChild(node);
        //     node.setPosition(NavResources.NORMAL_BUTTON_HEIGHT * (this.tabMap.size + 0.5),
        //         NavResources.NORMAL_BUTTON_HEIGHT / 2);
        //     this.tabMap.set(tab.key, node);
        // })
    },
    loadTab: function (node, tabName, currentXPos) {
        let backgroundBtn = node.getChildByName('backgroundBtn')
        let iconImg = node.getChildByName('iconImg')
        let nameTxt = node.getChildByName('nameTxt')

    }
});
