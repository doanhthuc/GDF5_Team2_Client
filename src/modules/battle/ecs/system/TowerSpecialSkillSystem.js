let TowerSpecialSkillSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.TOWER_SPECIAL_SKILL,
    name: "TowerSpecialSkillSystem",

    ctor: function () {
        this._super();
    },

    _run: function (tick) {

    },

    checkEntityCondition: function (entity, componentOrCls) {
        return componentOrCls.typeID === TowerInfoComponent.typeID || componentOrCls.typeID === MonsterInfoComponent.typeID;
    },

    updateData: function () {
        const tick = tickManager.getTickRate() / 1000;
        this._handleSnakeSpecialSkill(tick);
        this._handleGoatSpecialSkill(tick);
        this._handleBuffAbility(tick);
    },

    _handleSnakeSpecialSkill: function (tick) {
        for (let towerID in this.getEntityStore()) {
            let tower = this.getEntityStore()[towerID];
            if (!tower._hasComponent(SnakeBurnHpAuraComponent)) continue;

            let snakeBurnHpAura = tower.getComponent(SnakeBurnHpAuraComponent);

            for (let monsterID in this.getEntityStore()) {
                let monster = this.getEntityStore()[monsterID];
                if (!monster._hasComponent(LifeComponent)) continue;
                if (tower === monster || monster.mode !== tower.mode) continue;

                if (this._distanceFrom(tower, monster) <= snakeBurnHpAura.range) {
                    let lifeComponent = monster.getComponent(LifeComponent);
                    let lostHp = Math.min(snakeBurnHpAura.burnRate * lifeComponent.maxHP, snakeBurnHpAura.maxBurnHP) * tick;
                    lifeComponent.hp -= lostHp;
                }
            }
        }

    },

    _handleGoatSpecialSkill: function (tick) {
        for (let towerID in this.getEntityStore()) {
            let tower = this.getEntityStore()[towerID];
            if (!tower._hasComponent(GoatSlowAuraComponent)) continue;

            let goatSlowAura = tower.getComponent(GoatSlowAuraComponent);

            for (let monsterID in this.getEntityStore()) {
                let monster = this.getEntityStore()[monsterID];
                if (tower === monster || monster.mode !== tower.mode) continue;

                if (this._distanceFrom(tower, monster) <= goatSlowAura.range) {
                    let goatSlowEffect = ComponentFactory.create(GoatSlowEffectComponent, goatSlowAura.percent)
                    monster.addComponent(goatSlowEffect);
                }
            }
        }

    },

    _handleBuffAbility: function () {
        for (let buffTowerID in this.getEntityStore()) {
            let buffTower = this.getEntityStore()[buffTowerID];
            if (!buffTower._hasComponent(TowerAbilityComponent)) continue;

            let towerAbilityComponent = buffTower.getComponent(TowerAbilityComponent);

            for (let damageTowerID in this.getEntityStore()) {
                let damageTower = this.getEntityStore()[damageTowerID];
                if (!damageTower._hasComponent(AttackComponent)) continue;
                if (damageTower === buffTower || damageTower.mode !== buffTower.mode) continue;

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
    },

    _distanceFrom: function (tower, monster) {
        let towerPos = tower.getComponent(PositionComponent);
        let monsterPos = monster.getComponent(PositionComponent);
        return Utils.euclidDistance(towerPos, monsterPos);
    },

});
TowerSpecialSkillSystem.typeID = GameConfig.SYSTEM_ID.TOWER_SPECIAL_SKILL;
SystemManager.getInstance().registerClass(TowerSpecialSkillSystem);