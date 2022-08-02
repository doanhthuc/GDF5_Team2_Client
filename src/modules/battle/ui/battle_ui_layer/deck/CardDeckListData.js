const CardDeckListData = cc.Class.extend({
    ctor: function (battleDeckList) {
        this.cardDeckList = battleDeckList || [];
    },

    getNextCardId: function () {
        if (this.cardDeckList.length < 0) {
            return null;
        }
        return this.cardDeckList.shift().id;
    },

    getNextCard: function () {
        if (this.cardDeckList.length < 0) {
            return null;
        }
        return this.cardDeckList.shift();
    },

    pushUsedCardIntoDeck: function (card) {
        this.cardDeckList.push(card);
    },

    setCardDeckList: function (cardList) {
        this.cardDeckList = cardList;
    },

    getFirst4CardId: function () {
        if (this.cardDeckList.length < 4) {
            throw new Error("Card Deck is not enough");
        }
        let cardIdList = [];
        for (let i = 0; i < 4; i++) {
            cardIdList.push(this.getNextCardId().id);
        }
        return cardIdList;
    },

    getFirst4Card: function () {
        if (this.cardDeckList.length < 4) {
            throw new Error("Card Deck is not enough");
        }
        let cardList = [];
        for (let i = 0; i < 4; i++) {
            cardList.push(this.getNextCard());
        }
        return cardList;
    }
})