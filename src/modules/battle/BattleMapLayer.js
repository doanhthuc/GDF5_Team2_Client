let BattleMapLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        let rootNode = ccs.load(BattleResource.MAP_NODE, "").node;
        this.addChild(rootNode);

        rootNode.attr({
            x: cc.winSize.width / 2,
            y: (cc.winSize.height - BattleResource.DECK_CARD_HEIGH) / 2 + BattleResource.DECK_CARD_HEIGH
        });

        this.mapMatrix = FindPathUtil.create2DMatrix(GameConfig.MAP_HEIGH, GameConfig.MAP_WIDTH, 0);
        this.path = Utils.tileArray2PixelArray([{x: 0, y: GameConfig.MAP_HEIGH-1}, {x: 0, y: 2},
            {x: 3, y: 2}, {x: 3, y: 1}, {x: 6, y: 0}]);
    }
});