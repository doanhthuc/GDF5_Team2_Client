let CollisionComponent = Component.extend({
    name: "CollisionComponent",
    typeID: GameConfig.COMPONENT_ID.COLLISION,

    ctor: function (width, height, originWidth, originHeight) {
        this._super();
        this.reset(width, height, originWidth, originHeight);
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
});
CollisionComponent.typeID = GameConfig.COMPONENT_ID.COLLISION;
ComponentManager.getInstance().registerClass(CollisionComponent);