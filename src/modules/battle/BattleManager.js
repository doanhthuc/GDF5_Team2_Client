let BattleManager = cc.Class.extend({
    ctor: function () {
        this.battleData = null;
        this.battleLayer = null;
    },

    registerBattleData: function (battleData, override=false) {
        if (override === false && this.battleData) {
            throw new Error("Battle Data exists. Can't re-register")
        }
        this.battleData = battleData;
    },

    getBattleData: function () {
        if (!this.battleData) {
            throw new Error("Battle Data doesn't exist");
        }
        return this.battleData;
    },

    registerBattleLayer: function (layer) {
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