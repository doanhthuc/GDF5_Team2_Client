let InfoComponent = Component.extend({
    name: "InfoComponentECS",
});

let MonsterInfoComponent = InfoComponent.extend({
    id: GameConfig.COMPONENT_ID.MONSTER_INFO,
    name: "MonsterInfoComponentECS",

    ctor: function (category, classs, weight, energy, gainEnergy, ability) {
        this.setCategory(category);
        this.classs = classs;
        this.weight = weight;
        this.energy = energy;
        this.gainEnergy = gainEnergy;
        this.ability = ability;
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
    id: GameConfig.COMPONENT_ID.TOWER_INFO,
    name: "TowerInfoComponentECS",

    ctor: function (energy, bulletTargetType, bulletEffects, archType, targetType, attackRange, bulletType,
                    targetStrategy, attackCountdown, speedAttack, damage) {
        this.energy = energy;
        this.bulletTargetType = bulletTargetType;
        this.bulletEffects = bulletEffects;
        this.archType = archType;
        this.targetType = targetType;
        this.attackRange = attackRange;
        this.bulletType = bulletType;
        this.targetStrategy = targetStrategy;
        this.attackCountdown = attackCountdown;
        this.speedAttack = speedAttack;
        this.damage = damage;
        cc.log("new " + this.name);
    },
});

let BulletInfoComponent = InfoComponent.extend({
    id: GameConfig.COMPONENT_ID.BULLET_INFO,
    name: "TowerInfoComponentECS",

    ctor: function () {
        cc.log("new " + this.name);
    },
});


let LifeComponent = InfoComponent.extend({
    name: "LifeComponentECS",
    id: GameConfig.COMPONENT_ID.LIFE,
    hp: 0,

    ctor: function(hp) {
        this.hp = hp;
        cc.log("new " + this.name);
    },
});