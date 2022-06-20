let EffectSystem = System.extend({
    id: GameConfig.SYSTEM_ID.EFFECT,
    name: "EffectSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        this._handleBuffAttackSpeedEffect(tick);
        this._handleBuffAttackDamageEffect(tick);
        this._handleDamageEffect(tick);
        // IMPORTANT: SlowEffect < FrozenEffect
        this._handleSlowEffect(tick);
        this._handleFrozenEffect(tick);
    },

    _handleBuffAttackSpeedEffect: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesByComponents(GameConfig.COMPONENT_ID.BUFF_ATTACK_SPEED, GameConfig.COMPONENT_ID.ATTACK);
        for (let entity of entityList) {
            let attackComponent = entity.getComponent(GameConfig.COMPONENT_ID.ATTACK);
            let buffAttackSpeedComponent = entity.getComponent(GameConfig.COMPONENT_ID.BUFF_ATTACK_SPEED);

            attackComponent.speed = attackComponent.originSpeed * (1 - (buffAttackSpeedComponent.percent-1));
        }
    },

    _handleBuffAttackDamageEffect: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesByComponents(GameConfig.COMPONENT_ID.BUFF_ATTACK_DAMAGE, GameConfig.COMPONENT_ID.ATTACK);
        for (let entity of entityList) {
            let attackComponent = entity.getComponent(GameConfig.COMPONENT_ID.ATTACK);
            let buffAttackDamageComponent = entity.getComponent(GameConfig.COMPONENT_ID.BUFF_ATTACK_DAMAGE);

            attackComponent.setDamage(attackComponent.originDamage * buffAttackDamageComponent.percent);
        }
    },

    _handleDamageEffect: function (tick) {
        // damage effects
        let entityList = EntityManager.getInstance()
            .getEntitiesByComponents(GameConfig.COMPONENT_ID.DAMAGE_EFFECT);
        for (let entity of entityList) {
            let lifeComponent = entity.getComponent(GameConfig.COMPONENT_ID.LIFE);
            if (lifeComponent) {
                let damageComponent = entity.getComponent(GameConfig.COMPONENT_ID.DAMAGE_EFFECT);
                lifeComponent.hp -= damageComponent.damage;
                entity.removeComponent(damageComponent)
            }
        }
    },

    _handleFrozenEffect: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesByComponents(GameConfig.COMPONENT_ID.FROZEN_EFFECT)
        for (let entity of entityList) {
            let velocityComponent = entity.getComponent(GameConfig.COMPONENT_ID.VELOCITY);
            let frozenComponent = entity.getComponent(GameConfig.COMPONENT_ID.FROZEN_EFFECT);

            frozenComponent.countdown = frozenComponent.countdown - tick;
            if (frozenComponent.countdown <= 0) {
                this._updateOriginVelocity(velocityComponent);
                entity.removeComponent(frozenComponent);
            } else {
                velocityComponent.speedX = 0;
                velocityComponent.speedY = 0;
            }
        }
    },

    _handleSlowEffect: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesByComponents(GameConfig.COMPONENT_ID.SLOW_EFFECT)
        for (let entity of entityList) {
            let velocityComponent = entity.getComponent(GameConfig.COMPONENT_ID.VELOCITY);
            let slowComponent = entity.getComponent(GameConfig.COMPONENT_ID.SLOW_EFFECT);

            slowComponent.countdown = slowComponent.countdown - tick;
            if (slowComponent.countdown <= 0) {
                // EventDispatcher.getInstance()
                //     .dispatchEvent(EventType.RESET_INIT_VELOCITY, {velocityComponent: velocityComponent})
                this._updateOriginVelocity(velocityComponent);
                entity.removeComponent(slowComponent);
            } else {
                velocityComponent.speedX = slowComponent.percent * velocityComponent.originSpeedX;
                velocityComponent.speedY = slowComponent.percent * velocityComponent.originSpeedY;
            }
        }
    },

    _updateOriginVelocity: function (velocityComponent) {
        velocityComponent.speedX = velocityComponent.originSpeedX;
        velocityComponent.speedY = velocityComponent.originSpeedY;
    }
});