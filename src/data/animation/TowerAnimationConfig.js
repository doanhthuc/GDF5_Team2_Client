let TowerAnimationConfig = {
    cannon: {
        // state: ["IDLE_TOP, IDLE_BOTTOM, IDLE_LEFT, IDLE_RIGHT, IDLE_RIGHT_TOP, IDLE_RIGHT_BOTTOM, IDLE_LEFT_TOP, IDLE_LEFT_BOTTOM",
        // "ATTACK_TOP, ATTACK_BOTTOM, ATTACK_LEFT, ATTACK_RIGHT, ATTACK_RIGHT_TOP, ATTACK_RIGHT_BOTTOM, ATTACK_LEFT_TOP, ATTACK_LEFT_BOTTOM"],
        level: {
            A: {
                states: ["ATTACK_BOTTOM", "ATTACK_RIGHT", "ATTACK_TOP", "ATTACK_LEFT"],
                initState: "ATTACK_BOTTOM",
                attackAnimationTime: 594,
                shootAnimationTime: 33,
                animation: {
                    ATTACK_BOTTOM: {
                        tower: {
                            prefix: "tower_cannon_attack_0_00",
                            suffix: ".png",
                            start: 0,
                            end: 8,
                        },
                        weapon: {
                            prefix: "tower_cannon_attack_1_00",
                            suffix: ".png",
                            start: 0,
                            end: 8,
                        }
                    },
                    ATTACK_RIGHT: {
                        tower: {
                            prefix: "tower_cannon_attack_0_00",
                            suffix: ".png",
                            start: 36,
                            end: 44,
                        },
                        weapon: {
                            prefix: "tower_cannon_attack_1_00",
                            suffix: ".png",
                            start: 36,
                            end: 44,
                        }
                    },
                    ATTACK_TOP: {
                        tower: {
                            prefix: "tower_cannon_attack_0_00",
                            suffix: ".png",
                            start: 72,
                            end: 80,
                        },
                        weapon: {
                            prefix: "tower_cannon_attack_1_00",
                            suffix: ".png",
                            start: 72,
                            end: 80,
                        }
                    },
                    ATTACK_LEFT: {
                        tower: {
                            flipX: true,
                            flipState: "ATTACK_RIGHT"
                        },
                        weapon: {
                            flipX: true,
                            flipState: "ATTACK_RIGHT"
                        }
                    }
                }
            }
        }
    }
}
