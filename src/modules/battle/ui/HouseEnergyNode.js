let HouseEnergyNode = cc.Node.extend({
    ctor: function (playerEnergy, opponentEnergy) {
        this._super();

        let rootNode = ccs.load(BattleResource.HOUSE_ENERGY_NODE, "").node;
        this.addChild(rootNode);
        let background = rootNode.getChildByName("background");

        this.width = background.width;
        this.height = background.height;

        this.playerEnergy = rootNode.getChildByName("player_energy");
        this.opponentEnergy = rootNode.getChildByName("opponent_energy");

        this.setPlayerEnergy(playerEnergy);
        this.setOpponentEnergy(opponentEnergy);
    },

    setPlayerEnergy: function (energy) {
        this.playerEnergy.setString(energy);
    },

    getPlayerEnergy: function () {
        return parseInt(this.playerEnergy.getString(), 10);
    },

    plusPlayerEnergy: function (energy) {
        this.playerEnergy.setString(this.getPlayerEnergy() + energy);
    },

    minusPlayerEnergy: function (energy) {
        this.playerEnergy.setString(this.getPlayerEnergy() - energy);
        GameConfig.battleData.setPlayerEnergyHouse(this.getPlayerEnergy() - energy);
        if (this.getPlayerEnergy() <= 0) {
            EventDispatcher.getInstance()
                .dispatchEvent(EventType.ZERO_ENERGY_PLAYER_HOUSE);
        }
    },

    setOpponentEnergy: function (energy) {
        this.opponentEnergy.setString(energy)
    },

    getOpponentEnergy: function () {
        return parseInt(this.opponentEnergy.getString(), 10);
    },

    plusOpponentEnergy: function (energy) {
        this.opponentEnergy.setString(this.getOpponentEnergy() + energy);
    },

    minusOpponentEnergy: function (energy) {
        this.opponentEnergy.setString(this.getOpponentEnergy() - energy);
        if (this.getOpponentEnergy() <= 0) {
            EventDispatcher.getInstance()
                .dispatchEvent(EventType.ZERO_ENERGY_OPPONENT_HOUSE);
        }
    }
});