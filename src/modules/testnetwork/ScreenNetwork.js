/**
 * Created by GSN on 7/9/2015.
 */
var ScreenNetwork = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.director.getVisibleSize();
        var loginscene = ccs.load(res.LOGINSCENCE, "").node;
        this.addChild(loginscene);
        loginscene.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2,
        });
        this.loginNotice = ccs.load(res.LOGINNOTICE, "").node;
        this.loginNotice.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2,
            //scale:cc.winSize.width/this.loginNotice.width,
        })
        this.loginNotice.setVisible(false);
        this.addChild(this.loginNotice);
        this.loginNoticeField = this.loginNotice.getChildByName("TextField_2");
        this.loginNode = loginscene;
        let background = this.loginNode.getChildByName("Image_1")
        background.setScale(Math.max(cc.winSize.height / background.height, cc.winSize.width / background.width));
        this.btnLogin = this.loginNode.getChildByName("Button_1");
        this.btnLogin.addClickEventListener(this.onSelectLogin.bind(this));
        this.textFieldUID = this.loginNode.getChildByName("TextField_1");
        this.lblLog = gv.commonText(fr.Localization.text(""), size.width * 0.8, size.height * 0.03);
        this.lblLog.setString(res.version);
        this.addChild(this.lblLog);
        this.scheduleUpdate();
    },
    update: function (dt) {
        if (this.noticeTimer <= 0) this.loginNotice.setVisible(false);
        else this.noticeTimer -= dt;
    },
    onSelectBack: function (sender) {
        fr.view(ScreenMenu);
    },
    onSelectLogin: function (sender) {
        let inputUID = this.textFieldUID.getString();
        if (inputUID == "") this.showNotice("Vui lòng nhập ID");
        else if (this.checkSpecial(inputUID) == true) this.showNotice("ID không chứa kí tự đặc biệt");
        else if (inputUID.length > 15) this.showNotice("Vui lòng nhập UID không vượt quá 15 kí tự");
        else {
            UID = this.textFieldUID.getString();
            cc.log(UID);
            gv.gameClient.connect();
        }
    },
    reset: function () {
        this.loginNotice.setVisible(false);
        this.noticeTimer = 0;
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
        //this.setVisible(false);
        fr.view(MainScreen);
        testnetwork.connector.sendGetUserInfo(); // Nhanaj UserInfo
        testnetwork.connector.sendGetUserLobbyChest();
        testnetwork.connector.sendGetUserInventory();
        // testnetwork.connector.sendGetRoomInfo(1);
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
        // let userContext = new UserContext();
        // contextManager.registerContext(ContextManagerConst.USER_CONTEXT, userContext);
        // userContext.updateUserInfoUI();
        ShopNetwork.connector.sendGetUserDailyShop();
        ShopNetwork.connector.sendGetGoldShop();
        this.reset();
        cc.log("Finished login");
    },
    checkSpecial: function (inputUID) {
        for (i = 0; i < inputUID.length; i++) {
            c = inputUID[i];
            if (c >= '0' && c <= '9' || c >= 'a' && c <= 'z' || c >= "A" && c <= "Z") {
            } else return true;
        }
        return false;
    },
    showNotice: function (message) {
        this.loginNotice.setVisible(true);
        this.loginNoticeField.setString(message);
        this.noticeTimer = 3;
    }
});