let OpponentAction = cc.Class.extend({
    ctor: function () {
        this.opponentMapNode = BattleManager.getInstance().getBattleLayer().getOpponentMapNode();
    },

    putCardAt: function (pixelPos, towerType) {
        cc.log('[OpponentAction line 8] putCardAt: '  + JSON.stringify(pixelPos) + '  towerId: ' + towerType);
        BattleManager.getInstance().getBattleLayer().putCardAt(towerType, pixelPos, GameConfig.OPPONENT);
    },
});

let _instanceBuilder = (function () {
    let _instance = null;
    return {
        getInstance: function () {
            if (_instance === null) {
                _instance = new OpponentAction();
            }
            return _instance;
        },
        resetInstance: function () {
            _instance = null;
        }
    }
})();
OpponentAction.getInstance = _instanceBuilder.getInstance;
OpponentAction.resetInstance = _instanceBuilder.resetInstance;