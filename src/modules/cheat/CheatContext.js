const CheatContext = cc.Class.extend({
    ctor: function () {

    },

    cheatUserInfo: function (gold, gem, trophy) {
        let userContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT);
        if (gold && gem && trophy) {
            testnetwork.connector.sendCheatUserInfo(new UserInfoCheat(gold, gem, trophy));
        } else if (!gold && trophy && gem) {
            testnetwork.connector.sendCheatUserInfo(new UserInfoCheat(userContext.user.gold, gem, trophy));
        } else if (gold && !gem && trophy) {
            testnetwork.connector.sendCheatUserInfo(new UserInfoCheat(gold, userContext.user.gem, trophy));
        } else if (gold && gem && !trophy) {
            testnetwork.connector.sendCheatUserInfo(new UserInfoCheat(gold, gem, userContext.user.trophy));
        } else if (!gold && !gem && trophy) {
            testnetwork.connector.sendCheatUserInfo(new UserInfoCheat(userContext.user.gold, userContext.user.gem, trophy));
        } else if (!gold && gem && !trophy) {
            testnetwork.connector.sendCheatUserInfo(new UserInfoCheat(userContext.user.gold, gem, userContext.user.trophy));
        } else if (gold && !gem && !trophy) {
            testnetwork.connector.sendCheatUserInfo(new UserInfoCheat(gold, userContext.user.gem, userContext.user.trophy));
        } else {
            testnetwork.connector.sendCheatUserInfo(new UserInfoCheat(userContext.user.gold, userContext.user.gem, userContext.user.trophy));
        }
    },

    cheatUserCard: function (cardId, cardLevel, accumulatedCard) {
        if (!cardId) return;
        let InventoryContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.INVENTORY_CONTEXT);
        let index = InventoryContext.cardCollectionList.findIndex(card => (card.cardType === cardId));
        if (index !== -1) return;
        if (cardLevel > MAX_CARD_LEVEL) cardLevel = MAX_CARD_LEVEL;
        if (cardId && cardLevel && accumulatedCard) {
            testnetwork.connector.sendCheatUserCard(new Card(cardId, cardLevel, accumulatedCard));
        } else if (cardId && !cardLevel && accumulatedCard) {
            testnetwork.connector.sendCheatUserCard(new Card(cardId, InventoryContext.cardCollectionList[index].cardLevel, accumulatedCard));
        } else if (cardId && cardLevel && !accumulatedCard) {
            testnetwork.connector.sendCheatUserCard(new Card(cardId, cardLevel, InventoryContext.cardCollectionList[index].amount));
        }
    },

    cheatFullChest: function () {
        let treasureContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.TREASURE_CONTEXT);
        for (let i = 0; i < treasureContext.treasureList.length; i++) {
            if (treasureContext.treasureList[i].state === TreasureSlotResources.STATE.EMPTY) {
                testnetwork.connector.sendCheatUserLobbyChest(new ChestInfoCheat(i, TreasureSlotResources.STATE.OCCUPIED, 0));
            }
        }
    },

    onUserInfoCheatSuccess: function (data) {
        let userContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT);
        userContext.user.gold = data.gold;
        userContext.user.gem = data.gem;
        userContext.user.trophy = data.trophy;
        userContext.updateUserInfoUI();
    },

    onCardCheatSuccess: function (data) {
        let InventoryContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.INVENTORY_CONTEXT);
        let index = InventoryContext.cardCollectionList.findIndex(card => (card.cardType === data.cardType));
        if (index !== -1) {
            let card = InventoryContext.cardCollectionList[index];
            card.cardLevel = data.cardLevel;
            card.amount = data.amount;
            InventoryContext.cardCollectionList[index] = card;

            ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.INVENTORY_NODE)
                .cardNodeMap.get(data.cardType)
                .onUpgradeCard(card.cardLevel, card.amount);
        }
    },

    onChestCheatSuccess: function (data) {
        let treasureContext = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.TREASURE_CONTEXT);
        for (let i = 0; i < treasureContext.treasureList.length; i++) {
            if (data.chestId === i) {
                let treasure = treasureContext.treasureList[i];
                treasure.state = data.chestState;
                treasure.claimTime = data.chestClaimTime;
                treasureContext.treasureList[i] = treasure;
                ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.HOME_NODE)
                    .treasureSlotNodeList[i].setStateOfSlot(data.chestState, data.chestClaimTime);
            }
        }
    }


})