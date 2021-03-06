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
                fr.getCurrentScreen().showNotice("Đăng nhập thành công")
                setTimeout(function () {
                    fr.getCurrentScreen().onFinishLogin();
                }, 300);
                break;
            case gv.CMD.GET_USER_INFO:
                userInfo.clone(packet);
                userInfo.show();
                // let userContext = contextManager.getContext(ContextManagerConst.USER_CONTEXT);
                let userContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT);
                // contextManager.registerContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT, userContext);
                // let inventoryContext = new InventoryContext();
                // contextManager.registerContext(ContextManagerConst.INVENTORY_CONTEXT, inventoryContext);
                TimeUtil.setDeltaTime(packet.serverTime);
                userContext.setUserInfoFromPackage(userInfo);

                userContext.updateUserInfoUI();
                break;
            case gv.CMD.GET_USER_INVENTORY:
                let inventoryContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.INVENTORY_CONTEXT);

                inventoryContext.setCardCollectionList(packet.cardCollection);
                inventoryContext.setBattleDeckIdList(packet.battleDeckCard);
                ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.BATTLE_DECK_NODE).updateBattleDeck(inventoryContext.battleDeckList);
                // ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.BATTLE_DECK_NODE).setBattleDeck(inventoryContext.battleDeckList);
                // ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.BATTLE_DECK_NODE).setCardInBattleDeckPosition();

                ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.CARD_COLLECTION_NODE).updateCardCollection(inventoryContext.cardCollectionList);
                // ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.CARD_COLLECTION_NODE).setCardCollection(inventoryContext.cardCollectionList);
                // ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.CARD_COLLECTION_NODE).setPositionForCardCollection();

                userCardCollection.getItemList(packet);
                cc.log("GetInventory");
                // userCardCollection.show();
                break;
            case gv.CMD.UPGRADE_CARD:
                cc.log(packet.goldChange + " " + packet.cardType + " " + packet.fragmentChange);
                contextManager.getContext(ContextManagerConst.CONTEXT_NAME.INVENTORY_CONTEXT).onUpgradeCardSuccess(packet);
                break;
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
            case gv.CMD.ADD_USER_GOLD:
                cc.log(packet.goldChange);
                break;
            case gv.CMD.ADD_USER_GEM:
                cc.log(packet.gemChange);
                break;
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
            case gv.CMD.GET_ROOM_INFO:
                cc.log("RECEIVE ROOM INFO in Network.js line 111: " + JSON.stringify(packet));
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
        cc.log("sendGetUserLobbyChest");
        var pk = this.gameClient.getOutPacket(CMDSendGetUserLobbyChest);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },
    sendUnlockLobbyChest: function (chestid) {
        cc.log("sendUnlockLobbyChest");
        var pk = this.gameClient.getOutPacket(CMDSendUnlockLobbyChest);
        pk.pack(chestid);
        this.gameClient.sendPacket(pk);
    },
    sendSpeedUpLobbyChest: function (chestid) {
        cc.log("sendSpeedUpLobbyChest");
        var pk = this.gameClient.getOutPacket(CMDSendSpeedUpLobbyChest);
        pk.pack(chestid);
        this.gameClient.sendPacket(pk);
    },
    sendClaimLobbyChest: function (chestid) {
        cc.log("sendClaimLobbyChest");
        var pk = this.gameClient.getOutPacket(CMDSendClaimLobbyChest);
        pk.pack(chestid);
        this.gameClient.sendPacket(pk);
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

    sendGetRoomInfo: function (roomId) {
        cc.log("GetRoomId");
        var pk = this.gameClient.getOutPacket(CMDSendGetRoomInfo);
        pk.pack(roomId);
        this.gameClient.sendPacket(pk);
    },
    sendLogout:function (){
        cc.log("Send Logout");
        var pk= this.gameClient.getOutPacket(CMDSendLogout);
        pk.pack();
        this.gameClient.sendPacket(pk);
    }

});



