let PositionComponent = Component.extend({
    name: "PositionComponent",
    typeID: GameConfig.COMPONENT_ID.POSITION,

    ctor: function (x, y) {
        this._super();
        this.reset(x, y, 0);
        this.saveData();
    },

    reset: function (x, y, moveDistance) {
        this.x = x;
        this.y = y;
        this.moveDistance = moveDistance;
    },

    clone: function () {
        return ComponentFactory.create(PositionComponent, this.x, this.y);
    },

    saveData: function () {
        tickManager.getTickData()
            .saveComponentData(this.id, {x: this.x, y: this.y, moveDistance: this.moveDistance});
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        this.reset(componentData.x, componentData.y, componentData.moveDistance);
    },
});
PositionComponent.typeID = GameConfig.COMPONENT_ID.POSITION;
ComponentManager.getInstance().registerClass(PositionComponent);