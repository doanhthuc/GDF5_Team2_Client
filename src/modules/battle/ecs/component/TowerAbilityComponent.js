let TowerAbilityComponent = Component.extend({
    name: "TowerAbilityComponent",
    typeID: GameConfig.COMPONENT_ID.TOWER_ABILITY,

    ctor: function (range, effect) {
        this._super();
        this.reset(range, effect);
    },

    clone: function () {
        return ComponentFactory.create(TowerAbilityComponent, this.range, this.effect);
    },

    reset: function (range, effect) {
        cc.log("TowerAbilityComponent line 39");
        this.range = range;
        this.effect = effect;
        cc.log(effect.percent);
    }
});
TowerAbilityComponent.typeID = GameConfig.COMPONENT_ID.TOWER_ABILITY;
ComponentManager.getInstance().registerClass(TowerAbilityComponent);