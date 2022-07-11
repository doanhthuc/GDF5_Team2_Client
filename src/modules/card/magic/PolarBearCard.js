const PolarBearCard = MagicTowerCard.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this._super(id, level, accumulated, isBattleDeck);
        this.skill = null;
        this.frozenTime = this.getFrozenTimeFromJson();
    },

    getCardStat: function () {
        let stat = this._super();
        stat.frozenTime = this.frozenTime;
        return stat;
    },

    getFrozenTimeFromJson: function () {
        return JsonReader.getTargetBuffConfig()[this.bulletTargetBuffType].duration[this.rank];
    },

    upgradeCardModel: function (level, accumulated) {
        this._super(level, accumulated);
        this.frozenTime = this.getFrozenTimeFromJson();
    }
});