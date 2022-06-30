let InfoComponent = Component.extend({
    name: "InfoComponentECS",
});

let MonsterInfoComponent = InfoComponent.extend({
    name: "MonsterInfoComponentECS",
    typeID: GameConfig.COMPONENT_ID.MONSTER_INFO,

    ctor: function (category, classs, weight, energy, gainEnergy, ability, effects) {
        this._super();
        this.reset(category, classs, weight, energy, gainEnergy, ability, effects);
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
        this.effects = effects;
    },

    clone: function () {
        return new MonsterInfoComponent(this.category, this.classs, this.weight, this.energy, this.gainEnergy,
            this.ability, this.effects);
    }
});
ComponentManager.getInstance().registerClass(MonsterInfoComponent);

let TowerInfoComponent = InfoComponent.extend({
    name: "TowerInfoComponentECS",
    typeID: GameConfig.COMPONENT_ID.TOWER_INFO,

    ctor: function (energy, bulletTargetType, archType, targetType, bulletType) {
        this._super();
        this.reset(energy, bulletTargetType, archType, targetType, bulletType);
    },

    reset: function (energy, bulletTargetType, archType, targetType, bulletType) {
        this.energy = energy;
        this.bulletTargetType = bulletTargetType;
        this.archType = archType;
        this.targetType = targetType;
        this.bulletType = bulletType;
    },

    clone: function () {
        return new TowerInfoComponent(this.energy, this.bulletTargetType, this.archType, this.targetType, this.bulletType);
    }
});
ComponentManager.getInstance().registerClass(TowerInfoComponent);

let BulletInfoComponent = InfoComponent.extend({
    name: "BulletInfoComponentECS",
    typeID: GameConfig.COMPONENT_ID.BULLET_INFO,

    ctor: function (effects, type) {
        this._super();
        this.reset(effects, type);
    },

    reset: function (effects, type) {
        this.effects = effects;
        this.type = type;
    },

    clone: function () {
        return new BulletInfoComponent(this.effects, this.type);
    }
});
ComponentManager.getInstance().registerClass(BulletInfoComponent);

let LifeComponent = InfoComponent.extend({
    name: "LifeComponentECS",
    typeID: GameConfig.COMPONENT_ID.LIFE,

    ctor: function (hp, maxHP) {
        this._super();
        this.reset(hp, maxHP);
    },

    setMaxHP: function (maxHP) {
        if (maxHP) {
            this.maxHP = maxHP;
        } else {
            this.maxHP = this.hp;
        }
    },

    reset: function (hp, maxHP) {
        this.hp = hp;
        this.setMaxHP(maxHP);
    },

    clone: function () {
        return new LifeComponent(this.hp, this.maxHP);
    }
});
ComponentManager.getInstance().registerClass(LifeComponent);
