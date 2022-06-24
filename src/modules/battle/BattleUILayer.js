let BattleUILayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        this._setupUI();
    },

    _setupUI: function () {
        this._showDeckCard();
        this._showTimer();
        this._showWave();
        this._showHouseEnergy();
        this._showPlayerInfo();
    },

    _showDeckCard: function () {
        this.cardDeckNode = new CardDeckNode();
        this.cardDeckNode.x = this.width / 2;
        this.cardDeckNode.y = this.cardDeckNode.height / 2;
        this.addChild(this.cardDeckNode);
    },

    _showTimer: function () {
        this.timerNode = new BattleTimerNode(5);
        this.timerNode.x = this.width / 2 - this.timerNode.width / 2;
        this.timerNode.y = this.cardDeckNode.height + GameConfig.TILE_HEIGH * GameConfig.MAP_HEIGH + GameConfig.RIVER_MAP_HEIGH / 2;
        this.addChild(this.timerNode);
    },

    _showWave: function () {
        this.waveNode = new WaveNode(1);
        this.waveNode.x = this.waveNode.width / 2;
        this.waveNode.y = this.cardDeckNode.height + GameConfig.TILE_HEIGH * GameConfig.MAP_HEIGH + GameConfig.RIVER_MAP_HEIGH / 2;
        this.addChild(this.waveNode);
    },

    _showHouseEnergy: function () {
        this.houseEnergyNode = new HouseEnergyNode(5, 5);
        this.houseEnergyNode.x = this.width - this.houseEnergyNode.width / 2;
        this.houseEnergyNode.y = this.cardDeckNode.height + GameConfig.TILE_HEIGH * GameConfig.MAP_HEIGH + GameConfig.RIVER_MAP_HEIGH / 2;
        this.addChild(this.houseEnergyNode);
    },

    _showPlayerInfo: function () {
        this.playerInfoNode = new PlayerInfoNode("HOVANVYDUT", "GDF_5_TEAM_2");
        this.playerInfoNode.x = this.playerInfoNode.width / 2;
        this.playerInfoNode.y = this.height - this.playerInfoNode.height / 2;
        this.addChild(this.playerInfoNode);
    },
});

BattleUILayer.plusPlayerHouseEnergy = function (energy) {
    GameConfig.gameLayer.uiLayer.houseEnergyNode.plusPlayerEnergy(energy);
}

BattleUILayer.minusPlayerEnergy = function (energy) {
    GameConfig.gameLayer.uiLayer.houseEnergyNode.minusPlayerEnergy(energy);
}