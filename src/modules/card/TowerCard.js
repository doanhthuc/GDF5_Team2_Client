const TowerCard = ICard.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this._super(id, level, accumulated, isBattleDeck);
        this.skill = null;
        this.energy = this.getEnergyFromJson();
        this.range = this.getRangeFromJson();
    },

    getRangeFromJson: function () {
        return JsonReader.getTowerConfig()[this.id].stat[this.rank].range;
    },

    getEnergyFromJson: function () {
        return JsonReader.getTowerConfig()[this.id].energy;
    },

    getCardStat: function () {
        return {
            range: this.range,
        }
    },

    upgradeCardModel: function (level, accumulated) {
        this._super(level, accumulated);
        this.range = this.getRangeFromJson();
    }
})