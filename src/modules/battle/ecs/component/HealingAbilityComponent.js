let HealingAbility = Component.extend({
    name: "UnderGround",
    typeID: GameConfig.COMPONENT_ID.HEALING_ABILITY,

    ctor: function (range, healingRate) {
        this._super();
        this.reset(range, healingRate);
        this.saveData();
    },

    reset: function (range, healingRate) {
        this.range = range;
        this.healingRate = healingRate;
        this.countdown = 1;
    },

    clone: function () {
        return ComponentFactory.create(HealingAbility, this.range, this.healingRate);
    },

    saveData: function () {
        const data = {
            range: this.range,
            healingRate: this.healingRate,
            countdown: this.countdown
        }
        tickManager.getTickData()
            .saveComponentData(this.id, data);
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        this.range = componentData.range;
        this.healingRate = componentData.healingRate;
        this.countdown = componentData.countdown;
    },
});
HealingAbility.typeID = GameConfig.COMPONENT_ID.HEALING_ABILITY;
ComponentManager.getInstance().registerClass(HealingAbility);