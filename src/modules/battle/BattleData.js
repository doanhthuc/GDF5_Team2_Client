let BattleData = cc.Class.extend({
    ctor: function () {
        this.dataInGame = {
            currentWave: 3,
            maxWave: 10,
            timer: 5,
            player: {
                username: "HOVANVYDUT",
                clanName: "GDF5_DN_TEAM_2",
                trophy: 30,
                energyHouse: 6,
                map: FindPathUtil.create2DMatrix(GameConfig.MAP_HEIGH, GameConfig.MAP_WIDTH),
                path: null,
            },
            opponent: {
                username: "OPPONENT333",
                clanName: "HIHI",
                trophy: 20,
                energyHouse: 4,
                map: FindPathUtil.create2DMatrix(GameConfig.MAP_HEIGH, GameConfig.MAP_WIDTH),
                path: null,
            }
        }

        // this.dataInGame.player.map = [
        //     [0, 5, 0, 0 ,0, 0, 0],
        //     [0, 0, 0, 0 ,6, 0, 0],
        //     [0, 0, 0, 0 ,0, 0, 0],
        //     [0, 3, 0, 2 ,0, 1, 0],
        //     [0, 0, 0, 0 ,0, 0, 0],
        // ]
    },

    getTimer: function () {
        return this.dataInGame.timer;
    },

    getMaxWave: function () {
        return this.dataInGame.maxWave;
    },

    getCurrentWave: function () {
        return this.dataInGame.currentWave;
    },

    getPlayerUsername: function () {
        return this.dataInGame.player.username;
    },

    getOpponentUsername: function () {
        return this.dataInGame.opponent.username;
    },

    getPlayerClanName: function () {
        return this.dataInGame.player.clanName;
    },

    getOpponentClanName: function () {
        return this.dataInGame.opponent.clanName;
    },

    getPlayerEnergyHouse: function () {
        return this.dataInGame.player.energyHouse;
    },

    getOpponentEnergyHouse: function () {
        return this.dataInGame.opponent.energyHouse;
    },

    getPlayerTrophy: function () {
        return this.dataInGame.player.trophy;
    },

    getOpponentTrophy: function () {
        return this.dataInGame.opponent.trophy;
    },

    setCurrentWave: function (currentWave) {
        this.dataInGame.currentWave = currentWave;
        return this.dataInGame.currentWave;
    },

    getPlayerMap: function () {
        return this.dataInGame.player.map;
    },

    setPlayerMap: function (map) {
        return this.dataInGame.player.map = map;
    },

    getOpponentMap: function () {
        return this.dataInGame.opponent.map;
    },

    getPlayerBestPath: function () {
        // return Utils.tileArray2PixelArray([{x: 0, y: GameConfig.MAP_HEIGH-1}, {x: 0, y: 2},
        //     {x: 3, y: 2}, {x: 3, y: 1}, {x: 6, y: 0}]);
        return this.dataInGame.player.path;
    },

    setPlayerBestPath: function (path) {
        return this.dataInGame.player.path = Utils.tileArray2PixelArray(path);
    }
});