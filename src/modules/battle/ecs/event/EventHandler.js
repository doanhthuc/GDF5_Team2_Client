EventDispatcher.getInstance()
    .addEventHandler(EventType.END_ONE_TIMER, function (data) {
        let uiLayer = BattleManager.getInstance().getBattleLayer().uiLayer;
        uiLayer.waveNode.increaseWave();
        // BattleManager.getInstance().getBattleLayer().bornMonsterInWave(BattleManager.getInstance().getBattleData().getCurrentMonsterWave(),GameConfig.PLAYER);
        // BattleManager.getInstance().getBattleLayer().bornMonsterInWave(BattleManager.getInstance().getBattleData().getCurrentMonsterWave(),GameConfig.OPPONENT);
    })
    .addEventHandler(EventType.SPAWN_MONSTER, function (data) {
        let battleData = BattleManager.getInstance().getBattleData();
        let currentWave = battleData.getCurrentWave();
        let monsterWave = battleData.getMonsterWave();
        if (monsterWave[currentWave].length > 0) {
            let monsterTypeID = monsterWave[currentWave].pop();
            BattleManager.getInstance().getBattleLayer().createMonsterByEntityID(GameConfig.PLAYER, monsterTypeID);
            BattleManager.getInstance().getBattleLayer().createMonsterByEntityID(GameConfig.OPPONENT, monsterTypeID);
        }
    })
    .addEventHandler(EventType.ZERO_ENERGY_HOUSE, function (data) {
        // BattleManager.getInstance().getBattleLayer().stopGame();
    })
    .addEventHandler(EventType.END_ALL_WAVE, function (data) {
        // BattleManager.getInstance().getBattleLayer().stopGame();
    })
    .addEventHandler(EventType.PUT_NEW_TOWER, function (data) {
        let tilePos = data.pos;
        let currentMode = data.mode;
        let cardId = data.cardId;
        let map = BattleManager.getInstance().getBattleData().getMap(currentMode);

        if (!Utils.validateTilePos(tilePos)) {
            return;
        }

        cc.log("Put new tower event data: " + JSON.stringify(data));

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
                            // let newPath = [{x: positionComponent.x, y: positionComponent.y}]
                            // newPath = [...newPath, ...Utils.tileArray2PixelArray(path, currentMode)]
                            let newPath = Utils.tileArray2PixelCellArray(path, currentMode);
                            //newPath = newPath.slice(1, newPath.length);
                            //newPath.unshift(cc.p(positionComponent.x, positionComponent.y));
                            //cc.log(JSON.stringify(newPath))
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
        cc.log('[EventHandler.js line 52 ]Upgrade tower event data: ' + JSON.stringify(data));
    })
    .addEventHandler(EventType.DESTROY_TOWER, function (data) {
        let tilePos = data.pos;
        let currentMode = data.mode;

        let map = BattleManager.getInstance().getBattleData().getMap(currentMode);

        if (!Utils.validateTilePos(tilePos)) {
            return;
        }

        cc.log("Put new tower event data: " + JSON.stringify(data));

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
                            // let newPath = [{x: positionComponent.x, y: positionComponent.y}]
                            // newPath = [...newPath, ...Utils.tileArray2PixelArray(path, currentMode)]
                            let newPath = Utils.tileArray2PixelCellArray(path, currentMode);
                            //newPath = newPath.slice(1, newPath.length);
                            //newPath.unshift(cc.p(positionComponent.x, positionComponent.y));
                            //cc.log(JSON.stringify(newPath))
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

