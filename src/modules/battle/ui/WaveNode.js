let WaveNode = cc.Node.extend({
    ctor: function (maxWave) {
        this._super();
        this.maxWave = maxWave || 25;
        this.currentWave = 1;

        this.node = ccs.load("ui/battle/battle_ui_layer/wave/WaveNode.json", "").node;
        this.addChild(this.node);
        this.waveText = this.node.getChildByName("wave_text");
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