let VelocityComponent = Component.extend({
    name: "VelocityComponent",
    typeID: GameConfig.COMPONENT_ID.VELOCITY,

    ctor: function (speedX, speedY, dynamicEntityId, staticPosition) {
        this._super();
        this.typeID = 6;
        this.reset(speedX, speedY, dynamicEntityId, staticPosition);
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
        return ComponentFactory.create(VelocityComponent, this.speedX, this.speedY, this.dynamicEntityId, this.staticPosition);
    },

    getDynamicPosition: function () {
        if (!this.dynamicEntityId) {
            return null;
        }

        let entity = EntityManager.getInstance().getEntity(this.dynamicEntityId);

        if (entity && entity.getActive()) {
            if (entity._hasComponent(UnderGroundComponent)) {
                let underGroundComponent = entity.getComponent(UnderGroundComponent)
                if (underGroundComponent.isInGround) {
                    return null;
                }
            }
            return entity.getComponent(PositionComponent);
        }
        
        return null;
    },

    readData: function (data) {
        this._super(data);
        this.speedX = data.speedX;
        this.speedY = data.speedY;
        this.originSpeedX = data.originSpeedX;
        this.originSpeedY = data.originSpeedY;
        this.originSpeed = data.originSpeed;
        this.staticPosition = data.staticPosition;
        this.dynamicEntityId = data.dynamicEntityId;
        cc.log("Read Data VelocityComponent")
    }
});
VelocityComponent.typeID = GameConfig.COMPONENT_ID.VELOCITY;
ComponentManager.getInstance().registerClass(VelocityComponent);

VelocityComponent.calculateSpeed = function (speedX, speedY) {
    return Math.sqrt(Math.pow(speedX, 2) + Math.pow(speedY, 2));
}

VelocityComponent.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);

    data.speedX = inPacket.getDouble();
    data.speedY = inPacket.getDouble();
    data.originSpeedX = inPacket.getDouble();
    data.originSpeedY = inPacket.getDouble();
    data.originSpeed = inPacket.getDouble();

    if (Utils.convertShortToBoolean(inPacket.getShort())) {
        data.staticPosition = cc.p(inPacket.getDouble(), inPacket.getDouble());
    }

    if (Utils.convertShortToBoolean(inPacket.getShort())) {
        data.dynamicEntityId = inPacket.getLong();
    }

    return data;
}