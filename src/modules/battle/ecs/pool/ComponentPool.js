let ComponentPool = ObjectPoolECS.extend({
    name: "ComponentObjectPool",

    ctor: function () {
        this._super();
        this._store = {};
    },

    checkOut: function (ComponentCls) {
        if (!this._store[ComponentCls.typeID]) {
            return null;
        }

        for (let component of this._store[ComponentCls.typeID]) {
            if (component.getActive() === false) {
                return component;
            }
        }

        return null;
    },

    checkIn: function (component) {
        if (!this._store[component.typeID]) {
            this._store[component.typeID] = [];
        }

        // if (component.typeID === AppearanceComponent.typeID) return;

        this._store[component.typeID].push(component);
    }

});

let _instanceBuilder = (function () {
    let _instance = null;
    return {
        getInstance: function () {
            if (_instance === null) {
                _instance = new ComponentPool();
            }
            return _instance;
        },
        resetInstance: function () {
            // FIXME: Should release all component
            _instance = null;
        }
    }
})();
ComponentPool.getInstance = _instanceBuilder.getInstance;
ComponentPool.resetInstance = _instanceBuilder.resetInstance;

