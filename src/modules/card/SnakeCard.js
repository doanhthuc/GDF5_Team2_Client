const SnakeCard = SupportTowerCard.extend({
    ctor: function (id, level, accumulated, energy, isBattleDeck = false) {
        this._super(id, level, accumulated, energy, isBattleDeck);
        this.attackSpeedUp = JsonReader.getTowerBuffConfig()[this.auraTowerBuffType].effects[this.rank][0].value;
    }
});