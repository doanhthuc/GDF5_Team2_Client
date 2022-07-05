const BunnyOilCard = MagicTowerCard.extend({
    ctor: function (id, level, accumulated, energy, bulletRadius, isBattleDeck = false) {
        this._super(id, level, accumulated, energy, bulletRadius, isBattleDeck);
        this.skill = null;
        this.slowPercent = JsonReader.getTargetBuffConfig()['0'].effects[this.rank][0].value * -100;
    }
});