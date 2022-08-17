let AbilitySystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.ABILITY,
    name: "AbilitySystem",

    ctor: function () {
        this._super();
    },

    _run: function (tick) {

    },

    checkEntityCondition: function (entity, componentOrCls) {
        return componentOrCls.typeID === MonsterInfoComponent.typeID;
    },

    updateData: function () {
        const tick = tickManager.getTickRate() / 1000;
        this._handleUnderGroundComponent();
        this._handleSpawnMinionComponent(tick);
        this._handleBuffAbility1(tick);
    },

    _handleUnderGroundComponent: function () {
        for (let entityId in this.getEntityStore()) {
            let entity = this.getEntityStore()[entityId];
            if (!entity._hasComponent(UnderGroundComponent)) continue;

            let lifeComponent = entity.getComponent(LifeComponent);
            let underGroundComponent = entity.getComponent(UnderGroundComponent);

            let positionComponent = entity.getComponent(PositionComponent);
            let frozenEffect = entity.getComponent(FrozenEffect);

            // frozen monster ==> monster can't exec under ground ability
            if (frozenEffect && frozenEffect.countdown > 0) {
                continue;
            }

            //check if the Monster have Position Component
            if (positionComponent) {
                if (underGroundComponent.isInGround === false) {
                    if (((lifeComponent.hp / lifeComponent.maxHP) <= 0.7 - 0.3 * underGroundComponent.trigger)) {
                        underGroundComponent.trigger += 1;
                        underGroundComponent.disableMoveDistance = positionComponent.moveDistance + GameConfig.TILE_WIDTH * 3;
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
        }
    },

    _handleSpawnMinionComponent: function (tick) {
        for (let entityId in this.getEntityStore()) {
            let entity = this.getEntityStore()[entityId];
            if (!entity._hasComponent(SpawnMinionComponent)) continue;

            let spawnMinionComponent = entity.getComponent(SpawnMinionComponent);

            if (spawnMinionComponent.period >= 0) {
                spawnMinionComponent.period = spawnMinionComponent.period - tick;
            } else {
                spawnMinionComponent.period = 2;
                let positionComponent = entity.getComponent(PositionComponent);

                if (spawnMinionComponent.spawnAmount < spawnMinionComponent.maxAmount) {
                    EntityFactory.createDemonTreeMinion({
                        x: positionComponent.x,
                        y: positionComponent.y
                    }, entity.mode);

                    BattleAnimation.animationBornMonster(entity);
                }
            }
        }
    },

    _handleHealingAbility: function (tick) {
        for (let entityId in this.getEntityStore()) {
            let satyr = this.getEntityStore()[entityId];

            if (!satyr._hasComponent(HealingAbility)) continue;
            if (!satyr._hasComponent(PositionComponent)) continue;

            let healingAbility = satyr.getComponent(HealingAbility);

            if (healingAbility.countdown > 0) {
                healingAbility.countdown -= tick;
            } else {
                healingAbility.countdown = 1;
                for (let monsterId in this.getEntityStore()) {
                    let monster = this.getEntityStore()[monsterId];

                    if (!monster._hasComponent(PositionComponent)) continue;

                    if (monster.getActive() && monster.mode === satyr.mode) {
                        let monsterPos = monster.getComponent(PositionComponent);

                        if (monsterPos) {
                            let distance = this._distanceFrom(satyr, monster);

                            if (distance <= healingAbility.range) {
                                let lifeComponent = monster.getComponent(LifeComponent);
                                lifeComponent.hp = Math.min(lifeComponent.hp + lifeComponent.maxHP * healingAbility.healingRate, lifeComponent.maxHP);
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

    getMonsterList: function () {
        return this.getEntityStore();
    }

                    }
                }
            }
        },

        _handleBuffAbility1: function () {
            let buffTowerList = EntityManager.getInstance().getEntitiesHasComponents(TowerAbilityComponent);
            if (!buffTowerList || buffTowerList.length === 0) {
                return;
            }

            for (let buffTower of buffTowerList) {
                let towerAbilityComponent = buffTower.getComponent(TowerAbilityComponent);
                let towerPosition = buffTower.getComponent(PositionComponent);
                let tilePos = Utils.pixel2Tile(towerPosition.x, towerPosition.y, buffTower.mode);
                let battleMapObject = BattleManager.getInstance().getBattleData().getMapObject(buffTower.mode)
                let direction = [0, -1, 0, 1, 0]
                for (let i = 0; i < direction.length - 1; i++) {
                    let tile = battleMapObject.getTileObject(tilePos.x + direction[i], tilePos.y + direction[i + 1]);
                    if (tile) {
                        let towerInTileObject = tile.getTower();
                        if (towerInTileObject) {
                            let towerEntity = EntityManager.getInstance().getEntity(towerInTileObject.getEntityId());
                            let attackComponent = towerEntity.getComponent(AttackComponent);
                            if (attackComponent) {
                                switch (towerAbilityComponent.effect.typeID) {
                                    case BuffAttackDamageEffect.typeID: {
                                        attackComponent.setDamage(attackComponent.getDamage() + attackComponent.originDamage * towerAbilityComponent.effect.percent);
                                        BattleAnimation.addBuffDamageAnimation(towerEntity);
                                        break;
                                    }
                                    case BuffAttackSpeedEffect.typeID: {
                                        attackComponent.setSpeed(attackComponent.speed - (attackComponent.originSpeed * towerAbilityComponent.effect.percent));
                                        BattleAnimation.addBuffSpeedAnimation(towerEntity);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },


});
AbilitySystem.typeID = GameConfig.SYSTEM_ID.ABILITY;
SystemManager.getInstance().registerClass(AbilitySystem);