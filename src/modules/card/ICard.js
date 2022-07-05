const ICard = cc.Class.extend({
    ctor: function (id, level, accumulated, isBattleDeck = false) {
        this.id = id;
        this.name = '';
        this.description = 'description';
        this.energy = 0;
        this.level = level;
        this.setCardRankByLevel(this.level);
        this.accumulated = accumulated;
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

    upgradeCard: function (level, accumulated) {
        this.level = level;
        this.accumulated = accumulated;
        this.setCardRankByLevel(this.level);
    },

    getCardStat: function () {
        return {}
    }
});