var gv = gv || {};
var testnetwork = testnetwork || {};

gv.CONSTANT = gv.CONSTANT || {};
gv.CONSTANT.USERID = 1;

testnetwork.Connector = cc.Class.extend({
    ctor: function (gameClient) {
        this.gameClient = gameClient;
        gameClient.packetFactory.addPacketMap(testnetwork.packetMap);
        gameClient.receivePacketSignal.add(this.onReceivedPacket, this);
    },
    onReceivedPacket: function (cmd, packet) {
        cc.log("onReceivedPacket:", cmd);
        switch (cmd) {
            //cheat
            case gv.CMD.CHEAT_USER_INFO:
                cc.log("CHEAT USER INFO");
                cc.log(packet.gold + " " + packet.gem + " " + packet.trophy);
                contextManager.getContext(ContextManagerConst.CONTEXT_NAME.CHEAT_CONTEXT).onUserInfoCheatSuccess(packet);
                break;
            case gv.CMD.CHEAT_USER_CARD:
                cc.log("CHEAT USER CARD")
                cc.log(packet.cardType + " " + packet.cardLevel + " " + packet.amount);
                contextManager.getContext(ContextManagerConst.CONTEXT_NAME.CHEAT_CONTEXT).onCardCheatSuccess(packet);
                break;
            case gv.CMD.CHEAT_USER_LOBBY_CHEST:
                cc.log("CHEAT LOBBY CHEST");
                cc.log(packet.chestId + " " + packet.chestState + " " + packet.chestClaimTime);
                contextManager.getContext(ContextManagerConst.CONTEXT_NAME.CHEAT_CONTEXT).onChestCheatSuccess(packet);
                break;
            case gv.CMD.SEND_GET_BATTLE_MAP:
                cc.log("asdasdas");
                cc.log(JSON.stringify(packet));
                break;
            case gv.CMD.SEND_LOGOUT:
                cc.log("logout");
                contextManager.resetContextData();
                gv.gameClient.getNetwork().disconnect();
                fr.view(ScreenNetwork);
                break;
        }
    },

    // cheat:
    sendCheatUserInfo: function (userInfoCheat) {
        cc.log("CheatUserInfo");
        var pk = this.gameClient.getOutPacket(CMDCheatUserInfo);
        pk.pack(userInfoCheat);
        this.gameClient.sendPacket(pk);
    },
    sendCheatUserCard: function (cardInfoCheat) {
        cc.log("CheatUserCardCollection");
        var pk = this.gameClient.getOutPacket(CMDCheatUserCard);
        pk.pack(cardInfoCheat);
        this.gameClient.sendPacket(pk);
    },
    sendCheatUserLobbyChest: function (chestInfoCheat) {
        cc.log("CheatLobbyChest");
        var pk = this.gameClient.getOutPacket(CMDCheatUserLobbyChest);
        pk.pack(chestInfoCheat);
        this.gameClient.sendPacket(pk);
    },
    sendGetBattleMap: function () {
        cc.log("GetBattleMap");
        var pk = this.gameClient.getOutPacket(CMDSendGetBattleMap);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    sendLogout:function (){
        cc.log("Send Logout");
        var pk= this.gameClient.getOutPacket(CMDSendLogout);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

});



