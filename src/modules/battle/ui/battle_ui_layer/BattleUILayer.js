let BattleUILayer = cc.Layer.extend({
    ctor: function (battleData) {
        this._super();

        this.battleData = battleData;

        let fakeBattleDeckData = [{id: 0, level: 1}, {id: 0, level: 1}, {id: 2, level: 1}, {id: 3, level: 1}, {
            id: 4,
            level: 1
        },
            {id: 5, level: 1}, {id: 6, level: 1}, {id: 7, level: 1}, {id: 8, level: 1}, {id: 9, level: 1}
        ];
        this.cardDeckListData = new CardDeckListData(this.battleData.getCards(GameConfig.PLAYER));
        // this.battleData.setCards(this.cardDeckListData.getFirst4CardId(), GameConfig.PLAYER);

        this.twoPlayerInfoLayer = new TwoPlayerInfoLayer(BattleResource.AVATAR_IMAGE, this.battleData.getUsername(GameConfig.PLAYER)
            , BattleResource.AVATAR_IMAGE, this.battleData.getUsername(GameConfig.OPPONENT));
        this.addChild(this.twoPlayerInfoLayer);
    },

    _setupUI: function () {
        this._showDeckCard();
        this._showTimer();
        this._showWave();
        this._showHouseEnergy();
        this._showPlayerInfo();
        this._showBackButton();
        this._initNotification();
        // this.showTargetCircle();
    },

    _showDeckCard: function () {
        this.cardDeckNode = new CardDeckNode2(this.cardDeckListData);
        this.cardDeckNode.x = this.width / 2;
        this.cardDeckNode.y = this.cardDeckNode.height / 2;
        this.addChild(this.cardDeckNode);
    },

    _showTimer: function () {
        let countdown = (this.battleData.getBattleStartTime() - TimeUtil.getServerTime()) / 1000;
        this.timerNode = new BattleTimerNode(countdown, this.battleData.dataInGame.timer);
        this.timerNode.x = cc.winSize.width / 2 - this.timerNode.width / 2;
        this.timerNode.y = (cc.winSize.height - this.cardDeckNode.height) / 2 + this.cardDeckNode.height;
        this.addChild(this.timerNode);
    },

    _showWave: function () {
        this.waveNode = new WaveNode();
        this.waveNode.x = this.waveNode.width / 2;
        this.waveNode.y = (cc.winSize.height - this.cardDeckNode.height) / 2 + this.cardDeckNode.height;
        this.addChild(this.waveNode);
    },

    _showHouseEnergy: function () {
        this.houseEnergyNode = new HouseEnergyNode(this.battleData.getEnergyHouse(GameConfig.PLAYER),
            this.battleData.getEnergyHouse(GameConfig.OPPONENT));
        this.houseEnergyNode.x = this.width - this.houseEnergyNode.width / 2;
        this.houseEnergyNode.y = (cc.winSize.height - 200) / 2 + 200;
        this.addChild(this.houseEnergyNode);
    },

    _showPlayerInfo: function () {
        this.playerInfoNode = new PlayerInfoNode(this.battleData.getUsername(GameConfig.OPPONENT),
            this.battleData.getClanName(GameConfig.OPPONENT));
        this.playerInfoNode.x = this.playerInfoNode.width / 2;
        this.playerInfoNode.y = this.height - this.playerInfoNode.height / 2;
        this.addChild(this.playerInfoNode);
    },

    _showBackButton: function () {
        let buttonNode = ccs.load(BattleResource.RED_BACK_BUTTON_NODE, "").node;
        buttonNode.getChildByName("button").addTouchEventListener(this._backToLobby.bind(this));
        buttonNode.setPosition(50, 225);
        this.addChild(buttonNode);
    },

    startGame: function () {
        this.removeChild(this.twoPlayerInfoLayer, true);
        this._setupUI();
        soundManager.playThemeBattle();
    },

    stopTimer: function () {
        this.timerNode.endTimer();
    },

    _initNotification: function () {
        this.notificationNode = new NotificationNode(cc.winSize.width);
        this.notificationNode.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        this.notificationNode.hide();
        this.addChild(this.notificationNode);
    },

    notify: function (txt) {
        this.notificationNode.setText(txt);
        this.notificationNode.show();
        setTimeout(() => {
            this.notificationNode.hide();
        }, 2000);
    },

    /**
     * Show target strategy selection of tower
     * @param x tile pos of player map
     * @param y tile pos of player map
     */
    showTargetCircle: function (x, y, range) {
        let circleNode = new CircleTarget(range);
        let pixelPos = Utils.tile2Pixel(x, y, GameConfig.PLAYER);
        pixelPos = Utils.convertMapNodeSpace2WorldSpace(pixelPos, GameConfig.PLAYER);
        circleNode.setPosition(pixelPos);
        circleNode.setTowerTilePos(x, y);
        this.addChild(circleNode, 100);
    },

    _backToLobby: function () {
        BattleManager.getInstance().getBattleLayer().stopGame();
        fr.view(MainScreen);
        soundManager.stopThemeBattle();
    }
});

BattleUILayer.minusHouseEnergy = function (energy, mode) {
    let battleData = BattleManager.getInstance().getBattleData();
    battleData.setEnergyHouse(battleData.getEnergyHouse(mode) - energy, mode);
    BattleManager.getInstance().getBattleLayer().uiLayer.houseEnergyNode.renderEnergyHouse();
}