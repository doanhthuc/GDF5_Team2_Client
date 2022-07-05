const PolarBearCard = MagicTowerCard.extend({
    ctor: function (id, level, accumulated, energy, bulletRadius, isBattleDeck = false) {
        this._super(id, level, accumulated, energy, bulletRadius, isBattleDeck);
        this.skill = null;
        this.frozenTime = JsonReader.getTargetBuffConfig()[this.bulletTargetBuffType].duration[this.rank];
    }
});