let FireBallEffect = Component.extend({
    name: "FireBallEffect",
    typeID: GameConfig.COMPONENT_ID.ACCELERATION,

    ctor: function (a, maxDuration, startPos, endPos, velocityStart) {
        this._super();
        this.reset(a, maxDuration, startPos, endPos, velocityStart);
    },

    reset: function (acceleration, maxDuration, startPos, endPos, velocityStart) {
        this.acceleration = acceleration;
        this.accTime = 0;
        this.maxDuration = maxDuration;
        this.startPos = startPos;
        this.endPos = endPos;
        this.velocityStart = velocityStart;
    },

    clone: function () {
        return ComponentFactory.create(FireBallEffect, this.acceleration, this.maxDuration,
            this.startPos, this.endPos, this.velocityStart);
    },


    readData: function (data) {
        this._super(data);
        this.acceleration = data.acceleration;
        this.accTime = data.accTime;
        this.maxDuration = data.maxDuration;
        this.startPos = data.startPos;
        this.endPos = data.endPos;
        this.velocityStart = data.velocityStart;
    }

});
FireBallEffect.typeID = GameConfig.COMPONENT_ID.ACCELERATION;
ComponentManager.getInstance().registerClass(FireBallEffect);

FireBallEffect.calculateSpeed = function (speedX, speedY) {
    return Math.sqrt(Math.pow(speedX, 2) + Math.pow(speedY, 2));
}

FireBallEffect.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);

    data.acceleration = inPacket.getDouble();
    data.accTime = inPacket.getDouble();
    data.maxDuration = inPacket.getDouble();
    data.startPos = cc.p(inPacket.getDouble(), inPacket.getDouble());
    data.endPos = cc.p(inPacket.getDouble(), inPacket.getDouble());
    data.velocityStart = inPacket.getDouble();

    return data;
}