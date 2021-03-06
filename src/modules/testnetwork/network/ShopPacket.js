gv.CMD = gv.CMD || {};
gv.CMD.BUY_GOLD_SHOP = 2001;
gv.CMD.BUY_DAILY_SHOP = 2002;
gv.CMD.GET_USER_DAILY_SHOP = 2003;
gv.CMD.GET_GOLD_SHOP = 2004;

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

CMDSendGetGoldShop = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.GET_GOLD_SHOP);
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

    },

    readData: function () {
        this.dailyShopItem = [];
        this.size = this.getInt();
        for (let i = 0; i < this.size; i++) {
            let id = this.getInt();
            let itemType = this.getInt();
            let itemQuantity = this.getInt();
            let itemPrice = this.getInt();
            let itemState = this.getInt();
            this.dailyShopItem.push(new ShopItem(id, itemType, itemQuantity, itemPrice, itemState));
        }
    }
});

ShopNetwork.packetMap[gv.CMD.GET_GOLD_SHOP] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.goldShopItems = [];
        this.size = this.getInt();
        for (let i = 0; i < this.size; i++) {
            let id = this.getInt();
            let itemType = this.getInt();
            let itemQuantity = this.getInt();
            let itemPrice = this.getInt();
            let itemState = this.getInt();
            this.goldShopItems.push(new ShopItem(id, itemType, itemQuantity, itemPrice, itemState));
        }
    }
});

ShopNetwork.packetMap[gv.CMD.BUY_GOLD_SHOP] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.id = this.getInt();
        this.goldChange = this.getInt();
        this.gemChange = this.getInt();
    }
});

ShopNetwork.packetMap[gv.CMD.BUY_DAILY_SHOP] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.itemType = [];
        this.itemQuantity = [];
        this.id = this.getInt();
        this.goldChange = this.getInt();
        this.gemChange = this.getInt();
        this.itemAmount = this.getInt();
        for (let i = 0; i < this.itemAmount; i++) {
            this.itemType.push(this.getInt());
            this.itemQuantity.push(this.getInt());
        }
    }
});

