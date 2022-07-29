let AccelerationComponent = Component.extend({
    name: "AccelerationComponent",
    typeID: GameConfig.COMPONENT_ID.ACCELERATION,

    ctor: function (a, maxDuration, startPos, endPos, V0) {
        this._super();
        this.reset(a, maxDuration, startPos, endPos, V0);
    },

    reset: function (a, maxDuration, startPos, endPos, V0) {
        this.a = a;
        this.accTime = 0;
        this.maxDuration = maxDuration;
        this.startPos = startPos;
        this.endPos = endPos;
        this.V0 = V0;
    },

    clone: function () {
        return ComponentFactory.create(AccelerationComponent, this.a, this.maxDuration,
            this.startPos, this.endPos, this.V0);
    },

    add: function (otherAcceleration) {
        this.x += otherAcceleration.x;
        this.y += otherAcceleration.y;
    },
});
AccelerationComponent.typeID = GameConfig.COMPONENT_ID.ACCELERATION;
ComponentManager.getInstance().registerClass(AccelerationComponent);

AccelerationComponent.calculateSpeed = function (speedX, speedY) {
    return Math.sqrt(Math.pow(speedX, 2) + Math.pow(speedY, 2));
}