let InventoryNetwork = InventoryNetwork || {};

InventoryNetwork.Connector = cc.Class.extend({
    ctor: function (gameClient) {
        this.gameClient = gameClient;
        gameClient.packetFactory.addPacketMap(InventoryNetwork.packetMap);
        gameClient.receivePacketSignal.add(this.onReceivedPacket, this);
    },

    onReceivedPacket: function (cmd, packet) {
        cc.log("onReceivedPacket:", cmd);
        switch (cmd) {
            case gv.CMD.GET_USER_INVENTORY:
                let inventoryContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.INVENTORY_CONTEXT);

                inventoryContext.setCardCollectionList(packet.cardCollection);
                inventoryContext.setBattleDeckIdList(packet.battleDeckCard);
                ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.BATTLE_DECK_NODE).updateBattleDeck(inventoryContext.battleDeckList);
                ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.CARD_COLLECTION_NODE).updateCardCollection(inventoryContext.cardCollectionList);

                userCardCollection.getItemList(packet);
                cc.log("GetInventory");
                // userCardCollection.show();
                break;
            case gv.CMD.UPGRADE_CARD:
                cc.log(packet.goldChange + " " + packet.cardType + " " + packet.fragmentChange);
                contextManager.getContext(ContextManagerConst.CONTEXT_NAME.INVENTORY_CONTEXT).onUpgradeCardSuccess(packet);
                break;
            case gv.CMD.SWAP_CARD:
                cc.log("asdgdsbgdbdbdbdfbdfbdfsbdfb: " + JSON.stringify(packet));
                this.handleSwapCard(cmd, packet);
                break;
        }
    },

    sendGetUserInventory: function () {
        cc.log("sendGetuserInventory");
        var pk = this.gameClient.getOutPacket(CMDSendGetUserInventory);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },
    sendUpgradeCard: function (cardType) {
        cc.log("sendUpgradeCard");
        var pk = this.gameClient.getOutPacket(CMDSendUpgradeCard);
        pk.pack(cardType);
        this.gameClient.sendPacket(pk);
    },
});