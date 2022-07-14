let Context = cc.Class.extend({

});

let ShopContext = Context.extend({
    ctor: function () {
        this._dailyShopItemList = [];
        this._goldItemList = [];
    },

    setDailyShopItemList: function (itemList) {
        this._dailyShopItemList = itemList;
        ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.SHOP_NODE)
            .renderDailySection(this._dailyShopItemList);
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