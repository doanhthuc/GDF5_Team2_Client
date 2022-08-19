gv.CMD = gv.CMD || {};

gv.CMD.HAND_SHAKE = 0;
gv.CMD.USER_LOGIN = 1;
gv.CMD.GET_USER_INFO = 1001;
gv.CMD.ADD_USER_GOLD = 1002;
gv.CMD.ADD_USER_GEM = 1003;
gv.CMD.SEND_LOGOUT = 1004;

AuthNetwork.packetMap = {};

//Handshake
CmdSendHandshake = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setControllerId(gv.CONTROLLER_ID.SPECIAL_CONTROLLER);
            this.setCmdId(gv.CMD.HAND_SHAKE);
        },
        putData: function () {
            //pack
            this.packHeader();
            //update
            this.updateSize();
        }
    }
)

CmdSendLogin = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.USER_LOGIN);
        },
        pack: function (sessionKey, userID) {
            this.packHeader();
            cc.log("[Packet.js] user id = " + userID);
            this.putString(sessionKey);
            this.putString(userID);
            this.updateSize();
        }
    }
)
CMDSendGetUserInfo = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.GET_USER_INFO);
        },
        pack: function () {
            this.packHeader();
            //this.putInt(userID);
            this.updateSize();
        }
    }
)
CMDSendLogout = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.SEND_LOGOUT);
        },
        pack: function () {
            this.packHeader();
            //this.putInt(userID);
            this.updateSize();
        }
    }
)

/**
 * InPacket
 */

//Handshake
AuthNetwork.packetMap[gv.CMD.HAND_SHAKE] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            this.token = this.getString();
        }
    }
);

AuthNetwork.packetMap[gv.CMD.USER_LOGIN] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
        }
    }
);

AuthNetwork.packetMap[gv.CMD.SEND_LOGOUT] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
        }
    }
);