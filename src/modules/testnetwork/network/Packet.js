/**
 * Created by KienVN on 10/2/2017.
 */

gv.CMD = gv.CMD ||{};
gv.CMD.HAND_SHAKE = 0;
gv.CMD.USER_LOGIN = 1;
gv.CMD.USER_INFO = 1001;
gv.CMD.ADD_USER_GOLD=1002;
gv.CMD.BUY_SHOP_GOLD=2001;
gv.CMD.MOVE = 2005;
gv.CMD.MAP_INFO = 2004;
gv.CMD.RESET_MAP = 2006;

testnetwork = testnetwork||{};
testnetwork.packetMap = {};

/** Outpacket */

//Handshake
CmdSendHandshake = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(gv.CONTROLLER_ID.SPECIAL_CONTROLLER);
            this.setCmdId(gv.CMD.HAND_SHAKE);
        },
        putData:function(){
            //pack
            this.packHeader();
            //update
            this.updateSize();
        }
    }
)

CmdSendLogin = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.USER_LOGIN);
        },
        pack:function(sessionKey, userID){
            this.packHeader();
            this.putString(sessionKey);
            this.putInt(userID);
            this.updateSize();
        }
    }
)
CMDSendGetUserInfo= fr.OutPacket.extend(
    {
        ctor:function() {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.USER_INFO);
        },
        pack:function() {
            this.packHeader();
            //this.putInt(userID);
            this.updateSize();
        }
    }
)
CMDSendAddUserGold= fr.OutPacket.extend(
    {
        ctor:function() {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.ADD_USER_GOLD);
        },
        pack:function(gold) {
            this.packHeader();
            this.putInt(gold);
            this.updateSize();
        }
    }
)

CMDBuyShopGold= fr.OutPacket.extend(
    {
        ctor:function() {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.BUY_SHOP_GOLD);
        },
        pack:function(itemId) {
            this.packHeader();
            this.putInt(itemId);
            this.updateSize();
        }
    }
)




/**
 * InPacket
 */

//Handshake
testnetwork.packetMap[gv.CMD.HAND_SHAKE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

            this.token = this.getString();
        }
    }
);

testnetwork.packetMap[gv.CMD.USER_LOGIN] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
        }
    }
);

testnetwork.packetMap[gv.CMD.RESET_MAP] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
        }
    }
);
testnetwork.packetMap[gv.CMD.ADD_USER_GOLD] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
           this.usergold=this.getInt();
        }
    }
);


testnetwork.packetMap[gv.CMD.USER_INFO] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.id = this.getInt();
            this.username= this.getString();
            this.gold=this.getInt();
            this.gem=this.getInt();
            this.trophy=this.getInt();
        }
    }
);

testnetwork.packetMap[gv.CMD.BUY_SHOP_GOLD] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
           this.goldchange=this.getInt();
           this.gemchange=this.getInt();
        }
    }
);

testnetwork.packetMap[gv.CMD.MAP_INFO] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.x = this.getInt();
            this.y = this.getInt();

            var mapW = this.getInt();
            var mapH = this.getInt();
            this.mapState = [];
            for(var i = 0; i < mapW; i++)
            {
                this.mapState[i] = [];
                for(var j = 0; j < mapH; j++)
                {
                    this.mapState[i][j] = this.getBool();
                }
            }
        }
    }
);



