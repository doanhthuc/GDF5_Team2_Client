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
    BULLET_COLLIDE_MONSTER: 1,
    END_ONE_TIMER: 2,
    END_ALL_WAVE: 3,
    FINISH_PATH: 4,
    ZERO_ENERGY_OPPONENT_HOUSE: 5,
    ZERO_ENERGY_HOUSE:6,
    PUT_NEW_TOWER: 7,
    FINISH_MATCHING: 8,
    CHANGE_STATE_ENTITY: 9,
    EXPLOSION_FIRE_SPELL: 10,
    EXPLOSION_FROZEN_SPELL: 11,
}
