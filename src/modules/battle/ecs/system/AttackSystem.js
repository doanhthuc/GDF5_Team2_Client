let AttackSystem = System.extend({
    id: GameConfig.SYSTEM_ID.ATTACK,
    name: "AttackSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        let towerList = EntityManager.getInstance()
            .getEntitiesByComponents(GameConfig.COMPONENT_ID.TOWER_INFO);
        let monsterList = EntityManager.getInstance()
            .getEntitiesByComponents(GameConfig.COMPONENT_ID.MONSTER_INFO);

        cc.log("xxxxxxx")
        cc.log(towerList.length);
        cc.log(monsterList.length);
        cc.log(JSON.stringify(EntityManager.getInstance().entities))
        for (let tower in towerList) {
            let towerInfo = tower.getComponent(GameConfig.COMPONENT_ID.TOWER_INFO);

            // update count down time
            towerInfo.attackCountdown -= tick;
            cc.log(towerInfo.attackCountdown)
            if (towerInfo.attackCountdown <= 0) {
                let monsterInAttackRange = []
                for (let monster in monsterList) {
                    if (monster.getActive()) {
                        let distance = this._distanceFrom(tower, monster);
                        if (distance <= towerInfo.attackRange) {
                            monsterInAttackRange.push(monster);
                        }
                    }
                }

                if (monsterInAttackRange.length > 0) {
                    // TODO: switch case target_strategy here
                    let targetMonster = this._findTargetMonsterByStrategy("max-hp", monsterInAttackRange);
                    let monsterPos = targetMonster.getComponent(GameConfig.COMPONENT_ID.POSITION);
                    let towerPos = tower.getComponent(GameConfig.COMPONENT_ID.POSITION);
                    cc.log("===> Create bullet");
                    EntityFactory.createBullet(towerPos, monsterPos, []);

                    // reset count down time
                    towerInfo.attackCountdown = towerInfo.speedAttack;
                }
            }
        }
    },

    _distanceFrom: function (tower, monster) {
        let towerPos = tower.getComponent(GameConfig.COMPONENT_ID.POSITION);
        let monsterPos = monster.getComponent(GameConfig.COMPONENT_ID.POSITION);
        return Math.sqrt(Math.pow(towerPos.x - monsterPos.x, 2) + Math.pow(towerPos.y - monsterPos.y, 2));
    },

    _findTargetMonsterByStrategy: function (strategy, monsterInAttackRange) {
        let targetMonster = null;
        switch (strategy) {
            case "max-hp":
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
            case "min-hp":
                break;
            case "max-distance":
                break;
            case "min-distance":
                break;
            default:
                // TODO: create custom error type
                throw new Error("Invalid strategy");
        }
        return targetMonster;
    }
});