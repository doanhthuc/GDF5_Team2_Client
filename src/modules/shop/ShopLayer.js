const ShopLayer = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    shopSectionList: [],

    init: function () {
        let startX = cc.winSize.width / 2;
        let startY = 820;
        for (let i = 0; i < 2; i++) {
            let shopSection = new ShopSection(i === 0 ? "treasure" : "gold");
            this.addChild(shopSection);
            this.shopSectionList.push(shopSection);
            shopSection.setPosition(startX, startY - i * (ShopResources.SHOP_SECTION_NODE_HEIGHT + ShopResources.SHOP_SECTION_MARGIN_BOTTOM));
        }
    },


})