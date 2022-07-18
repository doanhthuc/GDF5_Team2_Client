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

            if (spriteComponent.currentStateIsRendered === false) {
                let appearanceComponent = entity.getComponent(AppearanceComponent);
                let stateAnim = spriteComponent.animationMap[spriteComponent.currentState];

                for (let spriteName of Object.keys(stateAnim)) {
                    let sprite = appearanceComponent.sprite.getChildByName(spriteName);
                    if (sprite) {
                        sprite.stopAllActions();
                        let actionArr = [];
                        for (let animation of stateAnim[spriteName].animations) {
                            actionArr.push(cc.animate(animation));
                        }
                        sprite.runAction(cc.sequence(...actionArr));
                        if (stateAnim[spriteName].flipX) {
                            sprite.setFlippedX(true);
                        } else {
                            sprite.setFlippedX(false);
                        }
                    }
                }

                spriteComponent.currentStateIsRendered = true;
            }
        }
    },
});
SpriteSheetAnimationSystem.typeID = GameConfig.SYSTEM_ID.SPRITE_SHEET;
SystemManager.getInstance().registerClass(SpriteSheetAnimationSystem);