let Entity = cc.Class({
    properties: {
        id: 0,
        name: "entity",
        component: {}
    },

    addComponent: function (component) {
        if (!(component instanceof Component)) {
            throw new Error("component must be an instance of Component");
        }

        if (this.component[component.id]) {
            throw new Error("Component with id = " + component.id + " exist");
        }

        this.component[component.id] = component
    },

    removeComponent: function (componentId) {
        delete this.component[componentId]
    }
});
