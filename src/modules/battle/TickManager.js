let TickManager = cc.Class.extend({
    ctor: function () {
        this.startTime = 0;
        this.lastedTick = 0;
        this.tickRate = 100; // millisecond

        this.tickData = new TickData();
        this.tickInputHandler = new TickInputHandler();
        this.inputTick = {
            tickNumber: [{cmd: "cmd", packet: "packet"}]
        }
    },

    addInput: function (tickNumber, cmd, packet) {
        if (!this.inputTick[tickNumber]) {
            this.inputTick[tickNumber] = [];
        }
        this.inputTick[tickNumber].push({cmd: cmd, packet: packet});
    },

    updateData: function () {
        const battleLayer = this.getBattleLayer();

        const latestUpdateTick = this.getLatestUpdateTick();
        const nextTick = latestUpdateTick + 1;
        let queueInput = this.inputTick[nextTick];
        if (queueInput && queueInput.length > 0) {
            for (let i = 0; i < queueInput.length; i++) {
                let {cmd, packet} = queueInput[i];
                this.tickInputHandler.handle(cmd, packet);
            }
        }

        battleLayer.getTimerNode().updateData();
        battleLayer.resetSystem.updateData();
        battleLayer.effectSystem.updateData();
        battleLayer.attackSystem.updateData();
        battleLayer.renderSystem.updateData();
        battleLayer.lifeSystem.updateData();
        battleLayer.collisionSystem.updateData();
        battleLayer.pathSystem.updateData();
        battleLayer.monsterSystem.updateData();
        battleLayer.bulletSystem.updateData();
        battleLayer.movementSystem.updateData();

        this.increaseUpdateTick();
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

    increaseUpdateTick: function () {
        this.lastedTick++;
    },

    /**
     *
     * @returns {number} delta - millisecond
     */
    getDeltaFromLatestTickToNow: function () {
        // return (Utils.currentTimeMillis() - (this.startTime + this.getLatestUpdateTick() * this.tickRate));
        return (Utils.currentTimeMillis() - this.startTime) % this.tickRate;

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
})

let tickManager = new TickManager();
