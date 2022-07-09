let AppearanceComponent = Component.extend({
    name: "AppearanceComponent",
    typeID: GameConfig.COMPONENT_ID.APPEARANCE,

    ctor: function (sprite, mode) {
        this._super();
        this.reset(sprite);

        GameConfig.gameLayer.mapLayer.addChild(this.sprite, this.zOrder);
    },

    reset: function (sprite) {
        this.sprite = sprite;
        this.zOrder = 100;
    },

    clone: function () {
        return new AppearanceComponent(this.sprite);
    },
});
AppearanceComponent.typeID = GameConfig.COMPONENT_ID.APPEARANCE;
ComponentManager.getInstance().registerClass(AppearanceComponent);