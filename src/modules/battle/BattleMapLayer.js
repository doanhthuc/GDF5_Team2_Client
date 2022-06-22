let BattleMapLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        let rootNode = ccs.load(BattleResource.MAP_LAYER, "").node;
        this.addChild(rootNode);

        this.mapMatrix = FindPathUtil.create2DMatrix(GameConfig.MAP_HEIGH, GameConfig.MAP_WIDTH, 0);
        this.path = Utils.tileArray2PixelArray([{x: 0, y: GameConfig.MAP_HEIGH-1}, {x: 0, y: 2},
            {x: 3, y: 2}, {x: 3, y: 1}, {x: 6, y: 0}]);
    }
});