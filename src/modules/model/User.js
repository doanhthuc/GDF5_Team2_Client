const User = cc.Class.extend({

    ctor: function (id, username, trophy, gold, gem) {
        this._super();
        this.id = id;
        this.username = username;
        this.trophy = trophy;
        this.gold = gold;
        this.gem = gem;
    },
    

})