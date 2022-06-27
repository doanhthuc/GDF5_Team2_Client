let Context = cc.Class.extend({

});

let ShopContext = Context.extend({
    ctor: function () {
        this._dailyShopItemList = [];
    },

    setDailyShopItemList: function (itemList) {
        this._dailyShopItemList = itemList;
        ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.SHOP_NODE)
            .renderDailySection(this._dailyShopItemList);
    },
});