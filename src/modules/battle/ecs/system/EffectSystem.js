let EffectSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.EFFECT,
    name: "EffectSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    _run: function (tick) {
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

            attackComponent.speed = attackComponent.originSpeed * (1 - (buffAttackSpeedComponent.percent-1));
        }
    },

    _handleBuffAttackDamageEffect: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(BuffAttackDamageEffect, AttackComponent);
        for (let entity of entityList) {
            cc.log("_handleBuffAttackDamageEffect line 34");
            let attackComponent = entity.getComponent(AttackComponent);
            let buffAttackDamageComponent = entity.getComponent(BuffAttackDamageEffect);
            attackComponent.setDamage(attackComponent.damage + attackComponent.originDamage * buffAttackDamageComponent.percent);
        }
    },

    _handleDamageEffect: function (tick) {
        // damage effects
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(DamageEffect);
        for (let entity of entityList) {
            let lifeComponent = entity.getComponent(LifeComponent);
            if (lifeComponent) {
                let damageComponent = entity.getComponent(DamageEffect);
                lifeComponent.hp -= damageComponent.damage;
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
        for (let entity of entityList) {
            let velocityComponent = entity.getComponent(VelocityComponent);
            let slowComponent = entity.getComponent(SlowEffect);

            slowComponent.countdown = slowComponent.countdown - tick;
            if (slowComponent.countdown <= 0) {
                this._updateOriginVelocity(velocityComponent);
                entity.removeComponent(slowComponent);
            } else {
                velocityComponent.speedX = slowComponent.percent * velocityComponent.originSpeedX;
                velocityComponent.speedY = slowComponent.percent * velocityComponent.originSpeedY;
            }
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

                let bornPos = Utils.tile2Pixel(GameConfig.MONSTER_BORN_POSITION.x, GameConfig.MONSTER_BORN_POSITION.y, entity.mode);
                let time = Utils.euclidDistance(pos, bornPos) / (2*GameConfig.TILE_WIDTH);
                let action = cc.spawn(cc.jumpTo(time, bornPos, 100, 1));
                appearanceComponent.sprite.runAction(action);

                trapEffect.setCountDown(time+0.5);
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