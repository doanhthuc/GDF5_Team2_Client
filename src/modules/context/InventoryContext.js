const InventoryContext = cc.Class.extend({
    ctor: function () {
        this.battleDeckList = [];
        this.cardCollectionList = [];
        // this.init();
    },

    setBattleDeckList: function (battleDeckList) {
        this.battleDeckList = battleDeckList;
    },

    setCardCollectionList: function (cardCollectionList) {
        this.cardCollectionList = cardCollectionList;
    }

});