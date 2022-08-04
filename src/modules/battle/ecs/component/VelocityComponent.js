let VelocityComponent = Component.extend({
    name: "VelocityComponent",
    typeID: GameConfig.COMPONENT_ID.VELOCITY,

    ctor: function (speedX, speedY, dynamicEntityId, staticPosition) {
        this._super();
        this.reset(speedX, speedY, dynamicEntityId, staticPosition);
        this.saveData();
    },

    reset: function (speedX, speedY, dynamicEntityId, staticPosition) {
        this.speedX = speedX;
        this.speedY = speedY;
        this.dynamicEntityId = dynamicEntityId;
        this.staticPosition = staticPosition;
        this.originSpeed = Math.sqrt(Math.pow(this.speedX, 2) + Math.pow(this.speedY, 2));
        this.originSpeedX = this.speedX;
        this.originSpeedY = this.speedY;
    },

    clone: function () {
        return ComponentFactory.create(VelocityComponent, this.speedX, this.speedY, this.dynamicEntityId);
    },

    getDynamicPosition: function () {
        if (!this.dynamicEntityId) {
            return null;
        }

        let entity = EntityManager.getInstance().getEntity(this.dynamicEntityId);

        if (entity) {
            return entity.getComponent(PositionComponent);
        }
        
        return null;
    },

    saveData: function () {
        const data = {
            speedX: this.speedX,
            speedY: this.speedY,
            dynamicEntityId: this.dynamicEntityId,
            staticPosition: this.staticPosition,
            originSpeed: this.originSpeed,
            originSpeedX: this.originSpeedX,
            originSpeedY: this.originSpeedX
        }
        tickManager.getTickData()
            .saveComponentData(this.id, data);
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        this.reset(componentData.speedX, componentData.speedY, componentData.dynamicEntityId, componentData.staticPosition);
        this.speedX = componentData.speedX;
        this.speedY = componentData.speedY;
        this.dynamicEntityId = componentData.dynamicEntityId;
        this.staticPosition = componentData.staticPosition ? cc.p(componentData.staticPosition.x, componentData.staticPosition.y) : componentData.staticPosition;
        this.originSpeed = componentData.originSpeed;
        this.originSpeedX = componentData.originSpeedX;
        this.originSpeedY = componentData.originSpeedY;
    },
});
VelocityComponent.typeID = GameConfig.COMPONENT_ID.VELOCITY;
ComponentManager.getInstance().registerClass(VelocityComponent);

VelocityComponent.calculateSpeed = function (speedX, speedY) {
    return Math.sqrt(Math.pow(speedX, 2) + Math.pow(speedY, 2));
}