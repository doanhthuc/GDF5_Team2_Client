let TowerSpecialSkillSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.TOWER_SPECIAL_SKILL,
    name: "TowerSpecialSkillSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    _run: function (tick) {

    },

    checkEntityCondition: function (entity) {
        return entity._hasComponent(TowerInfoComponent);
    },

    updateData: function () {
        const tick = tickManager.getTickRate() / 1000;
        this._handleSnakeSpecialSkill(tick);
        this._handleGoatSpecialSkill(tick);
        this._handleBuffAbility(tick);
    },

    _handleSnakeSpecialSkill: function (tick) {
        let towerList = EntityManager.getInstance().getEntitiesHasComponents(SnakeBurnHpAuraComponent);
        let monsterList = EntityManager.getInstance().getEntitiesHasComponents(MonsterInfoComponent, LifeComponent);
        for (let tower of towerList) {
            let snakeBurnHpAura = tower.getComponent(SnakeBurnHpAuraComponent);
            for (let monster of monsterList) {
                if (monster.mode !== tower.mode) continue;
                if (this._distanceFrom(tower, monster) <= snakeBurnHpAura.range) {
                    let lifeComponent = monster.getComponent(LifeComponent);
                    let lostHp = Math.min(snakeBurnHpAura.burnRate * lifeComponent.maxHP, snakeBurnHpAura.maxBurnHP) * tick;
                    lifeComponent.hp -= lostHp;
                }
            }
        }

    },

    _handleGoatSpecialSkill: function (tick) {
        let towerList = EntityManager.getInstance().getEntitiesHasComponents(GoatSlowAuraComponent);
        let monsterList = EntityManager.getInstance().getEntitiesHasComponents(MonsterInfoComponent);
        for (let tower of towerList) {
            let goatSlowAura = tower.getComponent(GoatSlowAuraComponent);
            for (let monster of monsterList) {
                if (monster.mode !== tower.mode) continue;
                if (this._distanceFrom(tower, monster) <= goatSlowAura.range) {
                    let goatSlowEffect = ComponentFactory.create(GoatSlowEffectComponent, goatSlowAura.percent)
                    monster.addComponent(goatSlowEffect);
                }
            }
        }

    },

    _handleBuffAbility: function () {
        let buffTowerList = EntityManager.getInstance().getEntitiesHasComponents(TowerAbilityComponent);
        let damageTowerList = null;

        if (buffTowerList) {
            damageTowerList = EntityManager.getInstance().getEntitiesHasComponents(AttackComponent);
        }

        for (let buffTower of buffTowerList) {
            let towerAbilityComponent = buffTower.getComponent(TowerAbilityComponent);
            for (let damageTower of damageTowerList) {
                if (damageTower.mode === buffTower.mode) {
                    if (this._distanceFrom(buffTower, damageTower) < towerAbilityComponent.range) {
                        switch (towerAbilityComponent.effect.typeID) {
                            case BuffAttackDamageEffect.typeID: {
                                let attackComponent = damageTower.getComponent(AttackComponent);
                                attackComponent.setDamage(attackComponent.getDamage() + attackComponent.originDamage * towerAbilityComponent.effect.percent);
                                BattleAnimation.addBuffDamageAnimation(damageTower);
                                break;
                            }
                            case BuffAttackSpeedEffect.typeID: {
                                let attackComponent = damageTower.getComponent(AttackComponent);
                                attackComponent.setSpeed(attackComponent.speed - (attackComponent.originSpeed * towerAbilityComponent.effect.percent));
                                BattleAnimation.addBuffSpeedAnimation(damageTower);
                                break;
                            }
                        }
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

});
TowerSpecialSkillSystem.typeID = GameConfig.SYSTEM_ID.TOWER_SPECIAL_SKILL;
SystemManager.getInstance().registerClass(TowerSpecialSkillSystem);