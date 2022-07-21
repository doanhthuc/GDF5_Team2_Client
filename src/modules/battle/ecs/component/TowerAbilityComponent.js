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
        this.range = range;
        this.effect = effect;
    }
});
TowerAbilityComponent.typeID = GameConfig.COMPONENT_ID.TOWER_ABILITY;
ComponentManager.getInstance().registerClass(TowerAbilityComponent);