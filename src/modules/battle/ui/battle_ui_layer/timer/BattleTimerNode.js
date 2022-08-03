let BattleTimerNode = cc.Node.extend({
    ctor: function (countdown, duration) {
        this._super();
        this._duration = duration || 20;
		this._monsterSpawmTime = 0;

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

    timer: function () {
        const dt = tickManager.getDeltaFromLatestTickToNow() / 1000;
        let countDownLatestTick = tickManager.getTickData().getBattleTimerCountDown();
        const countDown = countDownLatestTick - dt;

        this.progress.setPercentage(countDown / this._duration * 100);
        let time = this.node.getChildByName("time")
        time.setString(countDown.toFixed(2));
    },

    updateData: function () {
        let countDownLatestTick = tickManager.getTickData().getBattleTimerCountDown();
        if (countDownLatestTick <= 0) {
            countDownLatestTick = this._duration;
            EventDispatcher.getInstance()
                .dispatchEvent(EventType.END_ONE_TIMER);
        }
        countDownLatestTick = countDownLatestTick - tickManager.getTickRate() / 1000;
        tickManager.getTickData().setBattleTimerData(countDownLatestTick);

        let battleData = BattleManager.getInstance().getBattleData();
        if (battleData.getCurrentWave() === 0) return;
        if (this._monsterSpawmTime <= 0 && battleData.dataInGame.monsterWave[battleData.dataInGame.currentWave].length > 0) {
            this._monsterSpawmTime = 1;
            EventDispatcher.getInstance().dispatchEvent(EventType.SPAWN_MONSTER);
        } else {
            this._monsterSpawmTime -= tickManager.getTickRate() / 1000;
        }
    }
});