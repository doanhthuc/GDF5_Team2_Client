let BattleDeckLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        this.cardDeckNode = new CardDeckNode();
        this.cardDeckNode.x = this.width / 2;
        this.cardDeckNode.y = this.cardDeckNode.height / 2;
        this.addChild(this.cardDeckNode);
    },
});