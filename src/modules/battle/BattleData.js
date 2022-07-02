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

    setPlayerEnergyHouse: function (val) {
        if (val < 0) {
            val = 0;
        }
        this.dataInGame.player.energyHouse = val;
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
        if (GameConfig.MAP_HEIGH !== map.length && GameConfig.MAP_WIDTH !== map[0].length) {
            throw new Error("Map size is invalid")
        }
        return this.dataInGame.player.map = map;
    },

    setOpponentMap: function (map) {
        if (GameConfig.MAP_HEIGH !== map.length && GameConfig.MAP_WIDTH !== map[0].length) {
            throw new Error("Map size is invalid")
        }
        return this.dataInGame.opponent.map = map;
    },

    getOpponentMap: function () {
        return this.dataInGame.opponent.map;
    },

    getPlayerLongestPath: function () {
        // return Utils.tileArray2PixelArray([{x: 0, y: GameConfig.MAP_HEIGH-1}, {x: 0, y: 2},
        //     {x: 3, y: 2}, {x: 3, y: 1}, {x: 6, y: 0}]);
        return this.dataInGame.player.path;
    },

    setPlayerLongestPath: function (path) {
        return this.dataInGame.player.path = Utils.tileArray2PixelArray(path);
    },

    getOpponentLongestPath: function () {
        return this.dataInGame.opponent.path = Utils.tileArray2PixelArray(path);
    },

    setOpponentLongestPath: function (path) {
        return this.dataInGame.opponent.path = Utils.tileArray2PixelArray(path);
    },
});