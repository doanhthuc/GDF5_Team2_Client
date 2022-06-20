let Component = cc.Class.extend({
    typeID: 0,
    name: "ComponentECS",

    ctor: function (typeID) {
        this.typeID = typeID;
        this.id = Utils.genIncrementId();
        this._active = true;
    },

    clone: function (...params) {
        return this;
    },

    reset: function () {
        throw new NotImplementedError();
    },

    getActive: function () {
        return this._active;
    },

    setActive: function (value) {
        this._active = value;
    },

    compare: function (anotherComponent) {
        // return 1 if A > B, -1 if A < B, 0 if A = B
        return 1;
    }
});

let PositionComponent = Component.extend({
    name: "PositionComponent",

    ctor: function (x, y) {
        this._super(GameConfig.COMPONENT_ID.POSITION);
        this.x = x;
        this.y = y;
    }
});

let VelocityComponent = Component.extend({
    name: "VelocityComponent",

    ctor: function (speedX, speedY, dynamicPosition) {
        this._super(GameConfig.COMPONENT_ID.VELOCITY);
        this.speedX = speedX;
        this.speedY = speedY;
        this.dynamicPosition = dynamicPosition;
        this.originSpeed = Math.sqrt(Math.pow(this.speedX, 2) + Math.pow(this.speedY, 2));

        this.originSpeedX = this.speedX;
        this.originSpeedY = this.speedY;
    }
});
VelocityComponent.calculateSpeed = function (speedX, speedY) {
    return Math.sqrt(Math.pow(speedX, 2) + Math.pow(speedY, 2));
}

let AppearanceComponent = Component.extend({
    name: "AppearanceComponent",
    sprite: null,

    ctor: function (sprite) {
        this._super(GameConfig.COMPONENT_ID.APPEARANCE);
        this.sprite = sprite;
        this.zOrder = 100;

        GameConfig.gameLayer.mapLayer.addChild(this.sprite, this.zOrder);
    }
});

let PathComponent = Component.extend({
    name: "PathComponent",

    ctor: function (path) {
        this._super(GameConfig.COMPONENT_ID.PATH);
        this.path = path;
        this.currentPathIdx = 0;
    }
});

let CollisionComponent = Component.extend({
    name: "CollisionComponent",

    ctor: function (width, height) {
        this._super(GameConfig.COMPONENT_ID.COLLISION);
        this.width = width;
        this.height = height;
    }
});

let AttackComponent = Component.extend({
    name: "AttackComponent",

    ctor: function (damage, targetStrategy, range, speed, countdown, effects) {
        this._super(GameConfig.COMPONENT_ID.ATTACK);
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

    setDamage: function (damage) {
        this._damage = damage;
        let effect;
        for (let i = 0; i < this.effects.length; i++) {
            effect = this.effects[i];
            if (effect.typeID === GameConfig.COMPONENT_ID.DAMAGE_EFFECT) {
                this.effects.splice(i, 1);
                // effect.damage = this._damage;
            }
        }
        // QUESTION: create new or change damage value of DamageEffect
        // this.effects.push(new DamageEffect(this._damage));
    },

    getDamage: function () {
        return this._damage;
    },
});