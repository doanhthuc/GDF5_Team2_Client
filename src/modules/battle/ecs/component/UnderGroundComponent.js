let UnderGroundComponent = Component.extend({
    name: "UnderGround",
    typeID: GameConfig.COMPONENT_ID.UNDER_GROUND,

    ctor: function () {
        this._super();
        this.currentPathIdx = 0;
        this.trigger = 0;
        this.isRunning = false;
    },

    reset: function () {
        this.currentPathIdx = 0;
        this.trigger = 0;
        this.isRunning = false;
    },

    clone: function () {
        return new UnderGroundComponent();
    },
});
UnderGroundComponent.typeID = GameConfig.COMPONENT_ID.UNDER_GROUND;
ComponentManager.getInstance().registerClass(UnderGroundComponent);