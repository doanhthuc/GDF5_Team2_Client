let HealingAbility = Component.extend({
    name: "UnderGround",
    typeID: GameConfig.COMPONENT_ID.HEALING_ABILITY,

    ctor: function (range, healingRate) {
        this._super();
        this.reset(range,healingRate);
    },

    reset: function (range,healingRate) {
        this.range = range;
        this.healingRate = healingRate;
        this.countdown = 1;
    },

    clone: function () {
        return new HealingAbility(this.range,this.healingRate);
    },
});
HealingAbility.typeID = GameConfig.COMPONENT_ID.HEALING_ABILITY;
ComponentManager.getInstance().registerClass(HealingAbility);