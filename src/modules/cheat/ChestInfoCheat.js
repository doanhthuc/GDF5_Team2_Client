var ChestInfoCheat= cc.Class.extend({
    chestId:0,
    chestState:0,
    chestRemainingTime:0,
    ctor:function (id,state,time){
        this.chestId=id;
        this.chestState=state;
        this.chestRemainingTime=time;
    }
})