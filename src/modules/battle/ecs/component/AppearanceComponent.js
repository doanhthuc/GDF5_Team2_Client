let AppearanceComponent = Component.extend({
    name: "AppearanceComponent",
    typeID: GameConfig.COMPONENT_ID.APPEARANCE,

    ctor: function (sprite, mode) {
        this._super();
        this.reset(sprite, mode);

        if (mode === GameConfig.PLAYER) {
            BattleManager.getInstance().getBattleLayer().getPlayerMapNode().addChild(this.sprite, this.zOrder);
        } else if (mode === GameConfig.OPPONENT) {
            BattleManager.getInstance().getBattleLayer().getOpponentMapNode().addChild(this.sprite, this.zOrder);
        }
    },

    reset: function (sprite, mode) {
        this.sprite = sprite;
        // this.sprite.setVisible(true);
        // this.sprite.retain();
        this.zOrder = 100;
        this.mode = mode;
    },

    clone: function () {
        return new AppearanceComponent(this.sprite, this.mode);
    },
});
AppearanceComponent.typeID = GameConfig.COMPONENT_ID.APPEARANCE;
ComponentManager.getInstance().registerClass(AppearanceComponent);