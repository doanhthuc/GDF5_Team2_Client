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
                let monsters = EntityManager.getInstance().getEntitiesHasComponents(MonsterInfoComponent, PositionComponent);
                for (let monster of monsters) {
                    if (monster.mode === spellEntity.mode) {
                        let monsterPosition = monster.getComponent(PositionComponent)
                        if (!monsterPosition) continue;

                        let distance = Utils.euclidDistance(monsterPosition, spellComponent.position)
                        if (distance <= spellComponent.range) {
                            for (let effect of spellComponent.effects) {
                                monster.addComponent(effect.clone());

                                if (spellEntity.typeID === GameConfig.ENTITY_ID.FIRE_SPELL) {
                                    let oldVelocity = monster.getComponent(VelocityComponent);
                                    let monsterInfo = monster.getComponent(MonsterInfoComponent);

                                    if (monsterInfo.classs === GameConfig.MONSTER.CLASS.AIR) {
                                        continue;
                                    }

                                    if (!(oldVelocity && monsterInfo)) {
                                        continue;
                                    }

                                    let spellPos = spellComponent.position;
                                    let monsterPos = monsterPosition;

                                    const force = 3000;
                                    const mass = monsterInfo.weight;
                                    let A = 40 + force / mass;
                                    cc.log("mass = " + mass);
                                    cc.log("A = " + A);
                                    let T = 1;
                                    const V0 = Math.abs(A * T);


                                    let newVectorVelocity = Utils.calculateVelocityVector(
                                        spellPos,
                                        monsterPos,
                                        V0
                                    );
                                    oldVelocity.speedX = newVectorVelocity.speedX;
                                    oldVelocity.speedY = newVectorVelocity.speedY;


                                    let fireballEffect = ComponentFactory.create(FireBallEffect,
                                        A, T, cc.p(spellPos.x, spellPos.y), cc.p(monsterPos.x, monsterPos.y), V0);

                                    monster.addComponent(fireballEffect);
                                    monster.removeComponent(PathComponent);
                                }
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