let PositionComponent = Component.extend({
    name: "PositionComponent",
    typeID: GameConfig.COMPONENT_ID.POSITION,

    ctor: function (x, y) {
        this._super();
        this.reset(x, y, 0);
    },

    reset: function (x, y, moveDistance=0) {
        this.x = x;
        this.y = y;
        this.moveDistance = moveDistance;

        // used to render between 2 tick (smooth frame)
        this.__x = this.x;
        this.__y = this.y;
    },

    clone: function () {
        return ComponentFactory.create(PositionComponent, this.x, this.y, this.moveDistance);
    },
});
PositionComponent.typeID = GameConfig.COMPONENT_ID.POSITION;
ComponentManager.getInstance().registerClass(PositionComponent);

PositionComponent.readSnapshot = function (inPacket) {
    let component = Component.readSnapshot(inPacket);
    component.x = inPacket.getDouble();
    component.y = inPacket.getDouble();
    component.moveDistance = inPacket.getDouble();
    return component;
}