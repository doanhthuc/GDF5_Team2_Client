const TreasureContext = cc.Class.extend({
    ctor: function () {
        this.treasureList = [];
    },

    setTreasureList: function (treasureList) {
        this.treasureList = treasureList.lobbyChest;
        cc.log('TreasureContext Line 8: ' + JSON.stringify(this.treasureList));
        this.onTreasureListUpdated();
    },

    onTreasureListUpdated: function () {
        ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.HOME_NODE).setTreasureSlotNodeList(this.treasureList);
    },

    openChest: function (treasureId) {
        cc.log("openChest: " + treasureId);
        testnetwork.connector.sendUnlockLobbyChest(treasureId);
    },

    speedUpChest: function (treasureId) {
        cc.log("speedUpChest: " + treasureId);
        testnetwork.connector.sendSpeedUpLobbyChest(treasureId);
    },

    claimChest: function (treasureId) {
        cc.log("claimChest: " + treasureId);
        testnetwork.connector.sendClaimLobbyChest(treasureId);
    },

    onUnlockChestSuccess: function (packet) {
        ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.HOME_NODE).onUnlockChestSuccess(packet);
        this.treasureList[packet.lobbyChestid].claimTime = packet.claimTime;
        this.treasureList[packet.lobbyChestid].state = packet.state;
    },

    onSpeedUpChestSuccess: function (packet) {
        ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.HOME_NODE).onSpeedUpChestSuccess(packet);
        this.treasureList[packet.lobbyChestid].claimTime = 0;
        this.treasureList[packet.lobbyChestid].state = packet.state;
        contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT).updateUserGem(packet.gemChange);
        ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.HOME_NODE).treasureSlotNodeList[packet.lobbyChestid].onFinishCountDown();
        PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_OPEN_TREASURE).setItemListTexture(packet);
        PopupUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_OPEN_TREASURE);
        for (let i = 0; i < packet.rewardSize; i++) {
            let rewardType = +packet.itemType[i];
            if (rewardType === 11) {
                contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT).updateUserGold(packet.itemQuantity[i]);
            } else {
                let cardCollectionList = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.INVENTORY_CONTEXT).cardCollectionList;
                for (let j = 0; j < cardCollectionList.length; j++) {
                    if (cardCollectionList[j].cardType === rewardType) {
                        cardCollectionList[j].amount += packet.itemQuantity[i];
                        break;
                    }
                }
                ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.INVENTORY_NODE)
                    .cardNodeMap.get(rewardType).onUpdateCard(packet.itemQuantity[i]);
            }
        }

    },

    onClaimChestSuccess: function (packet) {
        // TODO: define a cardCollection in 1 place (InventoryLayer or InventoryContext)
        ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.HOME_NODE).onClaimChestSuccess(packet);
        this.treasureList[packet.lobbyChestid].claimTime = 0;
        this.treasureList[packet.lobbyChestid].state = packet.state;
        PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_OPEN_TREASURE).setItemListTexture(packet)
        PopupUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_OPEN_TREASURE);
        for (let i = 0; i < packet.rewardSize; i++) {
            let rewardType = +packet.itemType[i];
            if (rewardType === 11) {
                contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT).updateUserGold(packet.itemQuantity[i]);
            } else {
                let cardCollectionList = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.INVENTORY_CONTEXT).cardCollectionList;
                for (let j = 0; j < cardCollectionList.length; j++) {
                    if (cardCollectionList[j].cardType === rewardType) {
                        cardCollectionList[j].amount += packet.itemQuantity[i];
                        break;
                    }
                }
                ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.INVENTORY_NODE)
                    .cardNodeMap.get(rewardType).onUpdateCard(packet.itemQuantity[i]);
            }
        }

    },



    getTreasureById: function (id) {
        if (id < this.treasureList.length) {
            return this.treasureList[i];
        }
        return null;
    }
});