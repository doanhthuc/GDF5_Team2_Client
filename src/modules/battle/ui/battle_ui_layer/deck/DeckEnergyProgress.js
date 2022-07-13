let DeckEnergyProgress = cc.Node.extend({
    ctor: function () {
        this._super();
        this.battleData = GameConfig.battleData;

        this._setupUI();
        this.setMaxEnergy(this.battleData.getMaxEnergy(GameConfig.PLAYER));
        this.setCurrentEnergy(this.battleData.getCurrentEnergy(GameConfig.PLAYER));
    },

    _setupUI: function () {
        let rootNode = ccs.load(BattleResource.ENERGY_PROGRESS_NODE, "").node;
        this.maxEnergyLabel = rootNode.getChildByName("label");
        this.progressBar = rootNode.getChildByName("progress");
        this.currentEnergyNode = rootNode.getChildByName("current_energy");
        this.addChild(rootNode);
    },

    setMaxEnergy: function (maxEnergy) {
        let mode = GameConfig.PLAYER;
        this.battleData.setMaxEnergy(maxEnergy, mode);
        this.progressBar.setPercent(this.battleData.getCurrentEnergy(mode) / this.battleData.getMaxEnergy(mode) * 100);
    },

    setCurrentEnergy: function (currentEnergy) {
        let mode = GameConfig.PLAYER;
        this.battleData.setCurrentEnergy(currentEnergy, mode);
        this.currentEnergyNode.getChildByName("value").setString(currentEnergy);
        this.progressBar.setPercent(this.battleData.getCurrentEnergy(mode) / this.battleData.getMaxEnergy(mode) * 100);
    },
})