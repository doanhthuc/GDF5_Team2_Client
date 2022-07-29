let SpriteSheetAnimationComponent = Component.extend({
    name: "SpriteSheetAnimationComponent",
    typeID: GameConfig.COMPONENT_ID.SPRITE_SHEET,

    ctor: function (config) {
        this._super();
        this.reset(config);
    },

    reset: function (config) {
        this.currentState = config.initState;
        this.currentStateIsRendered = false;
        this.animationMap = {
            state: {
                spriteName1: {animation: null, flipX: true},
                spriteName2: {animation: null, flipX: true}
            }
        };
        this._constructAnimation(config);
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
                if (spriteName === "sequence") continue;

                if (!this.animationMap[state]) {
                    this.animationMap[state] = {};
                }

                this.animationMap[state][spriteName] = this._buildConfig(config, state, spriteName);
            }
        }
    },

    _buildConfig: function (config, state, spriteName) {
        let animFrames = [];
        let flipX = config.animation[state][spriteName].flipX;
        let start = config.animation[state][spriteName].start;
        let end = config.animation[state][spriteName].end;
        let prefix = config.animation[state][spriteName].prefix;
        let suffix = config.animation[state][spriteName].suffix;
        let time = config.animation[state][spriteName].time
        let sequenceAnimName = config.animation[state].sequence;
        let repeat = config.animation[state][spriteName].repeat;
        let shadow = config.animation[state][spriteName].shadow;

        if (flipX) {
            let flipState = config.animation[state][spriteName].flipState;
            start = config.animation[flipState][spriteName].start;
            end = config.animation[flipState][spriteName].end;
            prefix = config.animation[flipState][spriteName].prefix;
            suffix = config.animation[flipState][spriteName].suffix;
            time = config.animation[flipState][spriteName].time
            sequenceAnimName = config.animation[flipState].sequence;
        }

        for (let i = start; i <= end; i++) {
            let numberDigits = i.toString().length;
            let fileName = prefix + ("0".repeat(4 - numberDigits) + i) + suffix;
            //cc.log(fileName)
            let sprite = cc.spriteFrameCache.getSpriteFrame(fileName);
            animFrames.push(sprite);
        }

        let animation = new cc.Animation(animFrames);
        let delay = (time || 1000) / 1000;
        animation.setDelayPerUnit(delay / animFrames.length);
        // FIXME: remove component and release this animation
        animation.retain();

        let animArr = [];
        if (sequenceAnimName) {
            animArr.push(this._buildConfig(config, sequenceAnimName[0], spriteName));
        }

        return {animation: animation, sequenceAnimations: animArr, flipX: flipX, repeat: repeat, delay: delay, shadow: shadow};
    },
    getCurrentState:function (){
        return this.currentState;
    }
});
SpriteSheetAnimationComponent.typeID = GameConfig.COMPONENT_ID.SPRITE_SHEET;
ComponentManager.getInstance().registerClass(SpriteSheetAnimationComponent);
