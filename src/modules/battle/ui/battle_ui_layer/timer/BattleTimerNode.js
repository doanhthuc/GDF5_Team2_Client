let BattleTimerNode = cc.Node.extend({
    ctor: function (countdown, duration) {
        this._super();
        this._duration = duration || 20;
        this._countdown = countdown;
        this.node = ccs.load(BattleResource.TIMER_NODE, "").node;
        this.addChild(this.node);
        this.progress = new cc.ProgressTimer(new cc.Sprite(BattleResource.TIMER_BACKGROUND));
        this.progress.setType(cc.ProgressTimer.TYPE_RADIAL);
        this.progress.setReverseDirection(true);
        this.node.addChild(this.progress, 2);
        this.node.getChildByName("time").setLocalZOrder(3);
        this.node.getChildByName("battle_timer_border").setLocalZOrder(3);

        this.startTimer();
    },

    startTimer: function () {
        this.scheduleUpdate();
    },

    endTimer: function () {
        this.unscheduleUpdate();
    },

    update: function (tick) {
        this.timer(tick);
    },

    timer: function (tick) {
        if (this._countdown <= 0) {
            this._countdown = this._duration;
            EventDispatcher.getInstance()
                .dispatchEvent(EventType.END_ONE_TIMER);
        }

        this.progress.setPercentage(this._countdown / this._duration * 100);
        let time = this.node.getChildByName("time")
        time.setString(Math.round(this._countdown));
        this._countdown = this._countdown - tick;
    },
});