let SystemManager = ManagerECS.extend({
    ctor: function () {
        this._super();
        this._storeInstance = new Map();
        this._storeCls = new Map();
    },

    registerClass: function (cls) {
        if (cls.typeID === null || cls.typeID === undefined) {
            throw new Error("System class doesn't have typeID property");
        }
        this._storeCls.set(cls.typeID, cls);
    },

    getClass: function (typeID) {
        if (this._storeCls.has(typeID)) {
            throw new Error("System class with typeID = " + typeID + " doesn't exist");
        }
    },

    add: function (system) {
        if (this._storeInstance.has(system.id)) {
            throw new Error("System with typeID = " + system.typeID + ", id = " + system.id + " exists.");
        }

        this._storeInstance.set(system.id, system);
    },

    findByInstanceId: function (instanceId) {
        this._storeInstance.get(instanceId);
    },

    remove: function (system) {
        this._storeInstance.delete(system.id);
    },
});

let _instanceBuilder = (function () {
    let _instance = null;
    return {
        getInstance: function () {
            if (_instance === null) {
                _instance = new SystemManager();
            }
            return _instance;
        },
        resetInstance: function () {
            _instance = null;
        }
    }
})();
SystemManager.getInstance = _instanceBuilder.getInstance;
SystemManager.resetInstance = _instanceBuilder.resetInstance;