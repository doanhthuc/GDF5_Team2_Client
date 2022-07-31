let BattleNetwork = BattleNetwork || {};

BattleNetwork.Connector = cc.Class.extend({
    ctor: function (gameClient) {
        this.gameClient = gameClient;
        gameClient.packetFactory.addPacketMap(BattleNetwork.packetMap);
        gameClient.receivePacketSignal.add(this.onReceivedPacket, this);
    },

    onReceivedPacket: function (cmd, packet) {
        cc.warn('[BattleNetwork.js] onReceivedPacket: ' + cmd + "   " + JSON.stringify(packet));
        switch (cmd) {
            case gv.CMD.SEND_MATCHING:
                this._handleMatching(cmd, packet);
                break;
            case gv.CMD.SEND_CANCEL_MATCHING:
                this._handleCancelMatching(cmd, packet);
                break;
            case gv.CMD.GET_BATTLE_INFO:
                this._handleGetBattleInfo(cmd, packet);
                break;
            case gv.CMD.PUT_TOWER:
                this._handlePutTower(cmd, packet);
                break;
            case gv.CMD.OPPONENT_PUT_TOWER:
                cc.log('[BattleNetwork.js] line 23 Opponent Put Tower');
                this._handleOpponentPutTower(cmd, packet);
                break;
            case gv.CMD.GET_BATTLE_MAP_OBJECT:
                this._handleGetBattleMapObject(cmd, packet);
                break;
            case gv.CMD.GET_CELL_OBJECT:
                this._handleGetCellObject(cmd, packet);
                break;
            case gv.CMD.UPGRADE_TOWER:
                this._handleUpgradeTower(cmd, packet);
                break;
            case gv.CMD.OPPONENT_UPGRADE_TOWER:
                this._handleOpponentUpgradeTower(cmd, packet);
                break;
            case gv.CMD.DROP_SPELL:
                this._handleDropSpell(cmd, packet);
                break;
            case gv.CMD.OPPONENT_DROP_SPELL:
                this._handleOpponentDropSpell(cmd, packet);
                break;
            case gv.CMD.CHANGE_TOWER_STRATEGY:
                this._handleChangeTowerStrategy(cmd, packet);
                break;
            case gv.CMD.OPPONET_CHANGE_TOWER_STRATEGY:
                this._handleOpponentChangeTowerStrategy(cmd, packet);
                break;
            case gv.CMD.PUT_TRAP:
                this._handlePutTrap(cmd, packet);
                break;
            case gv.CMD.OPPONENT_PUT_TRAP:
                this._handleOpponentPutTrap(cmd, packet);
                break;
            case gv.CMD.DESTROY_TOWER:
                this._handleDestroyTower(cmd, packet);
                break;
            case gv.CMD.OPPONENT_DESTROY_TOWER:
                this._handleOpponentDestroyTower(cmd, packet);
                break;
        }
    },

    sendMatching: function () {
        let pk = this.gameClient.getOutPacket(CMDSendMatching);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    sendCancelMatching: function () {
        let pk = this.gameClient.getOutPacket(CMDSendCancelMatching);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    _handleMatching: function (cmd, packet) {
        cc.log("[ShopNetwork.js] received matching packet: " + JSON.stringify(packet));
        let battleData = new BattleData();
        BattleManager.getInstance().registerBattleData(battleData, true);
        battleData.setRoomId(packet.roomId)
        battleData.setMap(packet.playerMap, GameConfig.PLAYER);
        battleData.setMap(packet.opponentMap, GameConfig.OPPONENT);
        // battleData.setMapObject(packet.playerMap, GameConfig.PLAYER);
        // battleData.setMapObject(packet.playerMap, GameConfig.OPPONENT);
        battleData.setLongestPath(packet.playerLongestPath, GameConfig.PLAYER);
        battleData.setLongestPath(packet.opponentLongestPath, GameConfig.OPPONENT);

        let shortestPathForEachTilePlayer = FindPathUtil.findShortestPathForEachTile(GameConfig.PLAYER);
        let shortestPathForEachTileOpponent = FindPathUtil.findShortestPathForEachTile(GameConfig.OPPONENT);
        battleData.setShortestPathForEachTile(shortestPathForEachTilePlayer, GameConfig.PLAYER);
        battleData.setShortestPathForEachTile(shortestPathForEachTileOpponent, GameConfig.OPPONENT);


        let userContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT);
        battleData.setUsername(userContext.getUsername(), GameConfig.PLAYER);
        battleData.setTrophy(userContext.getTrophy(), GameConfig.PLAYER);
        battleData.setUsername(packet.opponentInfo.username, GameConfig.OPPONENT);
        battleData.setTrophy(packet.opponentInfo.trophy, GameConfig.OPPONENT);

        setTimeout(function () {
            fr.view(BattleLayer, 0.5, true)
            cc.log("===> Switch to Game Layer Scene !!!")
        }, 2000);
    },

    _handleCancelMatching: function (cmd, packet) {
        cc.warn("Canceled matching")
        fr.view(MainScreen);
    },

    sendPutTower: function (towerId, tilePos) {
        let roomId = BattleManager.getInstance().getBattleData().getRoomId()
        let pk = this.gameClient.getOutPacket(CMDPutTower);
        pk.pack(roomId, towerId, tilePos);
        this.gameClient.sendPacket(pk);
    },

    sendUpgradeTower: function (towerId, tilePos) {
        let pk = this.gameClient.getOutPacket(CMDUpgradeTower);
        pk.pack(towerId, tilePos);
        this.gameClient.sendPacket(pk);
    },

    sendDropSell: function (towerId, pixelPos) {
        let pk = this.gameClient.getOutPacket(CMDDropSpell);
        pk.pack(towerId, pixelPos);
        this.gameClient.sendPacket(pk);
    },

    sendPutTrap: function (tilePos) {
        let pk = this.gameClient.getOutPacket(CMDPutTrap);
        pk.pack(tilePos);
        this.gameClient.sendPacket(pk);
    },

    sendChangeTowerTargetStrategy: function (towerTilePos, targetStrategy) {
        cc.log("aaaaaaaaaaaaaaaaaaaafffffffffffffvvvvvvvvvvvvvvvvvvvv")
        let pk = this.gameClient.getOutPacket(CMDChangeTowerStrategy);
        pk.pack(towerTilePos, targetStrategy);
        this.gameClient.sendPacket(pk);
    },

    sendDestroyTower: function (tilePos) {
        let pk = this.gameClient.getOutPacket(CMDDestroyTower);
        pk.pack(tilePos);
        this.gameClient.sendPacket(pk);
    },

    _handleGetBattleInfo: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 154] received battleInfo: ' + JSON.stringify(packet));
        BattleManager.getInstance().getBattleData().setBattleStartTime(packet.battleStartTime);
        BattleManager.getInstance().getBattleData().setWaveAmount(packet.waveAmount);
        BattleManager.getInstance().getBattleData().setMonsterWave(packet.monsterWave);
        //let battleData = BattleManager.getInstance().getBattleData();
        // cc.log(battleData.battleStartTime);
        // cc.log(TimeUtil.getServerTime());
        // cc.log(TimeUtil.getDeltaTime())
    },

    _handlePutTower: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 76] received put tower packet: ' + JSON.stringify(packet));
        let battleData = BattleManager.getInstance().getBattleData();
        let playerObjectMap = battleData.getMapObject(GameConfig.PLAYER);
        let cellObject = playerObjectMap[packet.x][packet.y];
        cellObject.objectInCellType = ObjectInCellType.TOWER;
        cellObject.tower.towerId = packet.towerId;
        cellObject.tower.level = packet.towerLevel;

        cc.log(JSON.stringify(playerObjectMap[packet.x][packet.y]))
    },

    _handleOpponentPutTower: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 80] received put tower packet: ' + JSON.stringify(packet));
        // let pixelPos = Utils.tile2Pixel(packet.tileX, packet.tileY, GameConfig.OPPONENT);
        let tilePos = cc.p(packet.tileX, packet.tileY);
        let battleData = BattleManager.getInstance().getBattleData();
        let opponentMap = battleData.getMapObject(GameConfig.OPPONENT);
        let cellObject = opponentMap[packet.tileX][packet.tileY];
        cellObject.objectInCellType = ObjectInCellType.TOWER;
        cellObject.tower = {
            towerId: packet.towerId,
            level: packet.towerLevel,
        };
        OpponentAction.getInstance().buildTower(packet.towerId, tilePos);
    },

    _handleGetBattleMapObject: function (cmd, packet) {
        //  cc.log('[BattleNetwork.js line 95] received get battle map object packet: ' + JSON.stringify(packet));
        let battleData = BattleManager.getInstance().getBattleData();
        battleData.setMapObject(packet.playerBattleMapObject, GameConfig.PLAYER);
        battleData.setMapObject(packet.opponentBattleMapObject, GameConfig.OPPONENT);
        let battleMapObject = battleData.getMapObject(GameConfig.PLAYER);
        // for (let i = 0; i < battleMapObject.length; i++) {
        //     for (let j = 0; j < battleMapObject[i].length; j++) {
        //         cc.log('[BattleNetwork.js line 102] battleMapObject: ' + JSON.stringify(battleMapObject[i][j]));
        //     }
        // }
    },

    _handleGetCellObject: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 113] received get cell object packet: ' + JSON.stringify(packet));
    },

    _handleUpgradeTower: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 118] received upgrade tower packet: ' + JSON.stringify(packet));
        let battleData = BattleManager.getInstance().getBattleData();
        let playerObjectMap = battleData.getMapObject(GameConfig.PLAYER);
        let cellObject = playerObjectMap[packet.tileX][packet.tileY];
        cellObject.tower.level = packet.towerLevel;
        EntityFactory.onUpdateTowerLevel(cellObject.tower.entityId, packet.towerLevel);
        let towerEntity = EntityManager.getInstance().getEntity(cellObject.tower.entityId);
        cc.log("[BattleNetwork.js line 227]: towerEntity: " + JSON.stringify(towerEntity));
        let attackComponent = towerEntity.getComponent(AttackComponent);
        cc.log('[BattleNetwork.js line 165] attackComponent: ' + JSON.stringify(attackComponent));
    },

    _handleOpponentUpgradeTower: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 120] received upgrade tower packet: ' + JSON.stringify(packet));
        let battleData = BattleManager.getInstance().getBattleData();
        let opponentObjectMap = battleData.getMapObject(GameConfig.OPPONENT);
        let cellObject = opponentObjectMap[packet.tileX][packet.tileY];
        cellObject.tower.level = packet.towerLevel;
        EntityFactory.onUpdateTowerLevel(cellObject.tower.entityId, packet.towerLevel);
    },

    _handleDropSpell: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 123] received drop spell packet: ' + JSON.stringify(packet));
    },

    _handleOpponentDropSpell: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 125] received drop spell packet: ' + JSON.stringify(packet));
        let pixelPos = cc.p(packet.pixelX, packet.pixelY);
        pixelPos = Utils.playerPixel2OpponentPixel(pixelPos.x, pixelPos.y);
        OpponentAction.getInstance().dropSpell(packet.spellId, pixelPos);
    },

    _handlePutTrap: function (cmd, packet) {
        cc.log("[BattleNetwork.js line 206: _handlePutTrap packet: " + JSON.stringify(packet));
    },

    _handleOpponentPutTrap: function (cmd, packet) {
        cc.log("[BattleNetwork.js line 210: _handleOpponentPutTrap packet: " + JSON.stringify(packet));
        let tilePos = cc.p(packet.tilePosX, packet.tilePosY);
        OpponentAction.getInstance().putTrap(tilePos);
    },

    _handleChangeTowerStrategy: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 197] received change tower strategy packet: ' + JSON.stringify(packet));
    },

    _handleOpponentChangeTowerStrategy: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 201] received change tower strategy packet: ' + JSON.stringify(packet));
        let battleData = BattleManager.getInstance().getBattleData();
        let opponentObjectMap = battleData.getMapObject(GameConfig.OPPONENT);
        let tileObject = opponentObjectMap[packet.tileX][packet.tileY];
        let entityId = tileObject.tower.entityId;
        let tower = EntityManager.getInstance().getEntity(entityId);
        let attackComponent = tower.getComponent(AttackComponent);
        attackComponent.setTargetStrategy(packet.strategyId);
    },

    _handleDestroyTower: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 244] received destroy tower packet: ' + JSON.stringify(packet));
        let battleData = BattleManager.getInstance().getBattleData();
        let playerObjectMap = battleData.getMapObject(GameConfig.PLAYER);
        let tilePos = cc.p(packet.tileX, packet.tileY);
        let cellObject = playerObjectMap[tilePos.x][tilePos.y];
        cellObject.objectInCellType = ObjectInCellType.NONE;
        cellObject.tower = null;
        EventDispatcher.getInstance()
            .dispatchEvent(EventType.DESTROY_TOWER, {pos: tilePos, mode: GameConfig.PLAYER});
    },

    _handleOpponentDestroyTower: function (cmd, packet) {
        cc.log('[BattleNetwork.js line 253] received destroy tower packet: ' + JSON.stringify(packet));
        let battleData = BattleManager.getInstance().getBattleData();
        let opponentObjectMap = battleData.getMapObject(GameConfig.OPPONENT);
        let tilePos = cc.p(packet.tileX, packet.tileY);
        let cellObject = opponentObjectMap[packet.tileX][packet.tileY];
        let towerEntityId = cellObject.tower.entityId;
        cc.log('[BattleNetwork.js line 258] towerEntityId: ' + towerEntityId);
        let towerEntity = EntityManager.getInstance().getEntity(towerEntityId);
        EntityManager.destroy(towerEntity);
        cellObject.objectInCellType = ObjectInCellType.NONE;
        cellObject.tower = null;
        EventDispatcher.getInstance()
            .dispatchEvent(EventType.DESTROY_TOWER, {pos: tilePos, mode: GameConfig.PLAYER});
    }
})