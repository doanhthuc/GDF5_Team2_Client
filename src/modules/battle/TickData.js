let TickData = cc.Class.extend({
    ctor: function () {
        this.data = {};
        this.data.battleTimer = {
            countDown: 0
        }

        this.data.componentData = {};
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
    },

    saveComponentData: function (componentID, data) {
        this.data.componentData[componentID] = data;
    },

    deleteComponentData: function (componentID) {
        if (this.data.componentData[componentID] !== null) {
            delete this.data.componentData[componentID];
        }
    },

    getComponentData: function (componentID) {
        return this.data.componentData[componentID];
    }
});