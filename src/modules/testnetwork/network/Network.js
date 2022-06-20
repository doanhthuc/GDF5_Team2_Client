var gv = gv||{};
var testnetwork = testnetwork||{};

gv.CONSTANT = gv.CONSTANT ||{};
gv.CONSTANT.USERID = 1;

testnetwork.Connector = cc.Class.extend({
    ctor:function(gameClient)
    {
        this.gameClient = gameClient;
        gameClient.packetFactory.addPacketMap(testnetwork.packetMap);
        gameClient.receivePacketSignal.add(this.onReceivedPacket, this);
    },
    onReceivedPacket:function(cmd, packet)
    {
        cc.log("onReceivedPacket:", cmd);
        switch (cmd)
        {
            case gv.CMD.HAND_SHAKE:
                this.sendLoginRequest();
                break;
            case gv.CMD.USER_LOGIN:
                fr.getCurrentScreen().onFinishLogin();
                break;
            case gv.CMD.USER_INFO:
                userInfo.clone(packet);
                userInfo.show();
                break;
            case gv.CMD.ADD_USER_GOLD:
                cc.log(packet.usergold);
                break;
            case gv.CMD.BUY_GOLD_SHOP:
                //cc.log("hmmmm");
                userInfo.gold+=packet.goldchange;
                userInfo.gem+=packet.gemchange;
                //UpdateUI()
                userInfo.show();
                break;
            case gv.CMD.BUY_DAILY_SHOP:

        }
    },
    sendLoginRequest:function() {
        if (UID!=0) {
            cc.log("sendLoginRequest");
            var pk = this.gameClient.getOutPacket(CmdSendLogin);
            pk.pack("", UID);
            this.gameClient.sendPacket(pk);
        }
    },
    sendGetUserInfo:function(){
        cc.log("sendGetUserInfo");
        var pk= this.gameClient.getOutPacket(CMDSendGetUserInfo);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },
    sendAddUserGold:function(gold){
        cc.log("sendAdduserGold");
        var pk=this.gameClient.getOutPacket(CMDSendAddUserGold);
        pk.pack(gold);
        this.gameClient.sendPacket(pk);
    },
    sendBuyGoldShop:function(itemid){
        cc.log("SendBuyShopGold");
        var pk= this.gameClient.getOutPacket(CMDBuyGoldShop);
        pk.pack(itemid);
        this.gameClient.sendPacket(pk);
    },
    sendBuyDailyShop:function(itemid){
      cc.log("SendBuyDailyShop");
      var pk= this.gameClient.getOutPacket(CMDBuyDailyShop);
      pk.pack(itemid);
      this.gameClient.sendPacket(pk);
    },
    sendMove:function(x, y){
        cc.log("SendMove:", x, y);
        var pk = this.gameClient.getOutPacket(CmdSendMove);
        pk.pack(x, y);
        this.gameClient.sendPacket(pk);
    },
    sendResetMap:function()
    {
        cc.log("sendResetMap");
        var pk = this.gameClient.getOutPacket(CmdSendResetMap);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },
});



