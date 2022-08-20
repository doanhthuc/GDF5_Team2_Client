let SpellSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.SPELL,
    name: "SpellSystem",

    ctor: function () {
        this._super();
    },

    _run: function (dt) {

    },

    checkEntityCondition: function (entity, componentOrCls) {
        return componentOrCls.typeID === SpellInfoComponent.typeID
            || componentOrCls.typeID === MonsterInfoComponent.typeID;
    },

    updateData: function () {
        const tick = tickManager.getTickRate() / 1000;
        for (let entityID in this.getEntityStore()) {
            let spellEntity = this.getEntityStore()[entityID];
            if (!spellEntity._hasComponent(SpellInfoComponent)) continue;

            let spellComponent = spellEntity.getComponent(SpellInfoComponent);

            spellComponent.delay = spellComponent.delay - tick;

            if (spellComponent.delay <= 0) {
                for (let monsterId in this.getEntityStore()) {
                    let monster = this.getEntityStore()[monsterId];

                    if (monster === spellEntity) continue;
                    if (!monster._hasComponent(MonsterInfoComponent)) continue;
                    if (!monster._hasComponent(PositionComponent)) continue;

                    // The spell can't reach the under ground monsters
                    let underGroundComponent = monster.getComponent(UnderGroundComponent);
                    if (underGroundComponent && underGroundComponent.isInGround) {
                        continue;
                    }

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
                                    let A =  40 + force / mass;
                                    let T = 1;
                                    const velocityStart = Math.abs(A * T);


                                    let newVectorVelocity = Utils.calculateVelocityVector(
                                        spellPos,
                                        monsterPos,
                                        velocityStart
                                    );
                                    oldVelocity.speedX = newVectorVelocity.speedX;
                                    oldVelocity.speedY = newVectorVelocity.speedY;


                                    let fireballEffect = ComponentFactory.create(FireBallEffect,
                                        A, T, cc.p(spellPos.x, spellPos.y), cc.p(monsterPos.x, monsterPos.y), velocityStart);

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

                if (spellEntity.mode === GameConfig.USER1() && spellEntity.typeID === GameConfig.ENTITY_ID.FIRE_SPELL) {
                    soundManager.playFireballExplosion();
                }
                if (spellEntity.mode === GameConfig.USER1() && spellEntity.typeID === GameConfig.ENTITY_ID.FIRE_SPELL) {
                    soundManager.playFrozenExplosion();
                }
            }
        }
    },
});
SpellSystem.typeID = GameConfig.SYSTEM_ID.SPELL;
SystemManager.getInstance().registerClass(SpellSystem);