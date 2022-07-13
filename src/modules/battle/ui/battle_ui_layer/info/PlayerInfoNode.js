let PlayerInfoNode = cc.Node.extend({
    ctor: function (username, clanName) {
        this._super();

        let rootNode = ccs.load(BattleResource.PLAYER_INFO_NODE, "").node;
        this.addChild(rootNode);

        let background = rootNode.getChildByName("background");
        this.width = background.width;
        this.height = background.height;

        this.username = rootNode.getChildByName("username");
        this.avatar = rootNode.getChildByName("avatar");
        this.clanName = rootNode.getChildByName("clan_name");

        this.setUsername(username);
        this.setClanName(clanName);
    },

    setUsername: function (username) {
        this.username.setString(username);
    },

    setAvatar: function (avatar) {

    },

    setClanName: function (clanName) {
        this.clanName.setString(clanName);
    },
})