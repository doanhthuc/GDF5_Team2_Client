let UUIDGeneratorECS = (function () {
    let _instanceID = 0;
    let _componentID = 0;
    let _playerStartEntityID;
    let _opponentStartEntityID;

    return {
        genComponentID: function () {
            return ++_componentID;
        },

        genSystemID: function () {
            return ++_instanceID;
        },

        genEntityID: function (mode) {
            if (mode === GameConfig.PLAYER)
                return ++_playerStartEntityID;
            else return ++_opponentStartEntityID;
        },

        setStartEntityID: function (playerStartEntityID, opponentStartEntityID) {
            _playerStartEntityID = playerStartEntityID;
            _opponentStartEntityID = opponentStartEntityID;
        }
    }
})();