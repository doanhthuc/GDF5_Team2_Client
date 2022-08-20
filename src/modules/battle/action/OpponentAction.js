let OpponentAction = cc.Class.extend({
    ctor: function () {
        this.opponentMapNode = BattleManager.getInstance().getBattleLayer().getOpponentMapNode();
    },

    // putCardAt: function (pixelPos, towerType) {
    //     cc.log('[OpponentAction line 8] putCardAt: '  + JSON.stringify(pixelPos) + '  towerId: ' + towerType);
    //     BattleManager.getInstance().getBattleLayer().putCardAt(towerType, pixelPos, GameConfig.USER2());
    // },

    buildTower: function (towerId, tilePos) {
        cc.log('[OpponentAction line 12] buildTower: ' + JSON.stringify(tilePos) + '  towerId: ' + towerId);
        BattleManager.getInstance().getBattleLayer().buildTower(towerId, tilePos, GameConfig.USER2());
    },

    dropSpell: function (spellId, pixelPos) {
        BattleManager.getInstance().getBattleLayer().dropSpell(spellId, pixelPos, GameConfig.USER2());
    },

    putTrap: function (tilePos) {
        EntityFactory.createTrap(tilePos, GameConfig.USER2());
    }
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