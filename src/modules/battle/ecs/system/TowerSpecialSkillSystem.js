let TowerSpecialSkillSystem = System.extend({
        id: GameConfig.SYSTEM_ID.TOWER_SPECIAL_SKILL,
        name: "TowerSpecialSkillSystem",

        ctor: function () {
            this._super();
            cc.log("new " + this.name);
        },

        _run: function (tick) {

        },

        updateData: function () {
            const tick = tickManager.getTickRate() / 1000;
            this._handleSnakeSpecialSkill(tick);
            this._handleSpawnMinionComponent(tick);
            this._handleHealingAbility(tick);
            this._handleBuffAbility(tick);
        },

    _handleSnakeSpecialSkill: function () {
            let entityList = EntityManager.getInstance().getEntitiesHasComponents(UnderGroundComponent);
            for (let entity of entityList) {
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