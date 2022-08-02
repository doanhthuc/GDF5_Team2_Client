let BattleResultLayer = cc.Layer.extend({
    ctor: function (result, battleData, trophyChange) {
        this._super();

        this.result = result;
        this.battleData = battleData;
        this.trophyChange = trophyChange;

        this._setupUI();
    },

    _setupUI: function () {
        // background layer
        let backgroundLayer = new cc.LayerColor(new cc.Color(0, 0, 0, 150), cc.winSize.width, cc.winSize.height);
        this.addChild(backgroundLayer);

        let resource = {skeleton: null, alias: null};
        this.animationName = {init: null, idle: null};
        switch (this.result) {
            case GameConfig.BATTLE_RESULT.WIN:
                resource.skeleton = BattleResource.WIN_SKELETON_ANIMATION;
                resource.alias = BattleResource.WIN_SKELETON_ALIAS;
                this.animationName.init = "fx_result_win_init";
                this.animationName.idle = "fx_result_win_idle";
                break;
            case GameConfig.BATTLE_RESULT.LOSE:
                resource.skeleton = BattleResource.LOSE_SKELETON_ANIMATION;
                resource.alias = BattleResource.LOSE_SKELETON_ALIAS;
                this.animationName.init = "fx_result_lose_init";
                this.animationName.idle = "fx_result_lose_idle";
                break;
            case GameConfig.BATTLE_RESULT.DRAW:
                resource.skeleton = BattleResource.DRAW_SKELETON_ANIMATION;
                resource.alias = BattleResource.DRAW_SKELETON_ALIAS;
                this.animationName.init = "fx_result_draw_init";
                this.animationName.idle = "fx_result_draw_idle";
                break;
            default:
                return;
        }

        this.spine = new sp.SkeletonAnimation(resource.skeleton, resource.alias);
        this.spine.setAnimation(0, this.animationName.init, false);
        this.spine.addAnimation(1, this.animationName.idle, true, 3);
        this.spine.setAnimationListener(this, this.animationStateEvent);
        this.spine.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2
        })
        this.addChild(this.spine);
    },

    animationStateEvent: function (obj, trackIndex, type, event, loopCount) {
        let animationName = (trackIndex && trackIndex.animation) ? trackIndex.animation.name : 0;
        switch (type) {
            case GameConfig.ANIMATION_TYPE.ANIMATION_COMPLETE:
                if (animationName === this.animationName.init) {
                    this._showResult();
                }
                break;
            default :
                break;
        }
    },

    _showResult: function () {
        let playerInfoNode = new BattleResultPlayerInfo(this.battleData.getUsername(GameConfig.PLAYER), this.battleData.getTrophy(GameConfig.PLAYER),
            BattleResource.AVATAR_IMAGE, this.battleData.getEnergyHouse(GameConfig.PLAYER));
        playerInfoNode.attr({
            y: cc.winSize.height / 2,
            x: cc.winSize.width / 4
        });
        this.addChild(playerInfoNode);

        let opponentInfoNode = new BattleResultPlayerInfo(this.battleData.getUsername(GameConfig.OPPONENT), this.battleData.getTrophy(GameConfig.OPPONENT),
            BattleResource.AVATAR_IMAGE, this.battleData.getEnergyHouse(GameConfig.OPPONENT));
        opponentInfoNode.attr({
            y: cc.winSize.height / 2,
            x: 3 * cc.winSize.width / 4
        });
        this.addChild(opponentInfoNode);

        let icon = new cc.Sprite(BattleResource.SWORD_WIN_ICON, "");
        icon.attr({
            y: cc.winSize.height / 2,
            x: cc.winSize.width / 2
        });
        this.addChild(icon);

        let backButtonNode = ccs.load(BattleResource.BLUE_BACK_BUTTON_NODE, "").node;
        let backButton = backButtonNode.getChildByName("button");
        backButton.addTouchEventListener(this._backToLobby.bind(this));
        backButtonNode.attr({
            x: cc.winSize.width / 2,
            y: backButton.height / 2
        });
        this.addChild(backButtonNode);

        let rewardNode;
        if (this.result === GameConfig.BATTLE_RESULT.WIN) {
            rewardNode = ccs.load("ui/battle/battle_result_layer/WinReward.json", "").node;
        } else {
            rewardNode = ccs.load("ui/battle/battle_result_layer/LoseReward.json", "").node;
        }

        rewardNode.getChildByName("trophy_amount").setString(this.trophyChange);
        rewardNode.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 4));
        this.addChild(rewardNode);
    },

    _backToLobby: function () {
        fr.view(MainScreen);
    },
});
