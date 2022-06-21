var CardNode = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init:function (type,level,amount) {
        this.cardNode = ccs.load(InventoryResources.CARD_NODE, '').node;
        this.addChild(this.cardNode);
    },
});

var Card= cc.Class.extend({
    cardType:0,
    cardLevel:0,
    cardAmount:0,
    ctor:function(){

    },
    ctor:function(type,level,amount)
    {
        this.cardType=type;
        this.cardLevel=level;
        this.amount=amount;
    },
    show:function(){
        cc.log(this.cardType+" "+this.cardLevel+" "+this.cardAmount);
    }
})
