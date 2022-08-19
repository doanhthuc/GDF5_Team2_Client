let AuthNetwork = AuthNetwork || {};

AuthNetwork.Connector = cc.Class.extend({
    ctor: function (gameClient) {
        this.gameClient = gameClient;
        gameClient.packetFactory.addPacketMap(AuthNetwork.packetMap);
        gameClient.receivePacketSignal.add(this.onReceivedPacket, this);
    },

    onReceivedPacket: function (cmd, packet) {
        cc.log("onReceivedPacket:", cmd);
        switch (cmd) {
            case gv.CMD.HAND_SHAKE:
                this.sendLoginRequest();
                break;
            case gv.CMD.USER_LOGIN:
                fr.getCurrentScreen().showNotice("Đăng nhập thành công")
                setTimeout(function () {
                    fr.getCurrentScreen().onFinishLogin();
                }, 300);
                break;
            case gv.CMD.GET_USER_INFO:
                userInfo.clone(packet);
                userInfo.show();
                let userContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT);

                TimeUtil.setDeltaTime(packet.serverTime);
                userContext.setUserInfoFromPackage(userInfo);

                userContext.updateUserInfoUI();
                break;
        }
    },

    sendLoginRequest: function () {
        if (UID != 0) {
            cc.log("sendLoginRequest");
            let pk = this.gameClient.getOutPacket(CmdSendLogin);
            pk.pack("", UID);
            this.gameClient.sendPacket(pk);
        }
    },
    sendGetUserInfo: function () {
        cc.log("sendGetUserInfo");
        let pk = this.gameClient.getOutPacket(CMDSendGetUserInfo);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },
});