let ComponentManager = ManagerECS.extend({
    name: "ComponentManager",

    ctor: function () {
        this._super();
        this._storeInstance = new Map();
        this._storeCls = new Map();
    },

    registerClass: function (cls) {
        if (cls.typeID === null || cls.typeID === undefined) {
            throw new Error("Class doesn't have typeID property");
        }
        this._storeCls.set(cls.typeID, cls);
    },

    getClass: function (typeID) {
        if (this._storeCls.has(typeID)) {
            throw new Error("Component Class with typeID = " + typeID + " doesn't exist");
        }
    },

    add: function (component) {
        if (this._storeInstance.has(component.id)) {
            throw new Error("Component with typeID = " + component.typeID + ", id = " + component.id + " exists.");
        }

        this._storeInstance.set(component.id, component);
    },

    findByInstanceId: function (instanceId) {
        this._storeInstance.get(instanceId);
    },

    remove: function (component) {
        component.setActive(false);
        this._storeInstance.delete(component.id);
        tickManager.getTickData().deleteComponentData(component.id);
    },
});

let _instanceBuilder = (function () {
    let _instance = null;
    return {
        getInstance: function () {
            if (_instance === null) {
                _instance = new ComponentManager();
            }
            return _instance;
        },
        resetInstance: function () {
            _instance = null;
        }
    }
})();
ComponentManager.getInstance = _instanceBuilder.getInstance;
ComponentManager.resetInstance = _instanceBuilder.resetInstance;