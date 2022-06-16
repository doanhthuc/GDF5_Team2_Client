let InfoComponent = Component.extend({
    name: "InfoComponentECS",
});

let MonsterInfoComponent = InfoComponent.extend({
    name: "MonsterInfoComponentECS",

    ctor: function (category, classs, weight, energy, gainEnergy, ability, effects) {
        this._super(GameConfig.COMPONENT_ID.MONSTER_INFO);
        this.setCategory(category);
        this.classs = classs;
        this.weight = weight;
        this.energy = energy;
        this.gainEnergy = gainEnergy;
        this.ability = ability;
        this.effects = effects;
        cc.log("new " + this.name);
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

    ctor: function (energy, bulletTargetType, bulletEffects, archType, targetType, attackRange, bulletType,
                    targetStrategy, attackCountdown, speedAttack, damage) {
        this._super(GameConfig.COMPONENT_ID.TOWER_INFO);
        this.energy = energy;
        this.bulletTargetType = bulletTargetType;
        this.effects = bulletEffects;
        this.archType = archType;
        this.targetType = targetType;
        this.attackRange = attackRange*GameConfig.TILE_WIDTH;
        this.bulletType = bulletType;
        this.targetStrategy = targetStrategy;
        this.attackCountdown = attackCountdown;
        this.speedAttack = speedAttack;
        this.damage = damage;
        cc.log("new " + this.name);
    },
});

let BulletInfoComponent = InfoComponent.extend({
    name: "TowerInfoComponentECS",

    ctor: function (effects) {
        this._super(GameConfig.COMPONENT_ID.BULLET_INFO);
        this.effects = effects;

        cc.log("new " + this.name);
    },
});


let LifeComponent = InfoComponent.extend({
    name: "LifeComponentECS",

    ctor: function(hp) {
        this._super(GameConfig.COMPONENT_ID.LIFE);
        this.hp = hp;

        cc.log("new " + this.name);
    },
});