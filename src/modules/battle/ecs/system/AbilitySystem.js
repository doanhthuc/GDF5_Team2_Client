let AbilitySystem = System.extend({
        id: GameConfig.SYSTEM_ID.ABILITY,
        name: "AbilitySystem",

        ctor: function () {
            this._super();
            cc.log("new " + this.name);
        },

        _run: function (tick) {

        },

        updateData: function () {
            const tick = tickManager.getTickRate() / 1000;
            this._handleUnderGroundComponent();
            this._handleSpawnMinionComponent(tick);
            this._handleHealingAbility(tick);
            this._handleBuffAbility(tick);
        },

        _handleUnderGroundComponent: function (tick) {
            let entityList = EntityManager.getInstance().getEntitiesHasComponents(UnderGroundComponent);
            for (let entity of entityList) {
                let lifeComponent = entity.getComponent(LifeComponent);
                let underGroundComponent = entity.getComponent(UnderGroundComponent);
                let positionComponent = entity.getComponent(PositionComponent);

                lifeComponent.updateDataFromLatestTick();
                underGroundComponent.updateDataFromLatestTick();
                positionComponent.updateDataFromLatestTick();

                //check if the Monster have Position Component
                if (positionComponent) {
                    if (underGroundComponent.isInGround === false) {
                        if (((lifeComponent.hp / lifeComponent.maxHP) <= 0.7 - 0.3 * underGroundComponent.trigger)) {
                            underGroundComponent.trigger += 1;
                            underGroundComponent.disableMoveDistance = positionComponent.moveDistance + GameConfig.TILE_WIDTH * 2;
                            underGroundComponent.isInGround = true;

                            BattleAnimation.addAnimationUnderGround(entity);
                        }
                    } else {
                        if (underGroundComponent.disableMoveDistance <= positionComponent.moveDistance) {
                            underGroundComponent.isInGround = false;
                            BattleAnimation.removeAnimationUnderGround(entity);
                        }
                    }
                }

                underGroundComponent.saveData();
            }
        },

        _handleSpawnMinionComponent: function (tick) {
            let entityList = EntityManager.getInstance().getEntitiesHasComponents(SpawnMinionComponent);

            for (let entity of entityList) {
                let spawnMinionComponent = entity.getComponent(SpawnMinionComponent);

                spawnMinionComponent.updateDataFromLatestTick();

                if (spawnMinionComponent.period >= 0) {
                    spawnMinionComponent.period = spawnMinionComponent.period - tick;
                } else {
                    spawnMinionComponent.period = 2;
                    let positionComponent = entity.getComponent(PositionComponent);
                    positionComponent.updateDataFromLatestTick();

                    if (spawnMinionComponent.spawnAmount < 5) {
                        EntityFactory.createDemonTreeMinion({
                            x: positionComponent.x,
                            y: positionComponent.y
                        }, entity.mode);

                        BattleAnimation.animationBornMonster(entity);
                    }
                }

                spawnMinionComponent.saveData();
            }
        },

        _handleHealingAbility: function (tick) {
            let entityList = EntityManager.getInstance().getEntitiesHasComponents(HealingAbility, PositionComponent);

            let monsterList = null;
            if (entityList) {
                monsterList = EntityManager.getInstance().getEntitiesHasComponents(MonsterInfoComponent, PositionComponent);
            }

            for (let satyr of entityList) {
                let healingAbility = satyr.getComponent(HealingAbility);

                healingAbility.updateDataFromLatestTick();

                if (healingAbility.countdown > 0) {
                    healingAbility.countdown -= tick;
                } else {
                    healingAbility.countdown = 1;
                    for (let monster of monsterList) {
                        if (monster.getActive() && monster.mode === satyr.mode) {
                            let monsterPos = monster.getComponent(PositionComponent);
                            monsterPos.updateDataFromLatestTick();

                            if (monsterPos) {
                                let distance = this._distanceFrom(satyr, monster);

                                if (distance <= healingAbility.range) {
                                    let lifeComponent = monster.getComponent(LifeComponent);
                                    lifeComponent.updateDataFromLatestTick();
                                    lifeComponent.hp = Math.min(lifeComponent.hp + lifeComponent.maxHP * healingAbility.healingRate, lifeComponent.maxHP);
                                    lifeComponent.saveData();
                                }
                            }
                        }
                    }
                }

                healingAbility.saveData();
            }

        },

        _handleBuffAbility: function (tick) {
            let buffTowerList = EntityManager.getInstance().getEntitiesHasComponents(TowerAbilityComponent);
            let damageTowerList = null;

            if (buffTowerList) {
                damageTowerList = EntityManager.getInstance().getEntitiesHasComponents(AttackComponent);
            }

            for (let buffTower of buffTowerList) {
                let towerAbilityComponent = buffTower.getComponent(TowerAbilityComponent);
                towerAbilityComponent.updateDataFromLatestTick();
                for (let damageTower of damageTowerList) {
                    if (this._distanceFrom(buffTower, damageTower) < towerAbilityComponent.range) {
                        switch (towerAbilityComponent.effect.typeID) {
                            case BuffAttackDamageEffect.typeID:
                                let attackComponent = damageTower.getComponent(AttackComponent);
                                attackComponent.updateDataFromLatestTick();
                                attackComponent.setDamage(attackComponent.getDamage() + attackComponent.originDamage * towerAbilityComponent.effect.percent);
                                attackComponent.saveData();
                                BattleAnimation.addBuffDamageAnimation(damageTower);
                                break;
                            case BuffAttackSpeedEffect.typeID:
                                let attackSpeedComponent = damageTower.getComponent(AttackComponent);
                                attackSpeedComponent.updateDataFromLatestTick()
                                attackSpeedComponent.setSpeed(attackSpeedComponent.speed - (attackSpeedComponent.originSpeed * towerAbilityComponent.effect.percent));
                                attackSpeedComponent.saveData();
                                BattleAnimation.addBuffSpeedAnimation(damageTower);
                                break;
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

    })
;
AbilitySystem.typeID = GameConfig.SYSTEM_ID.ABILITY;
SystemManager.getInstance().registerClass(AbilitySystem);