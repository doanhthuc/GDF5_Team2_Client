let BattleUILayer = cc.Layer.extend({
    ctor: function (battleData) {
        this._super();

        this.battleData = battleData;

        this.twoPlayerInfoLayer = new TwoPlayerInfoLayer(BattleResource.AVATAR_IMAGE, this.battleData.getUsername(GameConfig.PLAYER)
            , BattleResource.AVATAR_IMAGE, this.battleData.getUsername(GameConfig.OPPONENT));
        this.addChild(this.twoPlayerInfoLayer);
        this.scheduleOnce(this.startGame, 2);
    },

    _setupUI: function () {
        this._showDeckCard();
        this._showTimer();
        this._showWave();
        this._showHouseEnergy();
        this._showPlayerInfo();
        this._showBackButton();
    },

    _showDeckCard: function () {
        this.cardDeckNode = new CardDeckNode();
        this.cardDeckNode.x = this.width / 2;
        this.cardDeckNode.y = this.cardDeckNode.height / 2;
        this.addChild(this.cardDeckNode);
    },

    _showTimer: function () {
        this.timerNode = new BattleTimerNode(this.battleData.getTimer());
        this.timerNode.x = cc.winSize.width / 2 - this.timerNode.width / 2;
        this.timerNode.y = (cc.winSize.height - this.cardDeckNode.height) / 2 + this.cardDeckNode.height;
        this.addChild(this.timerNode);
    },

    _showWave: function () {
        this.waveNode = new WaveNode(this.battleData.getCurrentWave(), this.battleData.getMaxWave());
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
    },

    stopTimer: function () {
        this.timerNode.endTimer();
    },

    _backToLobby: function () {
        fr.view(MainScreen);
    }
});

BattleUILayer.minusHouseEnergy = function (energy, mode) {
    BattleManager.getInstance().getBattleLayer().uiLayer.houseEnergyNode.minusEnergyHouse(energy, mode);
}