let EntityECS = cc.Class.extend({
    typeID: 0,
    name: "EntityECS",

    ctor: function (typeID, mode) {
        this.typeID = typeID;
        this.components = {};
        this.id = Utils.UUID.genInstanceID();
        this._active = true;

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

    getComponent: function (typeIDOrComponentCls) {
        if (typeof typeIDOrComponentCls === "number") {
            return this.components[typeIDOrComponentCls];
        } else {
            if (typeIDOrComponentCls.typeID === null || typeIDOrComponentCls.typeID === undefined) {
                throw new Error("Class doesn't have typeID property");
            }
            return this.components[typeIDOrComponentCls.typeID];
        }
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

EntityECS.destroy = function (entity) {
    let appearanceComponent = entity.getComponent(GameConfig.COMPONENT_ID.APPEARANCE)
    if (appearanceComponent) {
        let sprite = appearanceComponent.sprite;
        sprite.setVisible(false);
    }

    entity.setActive(false);
    for (let key of Object.keys(entity.components)) {
        // FIXME: Pool invalid native object
        // ComponentPool.getInstance().checkIn(entity.components[key]);
    }
}