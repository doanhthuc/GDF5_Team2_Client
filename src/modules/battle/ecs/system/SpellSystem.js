let SpellSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.SPELL,
    name: "SpellSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    _run: function (tick) {
        let spellList = EntityManager.getInstance()
            .getEntitiesHasComponents(SpellInfoComponent);

        for (let spellEntity of spellList) {
            let spellComponent = spellEntity.getComponent(SpellInfoComponent);
            spellComponent.delay = spellComponent.delay - tick;

            if (spellComponent.delay <= 0) {
                let monsters = EntityManager.getInstance().getEntitiesHasComponents(MonsterInfoComponent);
                for (let monster of monsters) {
                    if (monster.mode === spellEntity.mode) {
                        let monsterPosition = monster.getComponent(PositionComponent)
                        let distance = Utils.euclidDistance(monsterPosition, spellComponent.position)
                        if (distance <= spellComponent.range) {
                            for (let effect of spellComponent.effects) {
                                monster.addComponent(effect.clone());
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
SpellSystem.typeID = GameConfig.SYSTEM_ID.SPELL;
SystemManager.getInstance().registerClass(SpellSystem);