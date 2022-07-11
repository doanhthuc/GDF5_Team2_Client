const _CardFactory = cc.Class.extend({
    ctor: function () {
    },

    createCard: function (id, level, accumulated, isBattleDeck = false) {
        let card = null;
        switch (id) {
            case 0:
                card = new CanonOwlCard(id, level, accumulated, isBattleDeck);
                break;
            case 1:
                card = new WizardCrowCard(id, level, accumulated, isBattleDeck);
                break;
            case 2:
                card = new BoomerangFrogCard(id, level, accumulated, isBattleDeck);
                break;
            case 3:
                card = new BunnyOilCard(id, level, accumulated, isBattleDeck);
                break;
            case 4:
                card = new PolarBearCard(id, level, accumulated, isBattleDeck);
                break;
            case 5:
                card = new GoatCard(id, level, accumulated, isBattleDeck);
                break;
            case 6:
                card = new SnakeCard(id, level, accumulated, isBattleDeck);
                break;
            case 7:
                card = new FireBallCard(id, level, accumulated, isBattleDeck);
                break;
            case 8:
                card = new FrozenCard(id, level, accumulated, isBattleDeck);
                break;
            case 9:
                card = new TrapCard(id, level, accumulated, isBattleDeck);
                break;
            default:
                break;

        }
        return card;
    }
})

const CardFactory = new _CardFactory();