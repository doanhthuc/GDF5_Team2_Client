let ComponentPool = cc.Class.extend({
    /*
    * {
    *   typeIDA: [component1, component2, ...],
    *   typeIDB: [...],
    *   ...
    * }
    * */

    ctor: function () {
        this.pool = {}
    },

    getInActiveComponent: function (componentTypeId) {
        let inactiveComponent = null;
        if (this.pool[componentTypeId]) {
            for (let i = 0; i < this.pool[componentTypeId].length; i++) {
                if (this.pool[componentTypeId][i].getActive() === false) {
                    inactiveComponent = this.pool[componentTypeId][i];
                    inactiveComponent.setActive(true);
                    break;
                }
            }
        }
        return inactiveComponent;
    },

    push: function (component) {
        if (component.typeID in this.pool) {
            this.pool[component.typeID].push(component);
        } else {
            this.pool[component.typeID] = [component];
        }
    }
});
