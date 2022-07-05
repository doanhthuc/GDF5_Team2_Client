const GoatCard = SupportTowerCard.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this._super(id, level, accumulated, isBattleDeck);
        this.damageUp = JsonReader.getTowerBuffConfig()[this.auraTowerBuffType].effects[this.rank][0].value;
    },

    getCardStat: function () {
        let stat = this._super();
        stat.damageUp = this.damageUp;
        return stat;
    }
})