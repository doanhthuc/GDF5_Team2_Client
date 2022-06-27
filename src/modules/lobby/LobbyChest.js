var LobbyChest= cc.Class.extend({
    state:0,
    claimTime:0,
    ctor:function(state){
    this.state=state;
    },
    ctor:function(state,claimTime)
    {
        this.state=state;
        this.claimTime=claimTime;
    },
    show:function(){
        cc.log(this.state+" "+this.claimTime+" ");
    }
})