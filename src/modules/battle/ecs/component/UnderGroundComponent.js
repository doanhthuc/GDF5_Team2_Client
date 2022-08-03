let UnderGroundComponent = Component.extend({
    name: "UnderGround",
    typeID: GameConfig.COMPONENT_ID.UNDER_GROUND,

    ctor: function () {
        this._super();
        this.reset();
        this.saveData();
    },

    reset: function () {
        this.disableMoveDistance = 0;
        this.trigger = 0;
        this.isInGround = false;
    },

    clone: function () {
        return ComponentFactory.create(UnderGroundComponent);
    },

    saveData: function () {
        const data = {
            disableMoveDistance: this.disableMoveDistance,
            trigger: this.trigger,
            isInGround: this.isInGround
        }
        tickManager.getTickData()
            .saveComponentData(this.id, data);
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        this.disableMoveDistance = componentData.disableMoveDistance;
        this.trigger = componentData.trigger;
        this.isInGround = componentData.isInGround;
    },
});
UnderGroundComponent.typeID = GameConfig.COMPONENT_ID.UNDER_GROUND;
ComponentManager.getInstance().registerClass(UnderGroundComponent);