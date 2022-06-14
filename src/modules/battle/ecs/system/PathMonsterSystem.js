let PathMonsterSystem = System.extend({
    id: GameConfig.SYSTEM_ID.PATH_MONSTER,
    name: "PathMonsterSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesByComponents(GameConfig.COMPONENT_ID.MONSTER_INFO, GameConfig.COMPONENT_ID.VELOCITY, GameConfig.COMPONENT_ID.POSITION);
        // TODO:
    }
});