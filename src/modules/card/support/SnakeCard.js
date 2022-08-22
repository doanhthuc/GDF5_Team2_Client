const SnakeCard = SupportTowerCard.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this._super(id, level, accumulated, isBattleDeck);
        this.attackSpeedUp = this.getAttackSpeedUpFromJson();
    },

    getCardStat: function () {
        let stat = this._super();
        stat.attackSpeedUp = this.attackSpeedUp;
        return stat;
    },

    getCardStatByLevel: function (level) {
        let stat = this._super(level);
        stat.attackSpeedUp = this.getAttackSpeedUpFromJson(level);
        return stat;
    },

    getAttackSpeedUpFromJson: function (level) {
        let rank = this.levelToRank(level);
        return JsonReader.getTowerBuffConfig()[this.auraTowerBuffType].effects[rank][0].value;
    },

    upgradeCardModel: function (level, accumulated) {
        this._super(level, accumulated);
        this.attackSpeedUp = this.getAttackSpeedUpFromJson(level);
    }
});