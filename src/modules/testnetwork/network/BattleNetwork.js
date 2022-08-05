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
                this.logReceiveCommand(gv.CMD.PUT_TOWER, packet);
                tickManager.addInput(packet.tickNumber, cmd, packet);
                break;
            case gv.CMD.OPPONENT_PUT_TOWER:
                this.logReceiveCommand(gv.CMD.OPPONENT_PUT_TOWER, packet);
                tickManager.addInput(packet.tickNumber, cmd, packet);
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
                tickManager.addInput(packet.tickNumber, cmd, packet);
                break;
            case gv.CMD.OPPONENT_UPGRADE_TOWER:
                tickManager.addInput(packet.tickNumber, cmd, packet);
                break;
            case gv.CMD.DROP_SPELL:
                tickManager.addInput(packet.tickNumber, cmd, packet);
                break;
            case gv.CMD.OPPONENT_DROP_SPELL:
                tickManager.addInput(packet.tickNumber, cmd, packet);
                break;
            case gv.CMD.CHANGE_TOWER_STRATEGY:
                tickManager.addInput(packet.tickNumber, cmd, packet);
                break;
            case gv.CMD.OPPONET_CHANGE_TOWER_STRATEGY:
                tickManager.addInput(packet.tickNumber, cmd, packet);
                break;
            case gv.CMD.PUT_TRAP:
                tickManager.addInput(packet.tickNumber, cmd, packet);
                break;
            case gv.CMD.OPPONENT_PUT_TRAP:
                tickManager.addInput(packet.tickNumber, cmd, packet);
                break;
            case gv.CMD.DESTROY_TOWER:
                tickManager.addInput(packet.tickNumber, cmd, packet);
                break;
            case gv.CMD.OPPONENT_DESTROY_TOWER:
                tickManager.addInput(packet.tickNumber, cmd, packet);
                break;
            case gv.CMD.END_BATTLE:
                this._handleEndBattle(cmd, packet);
                break;
            case gv.CMD.GET_BATTLE_DECK_IN_BATTLE:
                this._handleGetBattleDeckInBattle(cmd, packet);
                break;
        }
    },

    sendMatching: function () {
        let pk = this.gameClient.getOutPacket(CMDSendMatching);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    sendCancelMatching: function () {
        let pk = this.gameClient.getOutPacket(CMDSendCancelMatching);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    _handleMatching: function (cmd, packet) {
        cc.log("[ShopNetwork.js] received matching packet: " + JSON.stringify(packet));
        let battleData = new BattleData();
        BattleManager.getInstance().registerBattleData(battleData, true);
        battleData.setRoomId(packet.roomId)
        battleData.setMap(packet.playerMap, GameConfig.PLAYER);
        battleData.setMap(packet.opponentMap, GameConfig.OPPONENT);
        // battleData.setMapObject(packet.playerMap, GameConfig.PLAYER);
        // battleData.setMapObject(packet.playerMap, GameConfig.OPPONENT);
        battleData.setLongestPath(packet.playerLongestPath, GameConfig.PLAYER);
        battleData.setLongestPath(packet.opponentLongestPath, GameConfig.OPPONENT);

        let shortestPathForEachTilePlayer = FindPathUtil.findShortestPathForEachTile(GameConfig.PLAYER);
        let shortestPathForEachTileOpponent = FindPathUtil.findShortestPathForEachTile(GameConfig.OPPONENT);
        battleData.setShortestPathForEachTile(shortestPathForEachTilePlayer, GameConfig.PLAYER);
        battleData.setShortestPathForEachTile(shortestPathForEachTileOpponent, GameConfig.OPPONENT);


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
        this.logSendCommand(gv.CMD.UPGRADE_TOWER, {towerId, pixelPos});
        this.gameClient.sendPacket(pk);
    },

    sendPutTrap: function (tilePos) {
        let pk = this.gameClient.getOutPacket(CMDPutTrap);
        pk.pack(tilePos);
        this.gameClient.sendPacket(pk);
    },

    sendChangeTowerTargetStrategy: function (towerTilePos, targetStrategy) {
        let pk = this.gameClient.getOutPacket(CMDChangeTowerStrategy);
        pk.pack(towerTilePos, targetStrategy);
        this.gameClient.sendPacket(pk);
    },

    sendDestroyTower: function (tilePos) {
        let pk = this.gameClient.getOutPacket(CMDDestroyTower);
        pk.pack(tilePos);
        this.logSendCommand(gv.CMD.UPGRADE_TOWER, {tilePos});
        this.gameClient.sendPacket(pk);
    },

    _handleGetBattleInfo: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 154] received battleInfo: ' + JSON.stringify(packet));

        // IMPORTANT: remove battle data save battle start time
        let battleData = BattleManager.getInstance().getBattleData();
        battleData.setBattleStartTime(packet.battleStartTime);
        tickManager.setStartTime(packet.battleStartTime);

        cc.warn("packet.battleStartTime = " + packet.battleStartTime);
        cc.log("time server = " + TimeUtil.getServerTime());
        tickManager.getTickData().setBattleTimerData(battleData.getTimer());
        BattleManager.getInstance().getBattleData().setWaveAmount(packet.waveAmount);
        BattleManager.getInstance().getBattleData().setMonsterWave(packet.monsterWave);
        //let battleData = BattleManager.getInstance().getBattleData();
        // cc.log(battleData.battleStartTime);
        // cc.log(TimeUtil.getServerTime());
        // cc.log(TimeUtil.getDeltaTime())
        setTimeout(function () {
            fr.view(BattleLayer, 0.5, true)
            cc.log("===> Switch to Game Layer Scene !!!")
        }, 2000);
    },

    _handleGetBattleMapObject: function (cmd, packet) {
        //  cc.log('[BattleNetwork.js line 95] received get battle map object packet: ' + JSON.stringify(packet));
        let battleData = BattleManager.getInstance().getBattleData();
        battleData.setMapObject(packet.playerBattleMapObject, GameConfig.PLAYER);
        battleData.setMapObject(packet.opponentBattleMapObject, GameConfig.OPPONENT);
        let battleMapObject = battleData.getMapObject(GameConfig.PLAYER);
        // for (let i = 0; i < battleMapObject.length; i++) {
        //     for (let j = 0; j < battleMapObject[i].length; j++) {
        //         cc.log('[BattleNetwork.js line 102] battleMapObject: ' + JSON.stringify(battleMapObject[i][j]));
        //     }
        // }
    },

    _handleGetCellObject: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 113] received get cell object packet: ' + JSON.stringify(packet));
    },

    _handleGetBattleDeckInBattle: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 117] received get battle deck in battle packet: ' + JSON.stringify(packet));
        let battleDeck = packet.battleDeck;
        cc.log(JSON.stringify(battleDeck));
    },

    _handleEndBattle: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 303] received end battle packet: ' + JSON.stringify(packet));
        BattleManager.getInstance().getBattleData().setEnergyHouse(packet.playerEnergyHouse, GameConfig.PLAYER);
        BattleManager.getInstance().getBattleData().setEnergyHouse(packet.opponentEnergyHouse, GameConfig.OPPONENT);
        BattleManager.getInstance().getBattleData().setTrophyChange(packet.trophyChange);
        contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT).setTrophy(packet.trophyAfterBattle);
        BattleManager.getInstance().getBattleLayer().stopGame();
    },

    logSendCommand: function (commandID, packet) {
        cc.warn("[send command] #" + commandID + ": " + JSON.stringify(packet));
    },

    logReceiveCommand: function (commandID, packet) {
        cc.warn("[receive command] #" + commandID + ": " + JSON.stringify(packet));
    }
})