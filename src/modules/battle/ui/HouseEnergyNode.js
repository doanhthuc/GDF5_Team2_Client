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

    plusPlayerEnergy: function (energy) {
        this.playerEnergy.setString(this.getPlayerEnergy() + energy);
    },

    minusEnergyHouse: function (energy, mode) {
        // FIXME: optimize
        if (mode === GameConfig.PLAYER) {
            this.setPlayerEnergy(this.getPlayerEnergy() - energy);
            GameConfig.battleData.setEnergyHouse(this.getPlayerEnergy() - energy, mode);
            if (this.getPlayerEnergy() <= 0) {
                EventDispatcher.getInstance()
                    .dispatchEvent(EventType.ZERO_ENERGY_PLAYER_HOUSE);
            }
        } else if (mode === GameConfig.OPPONENT) {
            this.setOpponentEnergy(this.getOpponentEnergy() - energy);
            GameConfig.battleData.setEnergyHouse(this.getPlayerEnergy() - energy, mode);
            if (this.getOpponentEnergy() <= 0) {
                EventDispatcher.getInstance()
                    .dispatchEvent(EventType.ZERO_ENERGY_PLAYER_HOUSE);
            }
        }

    },

    // FIXME: optimize
    setOpponentEnergy: function (energy) {
        this.opponentEnergy.setString(energy)
    },

    getOpponentEnergy: function () {
        return parseInt(this.opponentEnergy.getString(), 10);
    },

    setPlayerEnergy: function (energy) {
        this.playerEnergy.setString(energy);
    },

    getPlayerEnergy: function () {
        return parseInt(this.playerEnergy.getString(), 10);
    },
});