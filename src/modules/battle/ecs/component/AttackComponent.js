let AttackComponent = Component.extend({
    name: "AttackComponent",
    typeID: GameConfig.COMPONENT_ID.ATTACK,

    ctor: function (damage, targetStrategy, range, speed, countdown, effects, bulletSpeed, bulletRadius) {
        this._super();
        this.reset(damage, targetStrategy, range, speed, countdown, effects, bulletSpeed, bulletRadius);
    },

    setDamage: function (damage) {
        this._damage = damage;
        let effect;
        for (let i = 0; i < this.effects.length; i++) {
            effect = this.effects[i];
            if (effect.typeID === GameConfig.COMPONENT_ID.DAMAGE_EFFECT) {
                // this.effects.splice(i, 1);
                effect.damage = this._damage;
            }
        }
        // QUESTION: create new or change damage value of DamageEffect
        // this.effects.push(new DamageEffect(this._damage));
    },

    setSpeed: function (speed) {
        this.speed = speed;
    },

    getDamage: function () {
        return this._damage;
    },

    getTargetStrategy: function () {
        return this.targetStrategy;
    },

    setTargetStrategy: function (targetStrategy) {
        this.targetStrategy = targetStrategy;
    },

    reset: function (damage, targetStrategy, range, speed, countdown, effects, bulletSpeed, bulletRadius) {
        this.originDamage = damage;
        this._damage = damage;
        this.targetStrategy = targetStrategy;
        this.originRange = range;
        this.range = range;
        this.originSpeed = speed;
        this.speed = speed;
        this.countdown = countdown;
        this.effects = effects || [];
        this.bulletSpeed = bulletSpeed;
        this.bulletRadius = bulletRadius;
        this.effects.push(new DamageEffect(this._damage));
    },

    clone: function () {
        return ComponentFactory.create(AttackComponent, this.damage, this.targetStrategy, this.range,
            this.speed, this.countdown, this.effects, this.bulletSpeed, this.bulletRadius);
    },

    updateAttackStatistic: function (damage, range, speed, effects, bulletSpeed, bulletRadius) {
        this._damage = damage;
        this.originDamage = damage;
        this.originSpeed = speed;
        this.range = range;
        this.speed = speed;
        this.effects = effects;
        this.bulletSpeed = bulletSpeed;
        this.bulletRadius = bulletRadius;
        this.effects.push(new DamageEffect(this._damage));
    }
});
AttackComponent.typeID = GameConfig.COMPONENT_ID.ATTACK;
ComponentManager.getInstance().registerClass(AttackComponent);