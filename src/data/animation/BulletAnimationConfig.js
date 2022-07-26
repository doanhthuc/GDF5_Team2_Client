let BulletAnimationConfig = {
    boomerang: {
        level: {
            A: {
                states: ["SPINNING"],
                initState: "SPINNING",
                attackAnimationTime: 594,
                shootAnimationTime: 33,
                animation: {
                    SPINNING: {
                        weapon: {
                            prefix: "tower_boomerang_bullet_1_",
                            suffix: ".png",
                            start: 0,
                            end: 9,
                            time: 300,
                            repeat: true,
                        }
                    },
                }
            }
        }
    },
    oil: {
        level: {
            A: {
                states: ["FLYING"],
                initState: "FLYING",
                attackAnimationTime: 594,
                shootAnimationTime: 33,
                animation: {
                    FLYING: {
                        bullet: {
                            prefix: "tower_oil_gun_bullet_",
                            suffix: ".png",
                            start: 0,
                            end: 6,
                            time: 1000,
                            repeat: true,
                        }
                    },
                }
            }
        }
    }
}