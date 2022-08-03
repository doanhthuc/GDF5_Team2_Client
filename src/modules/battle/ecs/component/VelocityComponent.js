let VelocityComponent = Component.extend({
    name: "VelocityComponent",
    typeID: GameConfig.COMPONENT_ID.VELOCITY,

    ctor: function (speedX, speedY, dynamicPosition, staticPosition) {
        this._super();
        this.reset(speedX, speedY, dynamicPosition, staticPosition);
        this.saveData();
    },

    reset: function (speedX, speedY, dynamicPosition, staticPosition) {
        this.speedX = speedX;
        this.speedY = speedY;
        this.dynamicPosition = dynamicPosition;
        this.staticPosition = staticPosition;
        this.originSpeed = Math.sqrt(Math.pow(this.speedX, 2) + Math.pow(this.speedY, 2));
        this.originSpeedX = this.speedX;
        this.originSpeedY = this.speedY;
    },

    clone: function () {
        return ComponentFactory.create(VelocityComponent, this.speedX, this.speedY, this.dynamicPosition);
    },

    saveData: function () {
        const data = {
            speedX: this.speedX,
            speedY: this.speedY,
            dynamicPosition: this.dynamicPosition,
            staticPosition: this.staticPosition,
            originSpeed: this.originSpeed,
            originSpeedX: this.speedX,
            originSpeedY: this.speedY
        }
        tickManager.getTickData()
            .saveComponentData(this.id, data);
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        this.reset(componentData.speedX, componentData.speedY, componentData.dynamicPosition, componentData.staticPosition);
    },
});
VelocityComponent.typeID = GameConfig.COMPONENT_ID.VELOCITY;
ComponentManager.getInstance().registerClass(VelocityComponent);

VelocityComponent.calculateSpeed = function (speedX, speedY) {
    return Math.sqrt(Math.pow(speedX, 2) + Math.pow(speedY, 2));
}