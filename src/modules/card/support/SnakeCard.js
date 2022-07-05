const SnakeCard = SupportTowerCard.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this._super(id, level, accumulated, isBattleDeck);
        this.attackSpeedUp = JsonReader.getTowerBuffConfig()[this.auraTowerBuffType].effects[this.rank][0].value;
    },

    getCardStat: function () {
        let stat = this._super();
        stat.attackSpeedUp = this.attackSpeedUp;
        return stat;
    }
});