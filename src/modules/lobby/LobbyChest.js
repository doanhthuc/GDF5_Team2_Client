var LobbyChest= cc.Class.extend({
    state:0,
    claimtime:0,
    ctor:function(state){
    this.state=state;
    },
    ctor:function(state,claimtime)
    {
        this.state=state;
        this.claimtime=claimtime;
    },
    show:function(){
        cc.log(this.state+" "+this.claimtime+" ");
    }
})