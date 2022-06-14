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

        if (this.component[component.typeID]) {
            // TODO: add custom error
            throw new Error("Component with typeID = " + component.typeID + " exist");
        }

        this.component[component.typeID] = component;
        return this;
    },

    removeComponent: function (typeID) {
        delete this.component[typeID];
    },

    getComponent: function (typeID) {
        return this.component[typeID];
    },

    hasAllComponent: function (...componentTypeIds) {
        let c = 0;
        for (let i = 0; i < componentTypeIds.length; i++) {
            if (this.getComponent(componentTypeIds[i])) {
                c++;
            }
        }
        return c === componentTypeIds.length;
    },

    hasAnyComponent: function (...componentTypeIds) {
        for (let i = 0; i < componentTypeIds.length; i++) {
            if (this.getComponent(componentTypeIds[i])) {
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