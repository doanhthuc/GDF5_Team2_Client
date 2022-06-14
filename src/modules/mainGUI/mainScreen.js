const MainScreen = cc.Layer.extend({
    ctor: function () {
        this.DEFAULT_TAB = 'HOME_TAB';
        this.activeTab = this.DEFAULT_TAB;
        this._super();
        this.init();
    },

    tabList: ['INVENTORY_TAB', 'SHOP_TAB', 'HOME_TAB'],

    init: function () {

        let rootNode = ccs.load(res.MAIN_SCREEN, '');
        this.addChild(rootNode.node);

        this.scene = rootNode.node;
        this.mainPageView = this.scene.getChildByName('mainPageView');
        this.mainPageView.addEventListener(this.onPageViewEvent.bind(this));
        this.concurrencyHolder = this.scene.getChildByName('concurrencyHolder');

        this.nav = new bottomNav(this.scrollToIndexPage.bind(this));
        this.addChild(this.nav);


    },

    scrollToIndexPage: function (index) {
        this.mainPageView.scrollToPage(index);
    },

    setNavActiveTab: function (index) {
        this.activeTab = this.tabList[index];
        this.nav.activeTab = this.activeTab;
    },

    onPageViewEvent: function (sender, eventType) {
        if (eventType === ccui.PageView.EVENT_TURNING) {
            this.setNavActiveTab(sender.getCurPageIndex());
            this.nav.setPositionForTab();
        }
    }

});