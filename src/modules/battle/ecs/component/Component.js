let Component = cc.Class.extend({
    id: 0,
    name: "ComponentECS",
});

let PositionComponent = Component.extend({
    id: GameConfig.COMPONENT_ID.POSITION,
    name: "PositionComponent",
    x: 0,
    y: 0,

    ctor: function (x, y) {
        this.x = x;
        this.y = y;
        cc.log("new " + this.name);
    }
});

let VelocityComponent = Component.extend({
    id: GameConfig.COMPONENT_ID.VELOCITY,
    name: "VelocityComponent",
    speedX: 0,
    speedY: 0,

    ctor: function (speedX, speedY) {
        this.speedX = speedX;
        this.speedY = speedY;
        cc.log("new " + this.name);
    }
});

let  AppearanceComponent = Component.extend({
    id: GameConfig.COMPONENT_ID.APPEARANCE,
    name: "AppearanceComponent",
    sprite: null,
    zOrder: 100,

    ctor: function (sprite) {
        this.sprite = sprite;
        GameConfig.gameLayer.mapLayer.addChild(this.sprite, this.zOrder);
        cc.log("new " + this.name);
    }
});

let PathComponent = Component.extend({
    id: GameConfig.COMPONENT_ID.PATH,
    name: "PathComponent",
    path: [],
    currentPathIdx: 0,

    ctor: function (path) {
        this.path = path;
    }
});
