let Component = cc.Class.extend({
    name: "ComponentECS",
    typeID: 0,

    ctor: function () {
        this.id = Utils.UUID.genInstanceID();
        this._active = true;
    },

    // need override
    clone: function () {
        return this;
    },

    // need override
    reset: function () {
        throw new NotImplementedError();
    },

    getActive: function () {
        return this._active;
    },

    setActive: function (value) {
        this._active = value;
    },

    equal: function (anotherComponent) {
        return this.id === anotherComponent.id;
    }
});

let PositionComponent = Component.extend({
    name: "PositionComponent",
    typeID: GameConfig.COMPONENT_ID.POSITION,

    ctor: function (x, y) {
        this._super();
        this.reset(x, y);
    },

    reset: function (x, y) {
        this.x = x;
        this.y = y;
    },

    clone: function () {
        return new PositionComponent(this.x, this.y);
    },
});
ComponentManager.getInstance().registerClass(PositionComponent);

let VelocityComponent = Component.extend({
    name: "VelocityComponent",
    typeID: GameConfig.COMPONENT_ID.VELOCITY,

    ctor: function (speedX, speedY, dynamicPosition) {
        this._super();
        this.reset(speedX, speedY, dynamicPosition);
    },

    reset: function (speedX, speedY, dynamicPosition) {
        this.speedX = speedX;
        this.speedY = speedY;
        this.dynamicPosition = dynamicPosition;
        this.originSpeed = Math.sqrt(Math.pow(this.speedX, 2) + Math.pow(this.speedY, 2));
        this.originSpeedX = this.speedX;
        this.originSpeedY = this.speedY;
    },

    clone: function () {
        return new VelocityComponent(this.speedX, this.speedY, this.dynamicPosition);
    },
});
VelocityComponent.calculateSpeed = function (speedX, speedY) {
    return Math.sqrt(Math.pow(speedX, 2) + Math.pow(speedY, 2));
}
ComponentManager.getInstance().registerClass(VelocityComponent);

let AppearanceComponent = Component.extend({
    name: "AppearanceComponent",
    typeID: GameConfig.COMPONENT_ID.APPEARANCE,

    ctor: function (sprite) {
        this._super();
        this.reset(sprite);
        this.zOrder = 100;

        GameConfig.gameLayer.mapLayer.addChild(this.sprite, this.zOrder);
    },

    reset: function (sprite) {
        this.sprite = sprite;
    },

    clone: function () {
        return new AppearanceComponent(this.sprite);
    },
});
ComponentManager.getInstance().registerClass(AppearanceComponent);

let PathComponent = Component.extend({
    name: "PathComponent",
    typeID: GameConfig.COMPONENT_ID.PATH,

    ctor: function (path) {
        this._super();
        this.reset(path);
    },

    reset: function (path) {
        this.path = path;
        this.currentPathIdx = 0;
    },

    clone: function () {
        return new PathComponent(this.path);
    }
});
ComponentManager.getInstance().registerClass(PathComponent);

let CollisionComponent = Component.extend({
    name: "CollisionComponent",
    typeID: GameConfig.COMPONENT_ID.COLLISION,

    ctor: function (width, height) {
        this._super();
        this.reset(width, height);
    },

    reset: function (width, height) {
        this.width = width;
        this.height = height;
    },

    clone: function () {
        return new CollisionComponent(this.width, this.height);
    }
});
ComponentManager.getInstance().registerClass(CollisionComponent);

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
ComponentManager.getInstance().registerClass(AttackComponent);
