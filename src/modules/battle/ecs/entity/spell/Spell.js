let Spell = cc.Class.extend({
    ctor: function () {

    }
})

let FireSpell = Spell.extend({
    ctor: function (state) {
        this._super();
        this.state = state;
    },

    exec: function () {

    }
});

let SpellState = cc.Class.extend({
    ctor: function () {

    }
});
