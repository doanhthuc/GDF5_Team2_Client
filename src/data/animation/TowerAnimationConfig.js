let TowerAnimationConfig = {
    cannon: {
        // state: ["IDLE_TOP, IDLE_BOTTOM, IDLE_LEFT, IDLE_RIGHT, IDLE_RIGHT_TOP, IDLE_RIGHT_BOTTOM, IDLE_LEFT_TOP, IDLE_LEFT_BOTTOM",
        // "ATTACK_TOP, ATTACK_BOTTOM, ATTACK_LEFT, ATTACK_RIGHT, ATTACK_RIGHT_TOP, ATTACK_RIGHT_BOTTOM, ATTACK_LEFT_TOP, ATTACK_LEFT_BOTTOM"],
        level: {
            A: {
                // "ATTACK_270", "ATTACK_0", "ATTACK_90", "ATTACK_180",
                states: ["IDLE_0", "IDLE_25", "IDLE_50", "IDLE_75", "IDLE_90", "IDLE_115", "IDLE_140", "IDLE_165", "IDLE_180", "IDLE_205", "IDLE_230", "IDLE_255", "IDLE_270", "IDLE_295", "IDLE_320", "IDLE_345"],
                initState: "IDLE_0",
                attackAnimationTime: 594,
                shootAnimationTime: 33,
                animation: {
                    IDLE_0: {
                        tower: {
                            prefix: "tower_cannon_idle_0_",
                            suffix: ".png",
                            start: 60,
                            end: 74,
                            time: 1000,
                        },
                        weapon: {
                            prefix: "tower_cannon_idle_1_",
                            suffix: ".png",
                            start: 60,
                            end: 74,
                            time: 1000,
                        }
                    },
                    IDLE_25: {
                        tower: {
                            prefix: "tower_cannon_idle_0_",
                            suffix: ".png",
                            start: 75,
                            end: 89,
                            time: 1000,
                        },
                        weapon: {
                            prefix: "tower_cannon_idle_1_",
                            suffix: ".png",
                            start: 75,
                            end: 89,
                            time: 1000,
                        }
                    },
                    IDLE_50: {
                        tower: {
                            prefix: "tower_cannon_idle_0_",
                            suffix: ".png",
                            start: 90,
                            end: 104,
                            time: 1000,
                        },
                        weapon: {
                            prefix: "tower_cannon_idle_1_",
                            suffix: ".png",
                            start: 90,
                            end: 104,
                            time: 1000,
                        }
                    },
                    IDLE_75: {
                        tower: {
                            prefix: "tower_cannon_idle_0_",
                            suffix: ".png",
                            start: 91,
                            end: 119,
                            time: 1000,
                        },
                        weapon: {
                            prefix: "tower_cannon_idle_1_",
                            suffix: ".png",
                            start: 91,
                            end: 119,
                            time: 1000,
                        }
                    },
                    IDLE_90: {
                        tower: {
                            prefix: "tower_cannon_idle_0_",
                            suffix: ".png",
                            start: 120,
                            end: 134,
                            time: 1000,
                        },
                        weapon: {
                            prefix: "tower_cannon_idle_1_",
                            suffix: ".png",
                            start: 120,
                            end: 134,
                            time: 1000,
                        }
                    },
                    IDLE_115: {
                        tower: {
                            flipX: true,
                            flipState: "IDLE_75"
                        },
                        weapon: {
                            flipX: true,
                            flipState: "IDLE_75"
                        }
                    },
                    IDLE_140: {
                        tower: {
                            flipX: true,
                            flipState: "IDLE_50"
                        },
                        weapon: {
                            flipX: true,
                            flipState: "IDLE_50"
                        }
                    },
                    IDLE_165: {
                        tower: {
                            flipX: true,
                            flipState: "IDLE_25"
                        },
                        weapon: {
                            flipX: true,
                            flipState: "IDLE_25"
                        }
                    },
                    IDLE_180: {
                        tower: {
                            flipX: true,
                            flipState: "IDLE_0"
                        },
                        weapon: {
                            flipX: true,
                            flipState: "IDLE_0"
                        }
                    },
                    IDLE_205: {
                        tower: {
                            flipX: true,
                            flipState: "IDLE_345"
                        },
                        weapon: {
                            flipX: true,
                            flipState: "IDLE_345"
                        }
                    },
                    IDLE_230: {
                        tower: {
                            flipX: true,
                            flipState: "IDLE_320"
                        },
                        weapon: {
                            flipX: true,
                            flipState: "IDLE_320"
                        }
                    },
                    IDLE_255: {
                        tower: {
                            flipX: true,
                            flipState: "IDLE_295"
                        },
                        weapon: {
                            flipX: true,
                            flipState: "IDLE_295"
                        }
                    },
                    IDLE_270: {
                        tower: {
                            prefix: "tower_cannon_idle_0_",
                            suffix: ".png",
                            start: 0,
                            end: 14,
                            time: 1000,
                        },
                        weapon: {
                            prefix: "tower_cannon_idle_1_",
                            suffix: ".png",
                            start: 0,
                            end: 14,
                            time: 1000,
                        }
                    },
                    IDLE_295: {
                        tower: {
                            prefix: "tower_cannon_idle_0_",
                            suffix: ".png",
                            start: 15,
                            end: 29,
                            time: 1000,
                        },
                        weapon: {
                            prefix: "tower_cannon_idle_1_",
                            suffix: ".png",
                            start: 15,
                            end: 29,
                            time: 1000,
                        }
                    },
                    IDLE_320: {
                        tower: {
                            prefix: "tower_cannon_idle_0_",
                            suffix: ".png",
                            start: 30,
                            end: 44,
                            time: 1000,
                        },
                        weapon: {
                            prefix: "tower_cannon_idle_1_",
                            suffix: ".png",
                            start: 30,
                            end: 44,
                            time: 1000,
                        }
                    },
                    IDLE_345: {
                        tower: {
                            prefix: "tower_cannon_idle_0_",
                            suffix: ".png",
                            start: 45,
                            end: 59,
                            time: 1000,
                        },
                        weapon: {
                            prefix: "tower_cannon_idle_1_",
                            suffix: ".png",
                            start: 45,
                            end: 59,
                            time: 1000,
                        }
                    },

                    ATTACK_0: {
                        tower: {
                            prefix: "tower_cannon_attack_0_",
                            suffix: ".png",
                            start: 60,
                            end: 74,
                            time: 596,
                        },
                        weapon: {
                            prefix: "tower_cannon_attack_1_",
                            suffix: ".png",
                            start: 60,
                            end: 74,
                            time: 596,
                        },
                        sequence: ["IDLE_0"]
                    },
                    ATTACK_25: {
                        tower: {
                            prefix: "tower_cannon_attack_0_",
                            suffix: ".png",
                            start: 75,
                            end: 89,
                            time: 596,
                        },
                        weapon: {
                            prefix: "tower_cannon_attack_1_",
                            suffix: ".png",
                            start: 75,
                            end: 89,
                            time: 596,
                        },
                        sequence: ["IDLE_25"]
                    },
                    ATTACK_50: {
                        tower: {
                            prefix: "tower_cannon_attack_0_",
                            suffix: ".png",
                            start: 90,
                            end: 104,
                            time: 596,
                        },
                        weapon: {
                            prefix: "tower_cannon_attack_1_",
                            suffix: ".png",
                            start: 90,
                            end: 104,
                            time: 596,
                        },
                        sequence: ["IDLE_50"]
                    },
                    ATTACK_75: {
                        tower: {
                            prefix: "tower_cannon_attack_0_",
                            suffix: ".png",
                            start: 91,
                            end: 119,
                            time: 596,
                        },
                        weapon: {
                            prefix: "tower_cannon_attack_1_",
                            suffix: ".png",
                            start: 91,
                            end: 119,
                            time: 596,
                        },
                        sequence: ["IDLE_75"]
                    },
                    ATTACK_90: {
                        tower: {
                            prefix: "tower_cannon_attack_0_",
                            suffix: ".png",
                            start: 120,
                            end: 134,
                            time: 596,
                        },
                        weapon: {
                            prefix: "tower_cannon_attack_1_",
                            suffix: ".png",
                            start: 120,
                            end: 134,
                            time: 596,
                        },
                        sequence: ["IDLE_90"]
                    },
                    ATTACK_115: {
                        tower: {
                            flipX: true,
                            flipState: "ATTACK_75"
                        },
                        weapon: {
                            flipX: true,
                            flipState: "ATTACK_75"
                        },
                        sequence: ["IDLE_115"]
                    },
                    ATTACK_140: {
                        tower: {
                            flipX: true,
                            flipState: "ATTACK_50"
                        },
                        weapon: {
                            flipX: true,
                            flipState: "ATTACK_50"
                        },
                        sequence: ["IDLE_140"]
                    },
                    ATTACK_165: {
                        tower: {
                            flipX: true,
                            flipState: "ATTACK_25"
                        },
                        weapon: {
                            flipX: true,
                            flipState: "ATTACK_25"
                        },
                        sequence: ["IDLE_165"]
                    },
                    ATTACK_180: {
                        tower: {
                            flipX: true,
                            flipState: "ATTACK_0"
                        },
                        weapon: {
                            flipX: true,
                            flipState: "ATTACK_0"
                        }
                        ,
                        sequence: ["IDLE_180"]
                    },
                    ATTACK_205: {
                        tower: {
                            flipX: true,
                            flipState: "ATTACK_345"
                        },
                        weapon: {
                            flipX: true,
                            flipState: "ATTACK_345"
                        },
                        sequence: ["IDLE_205"]
                    },
                    ATTACK_230: {
                        tower: {
                            flipX: true,
                            flipState: "ATTACK_320"
                        },
                        weapon: {
                            flipX: true,
                            flipState: "ATTACK_320"
                        },
                        sequence: ["IDLE_230"]
                    },
                    ATTACK_255: {
                        tower: {
                            flipX: true,
                            flipState: "ATTACK_295"
                        },
                        weapon: {
                            flipX: true,
                            flipState: "ATTACK_295"
                        },
                        sequence: ["IDLE_295"]
                    },
                    ATTACK_270: {
                        tower: {
                            prefix: "tower_cannon_attack_0_",
                            suffix: ".png",
                            start: 0,
                            end: 14,
                            time: 596,
                        },
                        weapon: {
                            prefix: "tower_cannon_attack_1_",
                            suffix: ".png",
                            start: 0,
                            end: 14,
                            time: 596,
                        },
                        sequence: ["IDLE_270"]
                    },
                    ATTACK_295: {
                        tower: {
                            prefix: "tower_cannon_attack_0_",
                            suffix: ".png",
                            start: 15,
                            end: 29,
                            time: 596,
                        },
                        weapon: {
                            prefix: "tower_cannon_attack_1_",
                            suffix: ".png",
                            start: 15,
                            end: 29,
                            time: 596,
                        },
                        sequence: ["IDLE_295"]
                    },
                    ATTACK_320: {
                        tower: {
                            prefix: "tower_cannon_attack_0_",
                            suffix: ".png",
                            start: 30,
                            end: 44,
                            time: 596,
                        },
                        weapon: {
                            prefix: "tower_cannon_attack_1_",
                            suffix: ".png",
                            start: 30,
                            end: 44,
                            time: 596,
                        },
                        sequence: ["IDLE_320"]
                    },
                    ATTACK_345: {
                        tower: {
                            prefix: "tower_cannon_attack_0_",
                            suffix: ".png",
                            start: 45,
                            end: 59,
                            time: 596,
                        },
                        weapon: {
                            prefix: "tower_cannon_attack_1_",
                            suffix: ".png",
                            start: 45,
                            end: 59,
                            time: 596,
                        },
                        sequence: ["IDLE_345"]
                    },
                }
            }
        }
    }
}
