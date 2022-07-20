let AbilitySystem = System.extend({
        id: GameConfig.SYSTEM_ID.ABILITY,
        name: "AbilitySystem",

        ctor: function () {
            this._super();
            cc.log("new " + this.name);
        },

        _run: function (tick) {
            this._handleUnderGroundComponent();
            this._handleSpawnMinionComponent(tick);
            this._handleHealingAbility(tick);
            this._handleBuffDamageAbility(tick);
        },

        _handleUnderGroundComponent: function (tick) {
            let entityList = EntityManager.getInstance().getEntitiesHasComponents(UnderGroundComponent);
            for (let entity of entityList) {
                let lifeComponent = entity.getComponent(LifeComponent);
                let underGroundComponent = entity.getComponent(UnderGroundComponent);
                let pathComponent = entity.getComponent(PathComponent);
                if (underGroundComponent.isInGround === false) {
                    if (((lifeComponent.hp / lifeComponent.maxHP) <= 0.7 - 0.3 * underGroundComponent.trigger)) {
                        underGroundComponent.trigger += 1;
                        underGroundComponent.disablePathIdx = pathComponent.currentPathIdx + 2;
                        underGroundComponent.isInGround = true;
                    }
                } else {
                    if (underGroundComponent.disablePathIdx === pathComponent.currentPathIdx) {
                        underGroundComponent.isInGround = false;
                    }
                }
            }
        },

        _handleSpawnMinionComponent: function (tick) {
            let entityList = EntityManager.getInstance().getEntitiesHasComponents(SpawnMinionComponent);

            for (let entity of entityList) {

                let spawnMinionComponent = entity.getComponent(SpawnMinionComponent);
                if (spawnMinionComponent.period >= 0) {
                    spawnMinionComponent.period = spawnMinionComponent.period - tick;
                } else {
                    spawnMinionComponent.period = 2;
                    let positionComponent = entity.getComponent(PositionComponent);
                    if (spawnMinionComponent.spawnAmount < 5) {
                        EntityFactory.createDemonTreeMinion({
                            x: positionComponent.x,
                            y: positionComponent.y
                        }, entity.mode);
                    }
                }
            }
        },

        _handleHealingAbility: function (tick) {
            let entityList = EntityManager.getInstance().getEntitiesHasComponents(HealingAbility);

            let monsterList = null;
            if (entityList) {
                monsterList = EntityManager.getInstance().getEntitiesHasComponents(MonsterInfoComponent);
            }

            for (let satyr of entityList) {
                let healingAbility = satyr.getComponent(HealingAbility);
                if (healingAbility.countdown > 0) {
                    healingAbility.countdown -= tick;
                } else {
                    healingAbility.countdown = 1;
                    for (let monster of monsterList) {
                        if (monster.getActive() && monster.mode === satyr.mode) {
                            let distance = this._distanceFrom(satyr, monster);
                            if (distance <= healingAbility.range) {
                                let lifeComponent = monster.getComponent(LifeComponent);
                                lifeComponent.hp = Math.min(lifeComponent.hp + lifeComponent.maxHP * healingAbility.healingRate, lifeComponent.maxHP);
                            }
                        }
                    }
                }
            }

        },
        _handleBuffDamageAbility: function (tick) {
            let buffTowerList = EntityManager.getInstance().getEntitiesHasComponents(TowerAbilityComponent);
            cc.log("AbilitySystem.js line 87 " + buffTowerList.length);
            let damageTowerList = null;
            if (buffTowerList) {
                damageTowerList = EntityManager.getInstance().getEntitiesHasComponents(AttackComponent);
            }

            for (let buffTower of buffTowerList) {
                let towerAbilityComponent = buffTower.getComponent(TowerAbilityComponent);
                switch (towerAbilityComponent.effect.typeID) {
                    case BuffAttackDamageEffect.typeID:
                    case BuffAttackSpeedEffect.typeID:
                        for (let damageTower of damageTowerList) {
                            if (this._distanceFrom(buffTower, damageTower) < towerAbilityComponent.range) {
                                switch (towerAbilityComponent.effect.typeID) {
                                    case GameConfig.COMPONENT_ID.BUFF_ATTACK_DAMAGE:
                                        let attackComponent = damageTower.getComponent(AttackComponent);
                                        cc.log('AbilitySystem.js line 99 ' + (attackComponent.getDamage() + attackComponent.originDamage * towerAbilityComponent.effect.percent));
                                        attackComponent.setDamage(attackComponent.getDamage() + attackComponent.originDamage * towerAbilityComponent.effect.percent);
                                        break;
                                    case GameConfig.COMPONENT_ID.BUFF_ATTACK_SPEED:
                                        let attackSpeedComponent = damageTower.getComponent(AttackComponent);
                                        attackSpeedComponent.setSpeed(attackSpeedComponent.speed - (attackSpeedComponent.originSpeed * towerAbilityComponent.effect.percent));
                                        break;
                                }

                            }
                        }
                        break;
                        case SlowEffect.typeID:
                            let monsterList = EntityManager.getInstance().getEntitiesHasComponents(MonsterInfoComponent);
                            for (let monster of monsterList) {
                                if (this._distanceFrom(buffTower, monster) < towerAbilityComponent.range) {
                                    monster.addComponent(towerAbilityComponent.effect);
                                }
                            }
                            break;

                }
            }
        },
        _distanceFrom: function (tower, monster) {
            let towerPos = tower.getComponent(PositionComponent);
            let monsterPos = monster.getComponent(PositionComponent);
            return Utils.euclidDistance(towerPos, monsterPos);
        },

    })
;
AbilitySystem.typeID = GameConfig.SYSTEM_ID.ABILITY;
SystemManager.getInstance().registerClass(AbilitySystem);