var LobbyChest= cc.Class.extend({
    state:0,
    claimtime:0,
    ctor:function(state){
    this.state=state;
    },
    ctor:function(state,claimTime)
    {
        this.state=state;
        this.claimtime=claimTime;
    },
    show:function(){
        cc.log(this.state+" "+this.claimtime+" ");
    }
})