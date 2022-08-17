let TickInputHandler = cc.Class.extend({
    ctor: function () {

    },

    handle: function (cmd, packet, tickNumber) {
        this.logTickHandler(cmd, packet, tickNumber);
        switch (cmd) {
            case gv.CMD.PUT_TOWER:
                this._handlePutTower(cmd, packet);
                break;
            case gv.CMD.OPPONENT_PUT_TOWER:
                this._handleOpponentPutTower(cmd, packet);
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

    _handlePutTower: function (cmd, packet) {
        let battleData = BattleManager.getInstance().getBattleData();
        let playerObjectMap = battleData.getMapObject(GameConfig.PLAYER);
        let tilePos = cc.p(packet.x, packet.y);
        playerObjectMap.putTowerIntoMap(-1, packet.towerId, packet.towerLevel, tilePos);

        BattleManager.getInstance().getBattleLayer().buildTower(packet.towerId, cc.p(packet.x, packet.y), GameConfig.PLAYER);
    },

    _handleOpponentPutTower: function (cmd, packet) {
        let tilePos = cc.p(packet.tileX, packet.tileY);
        let battleData = BattleManager.getInstance().getBattleData();
        let opponentMap = battleData.getMapObject(GameConfig.OPPONENT);
        opponentMap.putTowerIntoMap(-1, packet.towerId, packet.towerLevel, tilePos);
        OpponentAction.getInstance().buildTower(packet.towerId, tilePos);
    },

    _handleUpgradeTower: function (cmd, packet) {
        let tilePos = cc.p(packet.tileX, packet.tileY);
        let battleData = BattleManager.getInstance().getBattleData();
        let playerObjectMap = battleData.getMapObject(GameConfig.PLAYER);
        let tower = playerObjectMap.getTowerInTile(tilePos);
        tower.setLevel(packet.towerLevel);
        EntityFactory.onUpdateTowerLevel(tower.getEntityId(), packet.towerLevel, tilePos, GameConfig.PLAYER);
        soundManager.playUpgradeTower();
    },

    _handleOpponentUpgradeTower: function (cmd, packet) {
        let battleData = BattleManager.getInstance().getBattleData();
        let opponentObjectMap = battleData.getMapObject(GameConfig.OPPONENT);
        let tilePos = cc.p(packet.tileX, packet.tileY);
        let tower = opponentObjectMap.getTowerInTile(tilePos);
        tower.setLevel(packet.towerLevel);

        EntityFactory.onUpdateTowerLevel(tower.getEntityId(), packet.towerLevel, tilePos, GameConfig.OPPONENT);
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
        let tilePos = cc.p(packet.tilePosX, packet.tilePosY);
        EntityFactory.createTrap(tilePos, GameConfig.PLAYER);
    },

    _handleOpponentPutTrap: function (cmd, packet) {
        let tilePos = cc.p(packet.tilePosX, packet.tilePosY);
        OpponentAction.getInstance().putTrap(tilePos);
    },

    _handleChangeTowerStrategy: function (cmd, packet) {
        let battleData = BattleManager.getInstance().getBattleData();
        let playerObjectMap = battleData.getMapObject(GameConfig.PLAYER);
        let tilePos = cc.p(packet.tileX, packet.tileY);
        let entityId = playerObjectMap.getEntityIdByTilePos(tilePos);
        let tower = EntityManager.getInstance().getEntity(entityId);
        let attackComponent = tower.getComponent(AttackComponent);
        attackComponent.setTargetStrategy(packet.strategyId);
    },

    _handleOpponentChangeTowerStrategy: function (cmd, packet) {
        let battleData = BattleManager.getInstance().getBattleData();
        let opponentObjectMap = battleData.getMapObject(GameConfig.OPPONENT);
        let tilePos = cc.p(packet.tileX, packet.tileY);
        let entityId = opponentObjectMap.getEntityIdByTilePos(tilePos);
        let tower = EntityManager.getInstance().getEntity(entityId);
        let attackComponent = tower.getComponent(AttackComponent);
        attackComponent.setTargetStrategy(packet.strategyId);
    },

    _handleDestroyTower: function (cmd, packet) {
        let battleData = BattleManager.getInstance().getBattleData();
        let playerObjectMap = battleData.getMapObject(GameConfig.PLAYER);
        let tilePos = cc.p(packet.tileX, packet.tileY);
        let towerInTileObject = playerObjectMap.getTowerInTile(tilePos);
        let towerEntityId = towerInTileObject.getEntityId();
        let towerEntity = EntityManager.getInstance().getEntity(towerEntityId);

        EntityManager.destroy(towerEntity);

        let pos = Utils.tile2Pixel(tilePos.x, tilePos.y, GameConfig.PLAYER);
        let plusEnergyValue = CARD_CONST[towerInTileObject.getType()].energy / 2;
        BattleAnimation.animationPlusEnergy(pos, plusEnergyValue, GameConfig.PLAYER);
        let deckEnergyProgress = BattleManager.getInstance().getCardDeckNode().deckEnergyProgress;
        deckEnergyProgress.plusEnergy(plusEnergyValue);
        playerObjectMap.destroyTowerInMapObject(tilePos);

        EventDispatcher.getInstance()
            .dispatchEvent(EventType.DESTROY_TOWER, {pos: tilePos, mode: GameConfig.PLAYER});
    },

    _handleOpponentDestroyTower: function (cmd, packet) {
        let battleData = BattleManager.getInstance().getBattleData();
        let opponentObjectMap = battleData.getMapObject(GameConfig.OPPONENT);
        let tilePos = cc.p(packet.tileX, packet.tileY);

        let towerEntityId = opponentObjectMap.getEntityIdByTilePos(tilePos);
        let towerEntity = EntityManager.getInstance().getEntity(towerEntityId);
        EntityManager.destroy(towerEntity);

        opponentObjectMap.destroyTowerInMapObject(tilePos);
        EventDispatcher.getInstance()
            .dispatchEvent(EventType.DESTROY_TOWER, {pos: tilePos, mode: GameConfig.PLAYER});
    },

    logTickHandler: function (commandID, packet, tickNumber) {
        cc.warn("[tick input handle] #" + commandID + " | tickNumber = " + tickNumber + " : " + JSON.stringify(packet));
    }
});