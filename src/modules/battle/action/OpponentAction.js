let OpponentAction = cc.Class.extend({
    ctor: function () {
        this._super();
        this.opponentMapNode = GameConfig.gameLayer.getOpponentMapNode();
    },

    putCardAt: function (pos, towerType) {

    },
})