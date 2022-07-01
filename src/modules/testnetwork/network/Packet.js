/**
 * Created by KienVN on 10/2/2017.
 */

gv.CMD = gv.CMD || {};
gv.CMD.HAND_SHAKE = 0;
gv.CMD.USER_LOGIN = 1;
gv.CMD.GET_USER_INFO = 1001;
gv.CMD.ADD_USER_GOLD = 1002;
gv.CMD.ADD_USER_GEM = 1003;

gv.CMD.BUY_GOLD_SHOP = 2001;
gv.CMD.BUY_DAILY_SHOP = 2002;
gv.CMD.GET_USER_DAILY_SHOP = 2003;
gv.CMD.GET_USER_GOLD_SHOP = 2004;


gv.CMD.GET_USER_INVENTORY = 3001;
gv.CMD.UPGRADE_CARD = 3002;

gv.CMD.GET_USER_LOBBY = 4001;
gv.CMD.UNLOCK_LOBBY_CHEST = 4002;
gv.CMD.SPEEDUP_LOBBY_CHEST = 4003;
gv.CMD.CLAIM_LOBBY_CHEST = 4004;

gv.CMD.SEND_GET_BATTLE_MAP = 5001;

gv.CMD.CHEAT_USER_INFO = 7001;
gv.CMD.CHEAT_USER_CARD = 7002;
gv.CMD.CHEAT_USER_LOBBY_CHEST = 7003;


gv.CMD.MOVE = 2005;
gv.CMD.MAP_INFO = 2004;
gv.CMD.RESET_MAP = 2006;

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
            this.putString(sessionKey);
            this.putInt(userID);
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
        pack: function (chestid) {
            this.packHeader();
            this.putInt(chestid);
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

CMDSendGetDailyShop = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.GET_USER_DAILY_SHOP);
        },
        pack: function () {
            this.packHeader();
            this.updateSize();
        }
    }
)
CMDSendGetGoldShop = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.GET_USER_GOLD_SHOP);
        },
        pack: function () {
            this.packHeader();
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

CMDBuyGoldShop = fr.OutPacket.extend(
    {
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
    }
)

CMDBuyDailyShop = fr.OutPacket.extend(
    {
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

testnetwork.packetMap[gv.CMD.ADD_USER_GOLD] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            this.error = this.getShort();
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
            this.error = this.getShort();
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
            this.error = this.getShort();
            this.id = this.getInt();
            this.username = this.getString();
            this.gold = this.getInt();
            this.gem = this.getInt();
            this.trophy = this.getInt();
        }
    }
);

testnetwork.packetMap[gv.CMD.BUY_GOLD_SHOP] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            this.error = this.getShort();
            this.itemID = this.getInt();
            this.goldChange = this.getInt();
            this.gemChange = this.getInt();
        }
    }
);
testnetwork.packetMap[gv.CMD.BUY_DAILY_SHOP] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();

        },
        readData: function () {
            this.itemType = [];
            this.itemQuantity = [];
            this.error = this.getShort();
            this.itemID = this.getInt();
            this.goldChange = this.getInt();
            this.gemChange = this.getInt();
            this.itemAmount = this.getInt();
            for (i = 0; i < this.itemAmount; i++) {
                this.itemType.push(this.getInt());
                this.itemQuantity.push(this.getInt());
            }
        }
    }
);

testnetwork.packetMap[gv.CMD.GET_USER_INVENTORY] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
            this.cardCollection = [];
            this.battleDeckCard = [];
        },
        readData: function () {
            this.error = this.getShort();
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
            this.lobbyChest = [];
        },
        readData: function () {
            this.error = this.getShort();
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
            this.lobbyChest = [];
        },
        readData: function () {
            this.error = this.getShort();
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
            this.error = this.getShort();
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
            this.error = this.getShort();
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
            this.error = this.getShort();
            this.goldChange = this.getInt();
            this.cardType = this.getInt();
            this.fragmentChange = this.getInt();
        }
    }
);
testnetwork.packetMap[gv.CMD.GET_USER_DAILY_SHOP] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
            this.dailyShopItem = [];
        },
        readData: function () {
            this.error = this.getShort();
            this.size = this.getInt();
            for (i = 0; i < this.size; i++) {
                itemType = this.getInt();
                itemQuantity = this.getInt();
                itemPrice = this.getInt();
                itemState = this.getInt();
                this.dailyShopItem.push(new ShopItem(itemType, itemQuantity, itemPrice, itemState));
            }
        }
    }
);
testnetwork.packetMap[gv.CMD.GET_USER_GOLD_SHOP] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
            this.goldShop = [];
        },
        readData: function () {
            this.error = this.getShort();
            this.size = this.getInt();
            for (i = 0; i < this.size; i++) {
                itemID = this.getInt();
                itemType = this.getInt();
                itemQuantity = this.getInt();
                itemPrice = this.getInt();
                itemState = this.getInt();
                this.goldShop.push(new ShopItem(itemID, itemType, itemQuantity, itemPrice, itemState));
            }
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
            this.error = this.getShort();
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
            this.error = this.getShort();
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
            this.error = this.getShort();
            this.chestId = this.getInt();
            this.chestState = this.getInt();
            this.chestClaimTime = this.getLong();
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
            for(i=this.mapH-1;i>=0;i--)
                this.btmap[i]= new Array(this.mapW);
            this.path= []
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


