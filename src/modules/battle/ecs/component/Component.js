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
    },

    readData: function (data) {
        this.id = data.id;
        this._active = data._active;
    }
});
Component.typeID = 0;

Component.unpackData = function (inPacket) {
    let data = {};
    data.id = inPacket.getLong();
    data._active = Utils.convertShortToBoolean(inPacket.getShort());

    return data;
}