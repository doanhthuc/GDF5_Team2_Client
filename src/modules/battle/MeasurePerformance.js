let _MeasurePerformanceData = cc.Class.extend({
    ctor: function () {
        this.count = 0;
        this.accTime = 0;
        this.maxTime = 0;
    }
})
let MeasurePerformance = cc.Class.extend({
    ctor: function () {
        this.store = {}
    },

    add: function (time, systemName) {
        if (!this.store[systemName]) {
            this.store[systemName] = new _MeasurePerformanceData();
        }
        let data = this.store[systemName];
        data.count++;
        data.accTime += time;
        if (data.maxTime < time) {
            data.maxTime = time;
        }
    },

    report: function () {
        cc.warn("=== Report Performance ===")
        for (let systemName of Object.keys(this.store)) {
            let data = this.store[systemName];
            let averageTime = (data.accTime / data.count).toFixed(1)
            cc.log("* System: " + systemName + ": average(" + averageTime + "), maxTime(" + data.maxTime + ")")
        }
    }
})

let measurePerformance = new MeasurePerformance();