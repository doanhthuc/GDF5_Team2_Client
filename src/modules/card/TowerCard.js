const TowerCard = ICard.extend({
    ctor: function (id, level, accumulated, energy, isBattleDeck = false) {
        this._super(id, level, accumulated, energy, isBattleDeck);
        this.skill = null;
        this.range = this.getRangeFromJson();
    },

    getRangeFromJson: function () {
        return JsonReader.getTowerConfig()[this.id].stat[this.rank].range;
    }
})