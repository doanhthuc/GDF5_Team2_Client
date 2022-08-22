let TwoPlayerInfoLayer = cc.Layer.extend({
    ctor: function (playerAvatar, playerName, opponentAvatar, opponentName) {
        this._super();

        // background layer
        let backgroundLayer = new cc.LayerColor(new cc.Color(0, 0, 0, 150), cc.winSize.width, cc.winSize.height);
        this.addChild(backgroundLayer);

        this.rootNode = ccs.load(BattleResource.TWO_PLAYER_INFO_NODE, "").node;
        this.rootNode.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2,
        });
        this.addChild(this.rootNode);

        this.setAvatar(playerAvatar, GameConfig.USER1());
        this.setAvatar(opponentAvatar, GameConfig.USER2());
        this.setUsername(playerName, GameConfig.USER1());
        this.setUsername(opponentName, GameConfig.USER2());
        soundManager.stopThemeLobby();
    },

    setAvatar: function (avatarPath, type) {
        let avatarNode = null;
        switch (type) {
            case GameConfig.USER1():
                avatarNode = this.rootNode.getChildByName("player_avatar");
                break;
            case GameConfig.USER2():
                avatarNode = this.rootNode.getChildByName("opponent_avatar");
                break;
            default:
                return;
        }
        avatarNode.setTexture(avatarPath);
    },

    setUsername: function (username, type) {
        let usernameNode = null;
        switch (type) {
            case GameConfig.USER1():
                usernameNode = this.rootNode.getChildByName("player_name");
                break;
            case GameConfig.USER2():
                usernameNode = this.rootNode.getChildByName("opponent_name");
                break;
            default:
                return;
        }
        usernameNode.setString(username);
    }
})