let FireBallEffect = Component.extend({
    name: "FireBallEffect",
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
        return ComponentFactory.create(FireBallEffect, this.a, this.maxDuration,
            this.startPos, this.endPos, this.V0);
    },

    add: function (otherAcceleration) {
        this.x += otherAcceleration.x;
        this.y += otherAcceleration.y;
    },
});
FireBallEffect.typeID = GameConfig.COMPONENT_ID.ACCELERATION;
ComponentManager.getInstance().registerClass(FireBallEffect);

FireBallEffect.calculateSpeed = function (speedX, speedY) {
    return Math.sqrt(Math.pow(speedX, 2) + Math.pow(speedY, 2));
}

FireBallEffect.readSnapshot = function (inPacket) {
    let component = Component.readSnapshot(inPacket);
    return component;
}