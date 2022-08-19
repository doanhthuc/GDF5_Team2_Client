let UnderGroundComponent = Component.extend({
    name: "UnderGround",
    typeID: GameConfig.COMPONENT_ID.UNDER_GROUND,

    ctor: function () {
        this._super();
        this.reset();
    },

    reset: function () {
        this.disableMoveDistance = 0;
        this.trigger = 0;
        this.isInGround = false;
    },

    clone: function () {
        return ComponentFactory.create(UnderGroundComponent);
    },
});
UnderGroundComponent.typeID = GameConfig.COMPONENT_ID.UNDER_GROUND;
ComponentManager.getInstance().registerClass(UnderGroundComponent);

UnderGroundComponent.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);
    return data;
}