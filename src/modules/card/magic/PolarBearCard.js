const PolarBearCard = MagicTowerCard.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this._super(id, level, accumulated, isBattleDeck);
        this.skill = null;
        this.frozenTime = JsonReader.getTargetBuffConfig()[this.bulletTargetBuffType].duration[this.rank];
    },

    getCardStat: function () {
        let stat = this._super();
        stat.frozenTime = this.frozenTime;
        return stat;
    }
});