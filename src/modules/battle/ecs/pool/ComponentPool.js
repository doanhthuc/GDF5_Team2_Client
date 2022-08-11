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

        if (this._store[ComponentCls.typeID].length > 0) {
            let component = this._store[ComponentCls.typeID].pop();
            component.setActive(true);
            // cc.log("Checkout pool component " + component.name + "#id=" + component.id);
            return component;
        }

        return null;
    },

    checkIn: function (component) {
        component.setActive(false);
        if (!this._store[component.typeID]) {
            this._store[component.typeID] = [];
        }

        // if (component.typeID === AppearanceComponent.typeID) return;
        // cc.log("Checkin pool component " + component.name + "#id=" + component.id);

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

