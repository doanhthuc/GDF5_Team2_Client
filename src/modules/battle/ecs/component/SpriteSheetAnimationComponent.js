let SpriteSheetAnimationComponent = Component.extend({
    name: "SpriteSheetAnimationComponent",
    typeID: GameConfig.COMPONENT_ID.SPRITE_SHEET,

    ctor: function (config) {
        this._super();
        this.currentState = config.initState;
        this.currentStateIsRendered = false;
        this.animationMap = {
            state: {
                spriteName1: {action: null, flipX: true},
                spriteName2: {action: null, flipX: true}
            }
        };
        this._constructAnimation(config);
    },

    reset: function () {

    },

    clone: function () {

    },

    changeCurrentState: function (newState) {
        this.currentState = newState;
        this.currentStateIsRendered = false;
    },

    _constructAnimation: function (config) {
        for (let state of config.states) {
            if (!config.animation[state]) continue;
            for (let spriteName of Object.keys(config.animation[state])) {
                let animFrames = [];
                let flipX = config.animation[state][spriteName].flipX;
                let start = config.animation[state][spriteName].start;
                let end = config.animation[state][spriteName].end;
                let prefix = config.animation[state][spriteName].prefix;
                let suffix = config.animation[state][spriteName].suffix;
                let time = config.animation[state][spriteName].time

                if (flipX) {
                    let flipState = config.animation[state][spriteName].flipState;
                    start = config.animation[flipState][spriteName].start;
                    end = config.animation[flipState][spriteName].end;
                    prefix = config.animation[flipState][spriteName].prefix;
                    suffix = config.animation[flipState][spriteName].suffix;
                    time = config.animation[flipState][spriteName].time
                }

                for (let i = start; i <= end; i++) {
                    let numberDigits = i.toString().length;
                    let fileName = prefix + ("0".repeat(4 - numberDigits) + i) + suffix;
                    cc.log(fileName);
                    let sprite = cc.spriteFrameCache.getSpriteFrame(fileName);
                    animFrames.push(sprite);
                }

                let animation = new cc.Animation(animFrames);
                // animation.setRestoreOriginalFrame(true);
                let delay = time || 1000;
                animation.setDelayPerUnit(delay / 1000 / animFrames.length);
                animation.retain();
                if (!this.animationMap[state]) {
                    this.animationMap[state] = {};
                }
                this.animationMap[state][spriteName] = {animation: animation, flipX: flipX};
            }
        }
    },

});
SpriteSheetAnimationComponent.typeID = GameConfig.COMPONENT_ID.SPRITE_SHEET;
ComponentManager.getInstance().registerClass(SpriteSheetAnimationComponent);
