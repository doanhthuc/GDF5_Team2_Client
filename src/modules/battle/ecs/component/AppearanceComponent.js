let AppearanceComponent = Component.extend({
    name: "AppearanceComponent",
    typeID: GameConfig.COMPONENT_ID.APPEARANCE,

    ctor: function (sprite, mode) {
        this._super();
        this.reset(sprite);

        if (mode === GameConfig.PLAYER) {
            GameConfig.gameLayer.mapLayer.playerMapNode.addChild(this.sprite, this.zOrder);
        } else if (mode === GameConfig.OPPONENT) {
            GameConfig.gameLayer.mapLayer.opponentMapNode.addChild(this.sprite, this.zOrder);
        }
        this.sprite.retain();
    },

    reset: function (sprite) {
        this.sprite = sprite;
        this.zOrder = 100;
    },

    clone: function () {
        return new AppearanceComponent(this.sprite, this.mode);
    },
});
AppearanceComponent.typeID = GameConfig.COMPONENT_ID.APPEARANCE;
ComponentManager.getInstance().registerClass(AppearanceComponent);