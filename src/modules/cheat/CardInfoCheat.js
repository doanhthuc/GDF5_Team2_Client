const CardCheat= cc.Class.extend({
    ctor:function (Card){
        this.cardType=Card.cardType;
        this.level=Card.cardLevel;
        this.amount=Card.amount;
    }
})