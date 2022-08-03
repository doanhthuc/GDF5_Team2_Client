let LifeComponent = InfoComponent.extend({
    name: "LifeComponentECS",
    typeID: GameConfig.COMPONENT_ID.LIFE,

    ctor: function (hp, maxHP) {
        this._super();
        this.reset(hp, maxHP);
        this.saveData();
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
        return ComponentFactory.create(LifeComponent, this.hp, this.maxHP);
    },

    saveData: function () {
        tickManager.getTickData()
            .saveComponentData(this.id, {hp: this.hp, maxHP: this.maxHP});
    },

    updateDataFromLatestTick: function () {
        let componentData = tickManager.getTickData().getComponentData(this.id);
        this.reset(componentData.hp, componentData.maxHP);
    },
});
LifeComponent.typeID = GameConfig.COMPONENT_ID.LIFE;
ComponentManager.getInstance().registerClass(LifeComponent);