let GameConfig = GameConfig || {};

// 0: disable, 1: enable
GameConfig.DEBUG = 0;
GameConfig.NETWORK = 1;
GameConfig.SOUND = 0;

let _playerInfo = {
    user1: "player",
    user2: "opponent",
}
GameConfig.swapPlayerInfo = function () {
    let tmp = _playerInfo.user1;
    _playerInfo.user1 = _playerInfo.user2;
    _playerInfo.user2 = tmp;
}
GameConfig.USER1 = function () {
    return _playerInfo.user1;
}
GameConfig.USER2 = function () {
    return  _playerInfo.user2;
}

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
    SKELETON: 17,
    UNDER_GROUND: 18,
    SPAWN_MINION: 19,
    HEALING_ABILITY: 20,
    SPRITE_SHEET: 21,
    TRAP_INFO: 22,
    TRAP_EFFECT: 23,
    TOWER_ABILITY: 24,
    BUFF_ATTACK_RANGE: 25,
    ACCELERATION: 26,
    FROG_BULLET_SKILL: 27,
    WIZARD_BULLET_SKILL: 28,
    DAMAGE_AMPLIFY_COMPONENT: 29,
    POISON:30,
    SNAKE_BURN_HP_AURA:31,
    GOAT_SLOW_EFFECT:32,
    GOAT_SLOW_AURA:33,
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
    MONSTER: 11,
    ABILITY: 12,
    COLLISION: 13,
    RESET_SYSTEM: 14,
    TOWER_SPECIAL_SKILL: 15,
}

GameConfig.ENTITY_ID = {
    CANNON_TOWER: 0,
    WIZARD_TOWER: 1,
    FROG_TOWER: 2,
    BUNNY_TOWER: 3,
    BEAR_TOWER: 4,
    GOAT_TOWER: 5,
    SNAKE_TOWER: 6,
    FIRE_SPELL: 7,
    FROZEN_SPELL: 8,
    TRAP_SPELL: 9,

    ASSASSIN: 11,
    BAT: 12,
    GIANT: 13,
    NINJA: 14,
    DEMON_TREE: 15,
    DEMON_TREE_MINION: 16,
    DARK_GIANT: 17,
    SATYR: 18,
    SWORD_MAN: 19,

    BULLET: 20,
    SLOW_BULLET: 21,
    WIZARD_BULLET: 22,
    TREE: 23,
    HOLE: 24,
}

GameConfig.GROUP_ID = {
    TOWER_ENTITY: [GameConfig.ENTITY_ID.CANNON_TOWER, GameConfig.ENTITY_ID.WIZARD_TOWER, GameConfig.ENTITY_ID.BUNNY_TOWER,
        GameConfig.ENTITY_ID.BEAR_TOWER, GameConfig.ENTITY_ID.FROG_TOWER, GameConfig.ENTITY_ID.SNAKE_TOWER,
        GameConfig.ENTITY_ID.GOAT_TOWER],
    MONSTER_ENTITY: [GameConfig.ENTITY_ID.SWORD_MAN, GameConfig.ENTITY_ID.ASSASSIN, GameConfig.ENTITY_ID.BAT, GameConfig.ENTITY_ID.GIANT, GameConfig.ENTITY_ID.NINJA,
        GameConfig.ENTITY_ID.DEMON_TREE, GameConfig.ENTITY_ID.DEMON_TREE_MINION, GameConfig.ENTITY_ID.DARK_GIANT, GameConfig.ENTITY_ID.SATYR],
    BULLET_ENTITY: [GameConfig.ENTITY_ID.BULLET, GameConfig.ENTITY_ID.SLOW_BULLET, GameConfig.ENTITY_ID.WIZARD_BULLET],
    OBSTACLE_ENTITY: [GameConfig.ENTITY_ID.TREE,GameConfig.ENTITY_ID.HOLE],

    EFFECT_COMPONENT: [GameConfig.COMPONENT_ID.DAMAGE_EFFECT, GameConfig.COMPONENT_ID.SLOW_EFFECT, GameConfig.COMPONENT_ID.FROZEN_EFFECT],
    INFO_COMPONENT: [GameConfig.COMPONENT_ID.TOWER_INFO, GameConfig.COMPONENT_ID.MONSTER_INFO, GameConfig.COMPONENT_ID.BULLET_INFO],
    SPELL_ENTITY: [GameConfig.ENTITY_ID.FIRE_SPELL, GameConfig.ENTITY_ID.FROZEN_SPELL]
}

GameConfig.TOWER_TARGET_STRATEGY = {
    MAX_HP: 1,
    MIN_HP: 2,
    MAX_DISTANCE: 3,
    MIN_DISTANCE: 4
}

GameConfig.FROG_BULLET = {
    HIT_FIRST_TIME: 1,
    HIT_SECOND_TIME: 2,
    HIT_BOTH_TIME: 3,
}
GameConfig.RANGE_SIZE = 687;
GameConfig.HOUSE_POSITION = {x: 6, y: 0};
GameConfig.MONSTER_BORN_POSITION = {x: 0, y: 4};
GameConfig.TILE_WIDTH = 77;
GameConfig.TILE_HEIGH = 77;
GameConfig.MAP_WIDTH = 7;
GameConfig.MAP_HEIGH = 5;
GameConfig.RIVER_MAP_HEIGH = 100;

GameConfig.DIRECTION = {
    RIGHT: 1,
    LEFT: -1,
    TOP: 3,
    BOTTOM: -3,
    RIGHT_TOP: 4,
    RIGHT_BOTTOM: -2,
    LEFT_TOP: 2,
    LEFT_BOTTOM: -4,
};

GameConfig.BATTLE_RESULT = {
    WIN: 0,
    LOSE: 1,
    DRAW: 2
}

GameConfig.MAP = {
    NONE: 0,
    ATTACK_SPEED: 1,
    ATTACK_RANGE: 2,
    ATTACK_DAMAGE: 3,
    TREE: 5,
    HOLE: 6,
    TOWER: 7
}

GameConfig.MONSTER = {
    CATEGORY: {
        NORMAL: "normal",
        BOSS: "boss",
    },
    CLASS: {
        LAND: "land",
        AIR: "aerial",
    }
}

GameConfig.ANIMATION_TYPE = {
    ANIMATION_START: 0,
    ANIMATION_END: 1,
    ANIMATION_COMPLETE: 2,
    ANIMATION_EVENT: 3
};

GameConfig.DELAY_BUILD_TOWER = 1;
GameConfig.TOWER_MAX_LEVEL = 3;
GameConfig.DELAY_SPELL = 0.3; // seconds