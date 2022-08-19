EventDispatcher.getInstance()
    .addEventHandler(EventType.END_ONE_TIMER, function (data) {
        let uiLayer = BattleManager.getInstance().getBattleLayer().uiLayer;
        let battleData = BattleManager.getInstance().getBattleData();
        battleData.setCurrentWave(battleData.getCurrentWave() + 1);
        battleData.setCurrentIndexMonsterWave(0);
        uiLayer.waveNode.renderUI();
        soundManager.playNextWave();
    })
    .addEventHandler(EventType.SPAWN_MONSTER, function (data) {
        let battleData = BattleManager.getInstance().getBattleData();
        let currentWave = battleData.getCurrentWave();
        let monsterWave = battleData.getMonsterWave();
        let currentIndexMonsterWave = battleData.getCurrentIndexMonsterWave();
        if (monsterWave[currentWave] && currentIndexMonsterWave < monsterWave[currentWave].length) {
            let monsterTypeID = monsterWave[currentWave][currentIndexMonsterWave];
            battleData.setCurrentIndexMonsterWave(currentIndexMonsterWave + 1);
            //     BattleManager.getInstance().getBattleLayer().createMonsterByEntityID(GameConfig.PLAYER, monsterTypeID);
            //     BattleManager.getInstance().getBattleLayer().createMonsterByEntityID(GameConfig.OPPONENT, monsterTypeID);
            //
        }
    })
    .addEventHandler(EventType.PUT_NEW_TOWER, function (data) {
        let tilePos = data.pos;
        let currentMode = data.mode;
        let cardId = data.cardId;
        let map = BattleManager.getInstance().getBattleData().getMapObject(currentMode).convertBattleMapObjectToSimpleMap();

        if (!Utils.validateTilePos(tilePos)) {
            return;
        }

        map[GameConfig.MAP_HEIGH - 1 - tilePos.y][tilePos.x] = GameConfig.MAP.TOWER;
        let shortestPathForEachTile = FindPathUtil.findShortestPathForEachTile(currentMode);
        BattleManager.getInstance().getBattleData().setShortestPathForEachTile(shortestPathForEachTile, currentMode);

        let entityList = EntityManager.getInstance().getEntitiesHasComponents(MonsterInfoComponent);
        for (let entity of entityList) {
            if (entity.mode === currentMode && entity.typeID !== GameConfig.ENTITY_ID.BAT) {
                let pathComponent = entity.getComponent(PathComponent);
                let positionComponent = entity.getComponent(PositionComponent);
                if (positionComponent) {
                    let tilePos = Utils.pixel2Tile(positionComponent.x, positionComponent.y, currentMode);
                    let path = shortestPathForEachTile[GameConfig.MAP_HEIGH - 1 - tilePos.y][tilePos.x];
                    if (path) {
                        if (path.length > 0) {
                            let newPath = Utils.tileArray2PixelCellArray(path, currentMode);
                            pathComponent.path = newPath;
                            pathComponent.currentPathIdx = 0;
                        }
                    }
                }
            }
        }

        if (currentMode === GameConfig.PLAYER) {
            BattleManager.getInstance().getBattleLayer().mapLayer.showPlayerMonsterPath();
        }
    })
    .addEventHandler(EventType.UPGRADE_TOWER, function (data) {
        let towerId = data.cardId;
        let tilePos = data.pos;
        BattleNetwork.connector.sendUpgradeTower(towerId, tilePos);
    })
    .addEventHandler(EventType.DESTROY_TOWER, function (data) {
        let tilePos = data.pos;
        let currentMode = data.mode;

        let map = BattleManager.getInstance().getBattleData().getMapObject(currentMode).convertBattleMapObjectToSimpleMap();

        if (!Utils.validateTilePos(tilePos)) {
            return;
        }

        map[GameConfig.MAP_HEIGH - 1 - tilePos.y][tilePos.x] = GameConfig.MAP.NONE;
        let shortestPathForEachTile = FindPathUtil.findShortestPathForEachTile(currentMode);
        BattleManager.getInstance().getBattleData().setShortestPathForEachTile(shortestPathForEachTile, currentMode);

        let entityList = EntityManager.getInstance().getEntitiesHasComponents(MonsterInfoComponent);
        for (let entity of entityList) {
            if (entity.mode === currentMode && entity.typeID != GameConfig.ENTITY_ID.BAT) {
                let pathComponent = entity.getComponent(PathComponent);
                let positionComponent = entity.getComponent(PositionComponent);
                if (positionComponent) {
                    let tilePos = Utils.pixel2Tile(positionComponent.x, positionComponent.y, currentMode);
                    let path = shortestPathForEachTile[GameConfig.MAP_HEIGH - 1 - tilePos.y][tilePos.x];
                    if (path) {
                        if (path.length > 0) {
                            let newPath = Utils.tileArray2PixelCellArray(path, currentMode);
                            pathComponent.path = newPath;
                            pathComponent.currentPathIdx = 0;
                        }
                    }
                }
            }
        }

        if (currentMode === GameConfig.PLAYER) {
            BattleManager.getInstance().getBattleLayer().mapLayer.showPlayerMonsterPath();
        }
    })

