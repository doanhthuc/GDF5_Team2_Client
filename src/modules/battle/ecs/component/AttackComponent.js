let AttackComponent = Component.extend({
    name: "AttackComponent",
    typeID: GameConfig.COMPONENT_ID.ATTACK,

    ctor: function (damage, targetStrategy, range, speed, countdown, effects, bulletSpeed, bulletRadius, canTargetAirMonster = true) {
        this._super();
        this.reset(damage, targetStrategy, range, speed, countdown, effects, bulletSpeed, bulletRadius, canTargetAirMonster);
    },

    setDamage: function (damage) {
        this._damage = damage;
        let effect;
        for (let i = 0; i < this.effects.length; i++) {
            effect = this.effects[i];
            if (effect.typeID === GameConfig.COMPONENT_ID.DAMAGE_EFFECT) {
                effect.damage = this._damage;
            }
        }
    },

    setSpeed: function (speed) {
        this._speed = speed;
    },

    getDamage: function () {
        let latestUpdateTick = tickManager.getLatestUpdateTick();
        if (latestUpdateTick !== this._latestTick) {
            this._latestTick = latestUpdateTick;
            this._speed = this.originSpeed;
            this._damage = this.originDamage;
        }
        return this._damage;
    },

    getSpeed: function () {
        let latestUpdateTick = tickManager.getLatestUpdateTick();
        if (latestUpdateTick !== this._latestTick) {
            this._latestTick = latestUpdateTick;
            this._speed = this.originSpeed;
            this._damage = this.originDamage;
        }
        return this._speed;
    },

    getTargetStrategy: function () {
        return this.targetStrategy;
    },

    setTargetStrategy: function (targetStrategy) {
        this.targetStrategy = targetStrategy;
    },

    reset: function (damage, targetStrategy, range, speed, countdown, effects, bulletSpeed, bulletRadius, canTargetAirMonster = true) {
        this.originDamage = damage;
        this._damage = damage;
        this.targetStrategy = targetStrategy;
        this.originRange = range;
        this.range = range;
        this.originSpeed = speed;
        this._speed = speed;
        this.countdown = countdown;
        this.effects = effects || [];
        this.bulletSpeed = bulletSpeed;
        this.bulletRadius = bulletRadius;
        this.canTargetAirMonster = canTargetAirMonster;
        this.effects.push(new DamageEffect(this._damage));
        this._latestTick = -1;
    },

    clone: function () {
        return ComponentFactory.create(AttackComponent, this._damage, this.targetStrategy, this.range,
            this._speed, this.countdown, this.effects, this.bulletSpeed, this.bulletRadius, this.canTargetAirMonster);
    },

    updateAttackStatistic: function (damage, range, speed, effects, bulletSpeed, bulletRadius) {
        this._damage = damage;
        this.originDamage = damage;
        this.originSpeed = speed;
        this.range = range;
        this.originRange = range;
        this._speed = speed;
        this.effects = effects;
        this.bulletSpeed = bulletSpeed;
        this.bulletRadius = bulletRadius;
        this.effects.push(new DamageEffect(this._damage));
    },
    addEffect: function (effect){
        this.effects.push(effect);
    }
});
AttackComponent.typeID = GameConfig.COMPONENT_ID.ATTACK;
ComponentManager.getInstance().registerClass(AttackComponent);

AttackComponent.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);

    data.originDamage = inPacket.getDouble();
    data.damage = inPacket.getDouble();
    data.targetStrategy = inPacket.getInt();
    data.originRange = inPacket.getDouble();
    data.range = inPacket.getDouble();
    data.originSpeed = inPacket.getDouble();
    data.speed = inPacket.getDouble();
    data.countdown = inPacket.getDouble();
    data.bulletSpeed = inPacket.getDouble();
    data.bulletRadius = inPacket.getDouble();
    data.canTargetAirMonster = Utils.convertShortToBoolean(inPacket.getShort());
    data._latestTick = inPacket.getInt();

    data.effects = [];
    let effectSize = inPacket.getShort();

    for (let i = 1; i <= effectSize; i++) {
        let effectType = inPacket.getInt();
        ComponentCls = ComponentManager.getInstance().getClass(effectType);
        let componentData = ComponentCls.unpackData(inPacket);
        componentData.typeID = effectType;
        data.effects.push(componentData);
    }

    return data;
}