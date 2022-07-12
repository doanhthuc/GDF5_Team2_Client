let AttackSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.ATTACK,
    name: "AttackSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    run: function (tick) {
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
                    if (monster.getActive() && monster.mode === tower.mode) {
                        let distance = this._distanceFrom(tower, monster);
                        if (distance <= attackComponent.range) {
                            monsterInAttackRange.push(monster);
                        }
                    }
                }
                if (monsterInAttackRange.length > 0) {
                    // TODO: switch case target_strategy here
                    let targetMonster = this._findTargetMonsterByStrategy(attackComponent.targetStrategy, monsterInAttackRange);
                    let monsterPos = targetMonster.getComponent(PositionComponent);
                    let towerPos = tower.getComponent(PositionComponent);

                    EntityFactory.createBullet(tower.typeID, towerPos, monsterPos, attackComponent.effects, tower.mode);
                    // reset count down time
                    attackComponent.countdown = attackComponent.speed;
                }
            }
        }
    },

    _distanceFrom: function (tower, monster) {
        let towerPos = tower.getComponent(PositionComponent);
        let monsterPos = monster.getComponent(PositionComponent);
        return Utils.euclidDistance(towerPos, monsterPos);
    },

    _findTargetMonsterByStrategy: function (strategy, monsterInAttackRange) {
        return monsterInAttackRange[0];
        let targetMonster = null;
        switch (strategy) {
            case GameConfig.TOWER_TARGET_STRATEGY.MAX_HP:
                let maxHP = -1;
                let maxIdx = -1;
                for (let i = 0; i < monsterInAttackRange.length; i++) {
                    let monsterInfo = monsterInAttackRange[i].getComponent(MonsterInfoComponent);
                    if (monsterInfo.hp > maxHP) {
                        maxHP = monsterInfo.hp;
                        maxIdx = i;
                    }
                }
                targetMonster = monsterInAttackRange[maxIdx];
                break;
            case GameConfig.TOWER_TARGET_STRATEGY.MIN_HP:
                break;
            case GameConfig.TOWER_TARGET_STRATEGY.MAX_DISTANCE:
                break;
            case GameConfig.TOWER_TARGET_STRATEGY.MIN_DISTANCE:
                break;
            default:
                // TODO: create custom error type
                throw new Error("Invalid strategy");
        }
        return targetMonster;
    }
});
AttackSystem.typeID = GameConfig.SYSTEM_ID.ATTACK;
SystemManager.getInstance().registerClass(AttackSystem);