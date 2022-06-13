const MainScreen = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    DEFAULT_TAB: 'homeTab',
    activeTab: this.DEFAULT_TAB,

    init: function () {

        let rootNode = ccs.load(res.MAIN_SCREEN, '');
        this.addChild(rootNode.node);

        this.scene = rootNode.node;
        this.tabList = this.scene.getChildByName('bottomNav');
        cc.log(JSON.stringify(this.tabList.getChildren()[0].getChildByName('nameTxt')));
        this.tabMap = new Map(
            this.scene.getChildByName('bottomNav').getChildren().map(function (tab) {
                cc.log(tab);
                return [tab.getName(), tab];
            })
        );
        cc.log(this.tabMap);
        cc.log(JSON.stringify(this.tabMap.get('homeTab')));
        this.homeTab = this.tabMap.get('homeTab');
        this.homeTab.getChildByName('backgroundBtn').loadTextures(res.ACTIVE_TAB_BG, res.ACTIVE_TAB_BG);
        cc.log(this.homeTab.parent.getName());
        cc.log(res.BOTTOM_NAV)
        let nav = new bottomNav();
        this.addChild(nav);
        // nav.setPosition(this.scene.width / 2, 55);

        // this.tabMap.get(this.DEFAULT_TAB).getChildByName('backgroundImg').setContentSize(this.activeTabSprite.width, this.activeTabSprite.height);
        // cc.log(this.activeTabSprite.width + "  " + this.activeTabSprite.height)
        // cc.log(this.activeTabSprite.getContentSize().width + "  " + this.activeTabSprite.getContentSize().height)
        // this.tabMap.get(this.DEFAULT_TAB).getChildByName('backgroundImg').loadTexture(res.ACTIVE_TAB_BG);

        // this.tabMap.get('homeTab').getChildren().forEach(function (child) {
        //     cc.log(child.getName());
        // })


    }


});