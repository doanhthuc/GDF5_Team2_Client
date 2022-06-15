const bottomNav = cc.Node.extend({
    ctor: function (handleScrollPageCallback) {
        this._super();
        this.handleScrollPageCallback = handleScrollPageCallback;
        this.init();
    },

    init: function () {
        this.DEFAULT_TAB = 'HOME_TAB';
        this.activeTab = this.DEFAULT_TAB;
        this.tabMap = new Map();
        this.loadTabList();
        this.setPositionForTab();
    },


    /*loadTabList: function () {
        let currentWidth = 0;
        for (let tab in NavResources.TAB_LIST) {
            let node = ccs.load(NavResources.NAV_TAB, '').node;
            this.addChild(node);
            this.tabMap.set(tab, node);
            node.name = NavResources.TAB_LIST[tab].name;
            node.iconImg = node.getChildByName('iconImg');
            node.backgroundBtn = node.getChildByName('backgroundBtn');
            node.nameTxt = node.getChildByName('nameTxt');
            cc.log(node.backgroundBtn);
            node.backgroundBtn.addTouchEventListener(this.onTabClick.bind(this), this);
            if (NavResources.TAB_LIST[tab].icon !== undefined) {
                node.iconImg.loadTexture(NavResources.TAB_LIST[tab].icon);
                node.getChildByName('nameTxt').setString(NavResources.TAB_LIST[tab].text);
                node.getChildByName('nameTxt').setVisible(false);
            }
            let backgroundBtn = node.getChildByName('backgroundBtn')
            if (tab !== this.activeTab) {
                node.backgroundBtn.loadTextureNormal(
                    NavResources.TAB_LIST[tab].backgroundImg
                );
                node.setPosition(
                    NavResources.NORMAL_BUTTON_WIDTH * 0.5 + currentWidth,
                    NavResources.NORMAL_BUTTON_HEIGHT / 2
                );
                currentWidth += backgroundBtn.getSize().width - 4;
            } else {
                node.backgroundBtn.loadTextureNormal(
                    NavResources.ACTIVE_TAB_BG
                )
                node.setPosition(
                    NavResources.ACTIVE_BUTTON_WIDTH * 0.5 + currentWidth,
                    NavResources.NORMAL_BUTTON_HEIGHT / 2 - 5
                );
                node.nameTxt.setVisible(true);
                // node.nameTxt.setPosition(0,
                //     cc.winSize.height/2);
                currentWidth += backgroundBtn.getSize().width - 2;
            }

        }

    },*/
    onTabClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.activeTab = sender.parent.name;
            this.setPositionForTab();
            this.handleScrollPageCallback(sender.parent.index);
        }
    },
    setPositionForTab: function () {
        let currentWidth = 0;
        this.tabMap.forEach(function (tab, key) {
            if (key === this.activeTab) {
                tab.backgroundBtn.loadTextureNormal(
                    NavResources.ACTIVE_TAB_BG
                );
                tab.setPosition(
                    NavResources.ACTIVE_BUTTON_WIDTH * 0.5 + currentWidth,
                    NavResources.NORMAL_BUTTON_HEIGHT / 2 - 5
                );
                tab.nameTxt.setVisible(true);
                currentWidth += tab.backgroundBtn.getSize().width - 2;
            } else {
                tab.backgroundBtn.loadTextureNormal(
                    NavResources.TAB_LIST[key].backgroundImg
                );
                tab.setPosition(
                    NavResources.NORMAL_BUTTON_WIDTH * 0.5 + currentWidth,
                    NavResources.NORMAL_BUTTON_HEIGHT / 2
                );
                tab.nameTxt.setVisible(false);
                currentWidth += tab.backgroundBtn.getSize().width - 4;
            }
        }.bind(this));
    },
    loadTabList: function () {
        for (let tab in NavResources.TAB_LIST) {
            let node = ccs.load(NavResources.NAV_TAB, '').node;
            this.addChild(node);
            this.extendTabProperties(tab, node);
            this.tabMap.set(tab, node);
            node.backgroundBtn.addTouchEventListener(this.onTabClick.bind(this), this);
            this.setResourceForTab(tab, node);
        }
    },
    setResourceForTab: function (tabName, tabNode) {
        cc.log(tabName)
        cc.log(tabNode.iconImg)
        if (NavResources.TAB_LIST[tabName].icon !== undefined) {
            tabNode.iconImg.loadTexture(NavResources.TAB_LIST[tabName].icon);
            cc.log(NavResources.TAB_LIST[tabName].icon)
            tabNode.getChildByName('nameTxt').setString(NavResources.TAB_LIST[tabName].text);
            tabNode.getChildByName('nameTxt').setVisible(false);
        }
    },
    extendTabProperties: function (tabName, tabNode) {
        tabNode.name = NavResources.TAB_LIST[tabName].name;
        tabNode.iconImg = tabNode.getChildByName('iconImg');
        tabNode.backgroundBtn = tabNode.getChildByName('backgroundBtn');
        tabNode.nameTxt = tabNode.getChildByName('nameTxt');
        tabNode.index = this.tabMap.size;
    }
});
