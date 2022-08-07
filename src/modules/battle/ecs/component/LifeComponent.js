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
        return ComponentFactory.create(LifeComponent, this.hp, this.maxHP);
    },
});
LifeComponent.typeID = GameConfig.COMPONENT_ID.LIFE;
ComponentManager.getInstance().registerClass(LifeComponent);