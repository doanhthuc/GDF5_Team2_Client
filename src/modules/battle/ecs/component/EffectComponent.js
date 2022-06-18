let EffectComponent = Component.extend({
    name: "EffectComponent",
});

let DamageEffect = EffectComponent.extend({
    name: "DamageEffect",

    ctor: function (damage) {
        this._super(GameConfig.COMPONENT_ID.DAMAGE_EFFECT);
        this.damage = damage;
    },

    clone: function () {
        return new DamageEffect(this.damage);
    },

    reset: function () {

    }
});

let SlowEffect = EffectComponent.extend({
    name: "SlowEffect",

    ctor: function (duration) {
        this._super(GameConfig.COMPONENT_ID.SLOW_EFFECT);
        this.duration = duration;
    },

    clone: function () {

    },

    reset: function () {

    }
});


let FrozenEffect = EffectComponent.extend({
    name: "FrozenEffect",
    _initOriginVelocity: {speedX: 0, speedY: 0},

    ctor: function (duration) {
        this._super(GameConfig.COMPONENT_ID.FROZEN_EFFECT);
        this.duration = duration;
        this.countdown = this.duration;
        this.originVelocity = this._initOriginVelocity;
    },

    clone: function () {
        return new FrozenEffect(this.duration);
    },

    reset: function () {
        this.countdown = this.duration;
        this.originVelocity = this._initOriginVelocity;
    }
});