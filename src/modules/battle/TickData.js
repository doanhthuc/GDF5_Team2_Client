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