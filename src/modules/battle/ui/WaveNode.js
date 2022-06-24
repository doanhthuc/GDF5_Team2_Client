let WaveNode = cc.Node.extend({
    ctor: function (maxWave) {
        this._super();
        this.maxWave = maxWave || 25;
        this.currentWave = 0;

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

        if (this.currentWave > this.maxWave) {
            EventDispatcher.getInstance()
                .dispatchEvent(EventType.END_ALL_WAVE)  ;
        } else {
            this._updateWave();
        }
    },

    _updateWave: function () {
        if (this.currentWave <= this.maxWave) {
            this.waveText.setString(this.currentWave + "/" + this.maxWave)
        }
    }

});