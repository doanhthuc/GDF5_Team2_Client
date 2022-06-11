let _entityManager = _entityManager || null;

let EntityManager = cc.Class.extend({
    properties: {
        entities: {},
    },

    createEntity: function () {
        throw new MyNotImplementedError();
    },

    getEntity: function (entityID) {
        return this.entities[entityID];
    },

    destroyEntity: function (entityID) {
        delete this.entities[entityID];
    },

    getEntitiesByComponent: function (componentID) {

    }
});

EntityManager.getInstance = function () {
    if (_entityManager === null) {
        _entityManager = new EntityManager();
    }
    return _entityManager;
};
