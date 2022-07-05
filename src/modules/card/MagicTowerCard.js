const MagicTowerCard = AttackTowerCard.extend({
    ctor: function (id, level, accumulated, energy, bulletRadius, isBattleDeck = false) {
        this._super(id, level, accumulated, energy, bulletRadius, isBattleDeck);
        this.skill = null;
        this.bulletTargetBuffType = JsonReader.getTowerConfig()[this.id].bulletTargetBuffType;
    }
})