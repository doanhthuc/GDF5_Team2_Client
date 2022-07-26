let EntityECS = cc.Class.extend({
    typeID: 0,
    name: "EntityECS",

    ctor: function (typeID, mode) {
        this.typeID = typeID;
        this.components = {};
        this.id = UUIDGeneratorECS.genEntityID();
        this._active = true;

        this.mode = mode;
        this.bitmask = 0;
    },

    addComponent: function (component) {
        if (this.components[component.typeID]) {
            // TODO: check override or not
        }
        component.setActive(true);
        this.components[component.typeID] = component;
        this.bitmask = this.bitmask | (1 << component.typeID);
        return this;
    },

    removeComponent: function (componentOrCls) {
        let component = this.components[componentOrCls.typeID];
        if (component) {
            ComponentManager.getInstance().remove(component);
            delete this.components[componentOrCls.typeID];
            this.bitmask = this.bitmask & (~(1 << componentOrCls.typeID));
        }

    },

    getComponent: function (ComponentCls) {
        if (ComponentCls.typeID == null) {
            throw new Error("Class doesn't have typeID property");
        }
        return this.components[ComponentCls.typeID];
    },

    _hasComponent: function (ComponentCls) {
        return (this.bitmask & (1 << ComponentCls.typeID)) !== 0;
    },

    hasAllComponent: function (...ComponentClss) {
        let c = 0;
        for (let cls of ComponentClss) {
            if (this._hasComponent(cls)) {
                c++;
            }
        }
        return c === ComponentClss.length;
    },

    hasAnyComponent: function (...ComponentClss) {
        for (let cls of ComponentClss) {
            if (this._hasComponent(cls)) {
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