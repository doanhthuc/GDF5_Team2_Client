let HouseEnergyNode = cc.Node.extend({
    ctor: function () {
        this._super();
        this._setupUI();

        this.setEnergyString(this.battleData.getEnergyHouse(GameConfig.PLAYER), GameConfig.PLAYER);
        this.setEnergyString(this.battleData.getEnergyHouse(GameConfig.OPPONENT), GameConfig.OPPONENT);
    },

    _setupUI: function () {
        let rootNode = ccs.load(BattleResource.HOUSE_ENERGY_NODE, "").node;
        this.addChild(rootNode);
        let background = rootNode.getChildByName("background");

        this.width = background.width;
        this.height = background.height;
        this.battleData = GameConfig.battleData;

        this.playerEnergy = rootNode.getChildByName("player_energy");
        this.opponentEnergy = rootNode.getChildByName("opponent_energy");
    },

    minusEnergyHouse: function (energy, mode) {
        GameConfig.battleData.setEnergyHouse(this.battleData.getEnergyHouse(mode) - energy, mode);
        this.setEnergyString(this.battleData.getEnergyHouse(mode), mode);
        if (this.battleData.getEnergyHouse(mode) <= 0) {
            EventDispatcher.getInstance()
                .dispatchEvent(EventType.ZERO_ENERGY_HOUSE);
        }
    },

    setEnergyString: function (energy, mode) {
        switch (mode) {
            case GameConfig.PLAYER:
                this.playerEnergy.setString(energy);
                break;
            case GameConfig.OPPONENT:
                this.opponentEnergy.setString(energy)
                break;
            default:
                throw new Error("mode is invalid");
        }
    },

});