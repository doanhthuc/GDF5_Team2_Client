let UUIDGeneratorECS = (function () {
    let _instanceID = 0;
    let _componentID = 0;
    let _playerStartEntityID = 0;
    let _opponentStartEntityID = 0;

    let OBSTACLE_START_ENTITY_ID = 0;
    let TOWER_START_ENTITY_ID = 10;
    let SPELL_START_ENTITY_ID = 2000;
    let MONSTER_START_ENTITY_ID = 4000;
    let BULLET_START_ENTITY_ID = 10000;

    let _playerObstacleEntityId = 0;
    let _playerTowerEntityId = 0;
    let _playerSpellEntityId = 0;
    let _playerMonsterEntityId = 0;
    let _playerBulletEntityId = 0;

    let _opponentObstacleEntityId = 0;
    let _opponentTowerEntityId = 0;
    let _opponentSpellEntityId = 0;
    let _opponentMonsterEntityId = 0;
    let _opponentBulletEntityId = 0;

    return {
        genComponentID: function () {
            return ++_componentID;
        },

        genSystemID: function () {
            return ++_instanceID;
        },

        genEntityID: function (mode, typeID) {
            Utils.validateMode(mode);
            if (ValidatorECS.isTower(typeID)) return this.genTowerEntityIdByMode(mode);

            if (ValidatorECS.isSpell(typeID)) return this.genSpellEntityIdByMode(mode);

            if (ValidatorECS.isMonster(typeID)) return this.genMonsterEntityIdByMode(mode);

            if (ValidatorECS.isBullet(typeID)) return this.genBulletEntityIdByMode(mode);

            if (ValidatorECS.isObstacle(typeID)) return this.genObstacleEntityIdByMode(mode);
        },

        genTowerEntityIdByMode: function (mode) {
            if (mode === GameConfig.USER1()) return ++_playerTowerEntityId;
            else return ++_opponentTowerEntityId;
        },

        genSpellEntityIdByMode: function (mode) {
            if (mode === GameConfig.USER1()) return ++_playerSpellEntityId;
            else return (++_opponentSpellEntityId);
        },

        genMonsterEntityIdByMode: function (mode) {
            if (mode === GameConfig.USER1()) return ++_playerMonsterEntityId;
            else return ++_opponentMonsterEntityId;
        },

        genBulletEntityIdByMode: function (mode) {
            if (mode === GameConfig.USER1()) return ++_playerBulletEntityId;
            else return ++_opponentBulletEntityId;
        },

        genObstacleEntityIdByMode: function (mode) {
            if (mode === GameConfig.USER1()) return ++_playerObstacleEntityId;
            else return ++_opponentObstacleEntityId;
        },

        setMonsterEntityID: function (playerMonsterEntityId, opponentMonsterEntityId) {
            _playerMonsterEntityId = playerMonsterEntityId;
            _opponentMonsterEntityId = opponentMonsterEntityId;
        },

        setStartEntityID: function (playerStartEntityID, opponentStartEntityID) {
            _playerStartEntityID = playerStartEntityID;
            _opponentStartEntityID = opponentStartEntityID;

            _playerObstacleEntityId = Number(playerStartEntityID) + OBSTACLE_START_ENTITY_ID;
            _playerTowerEntityId = Number(playerStartEntityID) + TOWER_START_ENTITY_ID;
            _playerSpellEntityId = Number(playerStartEntityID) + SPELL_START_ENTITY_ID;
            _playerMonsterEntityId = Number(playerStartEntityID) + MONSTER_START_ENTITY_ID;
            _playerBulletEntityId = Number(playerStartEntityID) + BULLET_START_ENTITY_ID;

            _opponentObstacleEntityId = Number(opponentStartEntityID) + OBSTACLE_START_ENTITY_ID;
            _opponentTowerEntityId = Number(opponentStartEntityID) + TOWER_START_ENTITY_ID;
            _opponentSpellEntityId = Number(opponentStartEntityID) + SPELL_START_ENTITY_ID;
            _opponentMonsterEntityId = Number(opponentStartEntityID) + MONSTER_START_ENTITY_ID;
            _opponentBulletEntityId = Number(opponentStartEntityID) + BULLET_START_ENTITY_ID;
        },

        getPlayerStartEntityID: function (){
            return Number(_playerStartEntityID);
        }
    }
})();