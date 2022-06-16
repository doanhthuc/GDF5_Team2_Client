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
}
