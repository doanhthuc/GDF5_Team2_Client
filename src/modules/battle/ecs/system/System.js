let System = cc.Class.extend({
    typeID: 0,
    name: "SystemECS",

    ctor: function () {
        this.id = UUIDGeneratorECS.genSystemID();
        this._entityStore = {};
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

    },

    checkEntityCondition: function (entity) {
        return false;
    },

    addEntity: function (entity) {
        // if (this._entityStore[entity.id]) {
        //     throw new Error("Entity id = " + entity.id + " exists");
        // }
        if (this.checkEntityCondition(entity)) {
            this._entityStore[entity.id] = entity;
            cc.log("&Add entity id = " + entity.id + " into system: " + this.name);
        }
    },

    removeEntity: function (entity) {
        if (!this.checkEntityCondition(entity)) {
            return;
        }

        if (!this._entityStore[entity.id]) {
            cc.log("ABC")
            cc.log(JSON.stringify(entity))
            cc.log(JSON.stringify(entity.getComponent(VelocityComponent)))
            throw new Error("Entity id = " + entity.id + " doesn't exist - " + this.name);
        }

        delete this._entityStore[entity.id];
        cc.log("&Remove entity id = " + entity.id + " from system: " + this.name);
    },

    getEntityStore: function () {
        return this._entityStore;
    },
});
