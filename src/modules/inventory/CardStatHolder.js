const CardStatHolder = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this.cardStatHolderNode = ccs.load(InventoryResources.CARD_STAT_HOLDER_NODE, '').node;
        this.addChild(this.cardStatHolderNode);
        this.statBackgroundImg = this.cardStatHolderNode.getChildByName('statBackgroundImg');
        this.statIconImg = this.statBackgroundImg.getChildByName('statIconImg');
        this.statNameTxt = this.statBackgroundImg.getChildByName('statNameTxt');
        this.statValueTxt = this.statBackgroundImg.getChildByName('statValueTxt');
    },

    setCardStatHolderTexture: function (cardStat) {
        this.statIconImg.setTexture(cardStat.icon);
        this.statNameTxt.setString(cardStat.name);
        this.statValueTxt.setString(cardStat.value);
    }
})