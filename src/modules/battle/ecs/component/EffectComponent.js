let EffectComponent = Component.extend({
    name: "EffectComponent",
});

let DamageEffect = EffectComponent.extend({
    name: "DamageEffect",

    ctor: function (damage) {
        this._super(GameConfig.COMPONENT_ID.DAMAGE_EFFECT);
        this.damage = damage;

        cc.log("new " + this.name);
    },
});

let SlowEffect = EffectComponent.extend({
    name: "SlowEffect",

    ctor: function (duration) {
        this._super(GameConfig.COMPONENT_ID.SLOW_EFFECT);
        this.duration = duration;

        cc.log("new " + this.name);
    },
});


let FrozenEffect = EffectComponent.extend({
    name: "FrozenEffect",

    ctor: function (duration) {
        this._super(GameConfig.COMPONENT_ID.FROZEN_EFFECT);
        this.duration = duration;

        cc.log("new " + this.name);
    },
});