let EntityECS = cc.Class.extend({
    typeID: 0,
    name: "EntityECS",

    ctor: function (typeID, mode) {
        this.typeID = typeID;
        this.components = {};
        this.id = UUIDGeneratorECS.genEntityID();
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
        ComponentManager.getInstance().add(component);
        this.bitmask[component.typeID] = 1;
        SystemManager.getInstance().addEntityIntoSystem(this, component);
        return this;
    },

    removeComponent: function (componentOrCls) {
        let component = this.components[componentOrCls.typeID];
        if (component) {
            SystemManager.getInstance().removeEntityFromSystem(this, componentOrCls);
            ComponentManager.getInstance().remove(component);
            delete this.components[componentOrCls.typeID];
            this.bitmask[component.typeID] = 0;
        }
    },

    getComponent: function (ComponentCls) {
        if (ComponentCls.typeID == null) {
            throw new Error("Class doesn't have typeID property");
        }
        return this.components[ComponentCls.typeID];
    },

    _hasComponent: function (ComponentCls) {
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

EntityECS.readSnapshot = function (inPacket) {
    let newEntity = new EntityECS();
    newEntity.typeID = inPacket.getInt();
    newEntity.id = inPacket.getLong();
    newEntity._active = inPacket.getShort();

    let componentSize = inPacket.getInt();

    for (let j = 1; j <= componentSize; j++) {
        let componentTypeID = inPacket.getInt();

        let ComponentCls = ComponentManager.getInstance().getClass(componentTypeID);
        let component = ComponentCls.readSnapshot(inPacket);
        component.typeID = componentTypeID;

        newEntity.components[component.id] = component;
    }

    return newEntity;
}