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
            case gv.CMD.HAND_SHAKE:
                this.sendLoginRequest();
                break;
            case gv.CMD.USER_LOGIN:
                fr.getCurrentScreen().onFinishLogin();
                break;
            case gv.CMD.GET_USER_INFO:
                userInfo.clone(packet);
                userInfo.show();
                let userContext = contextManager.getContext(ContextManagerConst.USER_CONTEXT);
                userContext.setUserInfoFromPackage(userInfo);
                userContext.updateUserInfoUI();
                break;
            case gv.CMD.GET_USER_INVENTORY:
                userCardCollection.getItemList(packet);
                cc.log("GetInventory");
                userCardCollection.show();
                break;
            case gv.CMD.UPGRADE_CARD:
                cc.log(packet.goldChange + " " + packet.cardType + " " + packet.fragmentChange);
                break;
            case gv.CMD.GET_USER_DAILY_SHOP:
                userDailyShop.getItemList(packet);
                cc.log("GetDailyShop");
                userDailyShop.show();
                break;
            case gv.CMD.GET_USER_LOBBY:
                userLobbyChest.getItemList(packet);
                userLobbyChest.show();
                break;
            case gv.CMD.UNLOCK_LOBBY_CHEST:
                cc.log(packet.lobbyChestid);
                cc.log(packet.state);
                cc.log(packet.claimTime);
                break;
            case gv.CMD.SPEEDUP_LOBBY_CHEST:
                cc.log(packet.lobbyChestid);
                cc.log(packet.state);
                cc.log(packet.gemChange);
                for(i=0;i<packet.rewardSize;i++)
                    cc.log(packet.itemType[i]+" "+packet.itemQuantity[i]);
                break;
            case gv.CMD.CLAIM_LOBBY_CHEST:
                cc.log(packet.lobbyChestid);
                cc.log(packet.state);
                cc.log(packet.gemChange);
                for(i=0;i<packet.rewardSize;i++)
                    cc.log(packet.itemType[i]+" "+packet.itemQuantity[i]);
                break;
            case gv.CMD.ADD_USER_GOLD:
                cc.log(packet.goldChange);
                break;
            case gv.CMD.ADD_USER_GEM:
                cc.log(packet.gemChange);
                break;
            case gv.CMD.BUY_GOLD_SHOP:
                userInfo.gold += packet.goldChange;
                userInfo.gem += packet.gemChange;
                userInfo.show();
                break;
            case gv.CMD.BUY_DAILY_SHOP:
                cc.log("BUY DAILY SHOP");
                cc.log(packet.gemChange + " " + packet.goldChange);
                for (i = 0; i < packet.itemAmount; i++)
                    cc.log(packet.itemType[i] + " " + packet.itemQuantity[i]);
                break;
        }
    },
    sendLoginRequest: function () {
        if (UID != 0) {
            cc.log("sendLoginRequest");
            var pk = this.gameClient.getOutPacket(CmdSendLogin);
            pk.pack("", UID);
            this.gameClient.sendPacket(pk);
        }
    },
    sendGetUserInfo: function () {
        cc.log("sendGetUserInfo");
        var pk = this.gameClient.getOutPacket(CMDSendGetUserInfo);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },
    sendAddUserGold: function (gold) {
        cc.log("sendAdduserGold");
        var pk = this.gameClient.getOutPacket(CMDSendAddUserGold);
        pk.pack(gold);
        this.gameClient.sendPacket(pk);
    },
    sendAddUserGem: function (gem) {
        cc.log("sendAdduserGem");
        var pk = this.gameClient.getOutPacket(CMDSendAddUserGem);
        pk.pack(gem);
        this.gameClient.sendPacket(pk);
    },
    sendGetUserInventory: function () {
        cc.log("sendGetuserInventory");
        var pk = this.gameClient.getOutPacket(CMDSendGetUserInventory);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },
    sendUpgradeCard: function (cardType) {
        cc.log("sendUpgradeCard");
        var pk = this.gameClient.getOutPacket(CMDSendUpgradeCard);
        pk.pack(cardType);
        this.gameClient.sendPacket(pk);
    },
    sendGetUserLobbyChest: function () {
        cc.log("sendGetUserInfo");
        var pk = this.gameClient.getOutPacket(CMDSendGetUserLobbyChest);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },
    sendUnlockLobbyChest: function (chestid) {
        cc.log("sendGetUserInfo");
        var pk = this.gameClient.getOutPacket(CMDSendUnlockLobbyChest);
        pk.pack(chestid);
        this.gameClient.sendPacket(pk);
    },
    sendSpeedUpLobbyChest: function (chestid) {
        cc.log("sendGetUserInfo");
        var pk = this.gameClient.getOutPacket(CMDSendSpeedUpLobbyChest);
        pk.pack(chestid);
        this.gameClient.sendPacket(pk);
    },
    sendClaimLobbyChest: function (chestid) {
        cc.log("sendGetUserInfo");
        var pk = this.gameClient.getOutPacket(CMDSendClaimLobbyChest);
        pk.pack(chestid);
        this.gameClient.sendPacket(pk);
    },
    sendBuyGoldShop: function (itemid) {
        cc.log("SendBuyShopGold");
        var pk = this.gameClient.getOutPacket(CMDBuyGoldShop);
        pk.pack(itemid);
        this.gameClient.sendPacket(pk);
    },
    sendGetUserDailyShop: function () {
        cc.log("sendGetuserInventory");
        var pk = this.gameClient.getOutPacket(CMDSendGetDailyShop);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },
    sendBuyDailyShop: function (itemid) {
        cc.log("SendBuyDailyShop");
        var pk = this.gameClient.getOutPacket(CMDBuyDailyShop);
        pk.pack(itemid);
        this.gameClient.sendPacket(pk);
    },
    sendMove: function (x, y) {
        cc.log("SendMove:", x, y);
        var pk = this.gameClient.getOutPacket(CmdSendMove);
        pk.pack(x, y);
        this.gameClient.sendPacket(pk);
    },
    sendResetMap: function () {
        cc.log("sendResetMap");
        var pk = this.gameClient.getOutPacket(CmdSendResetMap);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },
    // updateUserInfo(pk){
    //     userInfo.gold+=pk.goldchange;
    //     userInfo.gem+=pk.gemchange;
    //
    // }
});



