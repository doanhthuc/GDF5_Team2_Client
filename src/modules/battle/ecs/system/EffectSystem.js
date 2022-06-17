let EffectSystem = System.extend({
    id: GameConfig.SYSTEM_ID.EFFECT,
    name: "EffectSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        this._handleDamageEffect(tick);
        this._handleFrozenEffect(tick);
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

            // first time effects running
            if (frozenComponent.countdown === frozenComponent.duration) {
                frozenComponent.originVelocity = {speedX: velocityComponent.speedX, speedY: velocityComponent.speedY};
            }

            frozenComponent.countdown = frozenComponent.countdown - tick;
            if (frozenComponent.countdown <= 0) {
                velocityComponent.speedX = frozenComponent.originVelocity.speedX;
                velocityComponent.speedY = frozenComponent.originVelocity.speedY;
                // frozenComponent.countdown = frozenComponent.duration;
                entity.removeComponent(frozenComponent);
            } else {
                velocityComponent.speedX = 0;
                velocityComponent.speedY = 0;
            }
        }
    }
});