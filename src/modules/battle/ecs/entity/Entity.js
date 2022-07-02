let EntityECS = cc.Class.extend({
    typeID: 0,
    name: "EntityECS",

    ctor: function (typeID, mode) {
        this.typeID = typeID;
        this.components = {};
        this.id = Utils.UUID.genInstanceID();
        this._active = true;

        if (!mode) {
            mode = GameConfig.PLAYER;
        }
        this.mode = mode;
    },

    addComponent: function (component) {
        // this._isComponent();

        if (this.components[component.typeID]) {
            // TODO: check override or not
        }

        this.components[component.typeID] = component;
        return this;
    },

    removeComponent: function (component) {
        // this._isComponent();
        delete this.components[component.typeID];
    },

    getComponent: function (typeID) {
        return this.components[typeID];
    },

    hasAllComponent: function (...componentTypeIDs) {
        let c = 0;
        for (let typeID of componentTypeIDs) {
            if (this.getComponent(typeID)) {
                c++;
            }
        }
        return c === componentTypeIDs.length;
    },

    hasAnyComponent: function (...componentTypeIDs) {
        for (let typeID of componentTypeIDs) {
            if (this.getComponent(typeID)) {
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