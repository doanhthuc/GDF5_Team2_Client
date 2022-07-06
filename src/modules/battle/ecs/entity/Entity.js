let EntityECS = cc.Class.extend({
    typeID: 0,
    name: "EntityECS",

    ctor: function (typeID, mode) {
        this.typeID = typeID;
        this.components = {};
        this.id = Utils.UUID.genInstanceID();
        this._active = true;

        this.mode = mode;
    },

    addComponent: function (component) {
        // this._isComponent();

        if (this.components[component.typeID]) {
            // TODO: check override or not
        }

        this.components[component.typeID] = component;
        return this;
    },

    removeComponent: function (component) {
        // this._isComponent();
        delete this.components[component.typeID];
    },

    getComponent: function (ComponentCls) {
        if (ComponentCls.typeID === null || ComponentCls.typeID === undefined) {
            throw new Error("Class doesn't have typeID property");
        }
        return this.components[ComponentCls.typeID];
    },

    hasAllComponent: function (...ComponentClss) {
        let c = 0;
        for (let ComponentCls of ComponentClss) {
            if (this.getComponent(ComponentCls)) {
                c++;
            }
        }
        return c === ComponentClss.length;
    },

    hasAnyComponent: function (...componentClss) {
        for (let componentClass of componentClss) {
            if (this.getComponent(componentClass)) {
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

    _isComponent: function (component) {
        if (!(component instanceof Component)) {
            throw new Error("component must be an instance of Component");
        }
    }
});