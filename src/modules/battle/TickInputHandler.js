let TickInputHandler = cc.Class.extend({
    ctor: function () {

    },

    handle: function (cmd, packet, tickNumber) {
        switch (cmd) {
            case gv.CMD.PUT_TOWER:
                this.logTickHandler(cmd, packet, tickNumber);
                this._handlePutTower(cmd, packet);
                break;
            case gv.CMD.OPPONENT_PUT_TOWER:
                this._handleOpponentPutTower(cmd, packet);
                break;
            case gv.CMD.UPGRADE_TOWER:
                this.logTickHandler(cmd, packet, tickNumber);
                this._handleUpgradeTower(cmd, packet);
                break;
            case gv.CMD.OPPONENT_UPGRADE_TOWER:
                this.logTickHandler(cmd, packet, tickNumber);
                this._handleOpponentUpgradeTower(cmd, packet);
                break;
            case gv.CMD.DROP_SPELL:
                this.logTickHandler(cmd, packet, tickNumber);
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

    _handlePutTower: function (cmd, packet) {
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
    },

    _handleOpponentPutTower: function (cmd, packet) {
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

    _handleUpgradeTower: function (cmd, packet) {
        let battleData = BattleManager.getInstance().getBattleData();
        let playerObjectMap = battleData.getMapObject(GameConfig.PLAYER);
        let cellObject = playerObjectMap[packet.tileX][packet.tileY];
        cellObject.tower.level = packet.towerLevel;
        EntityFactory.onUpdateTowerLevel(cellObject.tower.entityId, packet.towerLevel);
    },

    _handleOpponentUpgradeTower: function (cmd, packet) {
        let battleData = BattleManager.getInstance().getBattleData();
        let opponentObjectMap = battleData.getMapObject(GameConfig.OPPONENT);
        let cellObject = opponentObjectMap[packet.tileX][packet.tileY];
        cellObject.tower.level = packet.towerLevel;
        EntityFactory.onUpdateTowerLevel(cellObject.tower.entityId, packet.towerLevel);
    },

    _handleDropSpell: function (cmd, packet) {
        let pixelPos = cc.p(packet.pixelX, packet.pixelY);
        BattleManager.getInstance().getBattleLayer().dropSpell(packet.spellId, pixelPos, GameConfig.PLAYER);
    },

    _handleOpponentDropSpell: function (cmd, packet) {
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
    },

    logTickHandler: function (commandID, packet, tickNumber) {
        cc.warn("* tick = " + tickNumber + " - " + "[tick handle command] #" + commandID + ": " + JSON.stringify(packet));
    }
});