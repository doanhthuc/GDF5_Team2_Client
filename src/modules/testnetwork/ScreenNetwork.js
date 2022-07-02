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

        //this.initGame();
    },
    reset: function () {
        for (var i = 0; i < MAP_SIZE; i++) {
            for (var j = 0; j < MAP_SIZE; j++) {
                this.setTileAvailable(i, j);
            }
        }
        this.character.setPosition(this.getPositionFromTilePos(0, 0));
        this.setTileUnavailable(0, 0);
        this.character.tileX = 0;
        this.character.tileY = 0;
    },
    setTileAvailable: function (x, y) {
        this.tileImgs[x][y].setColor(cc.color.WHITE);
    },
    onSelectBack: function (sender) {
        fr.view(ScreenMenu);
    },
    onSelectLogin: function (sender) {
        this.schedule(function () {
            if (UID == userInfo.id) this.lblLog.setString("Đăng Nhập Thành Công");
            else this.lblLog.setString("Bạn nhập sai ID")
        });
        if (this.textFieldUID.getString() == "") this.lblLog.setString("Bạn Chưa nhập ID");
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
        testnetwork.connector.sendGetUserLobbyChest();
        testnetwork.connector.sendGetUserInventory();
        //testnetwork.connector.sendUpgradeCard(2);
        //testnetwork.connector.sendGetUserDailyShop();
        // testnetwork.connector.sendAddUserGem(100);
        // testnetwork.connector.sendAddUserGold(100);
        //testnetwork.connector.sendBuyGoldShop(0);
        //testnetwork.connector.sendBuyDailyShop(2);
        //testnetwork.connector.sendUnlockLobbyChest(0);
        //testnetwork.connector.sendSpeedUpLobbyChest(1);
        // testnetwork.connector.sendClaimLobbyChest(2);
        // let userContext = new UserContext();
        // contextManager.registerContext(ContextManagerConst.USER_CONTEXT, userContext);
        // userContext.updateUserInfoUI();
        testnetwork.connector.sendGetUserDailyShop();
        cc.log("Finished login");
    },
    updateMove: function (isCanMove, x, y) {
        if (isCanMove) {
            this.characterMoveTo(x, y);
        } else {
            this.lblLog.setString("Can't Move!");
        }
    },
    characterMoveTo: function (x, y) {
        cc.log("characterMoveTo", x, y);
        this._isMoving = true;
        var callback = cc.callFunc(this.characterMoveFinished, this);
        var move = cc.moveTo(0.2, this.getPositionFromTilePos(x, y)).easing(cc.easeSineIn());
        var sequence = cc.sequence(move, callback);
        this.character.runAction(sequence);
        this.character.tileX = x;
        this.character.tileY = y;
    },
    characterMoveFinished: function () {
        this._isMoving = false;
        this.setTileUnavailable(this.character.tileX, this.character.tileY);
    },
    updateMap: function (mapInfo) {
        for (var i = 0; i < MAP_SIZE; i++) {
            for (var j = 0; j < MAP_SIZE; j++) {
                if (mapInfo.mapState[i][j]) {
                    this.setTileUnavailable(i, j);
                } else {
                    this.setTileAvailable(i, j);
                }
            }
        }
        this.character.setPosition(this.getPositionFromTilePos(mapInfo.x, mapInfo.y));
        this.character.tileX = mapInfo.x;
        this.character.tileY = mapInfo.y;
    },
    sendMove: function (x, y) {
        if (this._isMoving) {
            this.lblLog.setString("Moving!");
            return;
        }
        testnetwork.connector.sendMove(x, y);
    }

});