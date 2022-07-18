let SpriteSheetAnimationSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.SPRITE_SHEET,
    name: "SpriteSheetAnimationSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    _run: function (tick) {
        let entityList = EntityManager.getInstance()
            .getEntitiesHasComponents(SpriteSheetAnimationComponent);

        for (let entity of entityList) {
            let spriteComponent = entity.getComponent(SpriteSheetAnimationComponent);
            if (spriteComponent._currentStateIsRendered === false) {
                cc.log("SpriteSheet ChangeAnimation")
                let appearanceComponent = entity.getComponent(AppearanceComponent);
                let stateAnim = spriteComponent.animationMap[spriteComponent._currentState];
                for (let spriteName of Object.keys(stateAnim)) {
                    let sprite = appearanceComponent.sprite.getChildByName(spriteName);
                    if (sprite) {
                        sprite.stopAllActions();
                        sprite.runAction(cc.repeatForever(cc.animate(stateAnim[spriteName].animation)));
                        if (stateAnim[spriteName].flipX) {
                            sprite.setFlippedX(true);
                        } else {
                            sprite.setFlippedX(false);
                        }
                    }
                }
                spriteComponent._currentStateIsRendered = true;
            }
        }
    },

})
SpriteSheetAnimationSystem.typeID = GameConfig.SYSTEM_ID.SPRITE_SHEET;
SystemManager.getInstance().registerClass(SpriteSheetAnimationSystem);