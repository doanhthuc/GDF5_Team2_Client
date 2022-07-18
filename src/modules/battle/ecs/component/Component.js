let Component = cc.Class.extend({
    name: "ComponentECS",
    typeID: 0,

    ctor: function () {
        this.id = UUIDGeneratorECS.getComponentID();
        this._active = true;
    },

    // @Override
    clone: function () {
        return this;
    },

    // @Override
    reset: function () {
        throw new NotImplementedError();
    },

    getActive: function () {
        return this._active;
    },

    setActive: function (value) {
        this._active = value;
    },

    equal: function (anotherComponent) {
        return this.id === anotherComponent.id;
    }
});
Component.typeID = 0;