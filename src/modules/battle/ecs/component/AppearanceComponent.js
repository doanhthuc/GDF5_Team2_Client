let AppearanceComponent = Component.extend({
    name: "AppearanceComponent",
    typeID: GameConfig.COMPONENT_ID.APPEARANCE,

    ctor: function (sprite, mode, initPos) {
        this._super();
        this.reset(sprite, mode, initPos);
        this.sprite.retain();
    },

    reset: function (sprite, mode, initPos) {
        this.sprite = sprite;
        this.zOrder = 100;
        this.mode = mode;
        this.sprite.setVisible(true);

        if (mode === GameConfig.PLAYER) {
            BattleManager.getInstance().getBattleLayer().getPlayerMapNode().addChild(this.sprite, this.zOrder);
        } else if (mode === GameConfig.OPPONENT) {
            BattleManager.getInstance().getBattleLayer().getOpponentMapNode().addChild(this.sprite, this.zOrder);
        }

        if (initPos) {
            this.iniPos = initPos;
            this.sprite.setPosition(initPos);
        }
    },

    clone: function () {
        return new AppearanceComponent(this.sprite, this.mode, this.iniPos);
    },
});
AppearanceComponent.typeID = GameConfig.COMPONENT_ID.APPEARANCE;
ComponentManager.getInstance().registerClass(AppearanceComponent);