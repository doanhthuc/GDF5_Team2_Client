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

    checkEntityCondition: function (entity, componentOrCls) {
        return false;
    },

    addEntity: function (entity, componentOrCls) {
        // if (this._entityStore[entity.id]) {
        //     throw new Error("Entity id = " + entity.id + " exists");
        // }
        if (this.checkEntityCondition(entity, componentOrCls)) {
            this._entityStore[entity.id] = entity;
            cc.log("&Add entity id = " + entity.id + " into system: " + this.name);
        }
    },

    removeEntity: function (entity, componentOrCls) {
        if (!this.checkEntityCondition(entity, componentOrCls)) {
            return;
        }

        if (!this._entityStore[entity.id]) {
            throw new Error("Entity id = " + entity.id + " doesn't exist - " + this.name);
        }

        delete this._entityStore[entity.id];
        cc.log("&Remove entity id = " + entity.id + " from system: " + this.name);
    },

    getEntityStore: function () {
        return this._entityStore;
    },
});
