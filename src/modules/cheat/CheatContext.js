const CheatContext = cc.Class.extend({
    ctor: function () {

    },

    cheatGold: function (gold) {
        testnetwork.connector.sendCheatGold(gold);
    },

    cheatGem: function (gem) {
        testnetwork.connector.sendCheatGem(gem);
    },

    cheatTrophy: function (trophy) {
        testnetwork.connector.sendCheatTrophy(trophy);
    },

    cheatCard: function (cardId, cardLevel, cardAccumulated) {
        testnetwork.connector.sendCheatCard(cardId, cardLevel, cardAccumulated);
    }
})