let ShopNetwork = ShopNetwork || {};

ShopNetwork.packetMap = {};

// Out Package
CMDSendGetDailyShop = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.GET_USER_DAILY_SHOP);
    },
    pack: function () {
        this.packHeader();
        this.updateSize();
    }
})

CMDBuyGoldShop = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.BUY_GOLD_SHOP);
    },
    pack: function (itemId) {
        this.packHeader();
        this.putInt(itemId);
        this.updateSize();
    }
})

CMDBuyDailyShop = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.BUY_DAILY_SHOP);
    },
    pack: function (itemId) {
        this.packHeader();
        this.putInt(itemId);
        this.updateSize();
    }
})

// In Package
ShopNetwork.packetMap[gv.CMD.GET_USER_DAILY_SHOP] = fr.InPacket.extend({
    ctor: function () {
        this._super();
        this.dailyShopItem = [];
    },

    readData: function () {
        this.error = this.getShort();
        this.size = this.getInt();
        for (let i = 0; i < this.size; i++) {
            let itemType = this.getInt();
            let itemQuantity = this.getInt();
            let itemPrice = this.getInt();
            let itemState = this.getInt();
            this.dailyShopItem.push(new ShopItem(itemType, itemQuantity, itemPrice, itemState));
        }
    }
});

ShopNetwork.packetMap[gv.CMD.BUY_GOLD_SHOP] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.error = this.getShort();
        this.goldChange = this.getInt();
        this.gemChange = this.getInt();
    }
});

ShopNetwork.packetMap[gv.CMD.BUY_DAILY_SHOP] = fr.InPacket.extend({
    ctor: function () {
        this._super();
        this.itemType = [];
        this.itemQuantity = [];
    },
    
    readData: function () {
        this.error = this.getShort();
        this.goldChange = this.getInt();
        this.gemChange = this.getInt();
        this.itemAmount = this.getInt();
        for (let i = 0; i < this.itemAmount; i++) {
            this.itemType.push(this.getInt());
            this.itemQuantity.push(this.getInt());
        }
    }
});