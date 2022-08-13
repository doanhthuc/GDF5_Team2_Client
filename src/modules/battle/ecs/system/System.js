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
            let startTime = Date.now();
            this.updateData();
            let endTime = Date.now();
            measurePerformance.add(endTime - startTime, this.name);
        } else {
            this.updateData();
        }
    },

    updateData: function () {

    }
});
