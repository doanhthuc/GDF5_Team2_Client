const lobbyLayer = cc.Node.extend({
    ctor: function (bottomNavHeight) {
        this.bottomNavHeight = bottomNavHeight
        this.treasureSlotNodeList = [];
        this.treasureSlotList = [];
        this._super();
        this.init();
    },

    init: function () {
        this.treasureSlotList = [];
        this.lobbyNode = ccs.load(res.LOBBY_NODE, '').node;
        this.addChild(this.lobbyNode);
        this.playerInfoHolder = this.lobbyNode.getChildByName('playerInfoHolder');
        this.usernameTxt = this.playerInfoHolder.getChildByName('usernameTxt');
        this.battleBtnNode = this.lobbyNode.getChildByName('battleBtn');
        this.battleBtnBackgroundImg = this.battleBtnNode.getChildByName('battleBtnBackgroundImg');
        this.battleBtnBackgroundImg.addTouchEventListener(this.onBattleBtnClick.bind(this), this);
        this.userTrophyTxt = this.playerInfoHolder.getChildByName('userTrophyTxt');

        this.lobbyNode.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.playerInfoHolderBackgroundImg = this.playerInfoHolder.getChildByName('Image_1');

        this.initTreasureSlotNodeList();
    },

    setPositionForPlayerInfo: function (headerHeight) {
        let playerInfoHolderHeight = this.playerInfoHolderBackgroundImg.getSize().height;

        this.playerInfoHolder.setPositionY(cc.winSize.height / 2 - playerInfoHolderHeight / 2 - headerHeight);
    },

    initTreasureSlotNodeList: function () {
        this.treasureSlotNodeList = [];
        for (let i = 0; i < 4; i++) {
            let treasureSlotNode = new TreasureSlot(i);
            this.treasureSlotNodeList.push(treasureSlotNode);
            this.lobbyNode.addChild(treasureSlotNode);
        }
    },

    setTreasureSlotNodeList: function (treasureSlotList) {
        for (let i = 0; i < treasureSlotList.length; i++) {
            let treasure = treasureSlotList[i];
            let treasureSlotNode = this.treasureSlotNodeList[i];
            treasureSlotNode.setStateOfSlot(treasure.state, treasure.claimTime);
        }
        this.setPositionForTreasureSlot();
    },

    setPositionForTreasureSlot: function () {
        let startX = -cc.winSize.width / 2 + Math.ceil(TreasureSlotResources.BACKGROUND_IMG_WIDTH / 2) + TreasureSlotResources.SLOT_START_MARGIN;
        for (let i = 0; i < TreasureSlotResources.SLOT_NUMBER; i++) {
            let treasureSlotNode = this.treasureSlotNodeList[i];
            treasureSlotNode.setPosition(startX, -cc.winSize.height / 2 + this.bottomNavHeight + treasureSlotNode.backgroundBtn.height / 2 + 20);
            // startX += treasureSlotNode.slotNodeMap.get(treasureSlotNode.state).backgroundBtn.getSize().width + TreasureSlotResources.SLOT_BETWEEN_MARGIN;
            startX += treasureSlotNode.backgroundBtn.getSize().width + TreasureSlotResources.SLOT_BETWEEN_MARGIN;
        }
    },

    setUsername: function (username) {
        this.usernameTxt.setString(username);
    },

    onBattleBtnClick: function (sender, type) {
        // cc.director.runScene(new cc.TransitionCrossFade(1.0, new GameLayer()));
        let isFull = this.treasureSlotNodeList.every(
            treasureSlotNode => treasureSlotNode.state !== TreasureSlotResources.STATE.EMPTY);
        if (isFull) {
            PopupUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_FULL_TREASURE_SLOT);
        } else {
            let scene = new MatchingScene();
            let transitionTime = 1.2;
            cc.director.runScene(new cc.TransitionFade(transitionTime, scene));
        }
    },

    setUserTrophy: function (trophy) {
        this.userTrophyTxt.setString(trophy);
    },

    onUnlockChestSuccess: function (data) {
        this.treasureSlotNodeList[data.lobbyChestid].setStateOfSlot(data.state, data.claimTime);
    },

    onClaimChestSuccess: function (data) {
        this.treasureSlotNodeList[data.lobbyChestid].setStateOfSlot(data.state);
    },

    onSpeedUpChestSuccess: function (data) {
        this.treasureSlotNodeList[data.lobbyChestid].setStateOfSlot(data.state);
    }
})