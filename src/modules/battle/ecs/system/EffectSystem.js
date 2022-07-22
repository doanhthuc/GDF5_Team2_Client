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

    _updateOriginVelocity: function (velocityComponent) {
        velocityComponent.speedX = velocityComponent.originSpeedX;
        velocityComponent.speedY = velocityComponent.originSpeedY;
    }
});
EffectSystem.typeID = GameConfig.SYSTEM_ID.EFFECT;
SystemManager.getInstance().registerClass(EffectSystem);