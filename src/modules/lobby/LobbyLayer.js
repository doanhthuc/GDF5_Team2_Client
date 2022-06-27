const lobbyLayer = cc.Node.extend({
    ctor: function () {
        this.treasureSlotNodeList = [];
        this.treasureSlotList = [];
        this._super();
        this.init();
    },

    init: function () {
        this.lobbyNode = ccs.load(res.LOBBY_NODE, '').node;
        this.addChild(this.lobbyNode);
        this.playerInfoHolder = this.lobbyNode.getChildByName('playerInfoHolder');
        this.usernameTxt = this.playerInfoHolder.getChildByName('usernameTxt');
        this.battleBtnNode = this.lobbyNode.getChildByName('battleBtn');
        this.battleBtnBackgroundImg = this.battleBtnNode.getChildByName('battleBtnBackgroundImg');
        this.battleBtnBackgroundImg.addTouchEventListener(this.onBattleBtnClick.bind(this), this);
        this.userTrophyTxt = this.playerInfoHolder.getChildByName('userTrophyTxt');

        this.lobbyNode.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);


    },

    setTreasureSlotNodeList: function (treasureSlotList) {
        for (let i = 0; i < treasureSlotList.length; i++) {
            let treasure = treasureSlotList[i];
            let treasureSlotNode = new TreasureSlot();
            // treasureSlotNode.setSlotVisibleByState(treasure.state);
            treasureSlotNode.setSlotTexturesByState(treasure.state);
            this.treasureSlotNodeList.push(treasureSlotNode);
            this.lobbyNode.addChild(treasureSlotNode);
        }
        // cc.log(JSON.stringify(this.treasureSlotNodeList));
        this.setPositionForTreasureSlot();
    },

    setPositionForTreasureSlot: function () {
        let startX = -cc.winSize.width / 2 + Math.ceil(TreasureSlotResources.BACKGROUND_IMG_WIDTH / 2) + TreasureSlotResources.SLOT_START_MARGIN;
        for (let i = 0; i < TreasureSlotResources.SLOT_NUMBER; i++) {
            let treasureSlotNode = this.treasureSlotNodeList[i];
            // treasure.setNodeByState(TreasureSlotResources.STATE.FINISHED);
            treasureSlotNode.setPosition(startX, TreasureSlotResources.CENTER_SCENE_MARGIN_TOP);
            // startX += treasureSlotNode.slotNodeMap.get(treasureSlotNode.state).backgroundBtn.getSize().width + TreasureSlotResources.SLOT_BETWEEN_MARGIN;
            startX += treasureSlotNode.backgroundBtn.getSize().width + TreasureSlotResources.SLOT_BETWEEN_MARGIN;
        }
    },

    setUsername: function (username) {
        this.usernameTxt.setString(username);
    },

    onBattleBtnClick: function (sender, type) {
        // cc.director.runScene(new cc.TransitionCrossFade(1.0, new GameLayer()));
        var layer = new GameLayer();
        layer.setName("screen");
        var scene = new cc.Scene();
        scene.addChild(layer);
        let transitionTime = null;
        if (!transitionTime) {
            transitionTime = 1.2;
        }
        cc.director.runScene(new cc.TransitionFade(transitionTime, scene));
    },

    setUserTrophy: function (trophy) {
        this.userTrophyTxt.setString(trophy);
    },
})