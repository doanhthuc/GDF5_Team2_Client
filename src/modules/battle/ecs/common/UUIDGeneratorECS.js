let UUIDGeneratorECS = (function () {
    let _instanceID = 0;
    let _componentID = 0;
    let _entityID = 0;

    return {
        getComponentID: function () {
            return ++_componentID;
        },

        genInstanceID: function () {
            return ++_instanceID;
        },

        genEntityID: function () {
            return ++_entityID;
        }
    }
})();