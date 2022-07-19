let UUIDGeneratorECS = (function () {
    let _instanceID = 0;
    let _componentID = 0;
    let _entityID = 0;

    return {
        genComponentID: function () {
            return ++_componentID;
        },

        genSystemID: function () {
            return ++_instanceID;
        },

        genEntityID: function () {
            return ++_entityID;
        }
    }
})();