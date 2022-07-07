gv.CMD = gv.CMD || {};
gv.CMD.SEND_GET_BATTLE_MAP = 5001;

let BattleNetwork = BattleNetwork || {};

BattleNetwork.packetMap = {};

CMDSendGetBattleMap = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.SEND_GET_BATTLE_MAP);
    },
    pack: function () {
        this.packHeader();
        this.updateSize();
    }
})

BattleNetwork.packetMap[gv.CMD.SEND_GET_BATTLE_MAP] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            this.mapW = this.getInt();
            this.mapH = this.getInt();
            this.btmap = new Array(this.mapW);
            for (let i = 0; i < this.mapW; i++)
                this.btmap[i] = new Array(this.mapH);
            this.path = []
            for (let i = 0; i < this.mapW; i++)
                for (let j = 0; j < this.mapH; j++)
                    this.btmap[i][j] = this.getInt();

            this.pathSize = this.getInt();
            for (let i = 0; i < this.pathSize; i++) {
                let pathX = this.getInt();
                let pathY = this.getInt();
                this.path.push({x: pathX, y: pathY})
            }
        }
    }
);