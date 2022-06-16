const ShopSection = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
    },

   init: function () {
        this.shopSectionNode = ccs.load(ShopResources.SHOP_SECTION_NODE, '').node;
        this.addChild(this.shopSectionNode);
        this.backgroundImg = this.shopSectionNode.getChildByName('shopPanelBackgroundImg');
   },


});