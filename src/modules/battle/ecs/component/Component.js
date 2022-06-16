let Component = cc.Class.extend({
    typeID: 0,
    name: "ComponentECS",

    ctor: function (typeID) {
        this.typeID = typeID;
        this.id = Utils.genIncrementId();
    }
});

let PositionComponent = Component.extend({
    name: "PositionComponent",

    ctor: function (x, y) {
        this._super(GameConfig.COMPONENT_ID.POSITION);
        this.x = x;
        this.y = y;
        cc.log("new " + this.name);
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
        cc.log("new " + this.name);
    }
});

let  AppearanceComponent = Component.extend({
    name: "AppearanceComponent",
    sprite: null,

    ctor: function (sprite) {
        this._super(GameConfig.COMPONENT_ID.APPEARANCE);
        this.sprite = sprite;
        this.zOrder = 100;

        GameConfig.gameLayer.mapLayer.addChild(this.sprite, this.zOrder);
        cc.log("new " + this.name);
    }
});

let PathComponent = Component.extend({
    name: "PathComponent",

    ctor: function (path) {
        this._super(GameConfig.COMPONENT_ID.PATH);
        this.path = path;
        this.currentPathIdx = 0;

        cc.log("new " + this.name);
    }
});

let CollisionComponent = Component.extend({
    name: "CollisionComponent",

    ctor: function () {
        this._super(GameConfig.COMPONENT_ID.COLLISION);
        cc.log("new " + this.name);
    }
})