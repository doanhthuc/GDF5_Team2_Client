let UnderGroundComponent = Component.extend({
    name: "UnderGround",
    typeID: GameConfig.COMPONENT_ID.UNDER_GROUND,

    ctor: function () {
        this._super();
        this.currentPathIdx=0;
    },

    reset: function () {
        this.currentPathIdx=0;
    },

    clone: function () {
        return new UnderGroundComponent();
    },
});
AppearanceComponent.typeID = GameConfig.COMPONENT_ID.UNDER_GROUND;
ComponentManager.getInstance().registerClass(UnderGroundComponent);