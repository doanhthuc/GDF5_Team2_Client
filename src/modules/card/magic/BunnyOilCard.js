const BunnyOilCard = MagicTowerCard.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this._super(id, level, accumulated, isBattleDeck);
        this.skill = null;
        this.slowPercent = this.getSlowPercentFromJson(level);
    },

    getCardStat: function () {
        let stat = this._super();
        stat.slowPercent = this.slowPercent;
        return stat;
    },

    getCardStatByLevel: function (level) {
        let stat = this._super(level);
        let slowPercent = this.getSlowPercentFromJson(level);
        stat.slowPercent = this.calculateCardStatByLevel(slowPercent, level);
        return stat;
    },

    getSlowPercentFromJson: function (level) {
        let rank = this.levelToRank(level);
        return JsonReader.getTargetBuffConfig()['0'].effects[rank][0].value * -100;
    },

    upgradeCardModel: function (level, accumulated) {
        this._super(level, accumulated);
        this.slowPercent = this.getSlowPercentFromJson(level);
    }
});