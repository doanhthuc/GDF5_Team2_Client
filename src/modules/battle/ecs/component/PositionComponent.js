let PositionComponent = Component.extend({
    name: "PositionComponent",
    typeID: GameConfig.COMPONENT_ID.POSITION,

    ctor: function (x, y) {
        this._super();
        this.reset(x, y, 0);
    },

    reset: function (x, y, moveDistance) {
        this.x = x;
        this.y = y;
        this.moveDistance = moveDistance;
    },

    clone: function () {
        return ComponentFactory.create(PositionComponent, this.x, this.y);
    },
});
PositionComponent.typeID = GameConfig.COMPONENT_ID.POSITION;
ComponentManager.getInstance().registerClass(PositionComponent);