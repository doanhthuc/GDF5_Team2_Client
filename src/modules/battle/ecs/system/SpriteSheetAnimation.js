let SpriteSheetAnimationSystem = System.extend({
    id: GameConfig.SYSTEM_ID.SPRITE_SHEET,
    name: "SpriteSheetAnimationSystem",

    ctor: function () {
        cc.log("new " + this.name);
    },

    run: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesByComponents(GameConfig.COMPONENT_ID.COLLISION);

    },
});