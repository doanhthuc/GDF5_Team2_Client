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
                cc.log("UUUUUUUUUUUU")
                this._handleGetUserDailyShop(cmd, packet);
                break;
            case gv.CMD.BUY_GOLD_SHOP:
                this._handleBuyGoldShop(cmd, packet);
                break;
            case gv.CMD.BUY_DAILY_SHOP:
                this._handleBuyDailyShop(cmd, packet);
                break;
        }
    },

    _handleGetUserDailyShop: function (cmd, packet) {
        shopContext.setDailyShopItemList(packet.dailyShopItem);
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
        for (let i = 0; i < packet.itemAmount; i++)
            cc.log(packet.itemType[i] + " " + packet.itemQuantity[i]);
    },
})