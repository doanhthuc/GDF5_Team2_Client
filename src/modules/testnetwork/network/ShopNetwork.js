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
        // shopContext.setDailyShopItemList(packet.dailyShopItem);
        cc.log("Call_handleGetUserDailyShop")
    },

    _handleBuyGoldShop: function (cmd, packet) {
        userInfo.gold += packet.goldChange;
        userInfo.gem += packet.gemChange;
        userInfo.show();
    },

    _handleBuyDailyShop: function (cmd, packet) {
        cc.log("BUY DAILY SHOP");
        cc.log(packet.gemChange + " " + packet.goldChange);
        let userContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT);
        let inventoryContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.INVENTORY_CONTEXT);

        userContext.updateUserGold(packet.goldChange);
        userContext.updateUserGem(packet.gemChange);

        for (let i = 0; i < packet.itemAmount; i++) {
            let card = inventoryContext.getCardById(packet.itemType[i]);
            card.amount += packet.itemQuantity[i];
        }
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
})