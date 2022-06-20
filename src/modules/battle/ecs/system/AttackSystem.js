let AttackSystem = System.extend({
    id: GameConfig.SYSTEM_ID.ATTACK,
    name: "AttackSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        let towerList = EntityManager.getInstance()
            .getEntitiesByComponents(GameConfig.COMPONENT_ID.ATTACK);
        let monsterList = EntityManager.getInstance()
            .getEntitiesByComponents(GameConfig.COMPONENT_ID.MONSTER_INFO);

        for (let tower of towerList) {
            let attackComponent = tower.getComponent(GameConfig.COMPONENT_ID.ATTACK);

            // update count down time
            attackComponent.countdown -= tick;
            if (attackComponent.countdown <= 0) {
                let monsterInAttackRange = []
                for (let monster of monsterList) {
                    if (monster.getActive()) {
                        let distance = this._distanceFrom(tower, monster);
                        if (distance <= attackComponent.range) {
                            monsterInAttackRange.push(monster);
                        }
                    }
                }
                if (monsterInAttackRange.length > 0) {
                    // TODO: switch case target_strategy here
                    let targetMonster = this._findTargetMonsterByStrategy(attackComponent.targetStrategy, monsterInAttackRange);
                    let monsterPos = targetMonster.getComponent(GameConfig.COMPONENT_ID.POSITION);
                    let towerPos = tower.getComponent(GameConfig.COMPONENT_ID.POSITION);
                    EntityFactory.createBullet(tower.typeID, towerPos, monsterPos, attackComponent.effects);

                    // reset count down time
                    attackComponent.countdown = attackComponent.speed;
                    cc.log("speed = " + attackComponent.speed)
                }
            }
        }
    },

    _distanceFrom: function (tower, monster) {
        let towerPos = tower.getComponent(GameConfig.COMPONENT_ID.POSITION);
        let monsterPos = monster.getComponent(GameConfig.COMPONENT_ID.POSITION);
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
                    let monsterInfo = monsterInAttackRange[i].getComponent(GameConfig.COMPONENT_ID.MONSTER_INFO);
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