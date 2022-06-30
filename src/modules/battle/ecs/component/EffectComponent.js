let EffectComponent = Component.extend({
    name: "EffectComponent",
    typeID: Utils.UUID.genComponentTypeID(),

});

let DamageEffect = EffectComponent.extend({
    name: "DamageEffect",
    typeID: Utils.UUID.genComponentTypeID(),

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
    typeID: Utils.UUID.genComponentTypeID(),

    ctor: function (duration, percent) {
        this._super(GameConfig.COMPONENT_ID.SLOW_EFFECT);
        this.duration = duration;
        this.countdown = this.duration;
        this.percent = percent;
    },

    clone: function () {
        return new SlowEffect(this.duration, this.percent);
    },

    reset: function () {

    }
});


let FrozenEffect = EffectComponent.extend({
    name: "FrozenEffect",
    typeID: Utils.UUID.genComponentTypeID(),

    ctor: function (duration) {
        this._super(GameConfig.COMPONENT_ID.FROZEN_EFFECT);
        this.duration = duration;
        this.countdown = this.duration;
    },

    clone: function () {
        return new FrozenEffect(this.duration);
    },

    reset: function () {
        this.countdown = this.duration;
    }
});

let BuffAttackSpeedEffect = EffectComponent.extend({
    name: "BuffAttackSpeedEffect",
    typeID: Utils.UUID.genComponentTypeID(),

    ctor: function (percent) {
        this._super(GameConfig.COMPONENT_ID.BUFF_ATTACK_SPEED);
        this.percent = percent;
    },

    clone: function () {
        return new BuffAttackSpeedEffect(this.percent);
    },

    reset: function () {

    }
});

let BuffAttackDamageEffect = EffectComponent.extend({
    name: "BuffAttackDamageEffect",
    typeID: Utils.UUID.genComponentTypeID(),
    
    ctor: function (percent) {
        this._super(GameConfig.COMPONENT_ID.BUFF_ATTACK_DAMAGE);
        this.percent = percent;
    },

    clone: function () {
        return new BuffAttackDamageEffect(this.percent);
    },

    reset: function () {

    }
});