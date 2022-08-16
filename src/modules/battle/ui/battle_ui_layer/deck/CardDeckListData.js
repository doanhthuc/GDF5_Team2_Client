const CardDeckListData = cc.Class.extend({
    ctor: function (cardDeckList) {
        this.cardDeckList = cardDeckList || [];
    },

    setCardDeckList: function (cardDeckList) {
        this.cardDeckList = cardDeckList;
    },

    getNextCardId: function () {
        if (this.cardDeckList.length < 0) {
            return null;
        }
        return this.cardDeckList.shift().id;
    },

    pushUsedCardIntoDeck: function (card) {
        this.cardDeckList.push(card);
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
            // cardList.push(this.getNextCard());
            cardList.push(this.cardDeckList[i]);
        }
        return cardList;
    },

    onCardUsed: function (card) {
        const index = this.cardDeckList.findIndex(item => item.id === card.id);
        if (index !== -1) {
            this.cardDeckList.splice(index, 1);
        }
        this.pushUsedCardIntoDeck(card);
        cc.log("[CardDeckListData] onCardUsed: ", JSON.stringify(this.cardDeckList));
    },

    getNextCard: function () {
        if (this.cardDeckList.length < 1) {
            throw new Error("Card Deck is not enough");
        }
        return this.cardDeckList[4];
    },
})