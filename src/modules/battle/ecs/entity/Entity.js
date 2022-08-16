let EntityECS = cc.Class.extend({
    typeID: 0,
    name: "EntityECS",

    ctor: function (typeID, mode) {
        this.typeID = typeID;
        this.components = {};
        this.id = UUIDGeneratorECS.genEntityID();
        this._active = true;

        this.mode = mode;
       // this.bitmask = 0;
        this.bitmask = [];
        cc.log("&New entity id = " + this.id);
    },

    addComponent: function (component) {
        if (this.components[component.typeID]) {
            ComponentManager.getInstance().remove(component);
        }
        component.setActive(true);
        this.components[component.typeID] = component;
        ComponentManager.getInstance().add(component);
        //this.bitmask = this.bitmask | (1 << component.typeID);
        this.bitmask[component.typeID] = 1;
        SystemManager.getInstance().addEntityIntoSystem(this);
        return this;
    },

    removeComponent: function (componentOrCls) {
        let component = this.components[componentOrCls.typeID];
        if (component) {
            SystemManager.getInstance().removeEntityFromSystem(this);
            ComponentManager.getInstance().remove(component);
            if (componentOrCls.typeID === VelocityComponent.typeID) {
                cc.log("remove velocity component from entity id = " + this.id);
            }
            delete this.components[componentOrCls.typeID];
        //    this.bitmask = this.bitmask & (~(1 << componentOrCls.typeID));
            this.bitmask[component.typeID] = 0;
        }
        // tickManager.getTickData().deleteComponentData(component.id);
    },

    getComponent: function (ComponentCls) {
        if (ComponentCls.typeID == null) {
            throw new Error("Class doesn't have typeID property");
        }
        return this.components[ComponentCls.typeID];
    },

    _hasComponent: function (ComponentCls) {
        // return (this.bitmask & (1 << ComponentCls.typeID)) !== 0;
        return this.bitmask[ComponentCls.typeID] === 1;
    },

    hasAllComponent: function (...ComponentClss) {
        let c = 0;
        for (let cls of ComponentClss) {
            if (this._hasComponent(cls)) {
                c++;
            } else {
                return false;
            }
        }
        return c === ComponentClss.length;
    },

    hasAnyComponent: function (...ComponentClss) {
        for (let cls of ComponentClss) {
            if (this.getComponent(cls)) {
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