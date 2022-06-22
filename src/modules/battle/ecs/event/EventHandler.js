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
    .addEventHandler(EventType.PUT_NEW_TOWER, function (data) {

    })