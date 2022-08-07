let System = cc.Class.extend({
    typeID: 0,
    name: "SystemECS",

    ctor: function () {
        this.id = UUIDGeneratorECS.genSystemID();
    },

    start: function (dt) {
        this._run(dt);
    },

    _run: function (tick) {
        throw new NotImplementedError();
    },

    runUpdateData: function () {
        if (GameConfig.DEBUG) {
            cc.warn(this.name);
            let startTime = Date.now();

            this.updateData();

            let endTime = Date.now();
            cc.warn("==> Execution time = " + (endTime - startTime));
            cc.warn("---------------------------------------")
        } else {
            this.updateData();
        }
    },

    updateData: function () {

    }
});
