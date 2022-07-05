const MagicTowerCard = AttackTowerCard.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this._super(id, level, accumulated, isBattleDeck);
        this.skill = null;
        this.bulletTargetBuffType = JsonReader.getTowerConfig()[this.id].bulletTargetBuffType;
    },


})