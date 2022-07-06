let BattleNetwork = BattleNetwork || {};

BattleNetwork.Connector = cc.Class.extend({
    ctor: function (gameClient) {
        this.gameClient = gameClient;
        gameClient.packetFactory.addPacketMap(BattleNetwork.packetMap);
        gameClient.receivePacketSignal.add(this.onReceivedPacket, this);
    },

    onReceivedPacket: function (cmd, packet) {
        switch (cmd) {
            case gv.CMD.SEND_GET_BATTLE_MAP:
                this._handleGetBattleMap(cmd, packet);
                break;
        }
    },

    _handleGetBattleMap: function (cmd, packet) {
        cc.log("[ShopNetwork.js] response get battle map");
        GameConfig.battleData = new BattleData();
        GameConfig.battleData.setMap(packet.btmap, GameConfig.PLAYER);
        GameConfig.battleData.setMap(JSON.parse(JSON.stringify(packet.btmap)), GameConfig.OPPONENT);
        GameConfig.battleData.setLongestPath(packet.path, GameConfig.PLAYER);
        GameConfig.battleData.setLongestPath(JSON.parse(JSON.stringify(packet.path)), GameConfig.OPPONENT);

        let shortestPathForEachTilePlayer = FindPathUtil.findShortestPathForEachTile(GameConfig.PLAYER);
        let shortestPathForEachTileOpponent = FindPathUtil.findShortestPathForEachTile(GameConfig.OPPONENT);

        GameConfig.battleData.setShortestPathForEachTile(shortestPathForEachTilePlayer, GameConfig.PLAYER);
        GameConfig.battleData.setShortestPathForEachTile(shortestPathForEachTileOpponent, GameConfig.OPPONENT);
        EventDispatcher.getInstance()
            .dispatchEvent(EventType.FINISH_MATCHING);
    },
})