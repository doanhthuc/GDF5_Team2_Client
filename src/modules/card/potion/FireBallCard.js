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
    }
});