let BattleMapLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        let rootNode = ccs.load(BattleResource.MAP_LAYER, "").node;
        this.addChild(rootNode);
    }
});