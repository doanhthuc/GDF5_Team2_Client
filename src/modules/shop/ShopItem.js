var ShopItem= cc.Class.extend({
    itemId:0,
    type:0,
    quantity:0,
    price:0,
    state:0,
    ctor:function(){

    },
    ctor:function(id,type,quantity,price,state)
    {
        this.itemID=id;
        this.type=type;
        this.quantity=quantity;
        this.price=price;
        this.state=state;
    },
    show:function(){
        cc.log(this.itemID+" "+this.type+" "+this.quantity+" "+this.price+" "+this.state);
    }
})