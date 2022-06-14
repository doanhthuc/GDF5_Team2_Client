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
    COLLISION: 9
}

GameConfig.SYSTEM_ID = {
    MOVEMENT: 1,
    PATH_MONSTER: 2,
    RENDER: 3,
    LIFE: 4,
    ATTACK: 5
}

GameConfig.ENTITY_ID = {
    SWORD_MAN: 1,
    CANNON_TOWER: 2,
    BULLET: 3
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