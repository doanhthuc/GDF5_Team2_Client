let EntityManager = cc.Class.extend({
    name: "EntityManager",
    entities: {},

    ctor: function () {
        cc.log("new " + this.name);
    },

    createEntity: function () {
        throw new NotImplementedError();
    },

    getEntity: function (entityID) {
        return this.entities[entityID];
    },

    getEntitiesByComponents: function (...componentTypeIDs) {
        let entityList = [];
        for (let id of Object.keys(this.entities)) {
            if (this.entities[id].hasAllComponent(...componentTypeIDs)) {
                entityList.push(this.entities[id]);
            }
        }
        return entityList;
    },

    addEntity: function (entity) {
        if (!entity instanceof EntityECS) {
            throw new InvalidArgumentTypeError(entity, EntityECS)
        }

        this.entities[entity.id] = entity;
    },

    destroyEntity: function (id) {
        this.getEntity(id).setActive(false);
        delete this.entities[id];
    },
});

let _entityManager = _entityManager || null;
EntityManager.getInstance = function () {
    if (_entityManager === null) {
        _entityManager = new EntityManager();
    }
    return _entityManager;
};
