/**
 * Created by KienVN on 10/2/2017.
 */

gv.CMD = gv.CMD || {};

gv.CMD.CHEAT_USER_INFO = 7001;
gv.CMD.CHEAT_USER_CARD = 7002;
gv.CMD.CHEAT_USER_LOBBY_CHEST = 7003;

testnetwork = testnetwork || {};
testnetwork.packetMap = {};

/** Outpacket */

//Cheat
CMDCheatUserInfo = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.CHEAT_USER_INFO);
        },
        pack: function (userInfoCheat) {
            this.packHeader();
            this.putInt(userInfoCheat.gold);
            this.putInt(userInfoCheat.gem);
            this.putInt(userInfoCheat.trophy);
            this.updateSize();
        }
    }
)

CMDCheatUserCard = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.CHEAT_USER_CARD);
        },
        pack: function (cardCollectionCheat) {
            this.packHeader();
            this.putInt(cardCollectionCheat.cardType);
            this.putInt(cardCollectionCheat.cardLevel);
            this.putInt(cardCollectionCheat.amount);
            this.updateSize();
        }
    }
)

CMDCheatUserLobbyChest = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.CHEAT_USER_LOBBY_CHEST);
        },
        pack: function (chestInfoCheat) {
            this.packHeader();
            this.putInt(chestInfoCheat.chestId);
            this.putInt(chestInfoCheat.chestState);
            this.putInt(chestInfoCheat.chestRemainingTime);
            this.updateSize();
        }
    }
)

/** Inpacket */
testnetwork.packetMap[gv.CMD.GET_USER_INFO] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            this.id = this.getInt();
            this.username = this.getString();
            this.gold = this.getInt();
            this.gem = this.getInt();
            this.trophy = this.getInt();
            this.serverTime = this.getLong();
        }
    }
);

//Cheat in Packet
testnetwork.packetMap[gv.CMD.CHEAT_USER_INFO] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            this.gold = this.getInt();
            this.gem = this.getInt();
            this.trophy = this.getInt();
        }
    }
);
testnetwork.packetMap[gv.CMD.CHEAT_USER_CARD] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            this.cardType = this.getInt();
            this.cardLevel = this.getInt();
            this.amount = this.getInt();
        }
    }
);
testnetwork.packetMap[gv.CMD.CHEAT_USER_LOBBY_CHEST] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            this.chestId = this.getInt();
            this.chestState = this.getInt();
            this.chestClaimTime = this.getLong();
        }
    }
);

