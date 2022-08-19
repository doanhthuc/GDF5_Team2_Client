gv.CMD = gv.CMD || {};

gv.CMD.GET_USER_INVENTORY = 3001;
gv.CMD.UPGRADE_CARD = 3002;
gv.CMD.SWAP_CARD = 3003;

InventoryNetwork.packetMap = {};

CMDSendGetUserInventory = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.GET_USER_INVENTORY);
        },
        pack: function () {
            this.packHeader();
            this.updateSize();
        }
    }
)

CMDSendUpgradeCard = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.UPGRADE_CARD);
        },
        pack: function (cardType) {
            this.packHeader();
            this.putInt(cardType);
            this.updateSize();
        }
    }
)

CMDSendSwapCard = fr.OutPacket.extend(
    {
        ctor: function () {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.SWAP_CARD);
        },
        pack: function (cardInID, cardOutID) {
            this.packHeader();
            this.putInt(cardInID);
            this.putInt(cardOutID);
            this.updateSize();
        }
    }
)

InventoryNetwork.packetMap[gv.CMD.GET_USER_INVENTORY] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            this.cardCollection = [];
            this.battleDeckCard = [];
            this.cardCollectionSize = this.getInt();
            for (i = 0; i < this.cardCollectionSize; i++) {
                type = this.getInt();
                level = this.getInt();
                amount = this.getInt();
                this.cardCollection.push(new Card(type, level, amount));
            }
            this.battleDeckSize = this.getInt();
            for (i = 0; i < this.battleDeckSize; i++)
                this.battleDeckCard.push(this.getInt());
        }
    }
);

InventoryNetwork.packetMap[gv.CMD.UPGRADE_CARD] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            this.goldChange = this.getInt();
            this.cardType = this.getInt();
            this.fragmentChange = this.getInt();
        }
    }
);

InventoryNetwork.packetMap[gv.CMD.SWAP_CARD] = fr.InPacket.extend(
    {
        ctor: function () {
            this._super();
        },
        readData: function () {
            if (this.error === 0) {
                this.cardInID = this.getInt();
                this.cardOutID = this.getInt();
            }
        }
    }
);