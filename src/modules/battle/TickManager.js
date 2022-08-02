let TickData = cc.Class.extend({
    ctor: function () {
        this.data = {};
        this.data.battleTimer = {
            countDown: 0
        }
    },

    /**
     *
     * @param countDown - second
     */
    setBattleTimerData: function (countDown) {
        this.data.battleTimer.countDown = countDown;
    },

    getBattleTimerCountDown: function () {
        return this.data.battleTimer.countDown
    }
});

let TickManager = cc.Class.extend({
    ctor: function () {
        this.startTime = 0;
        this.lastedTick = 0;
        this.tickRate = 100; // millisecond

        this.tickData = new TickData();
        this.inputTick = {
            tickNumber: ["command 1", "command 2"]
        }
    },

    setStartTime: function (millisecond) {
        this.startTime = millisecond;
    },

    /**
     *
     * @returns {number|*} millisecond
     */
    getStartTime: function () {
        return this.startTime;
    },

    getBattleLayer: function () {
        return BattleManager.getInstance().getBattleLayer();
    },

    getCurrentTick: function () {
        return Math.floor((Utils.currentTimeMillis() - this.startTime) / this.tickRate);
    },

    getLatestUpdateTick: function () {
        return this.lastedTick;
    },

    /**
     *
     * @returns {number} delta - millisecond
     */
    getDeltaFromLatestTickToNow: function () {
        return (Utils.currentTimeMillis() - (this.startTime + this.getLatestUpdateTick() * this.tickRate));
    },

    getTickData: function () {
        return this.tickData;
    },

    /**
     *
     * @returns {number} millisecond
     */
    getTickRate: function () {
        return this.tickRate;
    },

    updateData: function () {
        this.getBattleLayer().getTimerNode().updateData();
        this.lastedTick++;
    }
})

let tickManager = new TickManager();
