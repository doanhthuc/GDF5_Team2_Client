let BattleResultPlayerInfo = cc.Node.extend({
    ctor: function (username, trophy, avatarImg, energy, win) {
        this._super();

        this.rootNode = ccs.load(BattleResource.RESULT_PLAYER_INFO_NODE, "").node;
        this.addChild(this.rootNode);

        this.setUsername(username);
        this.setTrophy(trophy);
        this.setAvatar(avatarImg);
        this.setEnergy(energy);
    },

    setUsername: function (username) {
        this.username = username;
        this.rootNode.getChildByName("player_name").setString(this.username);
    },

    setTrophy: function (trophy) {
        this.trophy = trophy;
        this.rootNode.getChildByName("trophy_txt").setString(this.trophy);
    },

    setAvatar: function (avatarPath) {
        this.avatar = avatarPath;
        this.rootNode.getChildByName("avatar").setTexture(this.avatar);
    },

    setEnergy: function (energy) {
        this.energy = energy;
        this.rootNode.getChildByName("energy_txt").setString(this.energy);
    }
})