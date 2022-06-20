let BattleUILayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        this._setupUI();
    },

    _setupUI: function () {
        // timer
        this.timerNode = new BattleTimerNode(5);
        this.addChild(this.timerNode);
        this.timerNode.x = this.width / 2 - this.timerNode.width / 2;
        this.timerNode.y = 800

        // waveNode
        this.waveNode = new WaveNode(3);
        this.addChild(this.waveNode);
        this.waveNode.x = this.width / 2 - this.waveNode.width / 2;
        this.waveNode.y = 900;
    }
});