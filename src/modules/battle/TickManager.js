let TickManager = cc.Class.extend({
    ctor: function () {
        this.startTime = 0;
        this.lastedTick = 0;
        this.tickRate = 50; // millisecond

        this.tickData = new TickData();
        this.tickInputHandler = new TickInputHandler();
        this.inputTick = {
            tickNumber: [{cmd: "cmd", packet: "packet"}]
        }

        this.normalTimerNodeContainer = [];
    },

    addInput: function (tickNumber, cmd, packet) {
        if (!this.inputTick[tickNumber]) {
            this.inputTick[tickNumber] = [];
        }
        this.inputTick[tickNumber].push({cmd: cmd, packet: packet});
    },

    updateData: function () {
        const battleLayer = this.getBattleLayer();

        const currentTick = this.getLatestUpdateTick();
        cc.log("# latest tick = " + currentTick);
        cc.log("# current tick = " + this.getCurrentTick());
        // const nextTick = latestUpdateTick + 1;

        // handle input of current tick
        let queueInput = this.inputTick[currentTick];
        if (queueInput && queueInput.length > 0) {
            for (let i = 0; i < queueInput.length; i++) {
                let {cmd, packet} = queueInput[i];
                this.tickInputHandler.handle(cmd, packet, currentTick);
            }
        }

        battleLayer.getTimerNode().updateData();
        battleLayer.resetSystem.updateData();
        battleLayer.abilitySystem.updateData();
        battleLayer.effectSystem.updateData();
        battleLayer.attackSystem.updateData();
        battleLayer.renderSystem.updateData();
        battleLayer.lifeSystem.updateData();
        battleLayer.collisionSystem.updateData();
        battleLayer.pathSystem.updateData();
        battleLayer.spellSystem.updateData();
        battleLayer.skeletonAnimationSystem.updateData();
        battleLayer.monsterSystem.updateData();
        battleLayer.bulletSystem.updateData();
        battleLayer.movementSystem.updateData();

        // timer for build tower
        this.updateNormalTimerNode();

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
        return Math.floor((TimeUtil.getServerTime() - this.startTime) / this.tickRate);
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
        return (TimeUtil.getServerTime() - this.startTime) % this.tickRate;

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

    clearAndCreateNew: function () {
        tickManager = new TickManager;
    },

    getNormalTimerNodeContainer: function () {
        return this.normalTimerNodeContainer;
    },

    addNormalTimerNodeToContainer: function (timerNode) {
        this.normalTimerNodeContainer.push(timerNode);
    },

    updateNormalTimerNode: function () {
        const tick = this.getTickRate() / 1000;
        let remainNode = [];
        for (let timerNode of this.normalTimerNodeContainer) {
            timerNode.updateData(tick);

            if (timerNode.getCountDown() <= 0) {
                // IMPORTANT: should remove it in the next frame???
                timerNode.removeFromParent();
            } else {
                remainNode.push(timerNode);
            }
        }
        this.normalTimerNodeContainer = remainNode;
    }
})

let tickManager = new TickManager();
