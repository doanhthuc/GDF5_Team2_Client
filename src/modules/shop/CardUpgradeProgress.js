let CardUpgradeProgress = cc.Node.extend({
    ctor: function (val, maxVal) {
        this._super();
        this._maxVal = maxVal;
        this.setVal(val);

        let rootNode = ccs.load(ShopResources.CARD_UPGRADE_PROGRESS, "");
        this.progressBar = rootNode.getChildByName("progress");
        this.valueTxt = rootNode.getChildByName("valueTxt");
        this.addChild(rootNode);
    },

    setVal: function (val) {
        if (val > this._maxVal) {
            throw new Error("Val must be less than max_val");
        }
        this._val = val;
        this.valueTxt.setString(this._val + "/" + this._maxVal);
    },

    setMaxVal: function (maxVal) {
        this._maxVal = maxVal;
        this.setVal(this._val);
    }
})