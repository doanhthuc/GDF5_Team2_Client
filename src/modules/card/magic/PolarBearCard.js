const PolarBearCard = MagicTowerCard.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this._super(id, level, accumulated, isBattleDeck);
        this.skill = null;
        this.frozenTime = this.getFrozenTimeFromJson(level);
    },

    getCardStat: function () {
        let stat = this._super();
        stat.frozenTime = this.frozenTime;
        return stat;
    },

    getCardStatByLevel: function (level) {
        let stat = this._super();
        let frozenTime = this.getFrozenTimeFromJson(level);
        stat.frozenTime = this.calculateCardStatByLevel(frozenTime, level);
        return stat;
    },

    getFrozenTimeFromJson: function (level) {
        let rank = this.levelToRank(level);
        return JsonReader.getTargetBuffConfig()[this.bulletTargetBuffType].duration[rank];
    },

    upgradeCardModel: function (level, accumulated) {
        this._super(level, accumulated);
        this.frozenTime = this.getFrozenTimeFromJson(level);
    }
});