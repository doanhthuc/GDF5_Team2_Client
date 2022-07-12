gv.CMD = gv.CMD || {};
gv.CMD.SEND_MATCHING = 8001;
gv.CMD.SEND_CANCEL_MATCHING = 8002;
gv.CMD.PUT_TOWER = 5002;

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

    pack: function (roomId, towerId, tilePos, pixelPos) {
        this.packHeader();
        this.putInt(roomId);
        this.putInt(towerId);
        this.putInt(tilePos.x);
        this.putInt(tilePos.y);
        this.putDouble(pixelPos.x);
        this.putDouble(pixelPos.y);
        this.updateSize();
    }
});

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
        this.x = this.getInt();
        this.y = this.getInt();
        this.pixelX = this.getDouble();
        this.pixelY = this.getDouble();
    }
})