let UnderGroundComponent = Component.extend({
    name: "UnderGround",
    typeID: GameConfig.COMPONENT_ID.UNDER_GROUND,

    ctor: function () {
        this._super();
        this.currentPathIdx = 0;
        this.trigger = 0;
        this.isInGround = false;
    },

    reset: function () {
        this.currentPathIdx = 0;
        this.trigger = 0;
        this.isInGround = false;
    },

    clone: function () {
        return ComponentFactory.create(UnderGroundComponent);
    },
});
UnderGroundComponent.typeID = GameConfig.COMPONENT_ID.UNDER_GROUND;
ComponentManager.getInstance().registerClass(UnderGroundComponent);