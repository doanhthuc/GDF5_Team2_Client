let ComponentPool = cc.Class.extend({
    name: "ComponentObjectPool",

    ctor: function () {
        this.locked = new Map();
        this.unlocked = new Map();
    },

    validate: function (component) {
        return component.getActive() === false;
    },

    checkOut: function (typeID) {
        let unlockedMap = this.unlocked.get(typeID);
        if (unlockedMap && unlockedMap.size > 0) {
            let component = unlockedMap.values().next();
            if (this.validate(component)) {
                unlockedMap.delete(component.id);
                if (!this.locked.has(typeID)) {
                    this.locked[typeID] = new Map();
                }
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

