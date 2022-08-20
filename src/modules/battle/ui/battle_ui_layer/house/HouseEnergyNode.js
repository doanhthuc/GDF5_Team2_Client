let HouseEnergyNode = cc.Node.extend({
    ctor: function () {
        this._super();
        this._setupUI();

        this.setEnergyString(this.battleData.getEnergyHouse(GameConfig.USER1()), GameConfig.USER1());
        this.setEnergyString(this.battleData.getEnergyHouse(GameConfig.USER2()), GameConfig.USER2());
    },

    _setupUI: function () {
        let rootNode = ccs.load(BattleResource.HOUSE_ENERGY_NODE, "").node;
        this.addChild(rootNode);
        let background = rootNode.getChildByName("background");

        this.width = background.width;
        this.height = background.height;
        this.battleData = BattleManager.getInstance().getBattleData();

        this.playerEnergy = rootNode.getChildByName("player_energy");
        this.opponentEnergy = rootNode.getChildByName("opponent_energy");
    },

    renderEnergyHouse: function () {
        this.setEnergyString(this.battleData.getEnergyHouse(GameConfig.USER1()), GameConfig.USER1());
        this.setEnergyString(this.battleData.getEnergyHouse(GameConfig.USER2()), GameConfig.USER2());
        // if (this.battleData.getEnergyHouse(mode) <= 0) {
        //     EventDispatcher.getInstance()
        //         .dispatchEvent(EventType.ZERO_ENERGY_HOUSE);
        // }
    },

    setEnergyString: function (energy, mode) {
        switch (mode) {
            case GameConfig.USER1():
                this.playerEnergy.setString(energy);
                break;
            case GameConfig.USER2():
                this.opponentEnergy.setString(energy)
                break;
            default:
                throw new Error("mode is invalid");
        }
    },

});