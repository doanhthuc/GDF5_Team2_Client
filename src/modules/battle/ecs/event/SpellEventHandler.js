EventDispatcher.getInstance()
    .addEventHandler(EventType.EXPLOSION_FIRE_SPELL, function (data) {
        let {damage, range, position} = data;
        let monsters = EntityManager.getInstance().getEntitiesByComponents(GameConfig.COMPONENT_ID.MONSTER_INFO);
        for (let monster of monsters) {
            if (monster.mode === GameConfig.PLAYER) {
                let monsterPosition = monster.getComponent(GameConfig.COMPONENT_ID.POSITION)
                let distance = Utils.euclidDistance(monsterPosition, position)
                if (distance <= range) {
                    let damageEffect = ComponentFactory.create(DamageEffect, damage);
                    monster.addComponent(damageEffect);
                }
            }
        }
    })