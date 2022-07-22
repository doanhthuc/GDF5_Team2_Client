const BuyGoldAnimationNode = cc.Node.extend({
    ctor: function (headerHeight) {
        this.headerHeight = headerHeight;
        this._super();
        this.init();
    },

    init: function () {
        this.coinSpriteList = [];
        for (let i = 0; i < 6; i++) {
            let coinSprite = new cc.Sprite(TreasureSlotResources.GOLD_ICON_SMALL);
            this.addChild(coinSprite);
            this.coinSpriteList.push(coinSprite);
        }
    },

    setCoinInListStartPosition: function () {
        let startX = cc.winSize.width / 2;
        let startY = 820;
        let coinSprite = this.coinSpriteList[0];
        coinSprite.setPosition(startX, startY);
    }
});
