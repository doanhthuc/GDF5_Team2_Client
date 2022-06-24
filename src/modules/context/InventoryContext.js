const InventoryContext = cc.Class.extend({
    ctor: function () {
        this.battleDeckIdList = [];
        this.battleDeckList = [];
        this.cardCollectionList = [];
        // this.init();
    },

    setBattleDeckIdList: function (battleDeckIdList) {
        this.battleDeckIdList = battleDeckIdList;
        // this.battleDeckIdList.forEach(function (battleDeck) {
        //     cc.log('battleDeck: ' + JSON.stringify(battleDeck));
        // });
        this.mapIdListToBattleDeckList();
    },

    mapIdListToBattleDeckList: function () {
        this.battleDeckIdList.forEach((id) => {
            //TODO: add spell add
            for (let i = 0; i < this.battleDeckIdList.length - 2; i++) {
                if (this.cardCollectionList[i].cardType === id) {
                    this.battleDeckList.push(this.cardCollectionList[i]);
                }
            }
        });

        /*this.battleDeckList.forEach(function (battleDeck) {
            cc.log('battleDeck: ' + JSON.stringify(battleDeck));
        });*/
    },

    setCardCollectionList: function (cardCollectionList) {
        this.cardCollectionList = cardCollectionList;
        this.cardCollectionList.forEach(function (cardCollection) {
            cc.log('cardCollection: ' + JSON.stringify(cardCollection));
        });
    },

    upgradeCard: function (cardId) {
        cc.log('InventoryContext.js line 40 ~~~~~ upgradeCard: ' + cardId);
    }

});