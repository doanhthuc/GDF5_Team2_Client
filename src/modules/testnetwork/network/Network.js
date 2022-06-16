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
    }
});



