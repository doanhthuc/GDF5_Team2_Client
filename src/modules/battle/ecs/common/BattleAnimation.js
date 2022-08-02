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
            let action1 = cc.tintTo(0.05, 255, 51, 0);
            let action2 = cc.tintTo(0.05, 255, 255, 255);
            childSprite.runAction(cc.sequence(action1, action2));
        }

        // let hpNode = appearance.sprite.getChildByName("hp");
        // if (hpNode && hpNode.isVisible() === false) {
        //     hpNode.setVisible(true);
        //     _.delay(() => hpNode.setVisible(false), 1000);
        // }
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
        let shadowSprite = appearanceComponent.sprite.getChildByName("monster_shadow");
        if (childSprite) {
            let spine = new sp.SkeletonAnimation("textures/monster/fx/fx_boss_stone_monster.json", "textures/monster/fx/fx_boss_stone_monster.atlas");
            childSprite.addChild(spine, 1, UNDER_GROUND_TAG);
            spine.setPosition(cc.p(childSprite.width / 2, childSprite.height / 2));
            spine.setAnimation(0, "fx_back", false);

            // hide monster
            childSprite.setOpacity(0);
            shadowSprite.setOpacity(0);

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
        let shadowSprite = appearanceComponent.sprite.getChildByName("monster_shadow");
        if (childSprite) {
            childSprite.removeChildByTag(UNDER_GROUND_TAG);

            // show monster
            childSprite.setOpacity(255);
            shadowSprite.setOpacity(255);

        }
    }
}

BattleAnimation.addAnimationHealing = function (entity) {
    let appearanceComponent = entity.getComponent(AppearanceComponent);
    // FIXME: hardcode sprite name
    if (appearanceComponent && appearanceComponent.sprite) {
        let childNode = appearanceComponent.sprite;
        if (childNode) {
            let spine = new sp.SkeletonAnimation("textures/monster/fx/fx_boss_jungle_god.json", "textures/monster/fx/fx_boss_jungle_god.atlas");
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
                    animationSlowEffectExplosion(bulletEntity);
                    break;
                case GameConfig.ENTITY_ID.WIZARD_BULLET:
                    animationWizardBulletExplosion(bulletEntity);
                    break;
                default:
                    break;
            }
        }
    }
}

function animationSlowEffectExplosion(bulletEntity) {
    const ANIMATION_NAME = "hit_target_eff";
    let pos = bulletEntity.getComponent(PositionComponent);
    let spine = new sp.SkeletonAnimation("textures/tower/fx/tower_oil_fx.json", "textures/tower/fx/tower_oil_fx.atlas");
    spine.setPosition(cc.p(pos.x, pos.y));
    spine.setAnimation(0, ANIMATION_NAME, false);
    let mapNode = BattleManager.getInstance().getBattleLayer().getMapNode(bulletEntity.mode);
    mapNode.addChild(spine, 0);

    function animationStateEvent(obj, trackIndex, type, event, loopCount) {
        let entry = spine.getCurrent();
        let animationName = (entry && entry.animation) ? entry.animation.name : 0;
        if (animationName === ANIMATION_NAME) {
            mapNode.scheduleOnce(() => {
                mapNode.removeChild(spine);
            });
        }
    }

    spine.setCompleteListener(animationStateEvent);
}

function animationWizardBulletExplosion(bulletEntity) {
    const ANIMATION_NAME = "hit_target_eff";
    let pos = bulletEntity.getComponent(PositionComponent);
    let spine = new sp.SkeletonAnimation("textures/tower/fx/tower_wizard_fx.json", "textures/tower/fx/tower_wizard_fx.atlas");
    spine.setPosition(cc.p(pos.x, pos.y));
    spine.setAnimation(0, ANIMATION_NAME, false);
    let mapNode = BattleManager.getInstance().getBattleLayer().getMapNode(bulletEntity.mode);
    mapNode.addChild(spine, 0);

    function animationStateEvent(obj, trackIndex, type, event, loopCount) {
        let entry = spine.getCurrent();
        let animationName = (entry && entry.animation) ? entry.animation.name : 0;
        if (animationName === ANIMATION_NAME) {
            mapNode.scheduleOnce(() => {
                mapNode.removeChild(spine);
            });
        }
    }

    spine.setCompleteListener(animationStateEvent);
}

BattleAnimation.addBuffDamageAnimation = function (entity) {
    const BUFF_DAMAGE_NAME = "BUFF_DAMAGE_NAME";
    const BUFF_JSON = "textures/tower/fx/tower_strength_fx.json";
    const BUFF_ATLAS = "textures/tower/fx/tower_strength_fx.atlas";
    const ANIMATION_NAME = "attack_1";
    let appearanceComponent = entity.getComponent(AppearanceComponent);
    if (appearanceComponent && appearanceComponent.sprite) {
        let childNode = appearanceComponent.sprite;

        if (childNode.getChildByName(BUFF_DAMAGE_NAME)) {
            let spine = childNode.getChildByName(BUFF_DAMAGE_NAME);
            if (spine.myEndAnim === false) {
                spine.setVisible(true);
                spine.setAnimation(0, ANIMATION_NAME, false);
                spine.myEndAnim = true;
            }
        } else {
            let spine = new sp.SkeletonAnimation(BUFF_JSON, BUFF_ATLAS);
            spine.setScale(0.7);
            spine.setPosition(cc.p(0, 0));
            spine.setAnimation(0, ANIMATION_NAME, false);
            spine.setName(BUFF_DAMAGE_NAME);
            childNode.addChild(spine, 0);

            spine.myEndAnim = true;

            function animationStateEvent() {
                spine.myEndAnim = false;
                spine.setVisible(false);
            }

            spine.setCompleteListener(animationStateEvent);
        }
    }
}

BattleAnimation.addBuffSpeedAnimation = function (entity) {
    const BUFF_SPEED_NAME = "BUFF_SPEED_NAME";
    const BUFF_JSON = "textures/tower/fx/tower_speed_fx.json";
    const BUFF_ATLAS = "textures/tower/fx/tower_speed_fx.atlas";
    const ANIMATION_NAME = "attack_1";
    let appearanceComponent = entity.getComponent(AppearanceComponent);
    if (appearanceComponent && appearanceComponent.sprite) {
        let childNode = appearanceComponent.sprite;

        if (childNode.getChildByName(BUFF_SPEED_NAME)) {
            let spine = childNode.getChildByName(BUFF_SPEED_NAME);
            if (spine.myEndAnim === false) {
                spine.setVisible(true);
                spine.setAnimation(0, ANIMATION_NAME, false);
                spine.myEndAnim = true;
            }
        } else {
            let spine = new sp.SkeletonAnimation(BUFF_JSON, BUFF_ATLAS);
            spine.setScale(0.7);
            spine.setPosition(cc.p(0, 0));
            spine.setAnimation(0, ANIMATION_NAME, false);
            spine.setName(BUFF_SPEED_NAME);
            childNode.addChild(spine, 0);

            spine.myEndAnim = true;

            function animationStateEvent() {
                spine.myEndAnim = false;
                spine.setVisible(false);
            }

            spine.setCompleteListener(animationStateEvent);
        }
    }
}

const directionDegree = [0, 25, 50, 75, 90, 115, 140, 165, 180, 205, 230, 255, 270, 295, 320, 345];
const mapAnimationAngel = {
    270: "attack_1",
    295: "attack_2",
    320: "attack_3",
    345: "attack_4",
    0: "attack_5",
    25: "attack_6",
    50: "attack_7",
    75: "attack_8",
    90: "attack_9",
    115: {
        flipX: true,
        angel: 75,
    },
    140: {
        flipX: true,
        angel: 50,
    },
    165: {
        flipX: true,
        angel: 25,
    },
    180: {
        flipX: true,
        angel: 0,
    },
    205: {
        flipX: true,
        angel: 345,
    },
    230: {
        flipX: true,
        angel: 320,
    },
    255: {
        flipX: true,
        angel: 295,
    },
}
BattleAnimation.createCannonBullet = function (startPosition, targetPosition, bulletNode, bulletSpeed, mode) {
    let zOrder = 1;
    BattleManager.getInstance().getBattleLayer().getMapNode(mode).addChild(bulletNode, zOrder);
    bulletNode.setPosition(startPosition);

    let h = 60;
    let distance = Utils.euclidDistance(startPosition, targetPosition);
    let t = (Math.sqrt(Math.pow((distance / 2), 2) + Math.pow(h, 2))) * 2 / bulletSpeed;
    let jumpAction = cc.jumpTo(t ,cc.p(targetPosition.x, targetPosition.y), h, 1);

    let cleanFunc = cc.callFunc(function (sender) {
        sender.removeFromParent();
    })

    let spine = new sp.SkeletonAnimation("textures/tower/fx/tower_cannon_fx.json", "textures/tower/fx/tower_cannon_fx.atlas");
    spine.setPosition(startPosition);
    function animationStateEvent() {
        let mapNode = BattleManager.getInstance().getBattleLayer().getMapNode(mode);
        mapNode.scheduleOnce(() => {
            mapNode.removeChild(spine);
        });
    }
    spine.setCompleteListener(animationStateEvent);
    BattleManager.getInstance().getBattleLayer().getMapNode(mode).addChild(spine, 20);

    let deg = Utils.calcSlopeOfLine(cc.p(startPosition.x, startPosition.y), cc.p(targetPosition.x, targetPosition.y));
    let minValue = Math.abs(deg - directionDegree[0]), minIdx = 0;
    for (let i = 1; i < directionDegree.length; i++) {
        if (Math.abs(deg - directionDegree[i]) < minValue) {
            minIdx = i;
            minValue = Math.abs(deg - directionDegree[i]);
        }
    }
    let animationAngel = mapAnimationAngel[directionDegree[minIdx]];

    let attackAnimFunc = cc.callFunc(function (sender) {
        if (animationAngel.flipX) {
            spine.setScaleX(-1);
            spine.setAnimation(1, mapAnimationAngel[animationAngel.angel], false);
        } else {
            spine.setAnimation(1, animationAngel, false);
        }
    })

    bulletNode.runAction(cc.sequence(attackAnimFunc, jumpAction, cleanFunc));
}

BattleAnimation.createBearBullet = function (startPosition, targetPosition, bulletNode, bulletSpeed, mode) {
    bulletNode.setPosition(startPosition);
    let zOrder = 1;
    BattleManager.getInstance().getBattleLayer().getMapNode(mode).addChild(bulletNode, zOrder);

    let h = 70;
    let distance = Utils.euclidDistance(startPosition, targetPosition);
    let t = (Math.sqrt(Math.pow((distance / 2), 2) + Math.pow(h, 2))) * 2 / bulletSpeed;
    let jumpAction = cc.jumpTo(t ,cc.p(targetPosition.x, targetPosition.y), h, 1);

    let cleanFunc = cc.callFunc(function (sender) {
        sender.removeFromParent();
    })

    let spine = new sp.SkeletonAnimation("textures/tower/fx/tower_ice_fx.json", "textures/tower/fx/tower_ice_fx.atlas");
    spine.setPosition(startPosition);
    BattleManager.getInstance().getBattleLayer().getMapNode(mode).addChild(spine, 20);
    function animationStateEvent() {
        let mapNode = BattleManager.getInstance().getBattleLayer().getMapNode(mode);
        mapNode.scheduleOnce(() => {
            mapNode.removeChild(spine);
        });
    }
    spine.setCompleteListener(animationStateEvent);

    let deg = Utils.calcSlopeOfLine(cc.p(startPosition.x, startPosition.y), cc.p(targetPosition.x, targetPosition.y));
    let minValue = Math.abs(deg - directionDegree[0]), minIdx = 0;
    for (let i = 1; i < directionDegree.length; i++) {
        if (Math.abs(deg - directionDegree[i]) < minValue) {
            minIdx = i;
            minValue = Math.abs(deg - directionDegree[i]);
        }
    }

    let animationAngel = mapAnimationAngel[directionDegree[minIdx]];

    let attackAnimFunc = cc.callFunc(function (sender) {
        if (animationAngel.flipX) {
            spine.setScaleX(-1);
            spine.setAnimation(1, mapAnimationAngel[animationAngel.angel], false);
        } else {
            spine.setAnimation(1, animationAngel, false);
        }
    })

    bulletNode.runAction(cc.sequence(attackAnimFunc, jumpAction, cleanFunc));
}