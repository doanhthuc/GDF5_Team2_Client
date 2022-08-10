let DamageAmplifyComponent = Component.extend({
    name: "DamageAmplifyComponent",
    typeID: GameConfig.COMPONENT_ID.DAMAGE_AMPLIFY_COMPONENT,

    ctor: function (amplifyRate) {
        this._super();
        this.reset(amplifyRate);
    },

    clone: function () {
        return ComponentFactory.create(DamageAmplifyComponent,this.amplifyRate);
    },

    reset: function (amplifyRate) {
        this.amplifyRate = amplifyRate;
    },
});
DamageAmplifyComponent.typeID = GameConfig.COMPONENT_ID.DAMAGE_AMPLIFY_COMPONENT;
ComponentManager.getInstance().registerClass(DamageAmplifyComponent);