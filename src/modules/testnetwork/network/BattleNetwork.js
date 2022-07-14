let BattleNetwork = BattleNetwork || {};

BattleNetwork.Connector = cc.Class.extend({
    ctor: function (gameClient) {
        this.gameClient = gameClient;
        gameClient.packetFactory.addPacketMap(BattleNetwork.packetMap);
        gameClient.receivePacketSignal.add(this.onReceivedPacket, this);
    },

    onReceivedPacket: function (cmd, packet) {
        cc.warn('[BattleNetwork.js] onReceivedPacket: ' + cmd + "   " + JSON.stringify(packet));
        switch (cmd) {
            case gv.CMD.SEND_MATCHING:
                this._handleMatching(cmd, packet);
                break;
            case gv.CMD.SEND_CANCEL_MATCHING:
                this._handleCancelMatching(cmd, packet);
                break;
            case gv.CMD.PUT_TOWER:
                this._handlePutTower(cmd, packet);
                break;
            case gv.CMD.OPPONENT_PUT_TOWER:
                cc.log('[BattleNetwork.js] line 23 Opponent Put Tower');
                this._handleOpponentPutTower(cmd, packet);
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

        setTimeout(function () {
            fr.view(BattleLayer, 0.5, true)
            cc.log("===> Switch to Game Layer Scene !!!")
        }, 2000);
    },

    _handleCancelMatching: function (cmd, packet) {
        cc.warn("Canceled matching")
        fr.view(MainScreen);
    },

    sendPutTower: function (roomId, towerId, tilePos, pixelPos) {
        let pk = this.gameClient.getOutPacket(CMDPutTower);
        pk.pack(roomId, towerId, tilePos, pixelPos);
        this.gameClient.sendPacket(pk);
    },

    _handlePutTower: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 76] received put tower packet: ' + JSON.stringify(packet));

    },

    _handleOpponentPutTower: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 80] received put tower packet: ' + JSON.stringify(packet));
        BattleManager.getInstance().getBattleData().getMap(GameConfig.OPPONENT)[packet.tileX][packet.tileY] = 7;
        let pixelPos = Utils.tile2Pixel(packet.tileX, packet.tileY, GameConfig.OPPONENT);
        cc.log('[BattleNetwork.js line 88] pixelPos: ' + JSON.stringify(pixelPos));
        OpponentAction.getInstance().putCardAt(pixelPos, packet.towerId);
        // BattleManager.getInstance().getBattleData().getMap(GameConfig.OPPONENT).show();
    }
})