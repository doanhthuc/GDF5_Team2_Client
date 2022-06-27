const TreasureContext = cc.Class.extend({
    ctor: function () {
        this.treaSureList = [];
    },

    setTreasureList: function (treasureList) {
        this.treaSureList = treasureList.lobbyChest;
        cc.log(JSON.stringify(this.treaSureList.lobbyChest));
        this.onTreasureListUpdated();
    },

    onTreasureListUpdated: function () {
        ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.HOME_NODE).setTreasureSlotNodeList(this.treaSureList);
    },

    getTreasureById: function (id) {
        if (id < this.treaSureList.length) {
            return this.treaSureList[i];
        }
        return null;
    }
});