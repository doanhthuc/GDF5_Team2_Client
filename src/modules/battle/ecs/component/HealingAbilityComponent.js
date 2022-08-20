let HealingAbility = Component.extend({
    name: "UnderGround",
    typeID: GameConfig.COMPONENT_ID.HEALING_ABILITY,

    ctor: function (range, healingRate) {
        this._super();
        this.reset(range, healingRate);
    },

    reset: function (range, healingRate) {
        this.range = range;
        this.healingRate = healingRate;
        this.countdown = 1;
    },

    clone: function () {
        return ComponentFactory.create(HealingAbility, this.range, this.healingRate);
    },

    readData: function (data) {
        this._super(data);
        this.countdown = data.countdown;
    }

});
HealingAbility.typeID = GameConfig.COMPONENT_ID.HEALING_ABILITY;
ComponentManager.getInstance().registerClass(HealingAbility);

HealingAbility.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);
    data.countdown = inPacket.getDouble();
    return data;
}