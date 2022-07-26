const CardDeckListData = cc.Class.extend({
    ctor: function (battleDeckIdList) {
        this.cardDeckIdList = battleDeckIdList || [];
        this.curIndex = 0;
    },

    getNextCardId: function () {
        let cardId = this.cardDeckIdList[this.curIndex];
        this.curIndex++;
        this.curIndex = this.curIndex % this.cardDeckIdList.length;
        return cardId;
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