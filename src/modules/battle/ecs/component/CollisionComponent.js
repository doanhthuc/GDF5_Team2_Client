let CollisionComponent = Component.extend({
    name: "CollisionComponent",
    typeID: GameConfig.COMPONENT_ID.COLLISION,

    ctor: function (width, height, originWidth, originHeight) {
        this._super();
        this.reset(width, height, originWidth, originHeight);
        this.saveData();
    },

    reset: function (width, height, originWidth, originHeight) {
        this.width = width;
        this.height = height;
        this.originWidth = originWidth;
        this.originHeight = originHeight;
    },

    clone: function () {
        return ComponentFactory.create(CollisionComponent, this.width, this.height);
    },

    saveData: function () {
        const data = {
            width: this.width,
            height: this.height,
            originWidth: this.originWidth,
            originHeight: this.originHeight
        };

        tickManager.getTickData()
            .saveComponentData(this.id, data);
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        this.reset(componentData.width, componentData.height, componentData.originWidth, componentData.originHeight);
    },
});
CollisionComponent.typeID = GameConfig.COMPONENT_ID.COLLISION;
ComponentManager.getInstance().registerClass(CollisionComponent);