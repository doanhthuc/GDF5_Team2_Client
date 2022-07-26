let AttackSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.ATTACK,
    name: "AttackSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    _run: function (tick) {
        let towerList = EntityManager.getInstance()
            .getEntitiesHasComponents(AttackComponent);
        let monsterList = EntityManager.getInstance()
            .getEntitiesHasComponents(MonsterInfoComponent);

        for (let tower of towerList) {
            let attackComponent = tower.getComponent(AttackComponent);

            // update count down time
            if (attackComponent.countdown > 0) {
                attackComponent.countdown -= tick;
            }
            if (attackComponent.countdown <= 0) {
                let monsterInAttackRange = []
                for (let monster of monsterList) {
                    if (monster.getActive() && monster.mode === tower.mode
                        && monster.hasAllComponent(PositionComponent)) {
                        let distance = this._distanceFrom(tower, monster);
                        if (distance <= attackComponent.range) {
                            let underGroundComponent = monster.getComponent(UnderGroundComponent);
                            if ((!(underGroundComponent) || underGroundComponent.isInGround === false)) {
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
                        EntityFactory.createBullet(tower.typeID, towerPos, monsterPos, targetMonster, attackComponent.effects, tower.mode);
                        // reset count down time
                        attackComponent.countdown = attackComponent.speed;
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
        switch (strategy) {
            case GameConfig.TOWER_TARGET_STRATEGY.MAX_HP: {
                let maxHP = -1;
                let maxIdx = -1;

                maxIdx = monsterInAttackRange.reduce((acc, cur, idx) => {
                    let monsterHP = cur.getComponent(LifeComponent).hp;
                    return monsterHP > monsterInAttackRange[acc] ? idx : acc;
                });

                // for (let i = 0; i < monsterInAttackRange.length; i++) {
                //     let monsterInfo = monsterInAttackRange[i].getComponent(LifeComponent);
                //     if (monsterInfo.hp > maxHP) {
                //         maxHP = monsterInfo.hp;
                //         maxIdx = i;
                //     }
                // }
                targetMonster = monsterInAttackRange[maxIdx];
                break;
            }
            case GameConfig.TOWER_TARGET_STRATEGY.MIN_HP: {
                let minHP = Number.MAX_VALUE;
                let minIdx = -1;
                for (let i = 0; i < monsterInAttackRange.length; i++) {
                    let monsterInfo = monsterInAttackRange[i].getComponent(LifeComponent);
                    if (monsterInfo.hp < minHP) {
                        minHP = monsterInfo.hp;
                        minIdx = i;
                    }
                }
                break;
            }
            case GameConfig.TOWER_TARGET_STRATEGY.MAX_DISTANCE:
            {
                let maxDistance = -1;
                let maxIdx = -1;
                for (let i = 0; i < monsterInAttackRange.length; i++) {
                    let monsterPos = monsterInAttackRange[i].getComponent(PositionComponent);
                    let distance = Utils.euclidDistance(towerPos, monsterPos);
                    if (distance > maxDistance) {
                        maxDistance = distance;
                        maxIdx = i;
                    }
                }
                break;
            }
            case GameConfig.TOWER_TARGET_STRATEGY.MIN_DISTANCE: {
                let minDistance = Number.MAX_VALUE;
                let minIdx = -1;
                for (let i = 0; i < monsterInAttackRange.length; i++) {
                    let monsterPos = monsterInAttackRange[i].getComponent(PositionComponent);
                    let distance = Utils.euclidDistance(towerPos, monsterPos);
                    if (distance < minDistance) {
                        minDistance = distance;
                        minIdx = i;
                    }
                }
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
        let minValue = Math.abs(deg-directionDegree[0]), minIdx = 0;
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