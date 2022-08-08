let TickManager = cc.Class.extend({
    ctor: function () {
        this.startTime = 0;
        this.lastedTick = 0;
        this.tickRate = 50; // millisecond

        this.tickData = new TickData();
        this.tickInputHandler = new TickInputHandler();
        this.inputTick = {}

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
        // cc.log("# latest tick = " + currentTick);
        // cc.log("# current tick = " + this.getCurrentTick());
        // const nextTick = latestUpdateTick + 1;

        // handle input of current tick
        let queueInput = this.inputTick[currentTick];
        if (queueInput && queueInput.length > 0) {
            cc.error("Queue Input #" + currentTick);
            cc.log(JSON.stringify(queueInput));
            cc.log("full inputTick = " + JSON.stringify(this.inputTick));
            cc.log("full key input tick = " + JSON.stringify(Object.keys(this.inputTick)));
            for (let i = 0; i < queueInput.length; i++) {
                let {cmd, packet} = queueInput[i];
                this.tickInputHandler.handle(cmd, packet, currentTick);
            }
        }

        let startTime = Utils.currentTimeMillis();
        battleLayer.getTimerNode().updateData();
        battleLayer.resetSystem.runUpdateData();
        battleLayer.abilitySystem.runUpdateData();
        battleLayer.effectSystem.runUpdateData();
        battleLayer.attackSystem.runUpdateData();
        battleLayer.renderSystem.runUpdateData();
        battleLayer.lifeSystem.runUpdateData();
        battleLayer.collisionSystem.runUpdateData();
        battleLayer.pathSystem.runUpdateData();
        battleLayer.spellSystem.runUpdateData();
        battleLayer.skeletonAnimationSystem.runUpdateData();
        battleLayer.monsterSystem.runUpdateData();
        battleLayer.bulletSystem.runUpdateData();
        battleLayer.movementSystem.runUpdateData();
        let endTime = Utils.currentTimeMillis();
        if (GameConfig.DEBUG) {
            cc.error("Update time = " + (endTime - startTime));
            cc.warn("* Entity Manager size = " + Object.keys(EntityManager.getInstance().entities).length);
            cc.warn("* Tick size = " + Object.keys(tickManager.getTickData().data.componentData).length);
            cc.warn("* Current id of component = " + UUIDGeneratorECS.genComponentID());
            cc.warn("* Component Manager size = " + ComponentManager.getInstance()._storeInstance.size);


            let poolSize = 0;
            let componentActive = 0;
            let componentInactive = 0;
            for (let key of Object.keys(ComponentFactory.pool._store)) {
                poolSize += ComponentFactory.pool._store[key].length;
                for (let component of ComponentFactory.pool._store[key]) {
                    if (component.getActive()) {
                        componentActive++;
                    } else {
                        componentInactive++;
                    }
                }
            }
            cc.warn("* ComponentPool size = " + JSON.stringify(poolSize));
            cc.warn("   + Active size = " + JSON.stringify(componentActive));
            cc.warn("   + Inactive size = " + JSON.stringify(componentInactive));

            cc.warn("---------------------------------------")
            cc.warn("---------------------------------------")
        }
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
