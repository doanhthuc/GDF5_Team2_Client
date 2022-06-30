let EffectComponent = Component.extend({
    name: "EffectComponent",
});

let DamageEffect = EffectComponent.extend({
    name: "DamageEffect",
    typeID: GameConfig.COMPONENT_ID.DAMAGE_EFFECT,

    ctor: function (damage) {
        this._super();
        this.reset(damage);
    },

    clone: function () {
        return new DamageEffect(this.damage);
    },

    reset: function (damage) {
        this.damage = damage;
    }
});
ComponentManager.getInstance().registerClass(DamageEffect);

let SlowEffect = EffectComponent.extend({
    name: "SlowEffect",
    typeID: GameConfig.COMPONENT_ID.SLOW_EFFECT,

    ctor: function (duration, percent) {
        this._super();
        this.reset(duration, percent);
    },

    clone: function () {
        return new SlowEffect(this.duration, this.percent);
    },

    reset: function (duration, percent) {
        this.duration = duration;
        this.countdown = this.duration;
        this.percent = percent;
    }
});
ComponentManager.getInstance().registerClass(SlowEffect);

let FrozenEffect = EffectComponent.extend({
    name: "FrozenEffect",
    typeID: GameConfig.COMPONENT_ID.FROZEN_EFFECT,

    ctor: function (duration) {
        this._super();
        this.reset(duration);
    },

    clone: function () {
        return new FrozenEffect(this.duration);
    },

    reset: function (duration) {
        this.duration = duration;
        this.countdown = this.duration;
    }
});
ComponentManager.getInstance().registerClass(FrozenEffect);

let BuffAttackSpeedEffect = EffectComponent.extend({
    name: "BuffAttackSpeedEffect",
    typeID: GameConfig.COMPONENT_ID.BUFF_ATTACK_SPEED,

    ctor: function (percent) {
        this._super();
        this.reset(percent);
    },

    clone: function () {
        return new BuffAttackSpeedEffect(this.percent);
    },

    reset: function (percent) {
        this.percent = percent;
    }
});
ComponentManager.getInstance().registerClass(BuffAttackSpeedEffect);

let BuffAttackDamageEffect = EffectComponent.extend({
    name: "BuffAttackDamageEffect",
    typeID: GameConfig.COMPONENT_ID.BUFF_ATTACK_DAMAGE,

    ctor: function (percent) {
        this._super();
        this.reset(percent);
    },

    clone: function () {
        return new BuffAttackDamageEffect(this.percent);
    },

    reset: function (percent) {
        this.percent = percent;
    }
});
ComponentManager.getInstance().registerClass(BuffAttackDamageEffect);
