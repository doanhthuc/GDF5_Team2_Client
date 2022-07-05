const SupportTowerCard = TowerCard.extend({
    ctor: function (id, level, accumulated, energy, bulletRadius, isBattleDeck = false) {
        this._super(id, level, accumulated, energy, isBattleDeck);
        this.auraTowerBuffType = JsonReader.getTowerConfig()[this.id].auraTowerBuffType;
    },

    getCardStat: function () {

    }
});