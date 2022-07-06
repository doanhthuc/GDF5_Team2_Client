EventDispatcher.getInstance()
    .addEventHandler(EventType.BULLET_COLLIDE_MONSTER, function (data) {
            let monster = data.monster, bullet = data.bullet;

            let bulletInfo = bullet.getComponent(BulletInfoComponent);
            let monsterInfo = monster.getComponent(MonsterInfoComponent);

            for (let effect of bulletInfo.effects) {
                monster.addComponent(effect.clone());
            }

            if (bulletInfo.type && bulletInfo.type === "frog") {
                // handle here
            } else {
                bullet.getComponent(AppearanceComponent).sprite.setVisible(false);
                bullet.setActive(false);
            }
        })
    .addEventHandler(EventType.END_ONE_TIMER, function (data) {
        let uiLayer = GameConfig.gameLayer.uiLayer;
        uiLayer.waveNode.increaseWave();
        GameConfig.gameLayer.bornMonster({x: 0, y: 4}, GameConfig.PLAYER);
        GameConfig.gameLayer.bornMonster({x: 0, y: 4}, GameConfig.OPPONENT);
    })
    .addEventHandler(EventType.FINISH_PATH, function (data) {
        let entity = data.entity;

        if (entity.hasAllComponent(VelocityComponent)) {
            entity.removeComponent(entity.getComponent(VelocityComponent));
        }

        // FIXME: what is this?
        if (entity.hasAllComponent(BulletInfoComponent)) {
            let bulletInfoComponent = entity.getComponent(BulletInfoComponent);
            if (bulletInfoComponent.type === "frog") {
                let appearanceComponent = entity.getComponent(AppearanceComponent)
                if (appearanceComponent) {
                    appearanceComponent.sprite.setVisible(false);
                }
            }
        }

        entity.setActive(false);
    })
    .addEventHandler(EventType.ZERO_ENERGY_HOUSE, function (data) {
        GameConfig.gameLayer.stopGame();
    })
    .addEventHandler(EventType.END_ALL_WAVE, function (data) {
        GameConfig.gameLayer.stopGame();
    })
    .addEventHandler(EventType.PUT_NEW_TOWER, function (data) {
        let map = GameConfig.battleData.getMap(GameConfig.PLAYER);

        // FIXME: map
        if (GameConfig.MAP_HEIGH-1-data.pos.y < 0 || GameConfig.MAP_HEIGH-1-data.pos.y >= GameConfig.MAP_HEIGH
            || data.pos.x < 0 || data.pos.x >= GameConfig.MAP_WIDTH) {
            return;
        }
        cc.log("put new tower event: " + JSON.stringify(data));

        // put tower at x, y
        map[GameConfig.MAP_HEIGH-1-data.pos.y][data.pos.x] = 7;
        let shortestPathForEachTile = FindPathUtil.findShortestPathForEachTile(GameConfig.PLAYER);
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(PathComponent);

        let currentMode = GameConfig.PLAYER;
        for (let entity of entityList) {
            if (entity.mode === currentMode) {
                let pathComponent = entity.getComponent(PathComponent);
                let positionComponent = entity.getComponent(PositionComponent);
                if (positionComponent) {
                    let tilePos = Utils.pixel2Tile(positionComponent.x, positionComponent.y, currentMode);
                    let path = shortestPathForEachTile[GameConfig.MAP_HEIGH-1-tilePos.y][tilePos.x];
                    if (path) {
                        if (path.length > 0) {
                            let newPath = [Utils.tile2Pixel(positionComponent.x, positionComponent.y, currentMode)]
                            for (let i = 0; i < path.length; i++) {
                                newPath.push(path[i]);
                            }
                            pathComponent.path = newPath;
                            pathComponent.currentPathIdx = 0;
                        }
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
        cc.director.runScene(new cc.TransitionFade(1, scene));
    })