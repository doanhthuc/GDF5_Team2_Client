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
        this.zOrder = 1;
        this.mode = mode;
        this.sprite.setVisible(true);

        BattleManager.getInstance().getBattleLayer().getMapNode(mode).addChild(this.sprite, this.zOrder);

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