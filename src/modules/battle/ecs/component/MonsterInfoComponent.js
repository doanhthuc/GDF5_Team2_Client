let MonsterInfoComponent = InfoComponent.extend({
    name: "MonsterInfoComponentECS",
    typeID: GameConfig.COMPONENT_ID.MONSTER_INFO,

    ctor: function (category, classs, weight, energy, gainEnergy, ability, effects) {
        this._super();
        this.reset(category, classs, weight, energy, gainEnergy, ability, effects);
    },

    setCategory: function (category) {
        this.category = category;
    },

    reset: function (category, classs, weight, energy, gainEnergy, ability, effects) {
        this.setCategory(category);
        this.classs = classs;
        this.weight = weight;
        this.damageEnergy = energy;
        this.gainEnergy = gainEnergy;
        this.ability = ability;
        this.effects = effects || [];
    },

    clone: function () {
        // TODO: should use effect.clone()??
        return ComponentFactory.create(MonsterInfoComponent, this.category, this.classs, this.weight, this.damageEnergy, this.gainEnergy,
            this.ability, this.effects);
    },
});
MonsterInfoComponent.typeID = GameConfig.COMPONENT_ID.MONSTER_INFO;
ComponentManager.getInstance().registerClass(MonsterInfoComponent);

MonsterInfoComponent.readSnapshot = function (inPacket) {
    let component = Component.readSnapshot(inPacket);
    return component;
}