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
                                let action =cc.speed(cc.repeatForever(cc.animate(tmpSpriteAnimation)), 1);
                                action.setTag(0);
                                tmpSprite.runAction(action);
                            });
                            actionArr.push(actionFuncCall);
                        } else {
                            let tmpSprite = sprite;
                            let tmpSpriteAnimation = stateAnim[spriteName].animation;
                            let actionFuncCall = cc.callFunc(() => {
                                let action =cc.speed(cc.animate(tmpSpriteAnimation), 1);
                                action.setTag(0);
                                tmpSprite.runAction(action);
                            })
                            actionArr.push(actionFuncCall, cc.delayTime(stateAnim[spriteName].delay));
                        }

                        for (let stateAnimI of stateAnim[spriteName].sequenceAnimations) {
                            if (stateAnimI.repeat) {
                                let actionFuncCall = cc.callFunc(() => {
                                    sprite.stopAllActions();
                                    let action =cc.speed(cc.repeatForever(cc.animate(stateAnimI.animation)), 1);
                                    action.setTag(0);
                                    sprite.runAction(action);
                                })
                                actionArr.push(actionFuncCall);
                            } else {
                                let tmpSprite = sprite;
                                let tmpSpriteAnimation = stateAnimI.animation;
                                let actionFuncCall = cc.callFunc(() => {
                                    let action =cc.speed(cc.animate(tmpSpriteAnimation), 1);
                                    action.setTag(0);
                                    tmpSprite.runAction(action);
                                })
                                actionArr.push(actionFuncCall, cc.delayTime(stateAnimI.delay))
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