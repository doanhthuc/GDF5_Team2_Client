let TowerSpecialSkillSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.TOWER_SPECIAL_SKILL,
    name: "TowerSpecialSkillSystem",

    ctor: function () {
        this._super();
        this.direction = [0, -1, 0, 1, 0]
    },

    _run: function (tick) {

    },

    checkEntityCondition: function (entity, componentOrCls) {
        return componentOrCls.typeID === TowerInfoComponent.typeID || componentOrCls.typeID === MonsterInfoComponent.typeID;
    },

    updateData: function () {
        const tick = tickManager.getTickRate() / 1000;
        this._handleSnakeSpecialSkill(tick);
        // this._handleGoatSpecialSkill(tick);
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

            let towerPosition = buffTower.getComponent(PositionComponent);
            let tilePos = Utils.pixel2Tile(towerPosition.x, towerPosition.y, buffTower.mode);
            let battleMapObject = BattleManager.getInstance().getBattleData().getMapObject(buffTower.mode)

            for (let i = 0; i < this.direction.length - 1; i++) {
                let tile = battleMapObject.getTileObject(tilePos.x + this.direction[i], tilePos.y + this.direction[i + 1]);
                if (tile === null) continue;

                let towerInTileObject = tile.getTower();
                if (towerInTileObject === null) continue;

                let towerEntity = EntityManager.getInstance().getEntity(towerInTileObject.getEntityId());
                let attackComponent = towerEntity.getComponent(AttackComponent);

                if (attackComponent === null) continue;

                let effectTypeId = towerAbilityComponent.effect.typeID;
                if (effectTypeId === BuffAttackDamageEffect.typeID) {
                    attackComponent.setDamage(attackComponent.getDamage() + attackComponent.originDamage * towerAbilityComponent.effect.percent);
                    BattleAnimation.addBuffDamageAnimation(towerEntity);
                } else if (effectTypeId === BuffAttackSpeedEffect.typeID) {
                    attackComponent.setSpeed(attackComponent.speed - (attackComponent.originSpeed * towerAbilityComponent.effect.percent));
                    BattleAnimation.addBuffSpeedAnimation(towerEntity);
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