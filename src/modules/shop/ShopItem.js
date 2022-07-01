let ShopItem = cc.Class.extend({
    ctor: function () {

    },

    ctor: function (id, type, quantity, price, state) {
        this.id = id;
        this.type = type;
        this.quantity = quantity;
        this.price = price;
        this.state = state;
    },

    show: function () {
        cc.log(this.id + " " + this.type + " " + this.quantity + " " + this.price + " " + this.state);
    }
});