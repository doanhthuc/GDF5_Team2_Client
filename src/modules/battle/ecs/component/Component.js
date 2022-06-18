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

    ctor: function (speedX, speedY, dynamicPosition, originVelocity) {
        this._super(GameConfig.COMPONENT_ID.VELOCITY);
        this.speedX = speedX;
        this.speedY = speedY;
        this.dynamicPosition = dynamicPosition;
        this.originVelocity = originVelocity;
    }
});

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
})