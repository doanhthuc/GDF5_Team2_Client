let BulletInfoComponent = InfoComponent.extend({
    name: "BulletInfoComponentECS",
    typeID: GameConfig.COMPONENT_ID.BULLET_INFO,

    ctor: function (effects, type, radius) {
        this._super();
        this.reset(effects, type, radius);
        this.saveData();
    },

    reset: function (effects, type, radius) {
        this.effects = effects;
        this.type = type;
        this.radius = radius;
        this.hitMonster = new Map();
    },

    clone: function () {
        // TODO: should clone effects
        return ComponentFactory.create(BulletInfoComponent, this.effects, this.type, this.radius);
    },

    saveData: function () {
        let effectCloned = [];
        let hitMonsterCloned = new Map(this.hitMonster);

        for (let effect of this.effects) {
            effectCloned.push(effect.clone());
        }

        const data = {
            effects: effectCloned,
            type: this.type,
            radius: this.radius,
            hitMonster: hitMonsterCloned,
        }
        tickManager.getTickData()
            .saveComponentData(this.id, data);
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        this.effects = componentData.effects;
        this.type = componentData.type;
        this.radius = componentData.radius;
        this.hitMonster = componentData.hitMonster;
    },
});
BulletInfoComponent.typeID = GameConfig.COMPONENT_ID.BULLET_INFO;
ComponentManager.getInstance().registerClass(BulletInfoComponent);