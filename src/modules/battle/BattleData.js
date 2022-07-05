let BattleData = cc.Class.extend({
    ctor: function () {
        this.dataInGame = {
            currentWave: 0,
            maxWave: 10,
            timer: 5,
            player: {
                username: "HOVANVYDUT",
                clanName: "GDF5_DN_TEAM_2",
                trophy: 30,
                energyHouse: 10,
                map: FindPathUtil.create2DMatrix(GameConfig.MAP_HEIGH, GameConfig.MAP_WIDTH),
                longestPath: null,
                shortestPathForEachTile: null,
                energy: 20
            },
            opponent: {
                username: "OPPONENT333",
                clanName: "HIHI",
                trophy: 5,
                energyHouse: 10,
                map: FindPathUtil.create2DMatrix(GameConfig.MAP_HEIGH, GameConfig.MAP_WIDTH),
                longestPath: null,
                shortestPathForEachTile: null,
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

    getUsername: function (mode) {
        return this.dataInGame[mode].username;
    },

    getClanName: function (mode) {
        return this.dataInGame[mode].clanName;
    },


    setEnergyHouse: function (val, mode) {
        if (val < 0) {
            val = 0;
        }
        this.dataInGame[mode].energyHouse = val;
    },

    getEnergyHouse: function (mode) {
        return this.dataInGame[mode].energyHouse;
    },

    getTrophy: function (mode) {
        return this.dataInGame[mode].trophy;
    },

    setCurrentWave: function (currentWave) {
        this.dataInGame.currentWave = currentWave;
        return this.dataInGame.currentWave;
    },


    setMap: function (map, mode) {
        if (GameConfig.MAP_HEIGH !== map.length && GameConfig.MAP_WIDTH !== map[0].length) {
            throw new Error("Map size is invalid")
        }
        return this.dataInGame[mode].map = map;
    },

    getMap: function (mode) {
        return this.dataInGame[mode].map;
    },

    getShortestPathForEachTile: function (mode) {
        return this.dataInGame[mode].shortestPathForEachTile;
    },

    setShortestPathForEachTile: function (shortestPathForEachTile, mode) {
        this.dataInGame[mode].shortestPathForEachTile = shortestPathForEachTile;
    },

    setLongestPath: function (longestPath, mode) {
        return this.dataInGame[mode].longestPath = Utils.tileArray2PixelArray(longestPath, mode);
    },
});