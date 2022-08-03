let FireBallEffect = Component.extend({
    name: "FireBallEffect",
    typeID: GameConfig.COMPONENT_ID.ACCELERATION,

    ctor: function (a, maxDuration, startPos, endPos, V0) {
        this._super();
        this.reset(a, maxDuration, startPos, endPos, V0);
        this.saveData();
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

    saveData: function () {
        const data = {
            a: this.a,
            accTime: this.accTime,
            maxDuration: this.maxDuration,
            startPos: cc.p(this.startPos.x, this.startPos.y),
            endPos: cc.p(this.endPos.x, this.endPos.y),
            V0: this.V0
        };

        tickManager.getTickData()
            .saveComponentData(this.id, data);
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        this.a = componentData.a;
        this.accTime = componentData.accTime;
        this.maxDuration = componentData.maxDuration;
        this.startPos = componentData.startPos;
        this.endPos = componentData.endPos;
        this.V0 = componentData.V0;
    },
});
FireBallEffect.typeID = GameConfig.COMPONENT_ID.ACCELERATION;
ComponentManager.getInstance().registerClass(FireBallEffect);

FireBallEffect.calculateSpeed = function (speedX, speedY) {
    return Math.sqrt(Math.pow(speedX, 2) + Math.pow(speedY, 2));
}