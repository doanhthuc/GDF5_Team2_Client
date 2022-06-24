let ComponentManager = cc.Class.extend({
    name: "ComponentManager",
    /*
    * {
    *   typeIDA: {id1: component1, id2: component2},
    *   typeIDB: {},
    *   ...
    * }
    * */
    components: {},

    getComponent: function (componentID) {
        return this.components[componentID];
    },

    getActiveComponent: function (...componentTypeIDs) {
        // only get active entity
        let entityList = [];
        for (let id of Object.keys(this.components)) {
            if (this.components[id].getActive() && this.components[id].hasAllComponent(...componentTypeIDs)) {
                entityList.push(this.components[id]);
            }
        }
        return entityList;
    },

    addComponent: function (component) {
        if (!this.components[component.typeID]) {
            this.components[component.typeID] = {};
        }
        this.components[component.typeID][component.id] = component;
    },

    removeComponent: function (component) {
        if (this.components[component.typeID] && this.components[component.typeID].length > 0) {

        }
        delete this.components[component.typeID][component.id];
    },
});

let _entityManager = _entityManager || null;
EntityManager.getInstance = function () {
    if (_entityManager === null) {
        _entityManager = new EntityManager();
    }
    return _entityManager;
};
