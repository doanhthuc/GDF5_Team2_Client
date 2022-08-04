let MonsterInfoComponent = InfoComponent.extend({
    name: "MonsterInfoComponentECS",
    typeID: GameConfig.COMPONENT_ID.MONSTER_INFO,

    ctor: function (category, classs, weight, energy, gainEnergy, ability, effects) {
        this._super();
        this.reset(category, classs, weight, energy, gainEnergy, ability, effects);
        this.saveData();
    },

    setCategory: function (category) {
        if (typeof category !== "string") {
            throw new InvalidArgumentTypeError(category, "string")
        }

        if (category !== "normal" && category !== "boss") {
            throw new Error("Category must be any in [normal, boss]")
        }

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
        return ComponentFactory.create(MonsterInfoComponent, this.category, this.classs, this.weight, this.energy, this.gainEnergy,
            this.ability, this.effects);
    },

    saveData: function () {
        let effectCloned = [];
        let abilityCloned = null;

        for (let effect of this.effects) {
            effectCloned.push(effect.clone());
        }

        if (this.ability) {
            abilityCloned = this.ability.clone();
        }

        const data = {
            category: this.category,
            classs: this.classs,
            weight: this.weight,
            damageEnergy: this.damageEnergy,
            gainEnergy: this.gainEnergy,
            ability: abilityCloned,
            effects: effectCloned,
        }
        tickManager.getTickData()
            .saveComponentData(this.id, data);
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        this.setCategory(componentData.category);
        this.classs = componentData.classs;
        this.weight = componentData.weight;
        this.damageEnergy = componentData.energy;
        this.gainEnergy = componentData.gainEnergy;
        this.ability = componentData.ability;
        this.effects = componentData.effects;
    },
});
MonsterInfoComponent.typeID = GameConfig.COMPONENT_ID.MONSTER_INFO;
ComponentManager.getInstance().registerClass(MonsterInfoComponent);