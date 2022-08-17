let AttackSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.ATTACK,
    name: "AttackSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    _run: function (dt) {

    },

    checkEntityCondition: function (entity, componentOrCls) {
        return componentOrCls.typeID === AttackComponent.typeID;
    },

    updateData: function () {
        const dt = tickManager.getTickRate() / 1000;

        for (let entityId in this.getEntityStore()) {
            let tower = this.getEntityStore()[entityId];
            let attackComponent = tower.getComponent(AttackComponent);

            // update count down time
            if (attackComponent.countdown > 0) {
                attackComponent.countdown -= dt;
            }

            if (attackComponent.countdown <= 0) {
                let monsterInAttackRange = []

                let abilitySystem = SystemManager.getInstance().getSystemByTypeID(AbilitySystem);
                for (let monsterId in abilitySystem.getEntityStore()) {
                    let monster = abilitySystem.getEntityStore()[monsterId];
                    if (!monster._hasComponent(PositionComponent)) continue;
                    let monsterInfo = monster.getComponent(MonsterInfoComponent);
                    if (!attackComponent.canTargetAirMonster && monsterInfo.classs === GameConfig.MONSTER.CLASS.AIR) {
                        continue;
                    }
                    let underGroundComponent = monster.getComponent(UnderGroundComponent);
                    if ((underGroundComponent == null) || underGroundComponent.isInGround === false) {
                        if (monster.getActive() && monster.mode === tower.mode
                            && monster.hasAllComponent(PositionComponent)) {
                            let distance = this._distanceFrom(tower, monster);
                            if (distance <= attackComponent.range) {
                                monsterInAttackRange.push(monster);
                            }
                        }
                    }
                }
                if (monsterInAttackRange.length > 0) {
                    // TODO: switch case target_strategy here
                    let towerPos = tower.getComponent(PositionComponent);
                    let targetMonster = this._findTargetMonsterByStrategy(towerPos, attackComponent.targetStrategy, monsterInAttackRange);
                    if (targetMonster != null) {
                        let monsterPos = targetMonster.getComponent(PositionComponent);
                        this._changeTowerAnimation(tower, targetMonster);

                        let clonedEffects = [];
                        for (let effect of attackComponent.effects) {
                            clonedEffects.push(effect.clone());
                        }

                        if (tower.typeID === GameConfig.ENTITY_ID.FROG_TOWER) {
                            let distance = this._distanceFrom(tower, targetMonster);
                            let k = attackComponent.range / distance;
                            let destination = new PositionComponent(k * (monsterPos.x - towerPos.x) + towerPos.x, k * (monsterPos.y - towerPos.y) + towerPos.y);
                            EntityFactory.createBullet(tower.typeID, towerPos, null, destination, clonedEffects,
                                tower.mode, attackComponent.bulletSpeed, attackComponent.bulletRadius, attackComponent.canTargetAirMonster);
                        } else {
                            EntityFactory.createBullet(tower.typeID, towerPos, targetMonster,
                                cc.p(monsterPos.x, monsterPos.y), clonedEffects, tower.mode, attackComponent.bulletSpeed,
                                attackComponent.bulletRadius, attackComponent.canTargetAirMonster);
                        }
                        
                        if (tower.mode === GameConfig.PLAYER) soundManager.playAttack(tower.typeID);
                        attackComponent.countdown = attackComponent.getSpeed();
                    }
                }
            }
        }
    },

    _distanceFrom: function (tower, monster) {
        let towerPos = tower.getComponent(PositionComponent);
        let monsterPos = monster.getComponent(PositionComponent);
        return Utils.euclidDistance(towerPos, monsterPos);
    },

    _findTargetMonsterByStrategy: function (towerPos, strategy, monsterInAttackRange) {
        //check DarkGiantBoss
        for (let monster of monsterInAttackRange) {
            if (monster.typeID === GameConfig.ENTITY_ID.DARK_GIANT) return monster;
        }

        let targetMonster = null;
        let monsterIndex = -1;
        switch (strategy) {
            case GameConfig.TOWER_TARGET_STRATEGY.MAX_HP: {
                monsterIndex = monsterInAttackRange.reduce((acc, cur, idx) => {
                    let lifeComponent = cur.getComponent(LifeComponent);
                    let monsterHP = lifeComponent.hp;
                    return monsterHP > monsterInAttackRange[acc] ? idx : acc;
                }, 0);
                targetMonster = monsterInAttackRange[monsterIndex];
                break;
            }
            case GameConfig.TOWER_TARGET_STRATEGY.MIN_HP: {
                monsterIndex = monsterInAttackRange.reduce((acc, cur, idx) => {
                    let lifeComponent = cur.getComponent(LifeComponent);
                    let monsterHP = lifeComponent.hp;
                    return monsterHP < monsterInAttackRange[acc] ? idx : acc;
                }, 0);
                targetMonster = monsterInAttackRange[monsterIndex];
                break;
            }
            case GameConfig.TOWER_TARGET_STRATEGY.MAX_DISTANCE: {
                monsterIndex = monsterInAttackRange.reduce((acc, cur, idx) => {
                    let monsterPos = cur.getComponent(PositionComponent);
                    let distance = Utils.euclidDistance(towerPos, monsterPos);
                    return distance > monsterInAttackRange[acc] ? idx : acc;
                }, 0);
                targetMonster = monsterInAttackRange[monsterIndex];
                break;
            }
            case GameConfig.TOWER_TARGET_STRATEGY.MIN_DISTANCE: {
                monsterIndex = monsterInAttackRange.reduce((acc, cur, idx) => {
                    let monsterPos = cur.getComponent(PositionComponent);
                    let distance = Utils.euclidDistance(towerPos, monsterPos);
                    return distance < monsterInAttackRange[acc] ? idx : acc;
                }, 0);
                targetMonster = monsterInAttackRange[monsterIndex];
                break;
            }
            default:
                // TODO: create custom error type
                throw new Error("Invalid strategy");
        }
        return targetMonster;
    },

    _changeTowerAnimation: function (tower, monster) {
        let monsterPos = monster.getComponent(PositionComponent);
        let towerPos = tower.getComponent(PositionComponent)

        let deg = Utils.calcSlopeOfLine({x: towerPos.x, y: towerPos.y}, {x: monsterPos.x, y: monsterPos.y});
        let directionDegree = [0, 25, 50, 75, 90, 115, 140, 165, 180, 205, 230, 255, 270, 295, 320, 345];
        let minValue = Math.abs(deg - directionDegree[0]), minIdx = 0;
        for (let i = 1; i < directionDegree.length; i++) {
            if (Math.abs(deg - directionDegree[i]) < minValue) {
                minIdx = i;
                minValue = Math.abs(deg - directionDegree[i]);
            }
        }

        let spriteComponent = tower.getComponent(SpriteSheetAnimationComponent);
        if (spriteComponent) {
            spriteComponent.changeCurrentState("ATTACK_" + directionDegree[minIdx]);
        }
    }
});
AttackSystem.typeID = GameConfig.SYSTEM_ID.ATTACK;
SystemManager.getInstance().registerClass(AttackSystem);