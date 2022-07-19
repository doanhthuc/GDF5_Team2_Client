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

                        if (stateAnim[spriteName].repeat) {
                            let tmpSprite = sprite;
                            let tmpSpriteAnimation = stateAnim[spriteName].animation;
                            let actionFuncCall = cc.callFunc(() => {
                                tmpSprite.stopAllActions();
                                tmpSprite.runAction(cc.repeatForever(cc.animate(tmpSpriteAnimation)));
                            });
                            actionArr.push(actionFuncCall);
                        } else {
                            actionArr.push(cc.animate(stateAnim[spriteName].animation));
                        }

                        for (let stateAnimI of stateAnim[spriteName].sequenceAnimations) {
                            if (stateAnimI.repeat) {
                                let actionFuncCall = cc.callFunc(() => {
                                    sprite.stopAllActions();
                                    sprite.runAction(cc.repeatForever(cc.animate(stateAnimI.animation)));
                                })
                                actionArr.push(actionFuncCall);
                            } else {
                                actionArr.push(cc.animate(stateAnimI.animation));
                            }
                        }

                        if (actionArr.length > 0) {
                            sprite.runAction(cc.sequence(...actionArr));
                        }

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