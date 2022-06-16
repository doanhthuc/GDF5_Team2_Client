EventDispatcher.getInstance()
    .addEventHandler(EventType.BULLET_COLLIDE_MONSTER, function (data) {
        let monster = data.monster, bullet = data.bullet;

        let bulletInfo = bullet.getComponent(GameConfig.COMPONENT_ID.BULLET_INFO);
        let monsterInfo = monster.getComponent(GameConfig.COMPONENT_ID.MONSTER_INFO);

        for (let effect of bulletInfo.effects) {
                monster.addComponent(effect);
        }

        bullet.getComponent(GameConfig.COMPONENT_ID.APPEARANCE).sprite.setVisible(false);
        bullet.setActive(false);
    }
);
