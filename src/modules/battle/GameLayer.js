let GameLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.spriteFrameCache.load("texture/**");
        let rootNode = ccs.load("ui/battle/BattleUILayer.json");
        this.addChild(rootNode.node);
    }
});