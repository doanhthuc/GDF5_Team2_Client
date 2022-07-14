let WaveNode = cc.Node.extend({
    ctor: function (currentWave, maxWave) {
        this._super();
        this.maxWave = maxWave;
        this.currentWave = currentWave;

        this.rootNode = ccs.load(BattleResource.WAVE_NODE, "").node;
        this.addChild(this.rootNode);

        let background = this.rootNode.getChildByName("background");
        this.width = background.width;
        this.height = background.height;

        this.waveText = this.rootNode.getChildByName("wave_text");
        this.waveText.setString(this.currentWave + "/" + this.maxWave);
    },

    increaseWave: function () {
        this.currentWave++;
        if (this.currentWave <= this.maxWave) {
            BattleManager.getInstance().getBattleData().setCurrentWave(this.currentWave);
            this._updateWaveUI();
        }

        if (this.currentWave >= this.maxWave + 1) {
            EventDispatcher.getInstance()
                .dispatchEvent(EventType.END_ALL_WAVE);
        }
    },

    _updateWaveUI: function () {
        if (this.currentWave <= this.maxWave) {
            this.waveText.setString(this.currentWave + "/" + this.maxWave)
        }
    }

});