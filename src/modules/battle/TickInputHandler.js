let TickInputHandler = cc.Class.extend({
    ctor: function () {

    },

    handle: function (cmd, packet) {
        switch (cmd) {
            case gv.CMD.PUT_TOWER:
                this._handlePutTower(cmd, packet);
                break;
            case gv.CMD.OPPONENT_PUT_TOWER:
                this._handleOpponentPutTower(cmd, packet);
                break;
        }
    },

    _handlePutTower: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 76] received put tower packet: ' + JSON.stringify(packet));

        let battleData = BattleManager.getInstance().getBattleData();
        let playerObjectMap = battleData.getMapObject(GameConfig.PLAYER);
        let cellObject = playerObjectMap[packet.x][packet.y];
        cellObject.objectInCellType = ObjectInCellType.TOWER;
        if (!cellObject.tower) {
            cellObject.tower = {};
        }
        cellObject.tower.towerId = packet.towerId;
        cellObject.tower.level = packet.towerLevel;
        BattleManager.getInstance().getBattleLayer().buildTower(packet.towerId, cc.p(packet.x, packet.y), GameConfig.PLAYER);
        cc.log(JSON.stringify(playerObjectMap[packet.x][packet.y]))
    },

    _handleOpponentPutTower: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 80] received put tower packet: ' + JSON.stringify(packet));
        let tilePos = cc.p(packet.tileX, packet.tileY);
        let battleData = BattleManager.getInstance().getBattleData();
        let opponentMap = battleData.getMapObject(GameConfig.OPPONENT);
        let cellObject = opponentMap[packet.tileX][packet.tileY];
        cellObject.objectInCellType = ObjectInCellType.TOWER;
        if (!cellObject.tower) {
            cellObject.tower = {};
        }
        cellObject.tower = {
            towerId: packet.towerId,
            level: packet.towerLevel,
        };
        OpponentAction.getInstance().buildTower(packet.towerId, tilePos);
    },
});