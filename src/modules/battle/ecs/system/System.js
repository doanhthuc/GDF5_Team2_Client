let System = cc.Class.extend({
    typeID: 0,
    name: "SystemECS",

    ctor: function () {
        this.id = Utils.UUID.genInstanceID();
    },

    start: function (dt) {
        if (GameConfig.DEBUG) {
            cc.warn(this.name);
            let startTime = (new Date()).getMilliseconds();

            this._run(dt);

            let endTime = (new Date()).getMilliseconds();
            cc.warn("==> Execution time = " + (endTime - startTime));
            cc.warn("---------------------------------------")
        } else {
            this._run(dt);
        }
    },

    _run: function (tick) {
        throw new NotImplementedError();
    },
});
