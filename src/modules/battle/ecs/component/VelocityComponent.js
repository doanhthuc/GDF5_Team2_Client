let VelocityComponent = Component.extend({
    name: "VelocityComponent",
    typeID: GameConfig.COMPONENT_ID.VELOCITY,

    ctor: function (speedX, speedY, dynamicPosition, staticPosition) {
        this._super();
        this.reset(speedX, speedY, dynamicPosition, staticPosition);
    },

    reset: function (speedX, speedY, dynamicPosition, staticPosition) {
        this.speedX = speedX;
        this.speedY = speedY;
        this.dynamicPosition = dynamicPosition;
        this.staticPostition = staticPosition;
        this.originSpeed = Math.sqrt(Math.pow(this.speedX, 2) + Math.pow(this.speedY, 2));
        this.originSpeedX = this.speedX;
        this.originSpeedY = this.speedY;
    },

    clone: function () {
        return ComponentFactory.create(VelocityComponent, this.speedX, this.speedY, this.dynamicPosition);
    },
});
VelocityComponent.typeID = GameConfig.COMPONENT_ID.VELOCITY;
ComponentManager.getInstance().registerClass(VelocityComponent);

VelocityComponent.calculateSpeed = function (speedX, speedY) {
    return Math.sqrt(Math.pow(speedX, 2) + Math.pow(speedY, 2));
}