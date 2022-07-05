const BunnyOilCard = MagicTowerCard.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this._super(id, level, accumulated, isBattleDeck);
        this.skill = null;
        this.slowPercent = JsonReader.getTargetBuffConfig()['0'].effects[this.rank][0].value * -100;
    },

    getCardStat: function () {
        let stat = this._super();
        stat.slowPercent = this.slowPercent;
        return stat;
    }
});