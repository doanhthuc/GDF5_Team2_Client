let BattleUILayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        this._setupUI();
    },

    _setupUI: function () {
        this._showTimer();
        this._showWave();
    },

    _showTimer: function () {
        this.timerNode = new BattleTimerNode(5);
        this.addChild(this.timerNode);
        this.timerNode.x = this.width / 2 - this.timerNode.width / 2;
        this.timerNode.y = 800
    },

    _showWave: function () {
        this.waveNode = new WaveNode(25);
        this.addChild(this.waveNode);
        this.waveNode.x = this.width / 2 - this.waveNode.width / 2;
        this.waveNode.y = 900;
    }
});