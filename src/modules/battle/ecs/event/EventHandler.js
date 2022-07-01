EventDispatcher.getInstance()
    .addEventHandler(EventType.BULLET_COLLIDE_MONSTER, function (data) {
            let monster = data.monster, bullet = data.bullet;

            let bulletInfo = bullet.getComponent(GameConfig.COMPONENT_ID.BULLET_INFO);
            let monsterInfo = monster.getComponent(GameConfig.COMPONENT_ID.MONSTER_INFO);

            for (let effect of bulletInfo.effects) {
                monster.addComponent(effect.clone());
            }

            if (bulletInfo.type && bulletInfo.type === "frog") {
                // handle here
            } else {
                bullet.getComponent(GameConfig.COMPONENT_ID.APPEARANCE).sprite.setVisible(false);
                bullet.setActive(false);
            }
        })
    .addEventHandler(EventType.END_ONE_TIMER, function (data) {
        let uiLayer = GameConfig.gameLayer.uiLayer;
        uiLayer.waveNode.increaseWave();
        GameConfig.gameLayer.bornMonster(0, 4);
    })
    .addEventHandler(EventType.FINISH_PATH, function (data) {
        let entity = data.entity;

        if (entity.hasAllComponent(GameConfig.COMPONENT_ID.VELOCITY)) {
            entity.removeComponent(entity.getComponent(GameConfig.COMPONENT_ID.VELOCITY));
        }

        if (entity.hasAllComponent(GameConfig.COMPONENT_ID.BULLET_INFO)) {
            let bulletInfoComponent = entity.getComponent(GameConfig.COMPONENT_ID.BULLET_INFO);
            if (bulletInfoComponent.type === "frog") {
                let appearanceComponent = entity.getComponent(GameConfig.COMPONENT_ID.APPEARANCE)
                if (appearanceComponent) {
                    appearanceComponent.sprite.setVisible(false);
                }
            }
        }

        entity.setActive(false);
    })
    .addEventHandler(EventType.ZERO_ENERGY_PLAYER_HOUSE, function (data) {
        GameConfig.gameLayer.stopGame();
    })
    .addEventHandler(EventType.END_ALL_WAVE, function (data) {
        // GameConfig.gameLayer.stopGame();
        GameConfig.gameLayer.uiLayer.stopTimer();
    })
    .addEventHandler(EventType.PUT_NEW_TOWER, function (data) {
        let map = GameConfig.battleData.getPlayerMap();

        // FIXME: map
        if (GameConfig.MAP_HEIGH-1-data.pos.y < 0 || GameConfig.MAP_HEIGH-1-data.pos.y >= GameConfig.MAP_HEIGH
            || data.pos.x < 0 || data.pos.x >= GameConfig.MAP_WIDTH) {
            return;
        }

        // put tower at x, y
        map[GameConfig.MAP_HEIGH-1-data.pos.y][data.pos.x] = 7;
        let paths = FindPathUtil.create2DMatrix(map.length, map[0].length, null);

        cc.log("^^^^^^^^^")
        for (let r = 0; r < map.length; r++) {
            let str = "";
            for (let c = 0; c < map[0].length; c++) {
                str += map[r][c] + "\t";
            }
            cc.log(str);
        }

        for (let row = 0; row < map.length; row++) {
            for (let col = 0; col < map[0].length; col++) {
                if (map[row][col] === 0) {
                    let path = FindPathUtil.findShortestPath(map, {x: col, y: 4-row}, {x: 6, y: 0});
                    if (path && path.length > 0) {
                        path = Utils.tileArray2PixelArray(path);
                        paths[row][col] = path;
                    }
                }
            }
        }

        if (paths && paths[0][0]) {
            GameConfig.gameLayer.mapLayer.path = paths[0][0];
        }

        let entityList = EntityManager.getInstance()
            .getEntitiesByComponents(GameConfig.COMPONENT_ID.PATH);

        for (let entity of entityList) {
            let pathComponent = entity.getComponent(GameConfig.COMPONENT_ID.PATH);
            let positionComponent = entity.getComponent(GameConfig.COMPONENT_ID.POSITION);
            if (positionComponent) {
                let tilePos = Utils.pixel2Tile(positionComponent.x, positionComponent.y);
                let path = paths[GameConfig.MAP_HEIGH-1-tilePos.y][tilePos.x];
                if (path) {
                    if (path.length > 0) {
                        let newPath = [Utils.tile2Pixel(positionComponent.x, positionComponent.y)]
                        for (let i = 0; i < path.length; i++) {
                            newPath.push(path[i]);
                        }
                        pathComponent.path = newPath;
                        pathComponent.currentPathIdx = 0;
                    }
                }
            }
        }
    })
    .addEventHandler(EventType.FINISH_MATCHING, function (data) {
        let layer = new GameLayer();
        layer.setName("Screen");

        let scene = new cc.Scene();
        scene.addChild(layer);
        cc.log("AAAAAAAAAAAAAAAAAAA")
        cc.director.runScene(new cc.TransitionFade(1, scene));
    })