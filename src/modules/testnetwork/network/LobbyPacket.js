gv.CMD = gv.CMD || {};

gv.CMD.GET_USER_LOBBY = 4001;
gv.CMD.UNLOCK_LOBBY_CHEST = 4002;
gv.CMD.SPEEDUP_LOBBY_CHEST = 4003;
gv.CMD.CLAIM_LOBBY_CHEST = 4004;

LobbyNetwork.packetMap = {};

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

LobbyNetwork.packetMap[gv.CMD.GET_USER_LOBBY] = fr.InPacket.extend(
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

LobbyNetwork.packetMap[gv.CMD.UNLOCK_LOBBY_CHEST] = fr.InPacket.extend(
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

LobbyNetwork.packetMap[gv.CMD.SPEEDUP_LOBBY_CHEST] = fr.InPacket.extend(
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

LobbyNetwork.packetMap[gv.CMD.CLAIM_LOBBY_CHEST] = fr.InPacket.extend(
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




