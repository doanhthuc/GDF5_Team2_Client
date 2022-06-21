EventDispatcher.getInstance()
    .addEventHandler(EventType.BULLET_COLLIDE_MONSTER, function (data) {
            let monster = data.monster, bullet = data.bullet;

            let bulletInfo = bullet.getComponent(GameConfig.COMPONENT_ID.BULLET_INFO);
            let monsterInfo = monster.getComponent(GameConfig.COMPONENT_ID.MONSTER_INFO);

            for (let effect of bulletInfo.effects) {
                monster.addComponent(effect.clone());
            }

            if (bulletInfo.type && bulletInfo.type === "frog") {
                cc.log("frog collide");
            } else {
                bullet.getComponent(GameConfig.COMPONENT_ID.APPEARANCE).sprite.setVisible(false);
                bullet.setActive(false);
            }
        }
    )
    .addEventHandler(EventType.RESET_INIT_VELOCITY, function (data) {
        let velocityComponent = data.velocityComponent;
        velocityComponent.speedX = velocityComponent.originSpeedX;
        velocityComponent.speedY = velocityComponent.originSpeedY;
    })
    .addEventHandler(EventType.END_TIMER, function (data) {
        let uiLayer = GameConfig.gameLayer.uiLayer;
        uiLayer.waveNode.increaseWave();
    })
