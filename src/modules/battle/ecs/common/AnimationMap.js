let EntityState = {
    MONSTER_TURN_RIGHT: 0,
    MONSTER_TURN_UP: 1,
    MONSTER_TURN_LEFT: 2,
    MONSTER_TURN_BOTTOM: 3,
};

let AnimationMap = AnimationMap || {};

AnimationMap[EntityState.MONSTER_TURN_BOTTOM] = function (entity) {
    let appearanceComponent = entity.getComponent(GameConfig.COMPONENT_ID.APPEARANCE);
    if (appearanceComponent) {
        let sp = appearanceComponent.sprite;

        let animation = new cc.Animation();
        for (let i = 0; i <= 11; i++) {
            let fileName = "res/textures/monster/frame/swordsman/monster_swordsman_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
            animation.addSpriteFrameWithFile(fileName);
        }
        animation.setDelayPerUnit(1 / (11 - 0 + 1));
        animation.setRestoreOriginalFrame(true);
        let monsterAction = cc.animate(animation);
        sp.getChildByName("monster").stopAllActions();
        sp.getChildByName("monster").runAction(cc.repeatForever(monsterAction));
    }
}

AnimationMap[EntityState.MONSTER_TURN_RIGHT] = function (entity) {
    let appearanceComponent = entity.getComponent(GameConfig.COMPONENT_ID.APPEARANCE);
    if (appearanceComponent) {
        let sp = appearanceComponent.sprite;

        let animation = new cc.Animation();
        for (let i = 24; i <= 35; i++) {
            let fileName = "res/textures/monster/frame/swordsman/monster_swordsman_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
            animation.addSpriteFrameWithFile(fileName);
        }
        animation.setDelayPerUnit(1 / (35 - 24 + 1));
        animation.setRestoreOriginalFrame(true);
        let monsterAction = cc.animate(animation);
        sp.getChildByName("monster").stopAllActions();
        sp.getChildByName("monster").runAction(cc.repeatForever(monsterAction));
    }
}

AnimationMap[EntityState.MONSTER_TURN_LEFT] = function (entity) {
    let appearanceComponent = entity.getComponent(GameConfig.COMPONENT_ID.APPEARANCE);
    if (appearanceComponent) {
        let sp = appearanceComponent.sprite;

        let animation = new cc.Animation();
        for (let i = 24; i <= 35; i++) {
            let fileName = "res/textures/monster/frame/swordsman/monster_swordsman_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
            animation.addSpriteFrameWithFile(fileName);
        }
        animation.setDelayPerUnit(1 / (35 - 24 + 1));
        let monsterAction = cc.animate(animation);
        sp.getChildByName("monster").setFlippedX(true);
        sp.getChildByName("monster").stopAllActions();
        sp.getChildByName("monster").runAction(cc.repeatForever(monsterAction));
    }
}

AnimationMap[EntityState.MONSTER_TURN_UP] = function (entity) {
    let appearanceComponent = entity.getComponent(GameConfig.COMPONENT_ID.APPEARANCE);
    if (appearanceComponent) {
        let sp = appearanceComponent.sprite;

        let animation = new cc.Animation();
        for (let i = 48; i <= 59; i++) {
            let fileName = "res/textures/monster/frame/swordsman/monster_swordsman_run_00" + ((i < 10) ? ("0" + i) : i) + ".png";
            animation.addSpriteFrameWithFile(fileName);
        }
        animation.setDelayPerUnit(1 / (59 - 48 + 1));
        animation.setRestoreOriginalFrame(true);
        let monsterAction = cc.animate(animation);
        sp.getChildByName("monster").stopAllActions();
        sp.getChildByName("monster").runAction(cc.repeatForever(monsterAction));
    }
}

AnimationMap.changeMonsterDirectionAnimation = function (entity, currentPos, nextPos) {
    let deg = Utils.calcSlopeOfLine({x: currentPos.x, y: currentPos.y}, {x: nextPos.x, y: nextPos.y});
    // let directionDegree = [0, 45, 90, 135, 180, 225, 270, 315];
    let directionDegree = [0, 90, 180, 270];
    let minValue = Math.abs(deg-directionDegree[0]), minIdx = 0;
    for (let i = 1; i < directionDegree.length; i++) {
        if (Math.abs(deg - directionDegree[i]) < minValue) {
            minIdx = i;
            minValue = Math.abs(deg - directionDegree[i]);
        }
    }
    let state = null;
    switch (minIdx) {
        case 0:
            state = EntityState.MONSTER_TURN_RIGHT;
            break;
        case 1:
            state = EntityState.MONSTER_TURN_UP;
            break;
        case 2:
            state = EntityState.MONSTER_TURN_LEFT;
            break;
        case 3:
            state = EntityState.MONSTER_TURN_BOTTOM;
            break;
    }
    EventDispatcher.getInstance().dispatchEvent(EventType.CHANGE_STATE_ENTITY, {entity: entity, state: state});
}