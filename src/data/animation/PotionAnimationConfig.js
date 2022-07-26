let PotionAnimationConfig = {
    trap: {
        states: ["IDLE", "ATTACK"],
        initState: "IDLE",
        animation: {
            IDLE: {
                trap: {
                    prefix: "image",
                    suffix: ".png",
                    start: 0,
                    end: 0,
                    time: 1000,
                    repeat: true,
                }
            },
            ATTACK: {
                trap: {
                    prefix: "image",
                    suffix: ".png",
                    start: 1,
                    end: 10,
                    time: 1000,
                    repeat: true,
                }
            }
        }
    }
}