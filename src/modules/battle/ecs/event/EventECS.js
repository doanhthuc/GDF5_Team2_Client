let EventECS = cc.Class.extend({
    ctor: function (name) {
        this.name = name;
        this.callbackList = [];
    },

    addCallback: function (cb) {
        this.callbackList.push(cb);
    },

    fire: function (data) {
        for (let cb of this.callbackList) {
            cb(data);
        }
    }
});

let EventType = {
    BULLET_COLLIDE_MONSTER: 0,
    RESET_INIT_VELOCITY: 1,
    END_TIMER: 2,
    END_ALL_WAVE: 3
}
