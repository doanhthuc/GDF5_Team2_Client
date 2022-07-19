let MonsterAnimationConfig = {
    sword_man: {
        states: ["MOVE_LEFT", "MOVE_RIGHT", "MOVE_DOWN", "MOVE_UP", "MOVE_LEFT_DOWN", "MOVE_RIGHT_DOWN", "MOVE_LEFT_UP", "MOVE_RIGHT_UP"],
        initState: "MOVE_RIGHT",
        animation: {
            MOVE_LEFT: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT",
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_DOWN: {
                monster: {
                    prefix: "monster_swordsman_run_",
                    suffix: ".png",
                    start: 0,
                    end: 11,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT: {
                monster: {
                    prefix: "monster_swordsman_run_",
                    suffix: ".png",
                    start: 24,
                    end: 35,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_UP: {
                monster: {
                    prefix: "monster_swordsman_run_",
                    suffix: ".png",
                    start: 48,
                    end: 59,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT_DOWN: {
                monster: {
                    prefix: "monster_swordsman_run_",
                    suffix: ".png",
                    start: 12,
                    end: 23,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT_UP: {
                monster: {
                    prefix: "monster_swordsman_run_",
                    suffix: ".png",
                    start: 36,
                    end: 47,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_LEFT_DOWN: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT_DOWN",
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_LEFT_UP: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT_UP",
                    repeat: true,
                    time: 1000,
                }
            }
        }
    },
    assasin: {
        states: ["MOVE_LEFT", "MOVE_RIGHT", "MOVE_DOWN", "MOVE_UP", "MOVE_LEFT_DOWN", "MOVE_RIGHT_DOWN", "MOVE_LEFT_UP", "MOVE_RIGHT_UP"],
        initState: "MOVE_RIGHT",
        animation: {
            MOVE_LEFT: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT",
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_DOWN: {
                monster: {
                    prefix: "monster_assassin_run_",
                    suffix: ".png",
                    start: 0,
                    end: 9,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT: {
                monster: {
                    prefix: "monster_assassin_run_",
                    suffix: ".png",
                    start: 20,
                    end: 29,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_UP: {
                monster: {
                    prefix: "monster_assassin_run_",
                    suffix: ".png",
                    start: 40,
                    end: 49,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT_DOWN: {
                monster: {
                    prefix: "monster_assassin_run_",
                    suffix: ".png",
                    start: 10,
                    end: 19,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT_UP: {
                monster: {
                    prefix: "monster_assassin_run_",
                    suffix: ".png",
                    start: 30,
                    end: 39,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_LEFT_DOWN: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT_DOWN",
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_LEFT_UP: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT_UP",
                    repeat: true,
                    time: 1000,
                }
            }
        }
    },
    giant: {
        states: ["MOVE_LEFT", "MOVE_RIGHT", "MOVE_DOWN", "MOVE_UP", "MOVE_LEFT_DOWN", "MOVE_RIGHT_DOWN", "MOVE_LEFT_UP", "MOVE_RIGHT_UP"],
        initState: "MOVE_RIGHT",
        animation: {
            MOVE_LEFT: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT",
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_DOWN: {
                monster: {
                    prefix: "monster_giant_run_",
                    suffix: ".png",
                    start: 0,
                    end: 15,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT: {
                monster: {
                    prefix: "monster_giant_run_",
                    suffix: ".png",
                    start: 32,
                    end: 47,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_UP: {
                monster: {
                    prefix: "monster_giant_run_",
                    suffix: ".png",
                    start: 64,
                    end: 79,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT_DOWN: {
                monster: {
                    prefix: "monster_giant_run_",
                    suffix: ".png",
                    start: 16,
                    end: 31,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT_UP: {
                monster: {
                    prefix: "monster_giant_run_",
                    suffix: ".png",
                    start: 48,
                    end: 63,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_LEFT_DOWN: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT_DOWN",
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_LEFT_UP: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT_UP",
                    repeat: true,
                    time: 1000,
                }
            }
        }
    },
    ninja: {
        states: ["MOVE_LEFT", "MOVE_RIGHT", "MOVE_DOWN", "MOVE_UP", "MOVE_LEFT_DOWN", "MOVE_RIGHT_DOWN", "MOVE_LEFT_UP", "MOVE_RIGHT_UP"],
        initState: "MOVE_RIGHT",
        animation: {
            MOVE_LEFT: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT",
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_DOWN: {
                monster: {
                    prefix: "monster_ninja_run_",
                    suffix: ".png",
                    start: 0,
                    end: 9,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT: {
                monster: {
                    prefix: "monster_ninja_run_",
                    suffix: ".png",
                    start: 20,
                    end: 29,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_UP: {
                monster: {
                    prefix: "monster_ninja_run_",
                    suffix: ".png",
                    start: 40,
                    end: 49,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT_DOWN: {
                monster: {
                    prefix: "monster_ninja_run_",
                    suffix: ".png",
                    start: 10,
                    end: 19,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT_UP: {
                monster: {
                    prefix: "monster_ninja_run_",
                    suffix: ".png",
                    start: 30,
                    end: 39,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_LEFT_DOWN: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT_DOWN",
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_LEFT_UP: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT_UP",
                    repeat: true,
                    time: 1000,
                }
            }
        }
    },
    bat: {
        states: ["MOVE_LEFT", "MOVE_RIGHT", "MOVE_DOWN", "MOVE_UP", "MOVE_LEFT_DOWN", "MOVE_RIGHT_DOWN", "MOVE_LEFT_UP", "MOVE_RIGHT_UP"],
        initState: "MOVE_RIGHT",
        animation: {
            MOVE_LEFT: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT",
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_DOWN: {
                monster: {
                    prefix: "monster_bat_run_",
                    suffix: ".png",
                    start: 0,
                    end: 7,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT: {
                monster: {
                    prefix: "monster_bat_run_",
                    suffix: ".png",
                    start: 16,
                    end: 23,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_UP: {
                monster: {
                    prefix: "monster_bat_run_",
                    suffix: ".png",
                    start: 32,
                    end: 39,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT_DOWN: {
                monster: {
                    prefix: "monster_bat_run_",
                    suffix: ".png",
                    start: 8,
                    end: 15,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT_UP: {
                monster: {
                    prefix: "monster_bat_run_",
                    suffix: ".png",
                    start: 24,
                    end: 31,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_LEFT_DOWN: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT_DOWN",
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_LEFT_UP: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT_UP",
                    repeat: true,
                    time: 1000,
                }
            }
        }
    },
    demon_tree: {
        states: ["MOVE_LEFT", "MOVE_RIGHT", "MOVE_DOWN", "MOVE_UP", "MOVE_LEFT_DOWN", "MOVE_RIGHT_DOWN", "MOVE_LEFT_UP", "MOVE_RIGHT_UP"],
        initState: "MOVE_RIGHT",
        animation: {
            MOVE_LEFT: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT",
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_DOWN: {
                monster: {
                    prefix: "monster_demon_tree_run_",
                    suffix: ".png",
                    start: 0,
                    end: 10,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT: {
                monster: {
                    prefix: "monster_demon_tree_run_",
                    suffix: ".png",
                    start: 22,
                    end: 32,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_UP: {
                monster: {
                    prefix: "monster_demon_tree_run_",
                    suffix: ".png",
                    start: 44,
                    end: 54,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT_DOWN: {
                monster: {
                    prefix: "monster_demon_tree_run_",
                    suffix: ".png",
                    start: 11,
                    end: 21,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT_UP: {
                monster: {
                    prefix: "monster_demon_tree_run_",
                    suffix: ".png",
                    start: 33,
                    end: 43,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_LEFT_DOWN: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT_DOWN",
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_LEFT_UP: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT_UP",
                    repeat: true,
                    time: 1000,
                }
            }
        }
    },
    demon_tree_minion: {
        states: ["MOVE_LEFT", "MOVE_RIGHT", "MOVE_DOWN", "MOVE_UP", "MOVE_LEFT_DOWN", "MOVE_RIGHT_DOWN", "MOVE_LEFT_UP", "MOVE_RIGHT_UP"],
        initState: "MOVE_RIGHT",
        animation: {
            MOVE_LEFT: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT",
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_DOWN: {
                monster: {
                    prefix: "monster_demon_tree_minion_run_",
                    suffix: ".png",
                    start: 0,
                    end: 11,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT: {
                monster: {
                    prefix: "monster_demon_tree_minion_run_",
                    suffix: ".png",
                    start: 24,
                    end: 35,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_UP: {
                monster: {
                    prefix: "monster_demon_tree_minion_run_",
                    suffix: ".png",
                    start: 48,
                    end: 59,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT_DOWN: {
                monster: {
                    prefix: "monster_demon_tree_minion_run_",
                    suffix: ".png",
                    start: 12,
                    end: 23,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT_UP: {
                monster: {
                    prefix: "monster_demon_tree_minion_run_",
                    suffix: ".png",
                    start: 36,
                    end: 47,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_LEFT_DOWN: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT_DOWN",
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_LEFT_UP: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT_UP",
                    repeat: true,
                    time: 1000,
                }
            }
        }
    },
    dark_giant: {
        states: ["MOVE_LEFT", "MOVE_RIGHT", "MOVE_DOWN", "MOVE_UP", "MOVE_LEFT_DOWN", "MOVE_RIGHT_DOWN", "MOVE_LEFT_UP", "MOVE_RIGHT_UP"],
        initState: "MOVE_RIGHT",
        animation: {
            MOVE_LEFT: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT",
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_DOWN: {
                monster: {
                    prefix: "monster_dark_giant_run_",
                    suffix: ".png",
                    start: 0,
                    end: 13,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT: {
                monster: {
                    prefix: "monster_dark_giant_run_",
                    suffix: ".png",
                    start: 28,
                    end: 41,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_UP: {
                monster: {
                    prefix: "monster_dark_giant_run_",
                    suffix: ".png",
                    start: 56,
                    end: 69,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT_DOWN: {
                monster: {
                    prefix: "monster_dark_giant_run_",
                    suffix: ".png",
                    start: 14,
                    end: 27,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT_UP: {
                monster: {
                    prefix: "monster_dark_giant_run_",
                    suffix: ".png",
                    start: 42,
                    end: 55,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_LEFT_DOWN: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT_DOWN",
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_LEFT_UP: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT_UP",
                    repeat: true,
                    time: 1000,
                }
            }
        }
    },
    satyr: {
        states: ["MOVE_LEFT", "MOVE_RIGHT", "MOVE_DOWN", "MOVE_UP", "MOVE_LEFT_DOWN", "MOVE_RIGHT_DOWN", "MOVE_LEFT_UP", "MOVE_RIGHT_UP"],
        initState: "MOVE_RIGHT",
        animation: {
            MOVE_LEFT: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT",
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_DOWN: {
                monster: {
                    prefix: "monster_satyr_run_",
                    suffix: ".png",
                    start: 0,
                    end: 12,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT: {
                monster: {
                    prefix: "monster_satyr_run_",
                    suffix: ".png",
                    start: 26,
                    end: 38,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_UP: {
                monster: {
                    prefix: "monster_satyr_run_",
                    suffix: ".png",
                    start: 52,
                    end: 64,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT_DOWN: {
                monster: {
                    prefix: "monster_satyr_run_",
                    suffix: ".png",
                    start: 13,
                    end: 25,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_RIGHT_UP: {
                monster: {
                    prefix: "monster_satyr_run_",
                    suffix: ".png",
                    start: 39,
                    end: 51,
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_LEFT_DOWN: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT_DOWN",
                    repeat: true,
                    time: 1000,
                }
            },
            MOVE_LEFT_UP: {
                monster: {
                    flipX: true,
                    flipState: "MOVE_RIGHT_UP",
                    repeat: true,
                    time: 1000,
                }
            }
        }
    },
}
