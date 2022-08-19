let Component = cc.Class.extend({
    name: "ComponentECS",
    typeID: 0,

    ctor: function () {
        this.id = UUIDGeneratorECS.genComponentID();
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

Component.readSnapshot = function (inPacket) {
    let newComponent = new Component();

    newComponent.id = inPacket.getLong();
    newComponent._active = inPacket.getShort();

    return newComponent;
}