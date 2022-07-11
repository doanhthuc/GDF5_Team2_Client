let GameConfig = GameConfig || {};

GameConfig.gameLayer = GameConfig.gameLayer || null;

GameConfig.PLAYER = "player";
GameConfig.OPPONENT = "opponent";

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
    SPELL: 16,
    SKELETON: 17
}

GameConfig.SYSTEM_ID = {
    MOVEMENT: 1,
    PATH_MONSTER: 2,
    RENDER: 3,
    LIFE: 4,
    ATTACK: 5,
    EFFECT: 6,
    SPRITE_SHEET: 7,
    SPELL: 8,
    SKELETON: 9,
    BULLET: 10,
    MONSTER: 11
}

GameConfig.ENTITY_ID = {
    SWORD_MAN: 1,
    CANNON_TOWER: 2,
    BULLET: 3,
    BEAR_TOWER: 4,
    FROG_TOWER: 5,
    FIRE_SPELL: 6,
    FROZEN_SPELL: 7,
    TRAP_SPELL: 8,
    SNAKE_TOWER: 9,
    GOAT_TOWER: 10,
    ASSASSIN:11,
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

GameConfig.HOUSE_POSITION = {x: 6, y: 0};
GameConfig.TILE_WIDTH = 77;
GameConfig.TILE_HEIGH = 77;
GameConfig.MAP_WIDTH = 7;
GameConfig.MAP_HEIGH = 5;
GameConfig.RIVER_MAP_HEIGH = 100;

GameConfig.DIRECTION = {
    BOTTOM: 2,
    TOP: -2,
    RIGHT: 1,
    LEFT: -1,
    RIGHT_TOP: -3,
    RIGHT_BOTTOM: 3,
};

GameConfig.BATTLE_RESULT = {
    WIN: 0,
    LOSE: 1,
    DRAW: 2
}