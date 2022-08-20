let TickManager = cc.Class.extend({
    ctor: function () {
        this.startTime = 0;
        this.lastedTick = 0;
        this.tickRate = 50; // millisecond

        this.tickData = new TickData();
        this.tickInputHandler = new TickInputHandler();
        this.inputTick = {}

        this.normalTimerNodeContainer = [];
        this.checkSumContainer = [];
        this.waitingSnapshot = [];
    },

    addInput: function (tickNumber, cmd, packet) {
        if (!this.inputTick[tickNumber]) {
            this.inputTick[tickNumber] = [];
        }
        this.inputTick[tickNumber].push({cmd: cmd, packet: packet});
    },

    updateData: function () {
        if (GameConfig.DEBUG) {
            cc.warn("---------------------------------------")
            cc.warn("---------------------------------------")
        }

        const battleLayer = this.getBattleLayer();
        const currentTick = this.getLatestUpdateTick();
        // cc.log("# latest tick = " + currentTick);
        // cc.log("# current tick = " + this.getCurrentTick());
        // const nextTick = latestUpdateTick + 1;

        // handle input of current tick
        let queueInput = this.inputTick[currentTick];
        if (queueInput && queueInput.length > 0) {
            for (let i = 0; i < queueInput.length; i++) {
                let {cmd, packet} = queueInput[i];
                this.tickInputHandler.handle(cmd, packet, currentTick);
            }
        }

        let startTime = Utils.currentTimeMillis();
        battleLayer.getTimerNode().updateData();
        battleLayer.resetSystem.runUpdateData();
        battleLayer.abilitySystem.runUpdateData();
        battleLayer.towerSpecialSkillSystem.runUpdateData();
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
        this.calcCheckSum(currentTick);
        let endTime = Utils.currentTimeMillis();
        if (GameConfig.DEBUG) {
            cc.error("*** Update time = " + (endTime - startTime));
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

            measurePerformance.report();

            // let startTime22 = Date.now();
            // for (let i = 0; i <= 50; i++) {
            //     EntityManager.getInstance().getEntitiesHasComponents(AppearanceComponent);
            // }
            // let endTime22 = Date.now();
            // cc.log("Time getEntitiesHasComponents(): " + (endTime22 - startTime22));


            cc.warn("---------------------------------------")
            cc.warn("---------------------------------------")
        }
        // timer for build tower
        this.updateNormalTimerNode();

        this.increaseUpdateTick();

        while (this.waitingSnapshot.length > 0) {
            let packet = this.waitingSnapshot.shift();
            this.handleSnapshot(packet);
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
        return Math.floor((TimeUtil.getServerTime() - this.startTime) / this.tickRate);
    },

    getLatestUpdateTick: function () {
        return this.lastedTick;
    },

    setLatestUpdateTick: function (latestTick) {
        this.lastedTick = latestTick;
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
    },

    renderNormalTimerNode: function () {
        let dt = this.getDeltaFromLatestTickToNow() / 1000;
        for (let timerNode of this.normalTimerNodeContainer) {
            timerNode.render(dt);
        }
    },

    calcCheckSum: function (currentTick) {
        let sumHp = 0;
        let lifeSystem = SystemManager.getInstance().getSystemByTypeID(LifeSystem);
        for (let entityID in lifeSystem.getEntityStore()) {
            let entity = lifeSystem.getEntityStore()[entityID];
            if (!entity.getActive() || !entity._hasComponent(LifeComponent)) continue;

            let lifeComponent = entity.getComponent(LifeComponent);
            sumHp += lifeComponent.hp;
        }
        this.checkSumContainer[currentTick] = sumHp;
    },

    handleSnapshot: function (packet) {
        let entityManager = EntityManager.getInstance();
        cc.log("data packet");
        cc.log(JSON.stringify(packet.dataEntity))
        let checkEntity = {};
        for (let entityId in packet.dataEntity) {
            let dataEntity = packet.dataEntity[entityId];
            let existEntityInGame = entityManager.getEntity(entityId);

            if (!existEntityInGame) {
                cc.log("Entity does not Exist : create new entity");
                BattleManager.getInstance().getBattleLayer().createMonsterByEntityTypeID(dataEntity.mode, dataEntity.typeID, entityId);
            }
            existEntityInGame = entityManager.getEntity(entityId);
            cc.log("Exist Entity");
            let dataComponents = dataEntity.components;
            for (let componentTypeID in dataComponents) {
                let typeID = Number(componentTypeID);
                if (existEntityInGame._hasComponent((typeID))) {
                    let component = existEntityInGame.getComponent(typeID);
                    component.readData(dataComponents[componentTypeID]);
                } else {
                    cc.log("entity does not have component")
                }
            }
            checkEntity[entityId] = 1;
        }


        let abilitySystem = SystemManager.getInstance().getSystemByTypeID(AbilitySystem);
        for (let monsterId in abilitySystem.getEntityStore()) {
            let monsterEntity = abilitySystem.getEntityStore()[monsterId];
            if (checkEntity[monsterEntity.id] !== 1) EntityManager.destroy(monsterEntity);
        }
        UUIDGeneratorECS.setMonsterEntityID(packet.playerMonsterEntityID, packet.opponentMonsterEntityID);
        BattleManager.getInstance().getBattleData().setEnergyHouse(packet.playerEnergyHouse, GameConfig.USER1());
        BattleManager.getInstance().getBattleData().setEnergyHouse(packet.opponentEnergyHouse, GameConfig.USER2());
        BattleManager.getInstance().getBattleLayer().uiLayer.houseEnergyNode.renderEnergyHouse();

        // Reset latest tick to the snapshot tick
        this.setLatestUpdateTick(packet.serverTick);
    }
})

let tickManager = new TickManager();
