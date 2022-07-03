let ShopNetwork = ShopNetwork || {};

ShopNetwork.Connector = cc.Class.extend({
    ctor: function (gameClient) {
        this.gameClient = gameClient;
        gameClient.packetFactory.addPacketMap(ShopNetwork.packetMap);
        gameClient.receivePacketSignal.add(this.onReceivedPacket, this);
    },

    onReceivedPacket: function (cmd, packet) {
        switch (cmd) {
            case gv.CMD.GET_USER_DAILY_SHOP:
                this._handleGetUserDailyShop(cmd, packet);
                break;
            case gv.CMD.BUY_GOLD_SHOP:
                this._handleBuyGoldShop(cmd, packet);
                break;
            case gv.CMD.GET_GOLD_SHOP:
                this._handleGetGoldShop(cmd, packet);
                break;
            case gv.CMD.BUY_DAILY_SHOP:
                this._handleBuyDailyShop(cmd, packet);
                break;
            case gv.CMD.SEND_GET_BATTLE_MAP:
                this._handleGetBattleMap(cmd, packet);
                break;
        }
    },

    _handleGetUserDailyShop: function (cmd, packet) {
        cc.log("@@@@@@@@@@@")
        cc.log(JSON.stringify(packet.dailyShopItem));
        shopContext.setDailyShopItemList(packet.dailyShopItem);
        cc.log("Call_handleGetUserDailyShop")
    },

    _handleGetGoldShop: function (cmd, packet) {
        cc.log("@@@@@@@@@@@ Gold shop")
        cc.log(JSON.stringify(packet.goldShopItems));
        shopContext.setGoldItemList(packet.goldShopItems);
        cc.log("Call_handleGetUserDailyShop")
    },

    _handleBuyGoldShop: function (cmd, packet) {
        if (packet.error === 0) {
            cc.log("[ShopNetwork.js] response buy gold shop goldChange = " + packet.goldChange + ", gemChange = " + packet.gemChange);
            let userContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT);
            userContext.updateUserGem(packet.gemChange);
            userContext.updateUserGold(packet.goldChange);
            let shopLayer = ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.SHOP_NODE);
            shopLayer.closePopup();
        } else {
            cc.log("[ShopNetwork.js] error response buy gold shop");
        }
    },

    _handleBuyDailyShop: function (cmd, packet) {
        if (packet.error === 0) {
            cc.log("[ShopNetwork.js] Response Buy Daily Shop");
            cc.log(JSON.stringify(packet));
            cc.log(packet.gemChange + " " + packet.goldChange);

            let userContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT);
            let inventoryContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.INVENTORY_CONTEXT);

            userContext.updateUserGold(packet.goldChange);
            userContext.updateUserGem(packet.gemChange);
            for (let i = 0; i < packet.itemAmount; i++) {
                inventoryContext.updateCardAmount(packet.itemType[i], packet.itemQuantity[i]);
            }

            let shopLayer = ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.SHOP_NODE);
            shopLayer.disableCardItemInDailySection(packet.id);
            shopLayer.closePopup();
        } else {
            cc.log("[ShopNetwork.js] error Buy Daily Shop");
        }
    },

    _handleGetBattleMap: function (cmd, packet) {
        cc.log("[ShopNetwork.js] response get battle map");
        GameConfig.battleData = new BattleData();
        GameConfig.battleData.setMap(packet.btmap, GameConfig.PLAYER);
        GameConfig.battleData.setMap(JSON.parse(JSON.stringify(packet.btmap)), GameConfig.OPPONENT);
        GameConfig.battleData.setLongestPath(packet.path, GameConfig.PLAYER);
        GameConfig.battleData.setLongestPath(JSON.parse(JSON.stringify(packet.path)), GameConfig.OPPONENT);

        let shortestPathForEachTilePlayer = findShortestPathForEachTile(GameConfig.PLAYER);
        let shortestPathForEachTileOpponent = findShortestPathForEachTile(GameConfig.OPPONENT);

        GameConfig.battleData.setShortestPathForEachTile(shortestPathForEachTilePlayer, GameConfig.PLAYER);
        GameConfig.battleData.setShortestPathForEachTile(shortestPathForEachTileOpponent, GameConfig.OPPONENT);
        EventDispatcher.getInstance()
            .dispatchEvent(EventType.FINISH_MATCHING);
    },

    sendBuyGoldShop: function (itemId) {
        cc.log("SendBuyShopGold");
        let pk = this.gameClient.getOutPacket(CMDBuyGoldShop);
        pk.pack(itemId);
        this.gameClient.sendPacket(pk);
    },

    sendGetUserDailyShop: function () {
        cc.log("sendGetUserDailyShop");
        let pk = this.gameClient.getOutPacket(CMDSendGetDailyShop);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    sendGetGoldShop: function () {
        cc.log("sendGetGoldShop");
        let pk = this.gameClient.getOutPacket(CMDSendGetGoldShop);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    sendBuyDailyShop: function (itemId) {
        let pk = this.gameClient.getOutPacket(CMDBuyDailyShop);
        pk.pack(itemId);
        this.gameClient.sendPacket(pk);
    },

    sendGetBattleMap: function () {
        let pk = this.gameClient.getOutPacket(CMDSendGetBattleMap);
        pk.pack();
        this.gameClient.sendPacket(pk);
    }
})