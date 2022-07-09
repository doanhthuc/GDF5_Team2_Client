let AttackComponent = Component.extend({
    name: "AttackComponent",
    typeID: GameConfig.COMPONENT_ID.ATTACK,

    ctor: function (damage, targetStrategy, range, speed, countdown, effects) {
        this._super();
        this.reset(damage, targetStrategy, range, speed, countdown, effects);
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

    getDamage: function () {
        return this._damage;
    },

    reset: function (damage, targetStrategy, range, speed, countdown, effects) {
        this.originDamage = damage;
        this._damage = damage;
        this.targetStrategy = targetStrategy;
        this.range = range;
        this.originSpeed = speed;
        this.speed = speed;
        this.countdown = countdown;
        this.effects = effects || [];
        this.effects.push(new DamageEffect(this._damage));
    },

    clone: function () {
        new AttackComponent(this.damage, this.targetStrategy, this.range,
            this.speed, this.countdown, this.effects);
    }
});
AttackComponent.typeID = GameConfig.COMPONENT_ID.ATTACK;
ComponentManager.getInstance().registerClass(AttackComponent);