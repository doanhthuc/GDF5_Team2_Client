let EntityECS = cc.Class.extend({
    typeID: 0,
    name: "EntityECS",

    ctor: function (typeID, mode, id) {
        this.typeID = typeID;
        this.components = {};
        if (id) {
            this.id = id;
        } else {
            this.id = UUIDGeneratorECS.genEntityID(mode);
        }
        this._active = true;

        this.mode = mode;
        this.bitmask = [];
    },

    addComponent: function (component) {
        if (this.components[component.typeID]) {
            ComponentManager.getInstance().remove(component);
        }
        component.setActive(true);
        this.components[component.typeID] = component;
        // ComponentManager.getInstance().add(component);
        this.bitmask[component.typeID] = 1;
        SystemManager.getInstance().addEntityIntoSystem(this, component);
        return this;
    },

    removeComponent: function (componentOrCls) {
        let component = this.components[componentOrCls.typeID];
        if (component) {
            SystemManager.getInstance().removeEntityFromSystem(this, componentOrCls);
            // ComponentManager.getInstance().remove(component);
            delete this.components[componentOrCls.typeID];
            this.bitmask[component.typeID] = 0;
        }
    },

    getComponent: function (ComponentClsOrTypeID) {
        let typeID;
        if (typeof ComponentClsOrTypeID === "number") {
            typeID = ComponentClsOrTypeID;
        } else {
            typeID = ComponentClsOrTypeID.typeID;
        }

        if (typeID == null) {
            throw new Error("Class doesn't have typeID property");
        }
        return this.components[typeID];
    },

    _hasComponent: function (ComponentClsOrTypeID) {
        let typeID;
        if (typeof ComponentClsOrTypeID === "number") {
            typeID = ComponentClsOrTypeID;
        } else {
            typeID = ComponentClsOrTypeID.typeID;
        }

        return this.bitmask[typeID] === 1;
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

    setComponentStore: function (componentStore) {
        this.components = componentStore;
    },

    getComponentStore: function () {
        return this.components;
    }
});

EntityECS.unpackData = function (inPacket) {
    let data = {};
    data.typeID = inPacket.getInt();
    data.id = inPacket.getLong();
    data._active = Utils.convertShortToBoolean(inPacket.getShort());
    data.mode = Utils.convertShortToMode(inPacket.getShort());

    data.components = {};

    let componentSize = inPacket.getInt();

    for (let j = 1; j <= componentSize; j++) {
        let componentTypeID = inPacket.getInt();

        let ComponentCls = ComponentManager.getInstance().getClass(componentTypeID);
        let component = ComponentCls.unpackData(inPacket);
        component.typeID = componentTypeID;

        data.components[component.typeID] = component;
    }

    return data;
}