let EntityManager = cc.Class.extend({
    name: "EntityManager",
    /*
    * {
    * entityID1: entity1,
    * entityID2: entity2,
    * ...}
    * */

    ctor: function () {
        this.entities = {}
    },

    createEntity: function () {
        throw new NotImplementedError();
    },

    getEntity: function (entityID) {
        return this.entities[entityID];
    },

    getEntitiesHasComponents: function (...ComponentClss) {
        // only get active entity
        let entityList = [];
        for (let id of Object.keys(this.entities)) {
            if (this.entities[id].getActive() && this.entities[id].hasAllComponent(...ComponentClss)) {
                entityList.push(this.entities[id]);
            } else if (this.entities[id].getActive() === false) {
                // remove entity
                // delete this.entities[id];
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

EntityManager.destroy = function (entity) {
    let appearanceComponent = entity.getComponent(AppearanceComponent)
    if (appearanceComponent) {
        let sprite = appearanceComponent.sprite;
        sprite.setVisible(false);
        appearanceComponent.setActive(false);
    }

    entity.setActive(false);
    for (let key of Object.keys(entity.components)) {
        entity.components[key].setActive(false);
    }
}
