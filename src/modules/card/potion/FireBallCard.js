const FireBallCard = PotionCard.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this._super(id, level, accumulated, isBattleDeck);
        this.radius = JsonReader.getPotionConfig()[this.idConfig].radius;
        this.damage = JsonReader.getPotionConfig()[this.idConfig].adjust.player.value;
        this.idConfig = 0;
        this.energy = this.getEnergyFromJson();
    },

    getCardStat: function () {
        let stat = this._super();
        stat.radius = this.radius;
        stat.damage = this.damage;
        return stat;
    },

    getCardStatByLevel: function (level) {
        let stat = this._super(level);
        stat.radius = this.radius;
        stat.damage = this.damage;
        return stat;
    },

    upgradeCardModel: function (level, accumulated) {
        this._super(level, accumulated);
        this.radius = JsonReader.getPotionConfig()[this.idConfig].radius;
        this.damage = JsonReader.getPotionConfig()[this.idConfig].adjust.player.value;
    }
});