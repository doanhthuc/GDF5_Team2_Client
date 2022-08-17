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
    END_ONE_TIMER: 2,
    FINISH_PATH: 4,
    PUT_NEW_TOWER: 7,
    FINISH_MATCHING: 8,
    UPGRADE_TOWER: 10,
    DROP_SPELL: 11,
    PUT_TRAP: 12,
    INVALID_PUT_CARD_POSITION: 13,
    SPAWN_MONSTER:14,
        DESTROY_TOWER: 15,
}
