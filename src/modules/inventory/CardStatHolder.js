const CardStatHolder = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this.cardStatHolderNode = ccs.load(InventoryResources.CARD_STAT_HOLDER_NODE, '').node;
        this.addChild(this.cardStatHolderNode);
        this.statBackgroundImg = this.cardStatHolderNode.getChildByName('statBackgroundImg');
        this.statIconImg = this.cardStatHolderNode.getChildByName('statIconImg');
        this.statNameTxt = this.cardStatHolderNode.getChildByName('statNameTxt');
        this.statValueTxt = this.cardStatHolderNode.getChildByName('statValueTxt');
    },

    setCardStatHolderTexture: function (cardStat, level, id) {
        this.statIconImg.setTexture(cardStat.icon);
        this.statNameTxt.setString(cardStat.name);
        this.statValueTxt.setString(cardStat.value);
    }
})