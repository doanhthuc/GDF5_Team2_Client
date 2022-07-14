let CollisionComponent = Component.extend({
    name: "CollisionComponent",
    typeID: GameConfig.COMPONENT_ID.COLLISION,

    ctor: function (width, height) {
        this._super();
        this.reset(width, height);
    },

    reset: function (width, height) {
        this.width = width;
        this.height = height;
    },

    clone: function () {
        return ComponentFactory.create(CollisionComponent, this.width, this.height);
    }
});
CollisionComponent.typeID = GameConfig.COMPONENT_ID.COLLISION;
ComponentManager.getInstance().registerClass(CollisionComponent);