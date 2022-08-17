let SystemManager = ManagerECS.extend({
    ctor: function () {
        this._super();
        this._storeInstance = [];
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
        if (this._storeInstance[system.typeID]) {
            throw new Error("System with typeID = " + system.typeID + ", id = " + system.id + ", name = " + system.name + " exists.");
        }

        this._storeInstance[system.typeID] = system;
    },

    getSystemByTypeID: function (SystemCls) {
        if (!this._storeInstance[SystemCls.typeID]) {
            throw new Error("System name = " + SystemCls.name + " not found")
        }
        return this._storeInstance[SystemCls.typeID];
    },

    remove: function (system) {
        this._storeInstance.delete(system.id);
    },

    addEntityIntoSystem: function (entity, componentOrCls) {
        for (let systemTypeID in this._storeInstance) {
            let system = this._storeInstance[systemTypeID];
            system.addEntity(entity, componentOrCls);
        }
    },

    removeEntityFromSystem: function (entity, componentOrCls) {
        for (let systemTypeID in this._storeInstance) {
            let system = this._storeInstance[systemTypeID];
            system.removeEntity(entity, componentOrCls);
        }
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
            _instance._storeInstance = null;
            _instance._storeCls = null;
            _instance = null;
        }
    }
})();
SystemManager.getInstance = _instanceBuilder.getInstance;
SystemManager.resetInstance = _instanceBuilder.resetInstance;