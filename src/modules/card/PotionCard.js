const PotionCard = ICard.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this._super(id, level, accumulated, isBattleDeck);
        this.idConfig = 0;
    },

    getEnergyFromJson: function () {
        return JsonReader.getPotionConfig()[this.idConfig].energy;
    },

    upgradeCardModel: function (level, accumulated) {
        this._super(level, accumulated);
    }
})