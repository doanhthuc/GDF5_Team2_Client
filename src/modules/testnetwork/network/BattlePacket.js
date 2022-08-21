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
gv.CMD.CHANGE_TOWER_STRATEGY = 5010;
gv.CMD.OPPONET_CHANGE_TOWER_STRATEGY = 5011;
gv.CMD.PUT_TRAP = 5012;
gv.CMD.OPPONENT_PUT_TRAP = 5013;
gv.CMD.DESTROY_TOWER = 5014;
gv.CMD.OPPONENT_DESTROY_TOWER = 5015;
gv.CMD.GET_BATTLE_INFO = 5016;
gv.CMD.END_BATTLE = 5017;
gv.CMD.GET_BATTLE_DECK_IN_BATTLE = 5018;
gv.CMD.BATTLE_ERROR = 5019;
gv.CMD.SEND_CHECK_SUM = 5020;
gv.CMD.BORN_MONSTER = 5021;
gv.CMD.NEXT_WAVE = 5022;
gv.CMD.SPEEDUP_NEXT_WAVE = 5023;
gv.CMD.SNAPSHOT = 5025;

BattleNetwork = BattleNetwork || {};

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

CMDPutTrap = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.PUT_TRAP);
    },

    pack: function (tilePos) {
        this.packHeader();
        this.putInt(BattleManager.getInstance().getBattleData().getRoomId());
        this.putInt(tilePos.x);
        this.putInt(tilePos.y);
        this.updateSize();
    },
})

CMDDestroyTower = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.DESTROY_TOWER);
    },

    pack: function (tilePos) {
        this.packHeader();
        this.putInt(BattleManager.getInstance().getBattleData().getRoomId());
        this.putInt(tilePos.x);
        this.putInt(tilePos.y);
        this.updateSize();
    }
})

CMDSendSpeedUpNextWave = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.SPEEDUP_NEXT_WAVE);
    },

    pack: function () {
        this.packHeader();
        this.putInt(BattleManager.getInstance().getBattleData().getRoomId());
        this.updateSize();
    }
})

CMDChangeTowerStrategy = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.CHANGE_TOWER_STRATEGY);
    },

    pack: function (tilePos, strategy) {
        this.packHeader();
        this.putInt(BattleManager.getInstance().getBattleData().getRoomId());
        this.putInt(tilePos.x);
        this.putInt(tilePos.y);
        this.putInt(strategy);
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
        this.entityMode = Utils.convertShortToMode(this.getShort());
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
        this.tickNumber = this.getInt();
    },

    clone: function () {
        let data = {};
        data.error = this.error;
        data.towerId = this.towerId;
        data.towerLevel = this.towerLevel;
        data.x = this.x;
        data.y = this.y;
        data.tickNumber = this.tickNumber;

        return data;
    },
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
        this.tickNumber = this.getInt();
    },

    clone: function () {
        let data = {};

        data.towerId = this.towerId;
        data.towerLevel = this.towerLevel;
        data.tileX = this.tileX;
        data.tileY = this.tileY;
        data.tickNumber = this.tickNumber;

        return data;
    }
});

BattleNetwork.packetMap[gv.CMD.UPGRADE_TOWER] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        if (this.getError() === 0) {
            this.towerId = this.getInt();
            this.towerLevel = this.getInt();
            this.tileX = this.getInt();
            this.tileY = this.getInt();
            this.tickNumber = this.getInt();
        } else this.error = this.getError();
    },

    clone: function () {
        let data = {};

        data.towerId = this.towerId;
        data.towerLevel = this.towerLevel;
        data.tileX = this.tileX;
        data.tileY = this.tileY;
        data.tickNumber = this.tickNumber;

        return data;
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
        this.tickNumber = this.getInt();
    },

    clone: function () {
        let data = {};

        data.towerId = this.towerId;
        data.towerLevel = this.towerLevel;
        data.tileX = this.tileX;
        data.tileY = this.tileY;
        data.tickNumber = this.tickNumber;

        return data;
    }
})

BattleNetwork.packetMap[gv.CMD.GET_BATTLE_MAP_OBJECT] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.playerBattleMapObject = BattleMapObject.unpackData(this);
        this.opponentBattleMapObject = BattleMapObject.unpackData(this);
    },
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
        this.tickNumber = this.getInt();
    },

    clone: function () {
        let data = {};

        data.spellId = this.spellId;
        data.spellLevel = this.spellLevel;
        data.pixelX = this.pixelX;
        data.pixelY = this.pixelY;
        data.tickNumber = this.tickNumber;

        return data;
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
        this.tickNumber = this.getInt();
    },

    clone: function () {
        let data = {};

        data.spellId = this.spellId;
        data.spellLevel = this.spellLevel;
        data.pixelX = this.pixelX;
        data.pixelY = this.pixelY;
        data.tickNumber = this.tickNumber;

        return data;
    }
});

BattleNetwork.packetMap[gv.CMD.PUT_TRAP] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.tilePosX = this.getInt();
        this.tilePosY = this.getInt();
        this.tickNumber = this.getInt();
    },

    clone: function () {
        let data = {};

        data.tilePosX = this.tilePosX;
        data.tilePosY = this.tilePosY;
        data.tickNumber = this.tickNumber;

        return data;
    }
});

BattleNetwork.packetMap[gv.CMD.OPPONENT_PUT_TRAP] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.tilePosX = this.getInt();
        this.tilePosY = this.getInt();
        this.tickNumber = this.getInt();
    },

    clone: function () {
        let data = {};

        data.tilePosX = this.tilePosX;
        data.tilePosY = this.tilePosY;
        data.tickNumber = this.tickNumber;

        return data;
    }
});

BattleNetwork.packetMap[gv.CMD.CHANGE_TOWER_STRATEGY] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.tileX = this.getInt();
        this.tileY = this.getInt();
        this.strategyId = this.getInt();
        this.tickNumber = this.getInt();
    },

    clone: function () {
        let data = {};

        data.tileX = this.tileX;
        data.tileY = this.tileY;
        data.strategyId = this.strategyId;
        data.tickNumber = this.tickNumber;

        return data;
    }
});

BattleNetwork.packetMap[gv.CMD.OPPONET_CHANGE_TOWER_STRATEGY] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.tileX = this.getInt();
        this.tileY = this.getInt();
        this.strategyId = this.getInt();
        this.tickNumber = this.getInt();
    },

    clone: function () {
        let data = {};

        data.tileX = this.tileX;
        data.tileY = this.tileY;
        data.strategyId = this.strategyId;
        data.tickNumber = this.tickNumber;

        return data;
    }
});

BattleNetwork.packetMap[gv.CMD.DESTROY_TOWER] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.tileX = this.getInt();
        this.tileY = this.getInt();
        this.tickNumber = this.getInt();
    },

    clone: function () {
        let data = {};

        data.tileX = this.tileX;
        data.tileY = this.tileY;
        data.tickNumber = this.tickNumber;

        return data;
    }
});

BattleNetwork.packetMap[gv.CMD.OPPONENT_DESTROY_TOWER] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.tileX = this.getInt();
        this.tileY = this.getInt();
        this.tickNumber = this.getInt();
    },

    clone: function () {
        let data = {};

        data.tileX = this.tileX;
        data.tileY = this.tileY;
        data.tickNumber = this.tickNumber;

        return data;
    }
});


BattleNetwork.packetMap[gv.CMD.GET_BATTLE_INFO] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.battleStartTime = this.getLong();
        this.waveAmount = this.getInt();
        cc.log(this.battleStartTime, this.waveAmount);
        this.monsterWave = [];
        this.monsterWave.push([]);
        for (let i = 0; i < this.waveAmount; i++) {
            let wave = [];
            let monsterAmount = this.getInt();
            for (let j = 0; j < monsterAmount; j++) {
                wave.push(this.getInt());
            }
            this.monsterWave.push(wave);
        }
        this.playerStartEntityID = this.getLong();
        this.opponentStartEntityID = this.getLong();
        this.currentWave = this.getInt();
    }
});

BattleNetwork.packetMap[gv.CMD.NEXT_WAVE] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.tickNumber = this.getInt();
        this.monsterAmount = this.getInt();
        this.monsterWave = [];
        for (let i = 0; i < this.monsterAmount; i++) {
            this.monsterWave.push(this.getInt());
        }
    }
});

BattleNetwork.packetMap[gv.CMD.END_BATTLE] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.result = this.getInt();
        this.playerEnergyHouse = this.getInt();
        this.opponentEnergyHouse = this.getInt();
        this.trophyAfterBattle = this.getInt();
        this.trophyChange = this.getInt();
        this.hasChest = false;
        this.serverEndBattleTick = this.getInt();
        if (this.result === GameConfig.BATTLE_RESULT.WIN) {
            this.hasChest = this.getInt();
        }
    }
})

BattleNetwork.packetMap[gv.CMD.GET_BATTLE_DECK_IN_BATTLE] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.battleDeckSize = this.getInt();
        this.battleDeck = [];
        for (let i = 0; i < this.battleDeckSize; i++) {
            let card = {
                id: this.getInt(),
                level: this.getInt(),
                amount: this.getInt(),
            }
            this.battleDeck.push(card);
        }
    }
});

BattleNetwork.packetMap[gv.CMD.BATTLE_ERROR] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.errorMessage = this.getString();
    }
})

BattleNetwork.packetMap[gv.CMD.SNAPSHOT] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.dataEntity = {};
        let entitySize = this.getInt();
        cc.log("EntitySize = " + entitySize);
        for (let i = 1; i <= entitySize; i++) {
            let entity = EntityECS.unpackData(this);
            this.dataEntity[entity.id] = entity;
        }

        this.playerEnergyHouse = this.getInt();
        this.opponentEnergyHouse = this.getInt();
        this.serverTick = this.getInt();
        this.playerMonsterEntityID = this.getLong();
        this.opponentMonsterEntityID = this.getLong();
        this.playerStartEntityID = this.getLong();
        if (UUIDGeneratorECS.getPlayerStartEntityID() !== Number(this.playerStartEntityID)) {
            let temp = this.playerEnergyHouse;
            this.playerEnergyHouse = this.opponentEnergyHouse;
            this.opponentEnergyHouse = temp;
            temp = this.playerMonsterEntityID;
            this.playerMonsterEntityID = this.opponentMonsterEntityID;
            this.opponentMonsterEntityID = temp;
        }

        // map object
        this.battleMapObject = {};
        this.battleMapObject.player = BattleMapObject.unpackData(this);
        this.battleMapObject.opponent = BattleMapObject.unpackData(this);
    },

})