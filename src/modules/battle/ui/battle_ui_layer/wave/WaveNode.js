let WaveNode = cc.Node.extend({
    ctor: function () {
        this._super();

        this.rootNode = ccs.load(BattleResource.WAVE_NODE, "").node;
        this.addChild(this.rootNode);

        let background = this.rootNode.getChildByName("background");
        this.width = background.width;
        this.height = background.height;

        this.waveText = this.rootNode.getChildByName("wave_text");
        this.renderUI();
    },

    // increaseWave: function () {
    //     this.currentWave++;
    //     if (this.currentWave <= this.maxWave) {
    //         this._updateWaveUI();
    //     }
    //
    //     if (this.currentWave >= this.maxWave + 1) {
    //         EventDispatcher.getInstance()
    //             .dispatchEvent(EventType.END_ALL_WAVE);
    //     }
    // },

    renderUI: function () {
        let battleData = BattleManager.getInstance().getBattleData();
        let currentWave = battleData.getCurrentWave();
        let maxWave = battleData.getMaxWave();

        if (currentWave <= maxWave) {
            this.waveText.setString(currentWave + "/" + maxWave)
        }
    }

});