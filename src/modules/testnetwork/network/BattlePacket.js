gv.CMD = gv.CMD || {};
gv.CMD.SEND_MATCHING = 8001;
gv.CMD.SEND_CANCEL_MATCHING = 8002;
gv.CMD.PUT_TOWER = 5002;
gv.CMD.OPPONENT_PUT_TOWER = 5003;
gv.CMD.GET_BATTLE_MAP_OBJECT = 5004;
gv.CMD.GET_CELL_OBJECT = 5005;
gv.CMD.UPGRADE_TOWER = 5006;
gv.CMD.OPPONENT_UPGRADE_TOWER = 5007;
gv.CMD.DROP_SPELL = 5008;
gv.CMD.OPPONENT_DROP_SPELL = 5009;

let BattleNetwork = BattleNetwork || {};

BattleNetwork.packetMap = {};


CMDSendMatching = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.SEND_MATCHING);
    },

    pack: function () {
        this.packHeader();
        this.updateSize();
    }
});

CMDSendCancelMatching = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.SEND_CANCEL_MATCHING);
    },

    pack: function () {
        this.packHeader();
        this.updateSize();
    }
})

CMDPutTower = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.PUT_TOWER);
    },

    pack: function (roomId, towerId, tilePos) {
        this.packHeader();
        this.putInt(roomId);
        this.putInt(towerId);
        this.putInt(tilePos.x);
        this.putInt(tilePos.y);
        this.updateSize();
    }
});

CMDUpgradeTower = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.UPGRADE_TOWER);
    },

    pack: function (towerId, tilePos) {
        this.packHeader();
        this.putInt(BattleManager.getInstance().getBattleData().getRoomId());
        this.putInt(towerId);
        this.putInt(tilePos.x);
        this.putInt(tilePos.y);
        this.updateSize();
    }
})

CMDDropSpell = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.DROP_SPELL);
    },

    pack: function (spellId, pixelPos) {
        this.packHeader();
        this.putInt(BattleManager.getInstance().getBattleData().getRoomId());
        this.putInt(spellId);
        this.putDouble(pixelPos.x);
        this.putDouble(pixelPos.y);
        this.updateSize();
    }
})

BattleNetwork.packetMap[gv.CMD.SEND_MATCHING] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.error = this.getShort();
        this.roomId = this.getInt();
        let result = this._unpackMap();
        this.playerMap = result.map;
        this.playerLongestPath = result.path;

        result = this._unpackMap();
        this.opponentMap = result.map;
        this.opponentLongestPath = result.path;

        this.opponentInfo = {};
        this.opponentInfo.id = this.getInt();
        this.opponentInfo.username = this.getString();
        this.opponentInfo.trophy = this.getInt();
    },

    _unpackMap: function () {
        let mapW = this.getInt();
        let mapH = this.getInt();
        let btmap = new Array(mapW);
        for (let i = 0; i < mapW; i++)
            btmap[i] = new Array(mapH);

        let path = []
        for (let i = 0; i < mapW; i++)
            for (let j = 0; j < mapH; j++)
                btmap[i][j] = this.getInt();

        let pathSize = this.getInt();
        for (let i = 0; i < pathSize; i++) {
            let pathX = this.getInt();
            let pathY = this.getInt();
            path.push({x: pathX, y: pathY})
        }

        return {map: btmap, path: path};
    }
});

BattleNetwork.packetMap[gv.CMD.SEND_CANCEL_MATCHING] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {

    }
})

BattleNetwork.packetMap[gv.CMD.PUT_TOWER] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.error = this.getShort();
        this.towerId = this.getInt();
        this.towerLevel = this.getInt();
        this.x = this.getInt();
        this.y = this.getInt();
    }
})

BattleNetwork.packetMap[gv.CMD.OPPONENT_PUT_TOWER] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.towerId = this.getInt();
        this.towerLevel = this.getInt();
        this.tileX = this.getInt();
        this.tileY = this.getInt();
    }
});

BattleNetwork.packetMap[gv.CMD.UPGRADE_TOWER] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.towerId = this.getInt();
        this.towerLevel = this.getInt();
        this.tileX = this.getInt();
        this.tileY = this.getInt();
    }
})

BattleNetwork.packetMap[gv.CMD.OPPONENT_UPGRADE_TOWER] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.towerId = this.getInt();
        this.towerLevel = this.getInt();
        this.tileX = this.getInt();
        this.tileY = this.getInt();
    }
})

BattleNetwork.packetMap[gv.CMD.GET_BATTLE_MAP_OBJECT] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.playerBattleMapObject = this._unpackMapObject();
        this.opponentBattleMapObject = this._unpackMapObject();
    },

    _unpackMapObject: function () {
        let mapHeight = this.getInt();
        let mapWidth = this.getInt();
        let mapObject = new Array(mapHeight);
        for (let i = 0; i < mapHeight; i++) {
            mapObject[i] = new Array(mapWidth);
            for (let j = 0; j < mapWidth; j++) {
                mapObject[i][j] = this._unpackCellObject();

            }
        }
        return mapObject;
    },

    _unpackCellObject: function () {
        let cellObject = {
            tilePos: {
                x: this.getInt(),
                y: this.getInt()
            },
            buffCellType: this.getInt(),
            objectInCellType: this.getInt(),
        };
        this._unpackObjectInCell(cellObject);
        return cellObject;
    },

    _unpackObjectInCell: function (cellObject) {
        switch (cellObject.objectInCellType) {
            case ObjectInCellType.TREE:
                cellObject.tree = {
                    hp: this.getDouble()
                }
                break;
            case ObjectInCellType.TOWER:
                cellObject.tower = {
                    id: this.getInt(),
                    level: this.getInt(),
                }
                break;
            case ObjectInCellType.PIT:
                cellObject.pit = this.getInt();
                break;
            default:
                break;
        }
    }
})

BattleNetwork.packetMap[gv.CMD.DROP_SPELL] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.spellId = this.getInt();
        this.spellLevel = this.getInt();
        this.pixelX = this.getDouble();
        this.pixelY = this.getDouble();
    }
})

BattleNetwork.packetMap[gv.CMD.OPPONENT_DROP_SPELL] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.spellId = this.getInt();
        this.spellLevel = this.getInt();
        this.pixelX = this.getDouble();
        this.pixelY = this.getDouble();
    }
});