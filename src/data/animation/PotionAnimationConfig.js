let PotionAnimationConfig = {
    trap: {
        states: ["IDLE", "ATTACK"],
        initState: "ATTACK",
        animation: {
            IDLE: {
                trap: {
                    prefix: "image00",
                    suffix: ".png",
                    start: 0,
                    end: 0,
                }
            },
            ATTACK: {
                trap: {
                    prefix: "image00",
                    suffix: ".png",
                    start: 1,
                    end: 10,
                }
            }
        }
    }
}