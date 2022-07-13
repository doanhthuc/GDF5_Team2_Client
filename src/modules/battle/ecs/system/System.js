let System = cc.Class.extend({
    typeID: 0,
    name: "SystemECS",

    ctor: function () {
        this.id = Utils.UUID.genInstanceID();
    },

    run: function (tick) {
        throw new NotImplementedError();
    },
});
