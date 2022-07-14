const GoatCard = SupportTowerCard.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this._super(id, level, accumulated, isBattleDeck);
        this.damageUp = this.getDamageUpFromJson();
    },

    getCardStat: function () {
        let stat = this._super();
        stat.damageUp = this.damageUp;
        return stat;
    },

    getDamageUpFromJson: function () {
        return JsonReader.getTowerBuffConfig()[this.auraTowerBuffType].effects[this.rank][0].value;
    },

    upgradeCardModel: function (level, accumulated) {
        this._super(level, accumulated);
        this.damageUp = this.getDamageUpFromJson();
    }
})