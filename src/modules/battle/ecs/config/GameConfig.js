let GameConfig = GameConfig || {};

GameConfig.gameLayer = GameConfig.gameLayer || null;

GameConfig.COMPONENT_ID = {
    MONSTER_INFO: 1,
    TOWER_INFO: 2,
    BULLET_INFO: 3,
    LIFE: 4,
    POSITION: 5,
    VELOCITY: 6,
    APPEARANCE: 7,
    PATH: 8,
    COLLISION: 9,
    DAMAGE_EFFECT: 10,
    SLOW_EFFECT: 11,
    FROZEN_EFFECT: 12,
    ATTACK: 13,
    BUFF_ATTACK_SPEED: 14,
    BUFF_ATTACK_DAMAGE: 15,
}

GameConfig.SYSTEM_ID = {
    MOVEMENT: 1,
    PATH_MONSTER: 2,
    RENDER: 3,
    LIFE: 4,
    ATTACK: 5,
    EFFECT: 6
}

GameConfig.ENTITY_ID = {
    SWORD_MAN: 1,
    CANNON_TOWER: 2,
    BULLET: 3,
    BEAR_TOWER: 4,
    FROG_TOWER: 5,
}

GameConfig.GROUP_ID = {
    TOWER_ENTITY: [GameConfig.ENTITY_ID.CANNON_TOWER, GameConfig.ENTITY_ID.BEAR_TOWER, GameConfig.ENTITY_ID.FROG_TOWER],
    MONSTER_ENTITY: [GameConfig.ENTITY_ID.SWORD_MAN],
    BULLET_ENTITY: [GameConfig.ENTITY_ID.BULLET],
    EFFECT_COMPONENT: [GameConfig.COMPONENT_ID.DAMAGE_EFFECT, GameConfig.COMPONENT_ID.SLOW_EFFECT, GameConfig.COMPONENT_ID.FROZEN_EFFECT],
    INFO_COMPONENT: [GameConfig.COMPONENT_ID.TOWER_INFO, GameConfig.COMPONENT_ID.MONSTER_INFO, GameConfig.COMPONENT_ID.BULLET_INFO],
}

GameConfig.TOWER_TARGET_STRATEGY = {
    MAX_HP: 1,
    MIN_HP: 2,
    MAX_DISTANCE: 3,
    MIN_DISTANCE: 4
}

GameConfig.TILE_WIDTH = 77;
GameConfig.TILE_HEIGH = 77;
GameConfig.MAP_WIDTH = 7;
GameConfig.MAP_HEIGH = 5;
GameConfig.SCREEN_WIDTH = 640;
GameConfig.SCREEN_HEIGH = 1136;

GameConfig.DIRECTION = {
    BOTTOM: 2,
    TOP: -2,
    RIGHT: 1,
    LEFT: -1,
    RIGHT_TOP: -3,
    RIGHT_BOTTOM: 3,
};