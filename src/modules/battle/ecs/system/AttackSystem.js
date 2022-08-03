let AttackSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.ATTACK,
    name: "AttackSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    _run: function (dt) {
        // let towerList = EntityManager.getInstance()
        //     .getEntitiesHasComponents(AttackComponent);
        // let monsterList = EntityManager.getInstance()
        //     .getEntitiesHasComponents(MonsterInfoComponent, PositionComponent);
        //
        // for (let tower of towerList) {
        //     let attackComponent = tower.getComponent(AttackComponent);
        //     // cc.log("[AttackSystem.js line 35] attackComponent.targetStrategy: " + JSON.stringify(attackComponent.effects));
        //     // update count down time
        //     if (attackComponent.countdown > 0) {
        //         attackComponent.countdown -= dt;
        //     }
        //     if (attackComponent.countdown <= 0) {
        //         let monsterInAttackRange = []
        //         for (let monster of monsterList) {
        //             let underGroundComponent = monster.getComponent(UnderGroundComponent);
        //             if ((underGroundComponent == null) || underGroundComponent.isInGround === false) {
        //                 if (monster.getActive() && monster.mode === tower.mode
        //                     && monster.hasAllComponent(PositionComponent)) {
        //                     let distance = this._distanceFrom(tower, monster);
        //                     if (distance <= attackComponent.range) {
        //                         monsterInAttackRange.push(monster);
        //                     }
        //                 }
        //             }
        //         }
        //         if (monsterInAttackRange.length > 0) {
        //             // TODO: switch case target_strategy here
        //             let towerPos = tower.getComponent(PositionComponent);
        //             let targetMonster = this._findTargetMonsterByStrategy(towerPos, attackComponent.targetStrategy, monsterInAttackRange);
        //             if (targetMonster != null) {
        //                 let monsterPos = targetMonster.getComponent(PositionComponent);
        //                 this._changeTowerAnimation(tower, targetMonster);
        //
        //                 if (tower.typeID === GameConfig.ENTITY_ID.FROG_TOWER) {
        //                     let distance = this._distanceFrom(tower, targetMonster);
        //                     let k = attackComponent.range / distance;
        //                     let destination = new PositionComponent(k * (monsterPos.x - towerPos.x) + towerPos.x, k * (monsterPos.y - towerPos.y) + towerPos.y);
        //                     EntityFactory.createBullet(tower.typeID, towerPos, destination, attackComponent.effects, tower.mode, attackComponent.bulletSpeed, attackComponent.bulletRadius);
        //                 } else {
        //                     EntityFactory.createBullet(tower.typeID, towerPos, monsterPos, attackComponent.effects, tower.mode, attackComponent.bulletSpeed, attackComponent.bulletRadius)
        //                 }
        //                 attackComponent.countdown = attackComponent.speed;
        //             }
        //         }
        //     }
        // }
    },

    updateData: function () {
        const dt = tickManager.getTickRate() / 1000;
        let towerList = EntityManager.getInstance()
            .getEntitiesHasComponents(AttackComponent);
        let monsterList = EntityManager.getInstance()
            .getEntitiesHasComponents(MonsterInfoComponent, PositionComponent);

        for (let tower of towerList) {
            let attackComponent = tower.getComponent(AttackComponent);

            attackComponent.updateDataFromLatestTick();

            // cc.log("[AttackSystem.js line 35] attackComponent.targetStrategy: " + JSON.stringify(attackComponent.effects));
            // update count down time
            if (attackComponent.countdown > 0) {
                attackComponent.countdown -= dt;
            }
            if (attackComponent.countdown <= 0) {
                let monsterInAttackRange = []
                for (let monster of monsterList) {
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

                        if (tower.typeID === GameConfig.ENTITY_ID.FROG_TOWER) {
                            let distance = this._distanceFrom(tower, targetMonster);
                            let k = attackComponent.range / distance;
                            let destination = new PositionComponent(k * (monsterPos.x - towerPos.x) + towerPos.x, k * (monsterPos.y - towerPos.y) + towerPos.y);
                            EntityFactory.createBullet(tower.typeID, towerPos, destination, attackComponent.effects, tower.mode, attackComponent.bulletSpeed, attackComponent.bulletRadius);
                        } else {
                            EntityFactory.createBullet(tower.typeID, towerPos, monsterPos, attackComponent.effects, tower.mode, attackComponent.bulletSpeed, attackComponent.bulletRadius)
                        }
                        attackComponent.countdown = attackComponent.speed;
                    }
                }
            }

            attackComponent.saveData();
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
        // return monsterInAttackRange[0];
        let targetMonster = null;
        let monsterIndex = -1;
        switch (strategy) {
            case GameConfig.TOWER_TARGET_STRATEGY.MAX_HP: {
               // cc.log("[AttackSystem] find target by max hp");
                monsterIndex = monsterInAttackRange.reduce((acc, cur, idx) => {
                    let monsterHP = cur.getComponent(LifeComponent).hp;
                    return monsterHP > monsterInAttackRange[acc] ? idx : acc;
                }, 0);
                targetMonster = monsterInAttackRange[monsterIndex];
                break;
            }
            case GameConfig.TOWER_TARGET_STRATEGY.MIN_HP: {
                monsterIndex = monsterInAttackRange.reduce((acc, cur, idx) => {
                    let monsterHP = cur.getComponent(LifeComponent).hp;
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