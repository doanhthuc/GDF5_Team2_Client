let LifeSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.LIFE,
    name: "LifeSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    _run: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(LifeComponent);
        for (let entity of entityList) {
            let lifeComponent = entity.getComponent(LifeComponent);
            if (lifeComponent.hp <= 0) {
                EntityManager.destroy(entity);
            }
        }
    }
});
LifeSystem.typeID = GameConfig.SYSTEM_ID.LIFE;
SystemManager.getInstance().registerClass(LifeSystem);