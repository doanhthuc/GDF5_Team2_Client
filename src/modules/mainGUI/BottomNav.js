const bottomNav = cc.Node.extend({
    ctor: function (handleScrollPageCallback) {
        this._super();
        this.handleScrollPageCallback = handleScrollPageCallback;
        this.init();
    },

    init: function () {
        this.DEFAULT_TAB = 'HOME_TAB';
        this.activeTab = this.DEFAULT_TAB;
        this.prevActiveTab = this.DEFAULT_TAB;
        this.tabMap = new Map();
        this.loadTabList();
        this.setPositionForTab();
        this.tabMap.get(this.activeTab).iconImg.runAction(cc.MoveBy.create(0.1, cc.p(0, 20)));
        this._height = this.tabMap.get(this.activeTab).backgroundBtn.height;
    },


    onTabClick: function (sender, type) {
        if (this.isTabRunningAnimation())
            return;
        if (type === ccui.Widget.TOUCH_ENDED) {

            this.activeTab = sender.parent.name;
            if (this.activeTab !== this.prevActiveTab) {
                this.tabMap.get(this.activeTab).isTabRunningAnimation = true;
                this.setPositionForTab();
                this.handleScrollPageCallback(sender.parent.index);
            }
        }
    },
    setPositionForTab: function () {
        if (this.isTabRunningAnimation()) return;
        let moveIconDown = cc.MoveBy.create(0.1, cc.p(0, -20));
        this.tabMap.get(this.prevActiveTab).iconImg.runAction(moveIconDown);
        let currentWidth = 0;
        this.tabMap.forEach(function (tab, key) {
            if (key === this.activeTab) {
                tab.backgroundBtn.loadTextures(
                    NavResources.ACTIVE_TAB_BG,
                    NavResources.ACTIVE_TAB_BG
                );
                tab.backgroundBtn.width = NavResources.NORMAL_BUTTON_WIDTH;
                tab.setPosition(
                    NavResources.ACTIVE_BUTTON_WIDTH * 0.5 + currentWidth,
                    NavResources.NORMAL_BUTTON_HEIGHT / 2 - 5
                );
                tab.nameTxt.setVisible(true);
                currentWidth += NavResources.ACTIVE_BUTTON_WIDTH - 2;

                this.prevActiveTab = this.activeTab;

                this.schedule(this.changeWidth);

                let moveIcon = cc.MoveBy.create(0.1, cc.p(0, 20));
                tab.iconImg.runAction(moveIcon);
            } else {
                tab.backgroundBtn.loadTextures(
                    NavResources.TAB_LIST[key].backgroundImg,
                    NavResources.TAB_LIST[key].backgroundImg
                );
                tab.setPosition(
                    NavResources.NORMAL_BUTTON_WIDTH * 0.5 + currentWidth,
                    NavResources.NORMAL_BUTTON_HEIGHT / 2
                );
                tab.nameTxt.setVisible(false);
                currentWidth += NavResources.NORMAL_BUTTON_WIDTH - 4;
            }
        }.bind(this));
    },
    loadTabList: function () {
        for (let tab in NavResources.TAB_LIST) {
            let node = ccs.load(NavResources.NAV_TAB, '').node;
            this.addChild(node);
            this.extendTabProperties(tab, node);
            this.tabMap.set(tab, node);
            if (NavResources.TAB_LIST[tab].icon !== undefined) {
                node.backgroundBtn.addTouchEventListener(this.onTabClick.bind(this), this);
            }
            this.setResourceForTab(tab, node);
        }
    },
    setResourceForTab: function (tabName, tabNode) {
        if (NavResources.TAB_LIST[tabName].icon !== undefined) {
            tabNode.iconImg.loadTexture(NavResources.TAB_LIST[tabName].icon);
            tabNode.getChildByName('nameTxt').setString(NavResources.TAB_LIST[tabName].text);
            tabNode.getChildByName('nameTxt').setVisible(false);
        } else  {
            tabNode.iconImg.setVisible(false);
            tabNode.getChildByName('nameTxt').setVisible(false);
        }
    },
    extendTabProperties: function (tabName, tabNode) {
        tabNode.name = NavResources.TAB_LIST[tabName].name;
        tabNode.setName(NavResources.TAB_LIST[tabName].name);
        tabNode.iconImg = tabNode.getChildByName('iconImg');
        tabNode.backgroundBtn = tabNode.getChildByName('backgroundBtn');
        tabNode.nameTxt = tabNode.getChildByName('nameTxt');
        tabNode.index = this.tabMap.size;
        tabNode.isTabRunningAnimation = false;
    },

    isTabRunningAnimation: function () {
        this.tabMap.forEach(function (tab, key) {
            if (tab.isTabRunningAnimation)
                return true;
        });
        return false;
    },

    changeWidth: function (dt) {
        let activeNav = this.tabMap.get(this.activeTab)
        activeNav.backgroundBtn.width += 500 * dt;

        if (activeNav.backgroundBtn.width >= NavResources.ACTIVE_BUTTON_WIDTH) {
            activeNav.backgroundBtn.width = NavResources.ACTIVE_BUTTON_WIDTH;
            activeNav.isTabRunningAnimation = false;
            this.unschedule(this.changeWidth);
        }
    },

});
