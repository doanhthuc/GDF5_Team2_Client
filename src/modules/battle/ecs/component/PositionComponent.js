let PositionComponent = Component.extend({
    name: "PositionComponent",
    typeID: GameConfig.COMPONENT_ID.POSITION,

    ctor: function (x, y) {
        this._super();
        this.reset(x, y);
    },

    reset: function (x, y) {
        this.x = x;
        this.y = y;
        this.moveDistance = 0;
    },

    clone: function () {
        return ComponentFactory.create(PositionComponent, this.x, this.y);
    },
});
PositionComponent.typeID = GameConfig.COMPONENT_ID.POSITION;
ComponentManager.getInstance().registerClass(PositionComponent);