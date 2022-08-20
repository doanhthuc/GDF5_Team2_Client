let DamageAmplifyComponent = Component.extend({
    name: "DamageAmplifyComponent",
    typeID: GameConfig.COMPONENT_ID.DAMAGE_AMPLIFY_COMPONENT,

    ctor: function (amplifyRate) {
        this._super();
        this.reset(amplifyRate);
    },

    clone: function () {
        return ComponentFactory.create(DamageAmplifyComponent, this.amplifyRate);
    },

    reset: function (amplifyRate) {
        this.amplifyRate = amplifyRate;
    },

    readData: function (data) {
        this._super(data);
        this.amplifyRate = data.amplifyRate;
    }
});
DamageAmplifyComponent.typeID = GameConfig.COMPONENT_ID.DAMAGE_AMPLIFY_COMPONENT;
ComponentManager.getInstance().registerClass(DamageAmplifyComponent);


DamageAmplifyComponent.unpackData = function (inPacket) {
    let data = Component.unpackData(inPacket);
    data.amplifyRate = inPacket.getDouble();
    return data;
}