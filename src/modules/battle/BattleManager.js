let BattleManager = cc.Class.extend({
    ctor: function () {

    },

    setBattleLayer: function (layer) {
        this.battleLayer = layer;
    },

    getBattleLayer: function () {
        return this.battleLayer;
    },
});

let _instanceBuilder = (function () {
    let _instance = null;
    return {
        getInstance: function () {
            if (_instance === null) {
                _instance = new BattleManager();
            }
            return _instance;
        },
        resetInstance: function () {
            _instance = null;
        }
    }
})();
BattleManager.getInstance = _instanceBuilder.getInstance;
BattleManager.resetInstance = _instanceBuilder.resetInstance;