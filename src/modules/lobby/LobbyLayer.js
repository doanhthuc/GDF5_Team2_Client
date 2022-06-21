const lobbyLayer = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this.treasureSlotList = [];
        this.lobbyNode = ccs.load(res.LOBBY_NODE, '').node;
        this.addChild(this.lobbyNode);
        this.playerInfoHolder = this.lobbyNode.getChildByName('playerInfoHolder');
        this.usernameTxt = this.playerInfoHolder.getChildByName('usernameTxt');
        this.userTrophyTxt = this.playerInfoHolder.getChildByName('userTrophyTxt');

        this.lobbyNode.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        let startX = -cc.winSize.width / 2 + Math.ceil(TreasureSlotResources.BACKGROUND_IMG_WIDTH / 2) + TreasureSlotResources.SLOT_START_MARGIN;
        for (let i = 0; i < TreasureSlotResources.SLOT_NUMBER; i++) {
            let treasure = new TreasureSlot();
            this.lobbyNode.addChild(treasure);
            this.treasureSlotList.push(treasure);
            treasure.setNodeByState(TreasureSlotResources.STATE.FINISHED);
            treasure.setPosition(startX, TreasureSlotResources.CENTER_SCENE_MARGIN_TOP);
            startX += treasure.backgroundBtn.getSize().width + TreasureSlotResources.SLOT_BETWEEN_MARGIN;
        }
    },

    setUsername: function (username) {
        this.usernameTxt.setString(username);
    },

    setUserTrophy: function (trophy) {
        this.userTrophyTxt.setString(trophy);
    },
})