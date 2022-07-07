let SpellSystem = System.extend({
    id: GameConfig.SYSTEM_ID.SPELL,
    name: "SpellSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        let spellList = EntityManager.getInstance()
            .getEntitiesHasComponents(SpellInfoComponent);

        for (let spellEntity of spellList) {
            let spellComponent = spellEntity.getComponent(SpellInfoComponent);
            spellComponent.countdown = spellComponent.countdown - tick;
            if (spellComponent.countdown <= 0) {
                let monsters = EntityManager.getInstance().getEntitiesHasComponents(MonsterInfoComponent);
                for (let monster of monsters) {
                    // FIXME: hardcode mode === GameConfig.PLAYER
                    if (monster.mode === GameConfig.PLAYER) {
                        let monsterPosition = monster.getComponent(PositionComponent)
                        let distance = Utils.euclidDistance(monsterPosition, spellComponent.position)
                        if (distance <= spellComponent.range) {
                            for (let effect of spellComponent.effects) {
                                monster.addComponent(effect);
                            }
                        }
                    }
                }
                spellEntity.removeComponent(VelocityComponent);
                spellEntity.removeComponent(PositionComponent);
                spellEntity.removeComponent(SpellInfoComponent);
            }
        }
    },
});