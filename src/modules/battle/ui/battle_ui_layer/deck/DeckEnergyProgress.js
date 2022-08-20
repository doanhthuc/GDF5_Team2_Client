let DeckEnergyProgress = cc.Node.extend({
    ctor: function () {
        this._super();
        this.battleData = BattleManager.getInstance().getBattleData();

        this._setupUI();
        this.setMaxEnergy(this.battleData.getMaxEnergy(GameConfig.USER1()));
        this.setCurrentEnergy(this.battleData.getCurrentEnergy(GameConfig.USER1()));
    },

    _setupUI: function () {
        let rootNode = ccs.load(BattleResource.ENERGY_PROGRESS_NODE, "").node;
        this.maxEnergyLabel = rootNode.getChildByName("label");
        this.progressBar = rootNode.getChildByName("progress");
        this.currentEnergyNode = rootNode.getChildByName("current_energy");
        this.addChild(rootNode);
    },

    setMaxEnergy: function (maxEnergy) {
        let mode = GameConfig.USER1();
        this.battleData.setMaxEnergy(maxEnergy, mode);
        this.progressBar.setPercent(this.battleData.getCurrentEnergy(mode) / this.battleData.getMaxEnergy(mode) * 100);
    },

    setCurrentEnergy: function (currentEnergy) {
        let mode = GameConfig.USER1();
        this.battleData.setCurrentEnergy(currentEnergy, mode);
        this.currentEnergyNode.getChildByName("value").setString(currentEnergy);
        this.progressBar.setPercent(this.battleData.getCurrentEnergy(mode) / this.battleData.getMaxEnergy(mode) * 100);
    },

    plusEnergy: function (plusEnergy) {
        let energy = this.battleData.getCurrentEnergy(GameConfig.USER1()) + plusEnergy;
        if (energy > this.battleData.getMaxEnergy(GameConfig.USER1())) {
            this.setCurrentEnergy(this.battleData.getMaxEnergy(GameConfig.USER1()));
        } else {
            this.setCurrentEnergy(energy);
        }
        BattleManager.getInstance().getCardDeckNode().updateCardDeckSlotState();
    },

    minusEnergy: function (minusEnergy) {
        let energy = this.battleData.getCurrentEnergy(GameConfig.USER1()) - minusEnergy;
        if (energy >= 0) {
            this.setCurrentEnergy(energy);
        } else {
            this.setCurrentEnergy(0);
        }
        BattleManager.getInstance().getCardDeckNode().updateCardDeckSlotState();
    }
})