let Context = cc.Class.extend({

});

let DailyShopData = cc.Class.extend({
    ctor: function (itemList, futureResetTime) {
        this.itemList = itemList;
        this.futureResetTime = futureResetTime;
    },
})

let ShopContext = Context.extend({
    ctor: function () {
        this.dailyShopData = null;
        this._goldItemList = [];
    },

    setDailyShopData: function (itemList) {
        this.dailyShopData = itemList;
        ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.SHOP_NODE)
            .renderDailySection(this.dailyShopData);
    },

    setGoldItemList: function (itemList) {
        this._goldItemList = itemList;
        cc.log(JSON.stringify(this._goldItemList))
        ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.SHOP_NODE)
            .renderGoldSection(this._goldItemList);
    },

    resetContextData: function () {
        this._dailyShopItemList = [];
        this._goldItemList = [];
    }
});