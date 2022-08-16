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
            let execTime = endTime - startTime;
            measurePerformance.add(execTime, this.name);
            if (GameConfig.DEBUG) {
                cc.log(this.name + "===> Execution Time: " + execTime)
            }
        } else {
            this.updateData();
        }
    },

    updateData: function () {

    }
});
