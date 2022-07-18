EventDispatcher.getInstance()
    .addEventHandler(EventType.END_ONE_TIMER, function (data) {
        let uiLayer = BattleManager.getInstance().getBattleLayer().uiLayer;
        uiLayer.waveNode.increaseWave();
        BattleManager.getInstance().getBattleLayer().bornMonster({x: 0, y: 4}, GameConfig.PLAYER);
        BattleManager.getInstance().getBattleLayer().bornMonster({x: 0, y: 4}, GameConfig.OPPONENT);
    })
    .addEventHandler(EventType.ZERO_ENERGY_HOUSE, function (data) {
        BattleManager.getInstance().getBattleLayer().stopGame();
    })
    .addEventHandler(EventType.END_ALL_WAVE, function (data) {
        BattleManager.getInstance().getBattleLayer().stopGame();
    })
    .addEventHandler(EventType.PUT_NEW_TOWER, function (data) {
        let tilePos = data.pos;
        let currentMode = data.mode;
        let map = BattleManager.getInstance().getBattleData().getMap(currentMode);

        if (!Utils.validateTilePos(tilePos)) {
            return;
        }

        cc.log("Put new tower event data: " + JSON.stringify(data));

        map[GameConfig.MAP_HEIGH - 1 - tilePos.y][tilePos.x] = GameConfig.MAP.TOWER;
        let shortestPathForEachTile = FindPathUtil.findShortestPathForEachTile(currentMode);

        let entityList = EntityManager.getInstance().getEntitiesHasComponents(PathComponent);
        for (let entity of entityList) {
            if (entity.mode === currentMode) {
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
                            newPath = newPath.slice(1, newPath.length);
                            newPath.unshift(cc.p(positionComponent.x, positionComponent.y));
                            //cc.log(JSON.stringify(newPath))
                            pathComponent.path = newPath;
                            pathComponent.currentPathIdx = 0;
                        }
                    }
                }
            }
        }
    })
