let SpriteSheetAnimationSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.SPRITE_SHEET,
    name: "SpriteSheetAnimationSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    run: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(CollisionComponent);

    },
});
SpriteSheetAnimationSystem.typeID = GameConfig.SYSTEM_ID.SPRITE_SHEET;
SystemManager.getInstance().registerClass(SpriteSheetAnimationSystem);