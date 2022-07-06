EventDispatcher.getInstance()
    .addEventHandler(EventType.EXPLOSION_FIRE_SPELL, function (data) {
        let {damage, range, position} = data;
        let monsters = EntityManager.getInstance().getEntitiesHasComponents(MonsterInfoComponent);
        for (let monster of monsters) {
            if (monster.mode === GameConfig.PLAYER) {
                let monsterPosition = monster.getComponent(PositionComponent)
                let distance = Utils.euclidDistance(monsterPosition, position)
                if (distance <= range) {
                    let damageEffect = ComponentFactory.create(DamageEffect, damage);
                    monster.addComponent(damageEffect);
                }
            }
        }
    })
    .addEventHandler(EventType.EXPLOSION_FROZEN_SPELL, function (data) {
        let {damage, duration, range, position} = data;
        let monsters = EntityManager.getInstance().getEntitiesHasComponents(MonsterInfoComponent);
        for (let monster of monsters) {
            if (monster.mode === GameConfig.PLAYER) {
                let monsterPosition = monster.getComponent(PositionComponent)
                let distance = Utils.euclidDistance(monsterPosition, position)
                if (distance <= range) {
                    let damageEffect = ComponentFactory.create(DamageEffect, damage);
                    let frozenEffect = ComponentFactory.create(FrozenEffect, duration)
                    monster.addComponent(damageEffect);
                    monster.addComponent(frozenEffect);
                }
            }
        }
    })