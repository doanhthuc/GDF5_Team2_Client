const MainScreen = cc.Layer.extend({
    ctor: function () {
        this.DEFAULT_TAB = 'HOME_TAB';
        this.activeTab = this.DEFAULT_TAB;
        this._super();
        this.init();
    },

    tabList: ['SHOP_TAB', 'INVENTORY_TAB', 'HOME_TAB'],
    shouldSetTouch: true,

    init: function () {

        let rootNode = ccs.load(res.MAIN_SCREEN, '');
        this.addChild(rootNode.node);
        this.scene = rootNode.node;
        this.clientUIManager = clientUIManager.getInstance();

        this.mainPageView = this.scene.getChildByName('mainPageView');
        this.mainPageView.setCustomScrollThreshold(30);
        this.mainPageView.addEventListener(this.onPageViewEvent.bind(this));
        this.concurrencyHolder = this.scene.getChildByName('concurrencyHolder');
        this.nav = new bottomNav(this.scrollToIndexPage.bind(this));
        this.addChild(this.nav);

        this.header = new Header();
        this.addChild(this.header);

        this.homeLayer = new lobbyLayer();
        this.mainPageView.addWidgetToPage(this.homeLayer, NavResources.TAB_LIST.HOME_TAB.index, true);
        this.clientUIManager.registerUI(CLIENT_UI_CONST.NODE_NAME.HOME_NODE, this.homeLayer);
        this.clientUIManager.showUI(CLIENT_UI_CONST.NODE_NAME.HOME_NODE);
        // this.treasureSlotList = this.homeLayer.getChildByName('treasureHolder').getChildren();

        this.listView = this.mainPageView.getPages()[NavResources.TAB_LIST.INVENTORY_TAB.index].getChildByName('inventoryListView');
        this.listViewPanel = this.listView.getChildByName('listViewPanel');
        this.inventoryLayer = new InventoryLayer();

        this.listViewPanel.addChild(this.inventoryLayer);
        this.listView.setTouchEnabled(true);

        this.listView.setSwallowTouches(false);
        this.listViewPanel.setSwallowTouches(false);

        // this.listViewPanel.setSizeHeight(this.inventoryLayer.heightNode);
        // this.listViewPanel.addEventListener(this.onListViewEvent.bind(this), this)

        this.shopLayer = new ShopLayer();
        this.mainPageView.addWidgetToPage(this.shopLayer, NavResources.TAB_LIST.SHOP_TAB.index, true);


        this.scrollToDefaultPage();
        this.initPopups();

        this.initListViewEventListener();
    },

    scrollToDefaultPage: function () {
        this.mainPageView.scrollToPage(NavResources.TAB_LIST[this.DEFAULT_TAB].index);
    },

    initPopups: function () {
        this.treasurePopupNode = new TreasurePopup();
        this.buyCardPopupNode = new BuyCardPopup();
        this.buyGoldPopupNode = new BuyGoldPopup();

        this.addPopup(this.treasurePopupNode);
        this.addPopup(this.buyCardPopupNode);
        this.addPopup(this.buyGoldPopupNode);
    },

    addPopup: function (popupNode) {
        this.clientUIManager.registerUI(popupNode.name, popupNode);
        popupNode.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(popupNode, CLIENT_UI_CONST.Z_ORDER.POP_UP);
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
            if(this.nav.prevActiveTab !== this.activeTab) this.nav.setPositionForTab();
        }
    },

    initListViewEventListener: function () {
        const listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                this.touchPos = touch.getLocation();
                this.shouldSetTouchPos = true;
                return true;
            }.bind(this),
            onTouchMoved: function (touch, event) {
                if (this.shouldSetTouchPos && Math.abs(touch.getLocation().x - this.touchPos.x) > InventoryResources.HORIZONTAL_SCROLL_THRESHOLD) {
                    this.listView.setTouchEnabled(false);
                    this.shouldSetTouchPos = false;
                }
                if (this.shouldSetTouchPos && Math.abs(touch.getLocation().y - this.touchPos.y) > InventoryResources.VERTICAL_SCROLL_THRESHOLD) {
                    this.listView.setTouchEnabled(true);
                    this.shouldSetTouchPos = false;
                }
            }.bind(this),
            onTouchEnded: function (touch, event) {
                this.shouldSetTouchPos = true;
            }.bind(this)
        });

        cc.eventManager.addListener(listener, this.inventoryLayer);
    }


});