let BattleNetwork = BattleNetwork || {};

BattleNetwork.Connector = cc.Class.extend({
    ctor: function (gameClient) {
        this.gameClient = gameClient;
        gameClient.packetFactory.addPacketMap(BattleNetwork.packetMap);
        gameClient.receivePacketSignal.add(this.onReceivedPacket, this);
    },

    onReceivedPacket: function (cmd, packet) {
        switch (cmd) {
            case gv.CMD.SEND_MATCHING:
                this._handleMatching(cmd, packet);
                break;
            case gv.CMD.SEND_CANCEL_MATCHING:
                this._handleCancelMatching(cmd, packet);
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
        GameConfig.battleData = new BattleData();
        GameConfig.battleData.setMap(packet.playerMap, GameConfig.PLAYER);
        GameConfig.battleData.setMap(packet.opponentMap, GameConfig.OPPONENT);
        GameConfig.battleData.setLongestPath(packet.playerLongestPath, GameConfig.PLAYER);
        GameConfig.battleData.setLongestPath(packet.opponentLongestPath, GameConfig.OPPONENT);

        let shortestPathForEachTilePlayer = FindPathUtil.findShortestPathForEachTile(GameConfig.PLAYER);
        let shortestPathForEachTileOpponent = FindPathUtil.findShortestPathForEachTile(GameConfig.OPPONENT);

        GameConfig.battleData.setShortestPathForEachTile(shortestPathForEachTilePlayer, GameConfig.PLAYER);
        GameConfig.battleData.setShortestPathForEachTile(shortestPathForEachTileOpponent, GameConfig.OPPONENT);


        let userContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT);
        GameConfig.battleData.setUsername(userContext.getUsername(), GameConfig.PLAYER);
        GameConfig.battleData.setTrophy(userContext.getTrophy(), GameConfig.PLAYER);
        GameConfig.battleData.setUsername(packet.opponentInfo.username, GameConfig.OPPONENT);
        GameConfig.battleData.setTrophy(packet.opponentInfo.trophy, GameConfig.OPPONENT);

        setTimeout(function () {
            fr.view(GameLayer, 0.5, true)
            cc.log("===> Switch to Game Layer Scene !!!")
        }, 2000);
    },

    _handleCancelMatching: function (cmd, packet) {
        cc.warn("Canceled matching")
        fr.view(MainScreen);
    }
})