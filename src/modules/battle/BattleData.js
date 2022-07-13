let BattleData = cc.Class.extend({
    ctor: function () {
        this.dataInGame = {
            currentWave: 0,
            maxWave: 100,
            timer: 2,
            player: {
                username: "HOVANVYDUT",
                clanName: "GDF5_DN_TEAM_2",
                trophy: 30,
                energyHouse: 100,
                map: FindPathUtil.create2DMatrix(GameConfig.MAP_HEIGH, GameConfig.MAP_WIDTH),
                longestPath: null,
                shortestPathForEachTile: null,
                currentEnergy: 30,
                maxEnergy: 30,
                cards: [
                    {
                        id: 0,
                        type: GameConfig.ENTITY_ID.CANNON_TOWER,
                    },
                    {
                        id: 1,
                        type: GameConfig.ENTITY_ID.BEAR_TOWER,
                    },
                    {
                        id: 2,
                        type: GameConfig.ENTITY_ID.FROG_TOWER,
                    },
                    {
                        id: 3,
                        type: GameConfig.ENTITY_ID.FIRE_SPELL,
                    },
                    {
                        id: 4,
                        type: GameConfig.ENTITY_ID.FROZEN_SPELL,
                    }
                ]
            },
            opponent: {
                username: "OPPONENT333",
                clanName: "HIHI",
                trophy: 5,
                energyHouse: 100,
                map: FindPathUtil.create2DMatrix(GameConfig.MAP_HEIGH, GameConfig.MAP_WIDTH),
                longestPath: null,
                shortestPathForEachTile: null,
            }
        }
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
        Utils.validateMode(mode);
        return this.dataInGame[mode].username;
    },

    setUsername: function (username, mode) {
        Utils.validateMode(mode);
        this.dataInGame[mode].username = username;
    },

    getClanName: function (mode) {
        Utils.validateMode(mode);
        return this.dataInGame[mode].clanName;
    },


    setEnergyHouse: function (val, mode) {
        Utils.validateMode(mode);
        if (val < 0) {
            val = 0;
        }
        this.dataInGame[mode].energyHouse = val;
    },

    getEnergyHouse: function (mode) {
        Utils.validateMode(mode);
        return this.dataInGame[mode].energyHouse;
    },

    getTrophy: function (mode) {
        Utils.validateMode(mode);
        return this.dataInGame[mode].trophy;
    },

    setTrophy: function (trophy, mode) {
        Utils.validateMode(mode);
        if (trophy < 0) return;
        this.dataInGame[mode].trophy = trophy;
    },

    setCurrentWave: function (currentWave) {
        this.dataInGame.currentWave = currentWave;
        return this.dataInGame.currentWave;
    },

    getMap: function (mode) {
        Utils.validateMode(mode);
        return this.dataInGame[mode].map;
    },

    setMap: function (map, mode) {
        Utils.validateMode(mode);
        if (GameConfig.MAP_HEIGH !== map.length && GameConfig.MAP_WIDTH !== map[0].length) {
            throw new Error("Map size is invalid")
        }
        return this.dataInGame[mode].map = map;
    },

    getShortestPathForEachTile: function (mode) {
        Utils.validateMode(mode);
        return this.dataInGame[mode].shortestPathForEachTile;
    },

    setShortestPathForEachTile: function (shortestPathForEachTile, mode) {
        Utils.validateMode(mode);
        this.dataInGame[mode].shortestPathForEachTile = shortestPathForEachTile;
    },

    getLongestPath: function (mode) {
        Utils.validateMode(mode);
        return Utils.tileArray2PixelArray(this.dataInGame[mode].longestPath, mode);
    },

    setLongestPath: function (longestPath, mode) {
        Utils.validateMode(mode);
        return this.dataInGame[mode].longestPath = longestPath;
    },

    getCurrentEnergy: function (mode) {
        Utils.validateMode(mode);
        return this.dataInGame[mode].currentEnergy;
    },

    setCurrentEnergy:function (currentEnergy, mode) {
        Utils.validateMode(mode);
        if (currentEnergy > this.getMaxEnergy(mode))
            return;
        this.dataInGame[mode].currentEnergy = currentEnergy;
    },

    getMaxEnergy: function (mode) {
        Utils.validateMode(mode);
        return this.dataInGame[mode].maxEnergy;
    },

    setMaxEnergy: function (maxEnergy, mode) {
        Utils.validateMode(mode);
        this.dataInGame[mode].maxEnergy = maxEnergy;
    }
});

BattleData.fakeData = function () {
    let map = [[0,6,0,0,0,5,0],[0,0,0,0,0,0,0],[0,0,0,2,0,1,0],[0,3,0,0,0,0,0],[0,0,0,0,5,0,0]];
    let path = [{"x":0,"y":4},{"x":0,"y":3},{"x":0,"y":2},{"x":0,"y":1},{"x":0,"y":0},{"x":1,"y":0},{"x":2,"y":0},{"x":2,"y":1},{"x":2,"y":2},{"x":2,"y":3},{"x":2,"y":4},{"x":3,"y":4},{"x":4,"y":4},{"x":4,"y":3},{"x":4,"y":2},{"x":4,"y":1},{"x":5,"y":1},{"x":6,"y":1},{"x":6,"y":0}];
    GameConfig.battleData = new BattleData();
    GameConfig.battleData.setMap(map, GameConfig.PLAYER);
    GameConfig.battleData.setMap(JSON.parse(JSON.stringify(map)), GameConfig.OPPONENT);
    GameConfig.battleData.setLongestPath(path, GameConfig.PLAYER);
    GameConfig.battleData.setLongestPath(JSON.parse(JSON.stringify(path)), GameConfig.OPPONENT);

    let shortestPathForEachTilePlayer = FindPathUtil.findShortestPathForEachTile(GameConfig.PLAYER);
    let shortestPathForEachTileOpponent = FindPathUtil.findShortestPathForEachTile(GameConfig.OPPONENT);

    GameConfig.battleData.setShortestPathForEachTile(shortestPathForEachTilePlayer, GameConfig.PLAYER);
    GameConfig.battleData.setShortestPathForEachTile(shortestPathForEachTileOpponent, GameConfig.OPPONENT);
}