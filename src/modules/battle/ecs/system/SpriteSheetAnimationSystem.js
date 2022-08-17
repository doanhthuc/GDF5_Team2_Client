let SpriteSheetAnimationSystem = System.extend({
    typeID: GameConfig.SYSTEM_ID.SPRITE_SHEET,
    name: "SpriteSheetAnimationSystem",

    ctor: function () {
        this._super();
        cc.log("new " + this.name);
    },

    checkEntityCondition: function (entity, componentOrCls) {
        return componentOrCls.typeID === SpriteSheetAnimationComponent.typeID;
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

                        let isShadow = stateAnim[spriteName].shadow;

                        let shadowSprite = appearanceComponent.sprite.getChildByName(spriteName + "_shadow");
                        let actionArr = [];

                        if (stateAnim[spriteName].repeat) {
                            let tmpSpriteAnimation = stateAnim[spriteName].animation;
                            let actionFuncCall = cc.callFunc((sender) => {
                                sender.stopAllActions();
                                let action =cc.speed(cc.repeatForever(cc.animate(tmpSpriteAnimation)), 1);
                                action.setTag(0);
                                sender.runAction(action);
                            });
                            actionArr.push(actionFuncCall);
                        } else {
                            let tmpSpriteAnimation = stateAnim[spriteName].animation;
                            let actionFuncCall = cc.callFunc((sender) => {
                                let action =cc.speed(cc.animate(tmpSpriteAnimation), 1);
                                action.setTag(0);
                                sender.runAction(action);
                            })
                            actionArr.push(actionFuncCall, cc.delayTime(stateAnim[spriteName].delay));
                        }

                        for (let stateAnimI of stateAnim[spriteName].sequenceAnimations) {
                            if (stateAnimI.repeat) {
                                let actionFuncCall = cc.callFunc((sender) => {
                                    sender.stopAllActions();
                                    let action =cc.speed(cc.repeatForever(cc.animate(stateAnimI.animation)), 1);
                                    action.setTag(0);
                                    sender.runAction(action);
                                })
                                actionArr.push(actionFuncCall);
                            } else {
                                let tmpSpriteAnimation = stateAnimI.animation;
                                let actionFuncCall = cc.callFunc((sender) => {
                                    let action =cc.speed(cc.animate(tmpSpriteAnimation), 1);
                                    action.setTag(0);
                                    sender.runAction(action);
                                })
                                actionArr.push(actionFuncCall, cc.delayTime(stateAnimI.delay))
                            }
                        }

                        let isFlipX = stateAnim[spriteName].flipX;

                        if (actionArr.length > 0) {
                            sprite.runAction(cc.sequence(...actionArr));
                            if (shadowSprite) {
                                shadowSprite.runAction(cc.sequence(...actionArr).clone());
                            }
                        }

                        if (isFlipX) {
                            sprite.setFlippedX(true);
                            if (shadowSprite) {
                                shadowSprite.setFlippedX(true);
                            }
                        } else {
                            sprite.setFlippedX(false);
                            if (shadowSprite) {
                                shadowSprite.setFlippedX(false);
                            }
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