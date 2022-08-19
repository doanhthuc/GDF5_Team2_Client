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

    readData: function (data) {
        this._super(data);
        this.x = data.x;
        this.y = data.y;
        this.moveDistance = data.moveDistance;
    }
});
PositionComponent.typeID = GameConfig.COMPONENT_ID.POSITION;
ComponentManager.getInstance().registerClass(PositionComponent);

PositionComponent.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);

    data.x = inPacket.getDouble();
    data.y = inPacket.getDouble();
    data.moveDistance = inPacket.getDouble();

    return data;
}