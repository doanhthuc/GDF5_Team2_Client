const MainScreen = cc.Layer.extend({
    _className: "MainScreen",
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
        this.background = this.scene.getChildByName('background');
        this.background.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        UiUtil.setImageFullScreen(this.background);
        this.clientUIManager = ClientUIManager.getInstance();

        this.mainPageView = this.scene.getChildByName('mainPageView');
        this.mainPageView.setCustomScrollThreshold(30);
        this.mainPageView.addEventListener(this.onPageViewEvent.bind(this));
        this.concurrencyHolder = this.scene.getChildByName('concurrencyHolder');
        this.nav = new bottomNav(this.scrollToIndexPage.bind(this));
        this.addChild(this.nav);

        this.header = new Header();
        this.addChild(this.header);
        this.clientUIManager.registerUI(CLIENT_UI_CONST.NODE_NAME.HEADER_NODE, this.header);
        this.clientUIManager.showUI(CLIENT_UI_CONST.NODE_NAME.HEADER_NODE);
        // let headerHeight = this.header.getNodeHeight();

        this.homeLayer = new lobbyLayer(this.nav._height);
        this.mainPageView.addWidgetToPage(this.homeLayer, NavResources.TAB_LIST.HOME_TAB.index, true);
        this.clientUIManager.registerUI(CLIENT_UI_CONST.NODE_NAME.HOME_NODE, this.homeLayer);
        this.clientUIManager.showUI(CLIENT_UI_CONST.NODE_NAME.HOME_NODE);
        let headerHeight = this.header.headerBackgroundImg.getSize().height;
        this.homeLayer.setPositionForPlayerInfo(headerHeight);
        // this.treasureSlotList = this.homeLayer.getChildByName('treasureHolder').getChildren();

        this.listView = this.mainPageView.getPages()[NavResources.TAB_LIST.INVENTORY_TAB.index].getChildByName('inventoryListView');
        this.listViewPanel = this.listView.getChildByName('listViewPanel');

        this.inventoryLayer = new InventoryLayer(headerHeight);
        this.clientUIManager.registerUI(CLIENT_UI_CONST.NODE_NAME.INVENTORY_NODE, this.inventoryLayer);
        this.clientUIManager.showUI(CLIENT_UI_CONST.NODE_NAME.INVENTORY_NODE);

        this.listViewPanel.addChild(this.inventoryLayer);
        this.listView.setTouchEnabled(true);

        this.listView.setSwallowTouches(false);
        this.listViewPanel.setSwallowTouches(false);

        if (this.inventoryLayer.heightNode > cc.winSize.height) {
            this.listViewPanel.height = this.inventoryLayer.heightNode;
        } else {
            this.listViewPanel.height = cc.winSize.height;
        }
        this.listView.height = cc.winSize.height;
        this.listView.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        this.shopLayer = new ShopLayer(headerHeight);
        this.mainPageView.addWidgetToPage(this.shopLayer, NavResources.TAB_LIST.SHOP_TAB.index, true);
        this.clientUIManager.registerUI(CLIENT_UI_CONST.NODE_NAME.SHOP_NODE, this.shopLayer);
        this.clientUIManager.showUI(CLIENT_UI_CONST.NODE_NAME.SHOP_NODE);

        this.scrollToDefaultPage();
        this.initPopups();

        this.initListViewEventListener();
    },

    onEnter: function () {
        this._super();
        // this.initTouchEvent();
        PopupUIManager.getInstance().setAllPopupVisible(false);
    },

    scrollToDefaultPage: function () {
        this.mainPageView.scrollToPage(NavResources.TAB_LIST[this.DEFAULT_TAB].index);
    },

    initPopups: function () {
        this.treasurePopupNode = new TreasurePopup();
        this.buyCardPopupNode = new BuyCardPopup();
        this.buyGoldPopupNode = new BuyGoldPopup();
        this.cardDetailPopupNode = new CardDetailPopup();
        this.cheatPopupNode = new CheatPopup();
        this.openTreasurePopupNode = new OpenTreasurePopup();
        this.fullTreasureSlotPopup = new FullTreasureSlotPopup();
        this.notEnoughUpgradeResPopup = new NotEnoughUpgradeResPopup();
        this.upgradeSuccessPopup = new UpgradeSuccessPopup();
        this.cardSkillPopupNode = new SkillPopup();
        this.notifyNode = new NotifyNode();

        this.addPopup(this.treasurePopupNode);
        this.addPopup(this.buyCardPopupNode);
        this.addPopup(this.buyGoldPopupNode);
        this.addPopup(this.cardDetailPopupNode);
        this.addPopup(this.cheatPopupNode);
        this.addPopup(this.openTreasurePopupNode);
        this.addPopup(this.fullTreasureSlotPopup);
        this.addPopup(this.notEnoughUpgradeResPopup);
        this.addPopup(this.upgradeSuccessPopup);
        this.addPopup(this.cardSkillPopupNode);
        this.addPopup(this.notifyNode);
    },

    addPopup: function (popupNode) {
        popupNode.retain();
        PopupUIManager.getInstance().registerUI(popupNode.name, popupNode);
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
            if (this.nav.prevActiveTab !== this.activeTab) this.nav.setPositionForTab();
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
                    if (this.activeTab === NavResources.TAB_LIST.INVENTORY_TAB.name) this.mainPageView.setTouchEnabled(false);
                    this.shouldSetTouchPos = false;
                }
            }.bind(this),
            onTouchEnded: function (touch, event) {
                this.shouldSetTouchPos = true;
                this.mainPageView.setTouchEnabled(true);
            }.bind(this)
        });

        cc.eventManager.addListener(listener, this.inventoryLayer);
    }


});