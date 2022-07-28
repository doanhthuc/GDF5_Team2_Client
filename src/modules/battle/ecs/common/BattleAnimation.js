let BattleAnimation = BattleAnimation || {};

const UNDER_GROUND_TAG = 101;
const HIT_SLOW_BULLET_TAG = 102;

BattleAnimation.animationPlusEnergy = function (position, value, mode) {
    let globalPos = Utils.convertMapNodeSpace2WorldSpace(position, mode);
    let uiLayer = BattleManager.getInstance().getBattleLayer().uiLayer;

    globalPos.x += (-10 + Math.random() * 10);

    // FIXME: hardcode
    let sp = ccs.load("ui/battle/battle_ui_layer/energy/PlusEnergyIcon.json", "").node;
    sp.setPosition(globalPos);
    sp.getChildByName("text").setString(value);
    uiLayer.addChild(sp)

    let moveTop = cc.moveBy(0.5, cc.p(0, 50));
    let callFunc = cc.callFunc(() => {
        uiLayer.removeChild(sp);
    })
    sp.runAction(cc.sequence(moveTop, callFunc));
}

BattleAnimation.animationHouse = function (mode) {
    Utils.validateMode(mode);
    let mapLayer = BattleManager.getInstance().getBattleLayer().mapLayer;
    let sp = mapLayer.houseSprite[mode];

    let moveRight = cc.moveBy(0.1, cc.p(5, 0));
    let moveLeft = cc.moveBy(0.1, cc.p(-5, 0));
    sp.runAction(cc.sequence(moveRight, moveLeft).repeat(1));
}

BattleAnimation.animationDamage = function (entity) {
    // animation
    let appearance = entity.getComponent(AppearanceComponent);
    if (appearance) {
        // FIXME: hardcode monster sprite name
        let childSprite = appearance.sprite.getChildByName("monster");
        if (childSprite) {
            let action1 = cc.tintTo(0.05, -64, -64, -64);
            let action2 = cc.tintTo(0.05, 255, 255, 255);
            childSprite.runAction(cc.sequence(action1, action2));
        }
    }
}

BattleAnimation.animationBornMonster = function (entity) {
    let appearanceComponent = entity.getComponent(AppearanceComponent);
    if (appearanceComponent && appearanceComponent.sprite) {
        // FIXME: hardcode sprite name
        let childSprite = appearanceComponent.sprite.getChildByName("monster");
        if (childSprite) {
            let spine = new sp.SkeletonAnimation("textures/monster/fx/fx_boss_demon_tree.json", "textures/monster/fx/fx_boss_demon_tree.atlas");
            childSprite.addChild(spine);
            spine.setPosition(cc.p(childSprite.width / 2, childSprite.height / 2));
            spine.setAnimation(0, "fx_cover", false);
        }
    }
}

BattleAnimation.addAnimationUnderGround = function (entity) {
    let appearanceComponent = entity.getComponent(AppearanceComponent);
    if (appearanceComponent && appearanceComponent.sprite) {
        // FIXME: hardcode sprite name
        let childSprite = appearanceComponent.sprite.getChildByName("monster");
        if (childSprite) {
            let spine = new sp.SkeletonAnimation("textures/monster/fx/fx_boss_stone_monster.json", "textures/monster/fx/fx_boss_stone_monster.atlas");
            childSprite.addChild(spine, 1, UNDER_GROUND_TAG);
            spine.setPosition(cc.p(childSprite.width / 2, childSprite.height / 2));
            spine.setAnimation(0, "fx_back", false);

            // hide monster
            childSprite.setOpacity(0);

            function animationStateEvent(obj, trackIndex, type, event, loopCount) {
                let entry = spine.getCurrent();
                let animationName = (entry && entry.animation) ? entry.animation.name : 0;

                switch (type) {
                    case GameConfig.ANIMATION_TYPE.ANIMATION_COMPLETE:
                        if (animationName === "fx_back") {
                            spine.setAnimation(0, "fx_cover", false);
                        } else if (animationName === "fx_cover") {
                            spine.setAnimation(0, "fx_back", false);
                        }
                        break;
                    default :
                        break;
                }
            }

            spine.setAnimationListener(childSprite, animationStateEvent);
        }
    }
}

BattleAnimation.removeAnimationUnderGround = function (entity) {
    let appearanceComponent = entity.getComponent(AppearanceComponent);
    // FIXME: hardcode sprite name
    if (appearanceComponent && appearanceComponent.sprite) {
        let childSprite = appearanceComponent.sprite.getChildByName("monster");
        if (childSprite) {
            childSprite.removeChildByTag(UNDER_GROUND_TAG);

            // show monster
            childSprite.setOpacity(255);
        }
    }
}

BattleAnimation.addAnimationHealing = function (entity) {
    let appearanceComponent = entity.getComponent(AppearanceComponent);
    // FIXME: hardcode sprite name
    if (appearanceComponent && appearanceComponent.sprite) {
        let childNode = appearanceComponent.sprite;
        if (childNode) {
            let spine = new sp.SkeletonAnimation("/textures/monster/fx/fx_boss_jungle_god.json", "/textures/monster/fx/fx_boss_jungle_god.atlas");
            childNode.addChild(spine, 0);
            spine.setAnimation(0, "fx_back", true);
            spine.setPosition(cc.p(childNode.width / 2, childNode.height / 2));
        }
    }
}

BattleAnimation.addAnimationHitSlowEffect = function (entity) {
    let appearanceComponent = entity.getComponent(AppearanceComponent);
    if (appearanceComponent && appearanceComponent.sprite) {
        let childSprite = appearanceComponent.sprite.getChildByName("monster");
        if (childSprite) {
            let spine = new sp.SkeletonAnimation("textures/tower/fx/tower_oil_fx.json", "textures/tower/fx/tower_oil_fx.atlas");
            spine.setPosition(cc.p(childSprite.width / 2, childSprite.height / 2));
            spine.setAnimation(0, "hit_target_bullet", false);
            childSprite.addChild(spine, 0, HIT_SLOW_BULLET_TAG);
        }
    }
}

BattleAnimation.removeAnimationHitSlowEffect = function (entity) {
    let appearanceComponent = entity.getComponent(AppearanceComponent);
    if (appearanceComponent && appearanceComponent.sprite) {
        let childSprite = appearanceComponent.sprite.getChildByName("monster");
        if (childSprite) {
            childSprite.removeChildByTag(HIT_SLOW_BULLET_TAG);
        }
    }
}

BattleAnimation.addAnimationForBullet = function (bulletEntity) {
    if (ValidatorECS.isBullet(bulletEntity)) {
        let pos = bulletEntity.getComponent(PositionComponent);
        if (pos) {
            switch (bulletEntity.typeID) {
                case GameConfig.ENTITY_ID.SLOW_BULLET:
                    animationSlowEffect(bulletEntity);
                    break;
                case GameConfig.ENTITY_ID.WIZARD_BULLET:
                    animationWizardBullet(bulletEntity);
                    break;
                default:
                    break;
            }
        }
    }
}

function animationSlowEffect (bulletEntity) {
    let pos = bulletEntity.getComponent(PositionComponent);
    let spine = new sp.SkeletonAnimation("textures/tower/fx/tower_oil_fx.json", "textures/tower/fx/tower_oil_fx.atlas");
    spine.setPosition(cc.p(pos.x, pos.y));
    spine.setAnimation(0, "hit_target_eff", false);
    let mapNode = BattleManager.getInstance().getBattleLayer().getMapNode(bulletEntity.mode);
    mapNode.addChild(spine, 0);

    function animationStateEvent(obj, trackIndex, type, event, loopCount) {
        let entry = spine.getCurrent();
        let animationName = (entry && entry.animation) ? entry.animation.name : 0;

        switch (type) {
            case GameConfig.ANIMATION_TYPE.ANIMATION_COMPLETE:
                if (animationName === "hit_target_eff") {
                    obj.removeChild(spine);
                }
                break;
            default :
                break;
        }
    }
    spine.setAnimationListener(mapNode, animationStateEvent);
}

function animationWizardBullet (bulletEntity) {
    let pos = bulletEntity.getComponent(PositionComponent);
    let spine = new sp.SkeletonAnimation("textures/tower/fx/tower_wizard_fx.json", "textures/tower/fx/tower_wizard_fx.atlas");
    spine.setPosition(cc.p(pos.x, pos.y));
    spine.setAnimation(0, "hit_target_eff", false);
    let mapNode = BattleManager.getInstance().getBattleLayer().getMapNode(bulletEntity.mode);
    mapNode.addChild(spine, 0);

    function animationStateEvent(obj, trackIndex, type, event, loopCount) {
        let entry = spine.getCurrent();
        let animationName = (entry && entry.animation) ? entry.animation.name : 0;

        switch (type) {
            case GameConfig.ANIMATION_TYPE.ANIMATION_COMPLETE:
                if (animationName === "hit_target_eff") {
                    obj.removeChild(spine);
                }
                break;
            default :
                break;
        }
    }
    spine.setAnimationListener(mapNode, animationStateEvent);
}