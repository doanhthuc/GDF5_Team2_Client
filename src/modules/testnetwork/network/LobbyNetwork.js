let LobbyNetwork = LobbyNetwork || {};

LobbyNetwork.Connector = cc.Class.extend({
    ctor: function (gameClient) {
        this.gameClient = gameClient;
        gameClient.packetFactory.addPacketMap(LobbyNetwork.packetMap);
        gameClient.receivePacketSignal.add(this.onReceivedPacket, this);
    },

    onReceivedPacket: function (cmd, packet) {
        cc.log("onReceivedPacket:", cmd);
        switch (cmd) {
            case gv.CMD.GET_USER_LOBBY:
                let treasureContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.TREASURE_CONTEXT);
                treasureContext.setTreasureList(packet);
                userLobbyChest.getItemList(packet);
                userLobbyChest.show();
                break;
            case gv.CMD.UNLOCK_LOBBY_CHEST:
                cc.log(packet.lobbyChestid);
                cc.log(packet.state);
                cc.log(packet.claimTime);
                contextManager.getContext(ContextManagerConst.CONTEXT_NAME.TREASURE_CONTEXT).onUnlockChestSuccess(packet);
                break;
            case gv.CMD.SPEEDUP_LOBBY_CHEST:
                cc.log(packet.lobbyChestid);
                cc.log(packet.state);
                cc.log(packet.gemChange);
                for (i = 0; i < packet.rewardSize; i++)
                    cc.log(packet.itemType[i] + " " + packet.itemQuantity[i]);
                contextManager.getContext(ContextManagerConst.CONTEXT_NAME.TREASURE_CONTEXT).onSpeedUpChestSuccess(packet);
                break;
            case gv.CMD.CLAIM_LOBBY_CHEST:
                cc.log(packet.lobbyChestid);
                cc.log(packet.state);
                cc.log(packet.gemChange);
                for (i = 0; i < packet.rewardSize; i++)
                    cc.log(packet.itemType[i] + " " + packet.itemQuantity[i]);
                contextManager.getContext(ContextManagerConst.CONTEXT_NAME.TREASURE_CONTEXT).onClaimChestSuccess(packet);
                break;
        }
    },

    sendGetUserLobbyChest: function () {
        let pk = this.gameClient.getOutPacket(CMDSendGetUserLobbyChest);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },
    sendUnlockLobbyChest: function (chestId) {
        let pk = this.gameClient.getOutPacket(CMDSendUnlockLobbyChest);
        pk.pack(chestId);
        this.gameClient.sendPacket(pk);
    },
    sendSpeedUpLobbyChest: function (chestId) {
        let pk = this.gameClient.getOutPacket(CMDSendSpeedUpLobbyChest);
        pk.pack(chestId);
        this.gameClient.sendPacket(pk);
    },
    sendClaimLobbyChest: function (chestId) {
        let pk = this.gameClient.getOutPacket(CMDSendClaimLobbyChest);
        pk.pack(chestId);
        this.gameClient.sendPacket(pk);
    },
});