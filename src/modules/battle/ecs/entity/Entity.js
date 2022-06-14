let EntityECS = cc.Class.extend({
    typeID: 0,
    name: "EntityECS",

    ctor: function (typeID) {
        this.typeID = typeID;
        this.component = {};
        this.id = Utils.genIncrementId();
        this._active = true;

        cc.log("new " + this.name);
    },

    addComponent: function (component) {
        if (!(component instanceof Component)) {
            throw new Error("component must be an instance of Component");
        }

        if (this.component[component.id]) {
            throw new Error("Component with id = " + component.id + " exist");
        }

        this.component[component.id] = component;
        return this;
    },

    removeComponent: function (componentId) {
        delete this.component[componentId];
    },

    getComponent: function (componentId) {
        return this.component[componentId];
    },

    hasAllComponent: function (...componentIds) {
        let c = 0;
        for (let i = 0; i < componentIds.length; i++) {
            if (this.getComponent(componentIds[i])) {
                c++;
            }
        }
        return c === componentIds.length;
    },

    hasAnyComponent: function (...componentIds) {
        for (let i = 0; i < componentIds.length; i++) {
            if (this.getComponent(componentIds[i])) {
                return true;
            }
        }
        return false;
    },

    setActive: function (value) {
        this._active = value;
    },

    getActive: function () {
        return this._active;
    },
});