let TwoPlayerInfoLayer = cc.Layer.extend({
    ctor: function (playerAvatar, playerName, opponentAvatar, opponentName) {
        this._super();

        // background layer
        let backgroundLayer = new cc.LayerColor(new cc.Color(0, 0, 0, 150), GameConfig.SCREEN_WIDTH, GameConfig.SCREEN_HEIGH);
        this.addChild(backgroundLayer);

        this.rootNode = ccs.load(BattleResource.TWO_PLAYER_INFO_NODE, "").node;
        this.rootNode.attr({
            x: GameConfig.SCREEN_WIDTH / 2,
            y: GameConfig.SCREEN_HEIGH / 2,
        });
        this.addChild(this.rootNode);

        this.setAvatar(playerAvatar, "player");
        this.setAvatar(opponentAvatar, "opponent");
        this.setUsername(playerName, "player");
        this.setUsername(opponentName, "player");
    },

    setAvatar: function (avatarPath, type) {
        let avatarNode = null;
        switch (type) {
            case "player":
                avatarNode = this.rootNode.getChildByName("player_avatar");
                break;
            case "opponent":
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
            case "player":
                usernameNode = this.rootNode.getChildByName("player_name");
                break;
            case "opponent":
                usernameNode = this.rootNode.getChildByName("opponent_name");
                break;
            default:
                return;
        }
        usernameNode.setString(username);
    }
})