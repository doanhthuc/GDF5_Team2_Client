let BattleNetwork = BattleNetwork || {};

BattleNetwork.Connector = cc.Class.extend({
    ctor: function (gameClient) {
        this.gameClient = gameClient;
        gameClient.packetFactory.addPacketMap(BattleNetwork.packetMap);
        gameClient.receivePacketSignal.add(this.onReceivedPacket, this);
    },

    onReceivedPacket: function (cmd, packet) {
        cc.warn('[BattleNetwork.js] onReceivedPacket: ' + cmd + "   " + JSON.stringify(packet));
        cc.log("# Current Tick = " + tickManager.getLatestUpdateTick());
        this.logReceiveCommand(cmd, packet);
        switch (cmd) {
            case gv.CMD.SEND_MATCHING:
                this._handleMatching(cmd, packet);
                break;
            case gv.CMD.SEND_CANCEL_MATCHING:
                this._handleCancelMatching(cmd, packet);
                break;
            case gv.CMD.GET_BATTLE_INFO:
                this._handleGetBattleInfo(cmd, packet);
                break;
            case gv.CMD.PUT_TOWER:
                tickManager.addInput(packet.tickNumber, cmd, packet.clone());
                break;
            case gv.CMD.OPPONENT_PUT_TOWER:
                tickManager.addInput(packet.tickNumber, cmd, packet.clone());
                // show timer build tower
                BattleManager.getInstance().getBattleLayer().showTimerBuildTower(cc.p(packet.tileX, packet.tileY), GameConfig.OPPONENT);
                break;
            case gv.CMD.GET_BATTLE_MAP_OBJECT:
                this._handleGetBattleMapObject(cmd, packet);
                break;
            case gv.CMD.GET_CELL_OBJECT:
                this._handleGetCellObject(cmd, packet);
                break;
            case gv.CMD.UPGRADE_TOWER:
                tickManager.addInput(packet.tickNumber, cmd, packet.clone());
                break;
            case gv.CMD.OPPONENT_UPGRADE_TOWER:
                tickManager.addInput(packet.tickNumber, cmd, packet.clone());
                break;
            case gv.CMD.DROP_SPELL:
                tickManager.addInput(packet.tickNumber, cmd, packet.clone());
                break;
            case gv.CMD.OPPONENT_DROP_SPELL:
                tickManager.addInput(packet.tickNumber, cmd, packet.clone());
                break;
            case gv.CMD.CHANGE_TOWER_STRATEGY:
                tickManager.addInput(packet.tickNumber, cmd, packet.clone());
                break;
            case gv.CMD.OPPONET_CHANGE_TOWER_STRATEGY:
                tickManager.addInput(packet.tickNumber, cmd, packet.clone());
                break;
            case gv.CMD.PUT_TRAP:
                tickManager.addInput(packet.tickNumber, cmd, packet.clone());
                break;
            case gv.CMD.OPPONENT_PUT_TRAP:
                tickManager.addInput(packet.tickNumber, cmd, packet.clone());
                break;
            case gv.CMD.DESTROY_TOWER:
                tickManager.addInput(packet.tickNumber, cmd, packet.clone());
                break;
            case gv.CMD.OPPONENT_DESTROY_TOWER:
                tickManager.addInput(packet.tickNumber, cmd, packet.clone());
                break;
            case gv.CMD.END_BATTLE:
                this._handleEndBattle(cmd, packet);
                break;
            case gv.CMD.GET_BATTLE_DECK_IN_BATTLE:
                this._handleGetBattleDeckInBattle(cmd, packet);
                break;
            case gv.CMD.NEXT_WAVE:
                this._handleNextWave(packet);
                break;
            case gv.CMD.SNAPSHOT:
                this._handleSnapshot(cmd, packet);
                break;
        }
    },

    sendMatching: function () {
        let pk = this.gameClient.getOutPacket(CMDSendMatching);
        pk.pack();
        this.gameClient.sendPacket(pk);
        this.logSendCommand(gv.CMD.SEND_MATCHING);
    },

    sendCancelMatching: function () {
        let pk = this.gameClient.getOutPacket(CMDSendCancelMatching);
        pk.pack();
        this.gameClient.sendPacket(pk);
        this.logSendCommand(gv.CMD.SEND_CANCEL_MATCHING);
    },

    _handleNextWave: function (packet) {
        for (let monsterIdx = 0; monsterIdx < packet.monsterWave.length; monsterIdx++) {
            let tickNumber = (monsterIdx * 1000) / tickManager.getTickRate() + packet.tickNumber;
            tickManager.addInput(tickNumber, gv.CMD.BORN_MONSTER, packet.monsterWave[monsterIdx]);
        }
        let uiLayer = BattleManager.getInstance().getBattleLayer().uiLayer;
        let battleData = BattleManager.getInstance().getBattleData();
        battleData.setCurrentWave(battleData.getCurrentWave() + 1);
        battleData.setCurrentIndexMonsterWave(0);
        uiLayer.waveNode.renderUI();
        soundManager.playNextWave();
        uiLayer.waveNode.renderUI();
        tickManager.getTickData().setBattleTimerData(20);
    },

    _handleMatching: function (cmd, packet) {
        let battleData = new BattleData();
        BattleManager.getInstance().registerBattleData(battleData, true);
        battleData.setRoomId(packet.roomId)

        battleData.setLongestPath(packet.playerLongestPath, GameConfig.PLAYER);
        battleData.setLongestPath(packet.opponentLongestPath, GameConfig.OPPONENT);

        let userContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT);
        battleData.setUsername(userContext.getUsername(), GameConfig.PLAYER);
        battleData.setTrophy(userContext.getTrophy(), GameConfig.PLAYER);
        battleData.setUsername(packet.opponentInfo.username, GameConfig.OPPONENT);
        battleData.setTrophy(packet.opponentInfo.trophy, GameConfig.OPPONENT);
    },

    _handleCancelMatching: function (cmd, packet) {
        cc.warn("Canceled matching")
        fr.view(MainScreen);
    },

    sendPutTower: function (towerId, tilePos) {
        let roomId = BattleManager.getInstance().getBattleData().getRoomId()
        let pk = this.gameClient.getOutPacket(CMDPutTower);
        pk.pack(roomId, towerId, tilePos);
        this.logSendCommand(gv.CMD.PUT_TOWER, {roomId, towerId, tilePos});
        this.gameClient.sendPacket(pk);
    },

    sendUpgradeTower: function (towerId, tilePos) {
        let pk = this.gameClient.getOutPacket(CMDUpgradeTower);
        pk.pack(towerId, tilePos);
        this.logSendCommand(gv.CMD.UPGRADE_TOWER, {towerId, tilePos});
        this.gameClient.sendPacket(pk);
    },

    sendDropSpell: function (towerId, pixelPos) {
        let pk = this.gameClient.getOutPacket(CMDDropSpell);
        pk.pack(towerId, pixelPos);
        this.logSendCommand(gv.CMD.DROP_SPELL, {towerId, pixelPos});
        this.gameClient.sendPacket(pk);
    },

    sendPutTrap: function (tilePos) {
        let pk = this.gameClient.getOutPacket(CMDPutTrap);
        pk.pack(tilePos);
        this.logSendCommand(gv.CMD.PUT_TRAP, {tilePos});
        this.gameClient.sendPacket(pk);
    },

    sendChangeTowerTargetStrategy: function (towerTilePos, targetStrategy) {
        let pk = this.gameClient.getOutPacket(CMDChangeTowerStrategy);
        pk.pack(towerTilePos, targetStrategy);
        this.logSendCommand(gv.CMD.CHANGE_TOWER_STRATEGY, {towerTilePos, targetStrategy});
        this.gameClient.sendPacket(pk);
    },

    sendDestroyTower: function (tilePos) {
        let pk = this.gameClient.getOutPacket(CMDDestroyTower);
        pk.pack(tilePos);
        this.logSendCommand(gv.CMD.DESTROY_TOWER, {tilePos});
        this.gameClient.sendPacket(pk);
    },

    sendCheckSum: function (checkSum, serverEndBattleTick) {
        cc.log("sendCheckSum-----------------------" + JSON.stringify(checkSum) + serverEndBattleTick);
        let pk = this.gameClient.getOutPacket(CMDSendCheckSum);
        pk.pack(checkSum, serverEndBattleTick);
        this.gameClient.sendPacket(pk);
    },

    sendSpeedUpNextWave: function () {
        cc.log("sendSpeedUpNextWave-----------------------");
        let pk = this.gameClient.getOutPacket(CMDSendSpeedUpNextWave);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    _handleGetBattleInfo: function (cmd, packet) {
        let battleData = BattleManager.getInstance().getBattleData();
        battleData.setBattleStartTime(packet.battleStartTime);
        tickManager.setStartTime(packet.battleStartTime);


        tickManager.getTickData().setBattleTimerData(battleData.getTimer());
        BattleManager.getInstance().getBattleData().setMaxWave(packet.waveAmount);
        BattleManager.getInstance().getBattleData().setMonsterWave(packet.monsterWave);
        UUIDGeneratorECS.setStartEntityID(packet.playerStartEntityID, packet.opponentStartEntityID);
        setTimeout(function () {
            fr.view(BattleLayer, 0.5, true)
            cc.log("===> Switch to Game Layer Scene !!!")
        }, 2000);
    },

    _handleGetBattleMapObject: function (cmd, packet) {
        let battleData = BattleManager.getInstance().getBattleData();
        battleData.setMapObject(packet.playerBattleMapObject, GameConfig.PLAYER);
        battleData.setMapObject(packet.opponentBattleMapObject, GameConfig.OPPONENT);

        let shortestPathForEachTilePlayer = FindPathUtil.findShortestPathForEachTile(GameConfig.PLAYER);
        let shortestPathForEachTileOpponent = FindPathUtil.findShortestPathForEachTile(GameConfig.OPPONENT);
        battleData.setShortestPathForEachTile(shortestPathForEachTilePlayer, GameConfig.PLAYER);
        battleData.setShortestPathForEachTile(shortestPathForEachTileOpponent, GameConfig.OPPONENT);
    },

    _handleGetCellObject: function (cmd, packet) {
    },

    _handleGetBattleDeckInBattle: function (cmd, packet) {
        let battleDeck = packet.battleDeck;
        let battleData = BattleManager.getInstance().getBattleData();
        battleData.setCards(battleDeck, GameConfig.PLAYER);
    },

    _handleEndBattle: function (cmd, packet) {
        BattleManager.getInstance().getBattleData().setEnergyHouse(packet.playerEnergyHouse, GameConfig.PLAYER);
        BattleManager.getInstance().getBattleData().setEnergyHouse(packet.opponentEnergyHouse, GameConfig.OPPONENT);
        BattleManager.getInstance().getBattleData().setTrophyChange(packet.trophyChange);
        contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT).setTrophy(packet.trophyAfterBattle);
        this.sendCheckSum(tickManager.checkSumContainer, packet.serverEndBattleTick);
        BattleManager.getInstance().getBattleLayer().stopGame();
    },

    _handleSnapshot: function (cmd, packet) {
        let entityManager = EntityManager.getInstance();
        cc.log("data packet");
        cc.log(JSON.stringify(packet.dataEntity))
        cc.log("Tick receive SnapShot = "+ tickManager.getCurrentTick());
        for (let entityId in packet.dataEntity) {
            let dataEntity = packet.dataEntity[entityId];
            let existEntityInGame = entityManager.getEntity(entityId);

            if (!existEntityInGame) {
                cc.log("create new entity");
                BattleManager.getInstance().getBattleLayer().createMonsterByEntityTypeID(dataEntity.mode, dataEntity.typeID, entityId);
            }
            existEntityInGame = entityManager.getEntity(entityId);
            if (!existEntityInGame) {
                cc.log("Entity Does not Exist");
            }
            cc.log("Exist Entity");
            let dataComponents = dataEntity.components;
            for (let componentTypeID in dataComponents) {
                if (existEntityInGame._hasComponent(componentTypeID)) {
                    let component = existEntityInGame.getComponent(componentTypeID);
                    component.readData(dataComponents[componentTypeID]);
                }
            }
        }
    },


    logSendCommand: function (commandID, packet) {
        cc.warn("[send command] #" + commandID + ": " + JSON.stringify(packet));
    },

    logReceiveCommand: function (commandID, packet) {
        cc.warn("[receive command] #" + commandID + ": " + JSON.stringify(packet));
    }
})