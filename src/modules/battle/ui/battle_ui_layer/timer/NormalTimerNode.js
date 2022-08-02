let NormalTimerNode = cc.Node.extend({
    ctor: function (duration) {
        this._super();
        this._duration = duration || 20;
        this._countdown = this._duration;

        this.node = ccs.load(BattleResource.TIMER_NODE, "").node;
        this.addChild(this.node);
        this.progress = new cc.ProgressTimer(new cc.Sprite(BattleResource.TIMER_BACKGROUND));
        this.progress.setType(cc.ProgressTimer.TYPE_RADIAL);
        this.progress.setReverseDirection(true);
        this.node.addChild(this.progress, 2);
        this.timeStr = this.node.getChildByName("time")
        this.node.getChildByName("battle_timer_border").setLocalZOrder(3);

        this.timeStr.setLocalZOrder(3);
        this.timeStr.setString("");

        this.startTimer();
    },

    startTimer: function () {
        this.scheduleUpdate();
    },

    endTimer: function () {
        this.unscheduleUpdate();
        this.removeFromParent();
    },

    update: function (tick) {
        this.timer(tick);
    },

    timer: function (tick) {
        if (this._countdown <= 0) {
            this.endTimer();
        }

        this.progress.setPercentage(this._countdown / this._duration * 100);
        this._countdown = this._countdown - tick;
    },
});