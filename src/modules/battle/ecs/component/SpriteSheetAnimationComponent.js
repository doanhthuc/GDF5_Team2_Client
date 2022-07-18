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

    _constructAnimation: function (config) {
        for (let state of config.states) {
            for (let spriteName of Object.keys(config.animation[state])) {
                let animFrames = [];
                let flipX = config.animation[state][spriteName].flipX;
                let start = config.animation[state][spriteName].start;
                let end = config.animation[state][spriteName].end;
                let prefix = config.animation[state][spriteName].prefix;
                let suffix = config.animation[state][spriteName].suffix;

                if (flipX) {
                    let flipState = config.animation[state][spriteName].flipState;
                    start = config.animation[flipState][spriteName].start;
                    end = config.animation[flipState][spriteName].end;
                    prefix = config.animation[flipState][spriteName].prefix;
                    suffix = config.animation[flipState][spriteName].suffix;
                }

                for (let i = start; i <= end; i++) {
                    let fileName = prefix + (i < 10 ? '0' + i : i) + suffix;
                    let sprite = cc.spriteFrameCache.getSpriteFrame(fileName);
                    animFrames.push(sprite);
                }

                let animation = new cc.Animation(animFrames);
                // animation.setRestoreOriginalFrame(true);
                animation.setDelayPerUnit(1 / animFrames.length);
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
