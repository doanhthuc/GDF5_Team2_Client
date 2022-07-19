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
    }
}
