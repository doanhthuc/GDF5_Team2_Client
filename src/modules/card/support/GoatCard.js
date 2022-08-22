const GoatCard = SupportTowerCard.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this._super(id, level, accumulated, isBattleDeck);
        this.damageUp = this.getDamageUpFromJson(level);
    },

    getCardStat: function () {
        let stat = this._super();
        stat.damageUp = this.damageUp;
        return stat;
    },

    getCardStatByLevel: function (level) {
        let stat = this._super(level);
        stat.damageUp = this.getDamageUpFromJson(level);
        return stat;
    },

    getDamageUpFromJson: function (level) {
        let rank = this.levelToRank(level);
        return JsonReader.getTowerBuffConfig()[this.auraTowerBuffType].effects[rank][0].value;
    },

    upgradeCardModel: function (level, accumulated) {
        this._super(level, accumulated);
        this.damageUp = this.getDamageUpFromJson(level);
    }
})