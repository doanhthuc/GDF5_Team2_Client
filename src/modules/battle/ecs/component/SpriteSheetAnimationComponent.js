let SpriteSheetAnimationComponent = Component.extend({
    name: "SpriteSheetAnimationComponent",
    typeID: GameConfig.COMPONENT_ID.SPRITE_SHEET,

    ctor: function () {
        this.sprite = new cc.Sprite();
        this.currentState = null;
        this.isRendered = false;3
        this.animationMap = {};
    },

    reset: function () {

    }
});
SpriteSheetAnimationComponent.typeID = GameConfig.COMPONENT_ID.SPRITE_SHEET;
ComponentManager.getInstance().registerClass(SpriteSheetAnimationComponent);
