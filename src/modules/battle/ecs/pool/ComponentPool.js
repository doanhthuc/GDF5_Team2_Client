let ComponentPool = cc.Class.extend({
    name: "ComponentObjectPool",

    ctor: function () {
        this.locked = new Map();
        this.unlocked = new Map();
    },

    validate: function (component) {
        cc.log(JSON.stringify(component))
        return component.getActive() === false;
    },

    checkOut: function (typeID) {
        let unlockedMap = this.unlocked.get(typeID);
        if (unlockedMap && unlockedMap.size > 0) {
            let component = unlockedMap.values().next().value;
            if (this.validate(component)) {
                unlockedMap.delete(component.id);
                if (!this.locked.has(typeID)) {
                    this.locked.set(typeID, new Map());
                }
                cc.log(">>>> " + typeID);
                this.locked.get(typeID).set(component.id, component);
                component.setActive(true);
                return component;
            } else {
                unlockedMap.delete(component.typeID);
                // set expire for invalid component
            }
        }

        // create new component
        // let component = this.create(typeID);
        // if (!this.locked.has(typeID)) {
        //     this.locked[typeID] = new Map();
        // }
        // this.locked.get(typeID).set(component.id, component);
        // return component;
        return null;
    },

    checkIn: function (component) {
        if (this.locked.has(component.typeID) && this.get(component.typeID).has(component.id)) {
            this.locked.get(component.typeID).delete(component.id);
        }

        if (this.unlocked.has(component.typeID) === false) {
            this.unlocked.set(component.typeID, new Map());
        }

        this.unlocked.get(component.typeID).set(component.id, component);
        component.setActive(false);
    },

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

