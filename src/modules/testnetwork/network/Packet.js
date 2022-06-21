/**
 * Created by KienVN on 10/2/2017.
 */

gv.CMD = gv.CMD ||{};
gv.CMD.HAND_SHAKE = 0;
gv.CMD.USER_LOGIN = 1;
gv.CMD.USER_INFO = 1001;
gv.CMD.ADD_USER_GOLD=1002;
gv.CMD.ADD_USER_GEM=1003;

gv.CMD.BUY_GOLD_SHOP=2001;
gv.CMD.BUY_DAILY_SHOP=2002;
gv.CMD.USER_DAILY_SHOP=2003;

gv.CMD.USER_INVENTORY=3001;

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
CMDSendGetUserInventory= fr.OutPacket.extend(
    {
        ctor:function() {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.USER_INVENTORY);
        },
        pack:function() {
            this.packHeader();
            this.updateSize();
        }
    }
)

CMDSendGetDailyShop= fr.OutPacket.extend(
    {
        ctor:function() {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.USER_DAILY_SHOP);
        },
        pack:function() {
            this.packHeader();
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

CMDSendAddUserGem= fr.OutPacket.extend(
    {
        ctor:function() {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.ADD_USER_GEM);
        },
        pack:function(gem) {
            this.packHeader();
            this.putInt(gem);
            this.updateSize();
        }
    }
)

CMDBuyGoldShop= fr.OutPacket.extend(
    {
        ctor:function() {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.BUY_GOLD_SHOP);
        },
        pack:function(itemId) {
            this.packHeader();
            this.putInt(itemId);
            this.updateSize();
        }
    }
)

CMDBuyDailyShop= fr.OutPacket.extend(
    {
        ctor:function() {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.BUY_DAILY_SHOP);
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

testnetwork.packetMap[gv.CMD.ADD_USER_GEM] = fr.InPacket.extend(
    {
        ctor:function()
        {s
            this._super();
        },
        readData:function(){
            this.usergem=this.getInt();
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

testnetwork.packetMap[gv.CMD.BUY_GOLD_SHOP] = fr.InPacket.extend(
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
testnetwork.packetMap[gv.CMD.BUY_DAILY_SHOP] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.itemtype= [];
            this.itemQuantity= [];
        },
        readData:function(){
            this.goldchange=this.getInt();
            this.gemchange=this.getInt();
            this.itemAmount=this.getInt();
            for(i=0;i<this.itemAmount;i++)
            {
                this.itemtype.push(this.getInt());
                this.itemQuantity.push(this.getInt());
            }
        }
    }
);

testnetwork.packetMap[gv.CMD.USER_INVENTORY] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.cardCollection= [];

        },
        readData:function(){
            this.size = this.getInt();
            for(i=0;i<this.size;i++)
            {
                type=this.getInt();
                level=this.getInt();
                amount=this.getInt();
                this.cardCollection.push(new Card(type,level,amount));
            }
        }
    }
);
testnetwork.packetMap[gv.CMD.USER_DAILY_SHOP] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.dailyShopItem= [];

        },
        readData:function(){
            this.size = this.getInt();
            for(i=0;i<this.size;i++)
            {
                itemType=this.getInt();
                itemQuantity=this.getInt();
                itemPrice=this.getInt();
                itemState=this.getInt();
                this.dailyShopItem.push(new ShopItem(itemType,itemQuantity,itemPrice,itemState));
            }
        }
    }
);



