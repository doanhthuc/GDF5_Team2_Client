let ShopItem = cc.Class.extend({
    type: 0,
    quantity: 0,
    price: 0,
    state: 0,

    ctor: function () {

    },

    ctor: function (type, quantity, price, state) {
        this.type = type;
        this.quantity = quantity;
        this.price = price;
        this.state = state;
    },

    show: function () {
        cc.log(this.type + " " + this.quantity + " " + this.price + " " + this.state);
    }
})