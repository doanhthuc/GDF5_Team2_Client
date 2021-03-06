/**
 * Created by KienVN on 10/2/2017.
 */

gv.CMD = gv.CMD || {};
gv.CMD.HAND_SHAKE = 0;
gv.CMD.USER_LOGIN = 1;
gv.CMD.GET_USER_INFO = 1001;
gv.CMD.ADD_USER_GOLD = 1002;
gv.CMD.ADD_USER_GEM = 1003;
gv.CMD.SEND_LOGOUT = 1004;

gv.CMD.GET_USER_INVENTORY = 3001;
gv.CMD.UPGRADE_CARD = 3002;

gv.CMD.GET_USER_LOBBY = 4001;
gv.CMD.UNLOCK_LOBBY_CHEST = 4002;
gv.CMD.SPEEDUP_LOBBY_CHEST = 4003;
gv.CMD.CLAIM_LOBBY_CHEST = 4004;

gv.CMD.GET_ROOM_INFO = 6001;

gv.CMD.CHEAT_USER_INFO = 7001;
gv.CMD.CHEAT_USER_CARD = 7002;
gv.CMD.CHEAT_USER_LOBBY_CHEST = 7003;


gv.CMD.SEND_GET_BATTLE_MAP = 5001;

testnetwork = testnetwork || {};
testnetwork.packetMap = {};

/** Outpacket */

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
CMDSendGetUserLobbyChest = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.GET_USER_LOBBY);
        },
        pack: function () {
            this.packHeader();
            this.updateSize();
        }
    }
)

CMDSendUnlockLobbyChest = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.UNLOCK_LOBBY_CHEST);
        },
        pack: function (chestid) {
            this.packHeader();
            this.putInt(chestid);
            this.updateSize();
        }
    }
)

CMDSendSpeedUpLobbyChest = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.SPEEDUP_LOBBY_CHEST);
        },
        pack: function (chestid) {
            this.packHeader();
            this.putInt(chestid);
            this.updateSize();
        }
    }
)

CMDSendClaimLobbyChest = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.CLAIM_LOBBY_CHEST);
        },
        pack: function (chestId) {
            this.packHeader();
            this.putInt(chestId);
            this.updateSize();
        }
    }
)

CMDSendGetUserInventory = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.GET_USER_INVENTORY);
        },
        pack: function () {
            this.packHeader();
            this.updateSize();
        }
    }
)
CMDSendUpgradeCard = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.UPGRADE_CARD);
        },
        pack: function (cardType) {
            this.packHeader();
            this.putInt(cardType);
            this.updateSize();
        }
    }
)

CMDSendAddUserGold = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.ADD_USER_GOLD);
        },
        pack: function (gold) {
            this.packHeader();
            this.putInt(gold);
            this.updateSize();
        }
    }
)

CMDSendAddUserGem = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.ADD_USER_GEM);
        },
        pack: function (gem) {
            this.packHeader();
            this.putInt(gem);
            this.updateSize();
        }
    }
)

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

CMDSendGetRoomInfo = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.GET_ROOM_INFO);
        },
        pack: function (roomId) {
            this.packHeader();
            this.putInt(roomId);
            this.updateSize();
        }
    }
)

CMDSendGetBattleMap = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.SEND_GET_BATTLE_MAP);
        },
        pack: function () {
            this.packHeader();
            this.updateSize();
        }
    }
)


/**
 * InPacket
 */

//Handshake
testnetwork.packetMap[gv.CMD.HAND_SHAKE] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            this.token = this.getString();
        }
    }
);

testnetwork.packetMap[gv.CMD.USER_LOGIN] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
        }
    }
);

testnetwork.packetMap[gv.CMD.SEND_LOGOUT] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
        }
    }
);

testnetwork.packetMap[gv.CMD.ADD_USER_GOLD] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            this.goldChange = this.getInt();
        }
    }
);

testnetwork.packetMap[gv.CMD.ADD_USER_GEM] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            this.gemChange = this.getInt();
        }
    }
);


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

testnetwork.packetMap[gv.CMD.GET_USER_INVENTORY] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            this.cardCollection = [];
            this.battleDeckCard = [];
            this.cardCollectionSize = this.getInt();
            for (i = 0; i < this.cardCollectionSize; i++) {
                type = this.getInt();
                level = this.getInt();
                amount = this.getInt();
                this.cardCollection.push(new Card(type, level, amount));
            }
            this.battleDeckSize = this.getInt();
            for (i = 0; i < this.battleDeckSize; i++)
                this.battleDeckCard.push(this.getInt());
        }
    }
);
testnetwork.packetMap[gv.CMD.GET_USER_LOBBY] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            this.lobbyChest = [];
            this.lobbyChestSize = this.getInt();
            for (i = 0; i < this.lobbyChestSize; i++) {
                let state = this.getInt();
                let claimTime = this.getLong();
                this.lobbyChest.push(new LobbyChest(state, claimTime));
            }
        }
    }
);

testnetwork.packetMap[gv.CMD.UNLOCK_LOBBY_CHEST] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            this.lobbyChest = [];
            this.lobbyChestid = this.getInt();
            this.state = this.getInt();
            this.claimTime = this.getLong();
        }
    }
);

testnetwork.packetMap[gv.CMD.SPEEDUP_LOBBY_CHEST] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();

        },
        readData: function () {
            this.itemType = [];
            this.itemQuantity = [];
            this.lobbyChestid = this.getInt();
            this.state = this.getInt();
            this.gemChange = this.getInt();
            this.rewardSize = this.getInt();
            for (i = 0; i < this.rewardSize; i++) {
                this.itemType.push(this.getInt());
                this.itemQuantity.push(this.getInt());
            }
        }
    }
);

testnetwork.packetMap[gv.CMD.CLAIM_LOBBY_CHEST] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();

        },
        readData: function () {
            this.itemType = [];
            this.itemQuantity = [];
            this.lobbyChestid = this.getInt();
            this.state = this.getInt();
            this.gemChange = this.getInt();
            this.rewardSize = this.getInt();
            for (i = 0; i < this.rewardSize; i++) {
                this.itemType.push(this.getInt());
                this.itemQuantity.push(this.getInt());
            }
        }
    }
);


testnetwork.packetMap[gv.CMD.UPGRADE_CARD] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            this.goldChange = this.getInt();
            this.cardType = this.getInt();
            this.fragmentChange = this.getInt();
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


testnetwork.packetMap[gv.CMD.GET_ROOM_INFO] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            this.opponentUsername = this.getString();
            this.opponentTrophy = this.getInt();
            this.battleDeckSize = this.getInt();
            this.battleDeck = [];
            for (let i = 0; i < this.battleDeckSize; i++) {
                this.battleDeck.push({
                    cardType: this.getInt(),
                    cardLevel: this.getInt(),
                });
            }
        }
    }
);


testnetwork.packetMap[gv.CMD.SEND_GET_BATTLE_MAP] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            this.mapH = this.getInt();
            this.mapW = this.getInt();
            this.btmap = new Array(this.mapH);
            for (i = this.mapH - 1; i >= 0; i--)
                this.btmap[i] = new Array(this.mapW);
            this.path = []
            for (i = 0; i < this.mapH; i++)
                for (j = 0; j < this.mapW; j++)
                    this.btmap[i][j] = this.getInt();

            this.pathSize = this.getInt();
            for (i = 0; i < this.pathSize; i++) {
                pathX = this.getInt();
                pathY = this.getInt();
                this.path.push({pathX, pathY})
            }
        }
    }
);

