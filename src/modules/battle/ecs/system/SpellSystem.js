let SpellSystem = System.extend({
    id: GameConfig.SYSTEM_ID.SPELL,
    name: "SpellSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        let spellList = EntityManager.getInstance()
            .getEntitiesByComponents(GameConfig.COMPONENT_ID.SPELL);

        for (let spellEntity of spellList) {
            let spellComponent = spellEntity.getComponent(SpellInfoComponent);
            spellComponent.countdown = spellComponent.countdown - tick;
            if (spellComponent.countdown <= 0) {
                let monsters = EntityManager.getInstance().getEntitiesByComponents(MonsterInfoComponent);
                for (let monster of monsters) {
                    // FIXME: hardcode mode === GameConfig.PLAYER
                    if (monster.mode === GameConfig.PLAYER) {
                        let monsterPosition = monster.getComponent(GameConfig.COMPONENT_ID.POSITION)
                        let distance = Utils.euclidDistance(monsterPosition, spellComponent.position)
                        if (distance <= spellComponent.range) {
                            for (let effect of spellComponent.effects) {
                                monster.addComponent(effect);
                            }
                        }
                    }
                }
                EntityECS.destroy(spellEntity);
            }
        }
    },
});