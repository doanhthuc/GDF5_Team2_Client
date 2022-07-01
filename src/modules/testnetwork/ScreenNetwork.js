/**
 * Created by GSN on 7/9/2015.
 */
MAP_SIZE = 8;
TILE_SIZE = 64;
var ScreenNetwork = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.director.getVisibleSize();
        var loginscene = ccs.load(res.LOGINSCENCE, "");
        this.addChild(loginscene.node);
        this.loginNode = loginscene.node;
        this.btnLogin = this.loginNode.getChildByName("Button_1");
        this.btnLogin.addClickEventListener(this.onSelectLogin.bind(this));
        this.textFieldUID = this.loginNode.getChildByName("TextField_1");
        this.lblLog = gv.commonText(fr.Localization.text("..."), size.width * 0.5, size.height * 0.05);
        this.addChild(this.lblLog);

    },
    onSelectBack: function (sender) {
        fr.view(ScreenMenu);
    },
    onSelectLogin: function (sender) {
        inputUID = this.textFieldUID.getString();
        if (inputUID=="") this.lblLog.setString("Bạn Chưa nhập ID");
        else if (isNaN(inputUID)) this.lblLog.setString("Vui lòng nhập ID là các chữ số")
        else if (inputUID.length > 15) this.lblLog.setString("Vui lòng nhập UID dưới 15 kí tự");
        else {
            UID = this.textFieldUID.getString();
            cc.log(UID);
            gv.gameClient.connect();
        }
    },
    onSelectDisconnect: function (sender) {
        this.lblLog.setString("Coming soon!");
    },
    onSelectReconnect: function (sender) {
        this.lblLog.setString("Coming soon!");
    },
    onConnectSuccess: function () {
        cc.log("Connect Success!");
    },
    onConnectFail: function (text) {
        this.lblLog.setString("Connect fail: " + text);
    },
    onFinishLogin: function () {
        fr.view(MainScreen);
        testnetwork.connector.sendGetUserInfo(); // Nhanaj UserInfo
        // testnetwork.connector.sendGetUserLobbyChest();
         //testnetwork.connector.sendGetUserInventory();
         //testnetwork.connector.sendGetUserGoldShop();
        //testnetwork.connector.sendUpgradeCard(2);
        //.connector.sendGetUserDailyShop();
        // testnetwork.connector.sendAddUserGem(100);
        // testnetwork.connector.sendAddUserGold(100);
        // testnetwork.connector.sendBuyGoldShop(0);
        // testnetwork.connector.sendBuyDailyShop(0);
        //testnetwork.connector.sendUnlockLobbyChest(0);
        // testnetwork.connector.sendSpeedUpLobbyChest(1);
        // testnetwork.connector.sendClaimLobbyChest(2);
        // testnetwork.connector.sendCheatUserInfo(new UserInfoCheat(10000,2000,1000));
        // testnetwork.connector.sendCheatUserCard(new Card(2,5,200));
        // testnetwork.connector.sendCheatUserLobbyChest(new ChestInfoCheat(0, 1, 30 * 60 * 1000));
        //testnetwork.connector.sendBuyDailyShop(2);
        testnetwork.connector.sendGetBattleMap();
        cc.log("Finished login");
    }
});