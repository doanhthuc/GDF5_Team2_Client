const ICard = cc.Class.extend({
    ctor: function (id, level, accumulated, energy, isBattleDeck = false) {
        this.id = id;
        this.name = '';
        this.description = 'description';
        this.level = level;
        this.setCardRankByLevel(this.level);
        this.accumulated = accumulated;
        this.energy = energy;
        this.isBattleDeck = isBattleDeck;
    },

    setCardRankByLevel: function (level) {
        if (level <= 1) {
            this.rank = 1;
        } else if (level > 1 && level <= 3) {
            this.rank = 2;
        } else if (level >= 4) {
            this.rank = 3;
        }
    },
});