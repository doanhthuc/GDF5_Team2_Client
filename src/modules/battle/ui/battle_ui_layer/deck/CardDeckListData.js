const CardDeckListData = cc.Class.extend({
    ctor: function (battleDeckIdList) {
        this.cardDeckIdList = battleDeckIdList || [];
    },

    getNextCardId: function () {
        if (this.cardDeckIdList.length < 0) {
            return null;
        }
        return this.cardDeckIdList.shift();
    },

    pushUsedCardIntoDeck: function (cardId) {
        this.cardDeckIdList.push(cardId);
    },

    setCardDeckIdList: function (cardIdList) {
        this.cardDeckIdList = cardIdList;
    },

    getFirst4CardId: function () {
        if (this.cardDeckIdList.length < 4) {
            throw new Error("Card Deck is not enough");
        }
        let cardIdList = [];
        for (let i = 0; i < 4; i++) {
            cardIdList.push(this.getNextCardId());
        }
        return cardIdList;
    },
})