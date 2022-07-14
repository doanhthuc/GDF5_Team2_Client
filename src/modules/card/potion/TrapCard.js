const TrapCard = PotionCard.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this._super(id, level, accumulated, isBattleDeck);
        this.energy = this.getEnergyFromJson();
    },

    getCardStat: function () {
        return this._super();
    },

    getEnergyFromJson: function () {
        return this.energy = CARD_TYPE.SPELL[9].energy;
    },

    upgradeCardModel: function (level, accumulated) {
        this._super(level, accumulated);
    }
});