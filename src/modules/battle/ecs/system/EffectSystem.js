let EffectSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.EFFECT,
    name: "EffectSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    _run: function (tick) {

    },

    updateData: function () {
        const tick = tickManager.getTickRate() / 1000;
        this._handleBuffAttackRangeEffect(tick);
        this._handleBuffAttackSpeedEffect(tick);
        this._handleBuffAttackDamageEffect(tick);
        this._handleDamageEffect(tick);
        // IMPORTANT: SlowEffect < FrozenEffect
        this._handleSlowEffect(tick);
        this._handleFrozenEffect(tick);
        this._handleTrapEffect(tick);
    },

    _handleBuffAttackSpeedEffect: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(BuffAttackSpeedEffect, AttackComponent);

        for (let entity of entityList) {
            let attackComponent = entity.getComponent(AttackComponent);
            let buffAttackSpeedComponent = entity.getComponent(BuffAttackSpeedEffect);

            attackComponent.updateDataFromLatestTick();
            buffAttackSpeedComponent.updateDataFromLatestTick();

            attackComponent.speed = attackComponent.originSpeed * (1 - (buffAttackSpeedComponent.percent - 1));

            attackComponent.saveData();
        }
    },

    _handleBuffAttackDamageEffect: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(BuffAttackDamageEffect, AttackComponent);

        for (let entity of entityList) {
            let attackComponent = entity.getComponent(AttackComponent);
            let buffAttackDamageComponent = entity.getComponent(BuffAttackDamageEffect);

            attackComponent.updateDataFromLatestTick();
            buffAttackDamageComponent.updateDataFromLatestTick();

            attackComponent.setDamage(attackComponent.damage + attackComponent.originDamage * buffAttackDamageComponent.percent);

            attackComponent.saveData();
        }
    },

    _handleDamageEffect: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(DamageEffect);

        for (let entity of entityList) {
            let lifeComponent = entity.getComponent(LifeComponent);

            if (lifeComponent) {
                let damageComponent = entity.getComponent(DamageEffect);
                lifeComponent.updateDataFromLatestTick();
                damageComponent.updateDataFromLatestTick();

                lifeComponent.hp -= damageComponent.damage;
                entity.removeComponent(damageComponent)

                lifeComponent.saveData();
            }
        }
    },

    _handleFrozenEffect: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(FrozenEffect)

        for (let entity of entityList) {
            let velocityComponent = entity.getComponent(VelocityComponent);
            let frozenComponent = entity.getComponent(FrozenEffect);

            velocityComponent.updateDataFromLatestTick()
            frozenComponent.updateDataFromLatestTick();

            cc.log("frozenComponent.countdown=" + frozenComponent.countdown);
            cc.log("tick="+tick);
            frozenComponent.countdown = frozenComponent.countdown - tick;
            frozenComponent.saveData();

            if (frozenComponent.countdown <= 0) {
                entity.removeComponent(frozenComponent);
                this._updateOriginVelocity(velocityComponent);
                cc.log("Finish frozen effect")
            } else {
                velocityComponent.speedX = 0;
                velocityComponent.speedY = 0;
            }

            velocityComponent.saveData();
        }
    },

    _handleSlowEffect: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(SlowEffect);

        for (let entity of entityList) {
            let velocityComponent = entity.getComponent(VelocityComponent);
            let slowComponent = entity.getComponent(SlowEffect);

            slowComponent.updateDataFromLatestTick();
            velocityComponent.updateDataFromLatestTick();

            slowComponent.countdown = slowComponent.countdown - tick;
            if (slowComponent.countdown <= 0) {
                // animation
                BattleAnimation.removeAnimationHitSlowEffect(entity);
                slowComponent.addedAnimation = false;

                this._updateOriginVelocity(velocityComponent);
                velocityComponent.saveData();
                slowComponent.saveData();
                entity.removeComponent(slowComponent);
            } else {
                velocityComponent.speedX = slowComponent.percent * velocityComponent.originSpeedX;
                velocityComponent.speedY = slowComponent.percent * velocityComponent.originSpeedY;

                // animation
                if (!slowComponent.addedAnimation) {
                    BattleAnimation.addAnimationHitSlowEffect(entity);
                    slowComponent.addedAnimation = true;
                }
                slowComponent.saveData();
                velocityComponent.saveData();
            }
        }
    },

    _handleBuffAttackRangeEffect: function () {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(BuffAttackRangeEffect, AttackComponent);

        for (let entity of entityList) {
            let attackComponent = entity.getComponent(AttackComponent);
            let buffAttackRangeComponent = entity.getComponent(BuffAttackRangeEffect);

            attackComponent.updateDataFromLatestTick();
            buffAttackRangeComponent.updateDataFromLatestTick();

            attackComponent.range = attackComponent.originRange + attackComponent.originRange * buffAttackRangeComponent.percent;

            attackComponent.saveData();
        }
    },

    _handleTrapEffect: function (dt) {
        let monsterList = EntityManager.getInstance()
            .getEntitiesHasComponents(TrapEffect);

        for (let entity of monsterList) {
            let trapEffect = entity.getComponent(TrapEffect);

            trapEffect.updateDataFromLatestTick();

            if (trapEffect.isExecuted) {
                if (trapEffect.countdown > 0) {
                    trapEffect.countdown -= dt;
                    trapEffect.saveData();
                } else {
                    let bornPos = Utils.tile2Pixel(GameConfig.MONSTER_BORN_POSITION.x, GameConfig.MONSTER_BORN_POSITION.y, entity.mode);
                    let newPos = ComponentFactory.create(PositionComponent, bornPos.x, bornPos.y);
                    entity.addComponent(newPos);

                    let path = BattleManager.getInstance().getBattleData().getShortestPathForEachTile(entity.mode)[GameConfig.MAP_HEIGH - 1 - GameConfig.MONSTER_BORN_POSITION.y][GameConfig.MONSTER_BORN_POSITION.x];
                    let pathComponent = ComponentFactory.create(PathComponent, path, entity.mode);
                    entity.addComponent(pathComponent);

                    entity.removeComponent(TrapEffect);
                }
            } else {
                let pos = entity.getComponent(PositionComponent);

                let pathComponent = entity.getComponent(PathComponent);
                let appearanceComponent = entity.getComponent(AppearanceComponent);

                pos.updateDataFromLatestTick();
                pathComponent.updateDataFromLatestTick();

                pathComponent.currentPathIdx = 0;
                entity.removeComponent(PositionComponent);

                let bornPos = Utils.tile2Pixel(GameConfig.MONSTER_BORN_POSITION.x, GameConfig.MONSTER_BORN_POSITION.y, entity.mode);
                let time = Utils.euclidDistance(pos, bornPos) / (2 * GameConfig.TILE_WIDTH);
                let action = cc.spawn(
                    cc.jumpTo(time, bornPos, 100, 1),
                    cc.sequence(cc.scaleTo(time / 2, 0.8), cc.scaleTo(time / 2, 1))
                );
                appearanceComponent.sprite.runAction(action);

                trapEffect.setCountDown(time + 0.5);
                trapEffect.saveData();
                pathComponent.saveData();
            }
        }
    },

    _updateOriginVelocity: function (velocityComponent) {
        velocityComponent.speedX = velocityComponent.originSpeedX;
        velocityComponent.speedY = velocityComponent.originSpeedY;
        cc.log("xxxUUX: " + velocityComponent.originSpeedX);
        cc.log("xxxUUY: " + velocityComponent.originSpeedY);

    }
});
EffectSystem.typeID = GameConfig.SYSTEM_ID.EFFECT;
SystemManager.getInstance().registerClass(EffectSystem);