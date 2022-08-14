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
        // this._handleBuffAttackRangeEffect(tick);
        // this._handleBuffAttackSpeedEffect(tick);
        // this._handleBuffAttackDamageEffect(tick);
        this._handleDamageEffect(tick);
        // IMPORTANT: SlowEffect < FrozenEffect
        this._handleSlowEffect(tick);
        // this._handleGoatSlowEffect(tick);
        this._handleFrozenEffect(tick);
        this._handleTrapEffect(tick);
        this._handlePoisonEffect(tick);
    },

    _handleBuffAttackSpeedEffect: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(BuffAttackSpeedEffect, AttackComponent);

        for (let entity of entityList) {
            let attackComponent = entity.getComponent(AttackComponent);
            let buffAttackSpeedComponent = entity.getComponent(BuffAttackSpeedEffect);

            attackComponent.setSpeed(attackComponent.originSpeed * (1 - (buffAttackSpeedComponent.percent - 1)));
        }
    },

    _handleBuffAttackDamageEffect: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(BuffAttackDamageEffect, AttackComponent);

        for (let entity of entityList) {
            let attackComponent = entity.getComponent(AttackComponent);
            let buffAttackDamageComponent = entity.getComponent(BuffAttackDamageEffect);

            attackComponent.setDamage(attackComponent.damage + attackComponent.originDamage * buffAttackDamageComponent.percent);
        }
    },

    _handleDamageEffect: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(DamageEffect);

        for (let entity of entityList) {
            let lifeComponent = entity.getComponent(LifeComponent);
            if (lifeComponent) {
                let damageComponent = entity.getComponent(DamageEffect);
                if (entity.hasAllComponent(DamageAmplifyComponent)) {
                    let damageAmplifyComponent = entity.getComponent(DamageAmplifyComponent);
                    lifeComponent.hp -= damageComponent.damage * damageAmplifyComponent.amplifyRate;
                } else {
                    lifeComponent.hp -= damageComponent.damage;
                }
                entity.removeComponent(damageComponent)
            }
        }
    },

    _handleFrozenEffect: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(FrozenEffect)

        for (let entity of entityList) {
            let velocityComponent = entity.getComponent(VelocityComponent);
            let frozenComponent = entity.getComponent(FrozenEffect);

            frozenComponent.countdown = frozenComponent.countdown - tick;

            if (frozenComponent.countdown <= 0) {
                let damageAmplifyComponent = entity.getComponent(DamageAmplifyComponent);
                if (damageAmplifyComponent) entity.removeComponent(damageAmplifyComponent);
                entity.removeComponent(frozenComponent);
                this._updateOriginVelocity(velocityComponent);
            } else {
                velocityComponent.speedX = 0;
                velocityComponent.speedY = 0;
            }
        }
    },

    _handleSlowEffect: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(SlowEffect);

        let needAddSound = false;

        for (let entity of entityList) {
            let velocityComponent = entity.getComponent(VelocityComponent);
            let slowComponent = entity.getComponent(SlowEffect);

            slowComponent.countdown = slowComponent.countdown - tick;
            if (slowComponent.countdown <= 0) {
                // animation
                BattleAnimation.removeAnimationHitSlowEffect(entity);
                slowComponent.addedAnimation = false;

                this._updateOriginVelocity(velocityComponent);
                entity.removeComponent(slowComponent);
            } else {
                velocityComponent.speedX = Math.min(slowComponent.percent * velocityComponent.originSpeedX, velocityComponent.speedX);
                velocityComponent.speedY = Math.min(slowComponent.percent * velocityComponent.originSpeedY, velocityComponent.speedY);
                // animation
                if (!slowComponent.addedAnimation) {
                    BattleAnimation.addAnimationHitSlowEffect(entity);
                    slowComponent.addedAnimation = true;
                    if (entity.mode === GameConfig.PLAYER) needAddSound = true;
                }
            }
        }

        if (needAddSound) {
            soundManager.playSnailHit();
        }
    },

    _handleGoatSlowEffect: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(GoatSlowEffectComponent);

        for (let entity of entityList) {
            let velocityComponent = entity.getComponent(VelocityComponent);
            let goatSlowEffect = entity.getComponent(GoatSlowEffectComponent);
            velocityComponent.speedX = Math.min(goatSlowEffect.percent * velocityComponent.originSpeedX, velocityComponent.speedX);
            velocityComponent.speedY = Math.min(goatSlowEffect.percent * velocityComponent.originSpeedX, velocityComponent.speedY);
        }
    },

    _handleBuffAttackRangeEffect: function () {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(BuffAttackRangeEffect, AttackComponent);

        for (let entity of entityList) {
            let attackComponent = entity.getComponent(AttackComponent);
            let buffAttackRangeComponent = entity.getComponent(BuffAttackRangeEffect);

            attackComponent.range = attackComponent.originRange + attackComponent.originRange * buffAttackRangeComponent.percent;
        }
    },

    _handleTrapEffect: function (dt) {
        let monsterList = EntityManager.getInstance()
            .getEntitiesHasComponents(TrapEffect);

        for (let entity of monsterList) {
            let trapEffect = entity.getComponent(TrapEffect);

            if (trapEffect.isExecuted) {
                if (trapEffect.countdown > 0) {
                    trapEffect.countdown -= dt;
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

                pathComponent.currentPathIdx = 0;
                entity.removeComponent(PositionComponent);

                // animation
                let bornPos = Utils.tile2Pixel(GameConfig.MONSTER_BORN_POSITION.x, GameConfig.MONSTER_BORN_POSITION.y, entity.mode);
                let time = Utils.euclidDistance(pos, bornPos) / (2 * GameConfig.TILE_WIDTH);
                let action = cc.spawn(
                    cc.jumpTo(time, bornPos, 100, 1),
                    cc.sequence(cc.scaleTo(time / 2, 0.8), cc.scaleTo(time / 2, 1))
                );
                appearanceComponent.sprite.runAction(action);

                trapEffect.setCountDown(time + 0.5);
            }
        }
    },

    _handlePoisonEffect: function (dt) {
        let monsterList = EntityManager.getInstance().getEntitiesHasComponents(PoisonEffect, LifeComponent);
        for (let monster of monsterList) {
            let poisonEffect = monster.getComponent(PoisonEffect);

            if (poisonEffect.duration > 0) {
                poisonEffect.duration -= dt;
                let lifeComponent = monster.getComponent(LifeComponent);
                lifeComponent.hp -= poisonEffect.healthPerSecond * dt;
            } else {
                monster.removeComponent(PoisonEffect);
            }
        }
    },

    _updateOriginVelocity: function (velocityComponent) {
        velocityComponent.speedX = velocityComponent.originSpeedX;
        velocityComponent.speedY = velocityComponent.originSpeedY;

    }
});
EffectSystem.typeID = GameConfig.SYSTEM_ID.EFFECT;
SystemManager.getInstance().registerClass(EffectSystem);