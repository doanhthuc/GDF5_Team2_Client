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
        this.rank = this.levelToRank(level);
    },

    levelToRank: function (level) {
        let rank = 1;
        if (level <= 1) {
            rank = 1;
        } else if (level > 1 && level <= 3) {
            rank = 2;
        } else if (level >= 4) {
            rank = 3;
        }
        return rank;
    },

    upgradeCardModel: function (level, accumulated) {
        this.level = level;
        this.accumulated = accumulated;
        this.setCardRankByLevel(this.level);
    },

    calculateCardStatByLevel: function (statValue, level) {
        return statValue * Math.pow(1.1, level - 1);
    },

    getCardStat: function () {
        return {}
    },

    getCardStatByLevel: function (level) {
        return {}
    }
});