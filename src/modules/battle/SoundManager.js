let SoundManager = cc.Class.extend({
    ctor: function () {
        this.tags = {
            THEME_BATTLE: 1,
            THEME_LOBBY: 2,
        }
    },

    playThemeBattle: function () {
        if (!GameConfig.SOUND) return;
        let res = "res/textures/sound/theme_battle.mp3";
        this.tags.THEME_BATTLE = cc.audioEngine.playEffect(res, true);
    },

    stopThemeBattle: function () {
        if (!GameConfig.SOUND) return;
        cc.audioEngine.stopEffect(this.tags.THEME_BATTLE);
    },

    playThemeLoby: function () {
        if (!GameConfig.SOUND) return;
        let res = "res/textures/sound/theme_lobby.mp3";
        this.tags.THEME_LOBBY = cc.audioEngine.playEffect(res, true);
    },

    stopThemeLobby: function () {
        if (!GameConfig.SOUND) return;
        cc.audioEngine.stopEffect(this.tags.THEME_LOBBY);
    },

    playAttack: function (towerType) {
        if (!GameConfig.SOUND) return;
        let res;
        switch (towerType) {
            case GameConfig.ENTITY_ID.CANNON_TOWER: {
                res  = "res/textures/sound/char_owl_cannon_fire.mp3";
                break;
            }
            case GameConfig.ENTITY_ID.WIZARD_TOWER: {
                res  = "res/textures/sound/char_crow_fireball_cast.mp3";
                break;
            }
            case GameConfig.ENTITY_ID.FROG_TOWER: {
                res  = "res/textures/sound/char_frog_saw.mp3";
                break;
            }
            case GameConfig.ENTITY_ID.BUNNY_TOWER: {
                res  = "res/textures/sound/char_snail_fire.mp3";
                break;
            }
            case GameConfig.ENTITY_ID.BEAR_TOWER: {
                res  = "res/textures/sound/char_polarbear_ice.mp3";
                break;
            }
            case GameConfig.ENTITY_ID.GOAT_TOWER: {
                res  = "res/textures/sound/char_goat_buff.mp3";
                break;
            }
            case GameConfig.ENTITY_ID.SNAKE_TOWER: {
                res  = "res/textures/sound/char_snake_buff_speed.mp3";
                break;
            }
        }

        if (res) {
            cc.audioEngine.playEffect(res);
        }
    },

    playSnailHit: function (type) {
        if (!GameConfig.SOUND) return;
        res  = "res/textures/sound/char_snail_hit.mp3";
        cc.audioEngine.playEffect(res);
    },

    playFireballExplosion: function () {
        if (!GameConfig.SOUND) return;
        res  = "res/textures/sound/magic_fireball.mp3";
        cc.audioEngine.playEffect(res);
    },

    playFrozenExplosion: function () {
        if (!GameConfig.SOUND) return;
        res  = "res/textures/sound/magic_frozen.mp3";
        cc.audioEngine.playEffect(res);
    },

    playMonsterDie: function (typeID) {
        if (!GameConfig.SOUND) return;
        let res;
        switch (typeID) {
            case GameConfig.ENTITY_ID.ASSASSIN: {
                res  = "res/textures/sound/monster_die_assassin.mp3";
                break;
            }
            case GameConfig.ENTITY_ID.BAT: {
                res  = "res/textures/sound/monster_die_bat.mp3";
                break;
            }
            case GameConfig.ENTITY_ID.GIANT: {
                res  = "res/textures/sound/monster_die_giant.mp3";
                break;
            }
            case GameConfig.ENTITY_ID.NINJA: {
                res  = "res/textures/sound/monster_die_ninja.mp3";
                break;
            }
            case GameConfig.ENTITY_ID.DEMON_TREE_MINION: {
                res  = "res/textures/sound/monster_die_boss_minion.mp3";
                break;
            }
            case GameConfig.ENTITY_ID.DARK_GIANT: {
                res  = "res/textures/sound/monster_die_giant.mp3";
                break;
            }
            case GameConfig.ENTITY_ID.SWORD_MAN: {
                res  = "res/textures/sound/monster_die_swordsman.mp3";
                break;
            }
            case GameConfig.ENTITY_ID.SATYR:
            case GameConfig.ENTITY_ID.DEMON_TREE: {
                res  = "res/textures/sound/monster_die_boss.mp3";
                break;
            }
        }

        if (res) {
            cc.audioEngine.playEffect(res);
        }
    },

    playTrap: function () {
        if (!GameConfig.SOUND) return;
        res  = "res/textures/sound/punchtrap_active.mp3";
        cc.audioEngine.playEffect(res);
    },

    playPutNewTower: function () {
        if (!GameConfig.SOUND) return;
        res  = "res/textures/sound/ingame_place_tower.mp3";
        cc.audioEngine.playEffect(res);
    },

    playUpgradeTower: function () {
        if (!GameConfig.SOUND) return;
        res  = "res/textures/sound/ingame_upgrade_tower.mp3";
        cc.audioEngine.playEffect(res);
    },

    playSelectCard: function () {
        if (!GameConfig.SOUND) return;
        res  = "res/textures/sound/ingame_select_card.mp3";
        cc.audioEngine.playEffect(res);
    },

    playNextWave: function () {
        if (!GameConfig.SOUND) return;
        res  = "res/textures/sound/ingame_next_wave.mp3";
        cc.audioEngine.playEffect(res);
    },

    playNextWaveCall: function () {
        if (!GameConfig.SOUND) return;
        res  = "res/textures/sound/ingame_next_wave_call.mp3";
        cc.audioEngine.playEffect(res);
    },

    playMagicMonsterHeal: function () {
        if (!GameConfig.SOUND) return;
        res  = "res/textures/sound/magic_monster_heal.mp3";
        cc.audioEngine.playEffect(res);
    },

    playMonsterBuffSpeed: function () {
        if (!GameConfig.SOUND) return;
        res  = "res/textures/sound/magic_buff_monsterspeed.mp3";
        cc.audioEngine.playEffect(res);
    },

    playMainTowerHit: function () {
        if (!GameConfig.SOUND) return;
        res  = "res/textures/sound/ingame_maintower_hit.mp3";
        cc.audioEngine.playEffect(res);
    }
});

let soundManager = new SoundManager();