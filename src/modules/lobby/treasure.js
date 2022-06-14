const treasure = cc.Node.extend({

    ctor: function (type) {
        this.type = type;
        this._super();
        this.init();
    },

})