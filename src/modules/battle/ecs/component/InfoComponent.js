let InfoComponent = Component.extend({
    name: "InfoComponentECS",
    typeID: Utils.UUID.genComponentTypeID(),
});

let MonsterInfoComponent = InfoComponent.extend({
    name: "MonsterInfoComponentECS",
    typeID: Utils.UUID.genComponentTypeID(),

    ctor: function (category, classs, weight, energy, gainEnergy, ability, effects) {
        this._super(GameConfig.COMPONENT_ID.MONSTER_INFO);
        this.setCategory(category);
        this.classs = classs;
        this.weight = weight;
        this.damageEnergy = energy;
        this.gainEnergy = gainEnergy;
        this.ability = ability;
        this.effects = effects;
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
});

let TowerInfoComponent = InfoComponent.extend({
    name: "TowerInfoComponentECS",
    typeID: Utils.UUID.genComponentTypeID(),

    ctor: function (energy, bulletTargetType, bulletEffects, archType, targetType, attackRange, bulletType) {
        this._super(GameConfig.COMPONENT_ID.TOWER_INFO);
        this.energy = energy;
        this.bulletTargetType = bulletTargetType;
        this.archType = archType;
        this.targetType = targetType;
        this.bulletType = bulletType;
    },
});

let BulletInfoComponent = InfoComponent.extend({
    name: "BulletInfoComponentECS",
    typeID: Utils.UUID.genComponentTypeID(),

    ctor: function (effects, type) {
        this._super(GameConfig.COMPONENT_ID.BULLET_INFO);
        this.effects = effects;
        this.type = type;
    },
});


let LifeComponent = InfoComponent.extend({
    name: "LifeComponentECS",

    ctor: function (hp, maxHP) {
        this._super(GameConfig.COMPONENT_ID.LIFE);
        this.hp = hp;
        if (maxHP) {
            this.maxHP = maxHP;
        } else {
            this.maxHP = hp;
        }
    },
});