let ComponentManager = cc.Class.extend({
    name: "ComponentManager",

    ctor: function () {
        this._storeInstance = new Map();
        this._storeCls = new Map();
    },

    registerClass: function (cls) {
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
        this._storeInstance.delete(component.id);
    },
});

ComponentManager.getInstance = (function () {
    let _instance = null;
    return function () {
        if (_instance === null) {
            _instance = new ComponentManager();
        }
        return _instance;
    }
})();