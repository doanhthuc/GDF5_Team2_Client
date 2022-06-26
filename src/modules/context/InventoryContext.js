const InventoryContext = cc.Class.extend({
    ctor: function () {
        this.battleDeckIdList = [];
        this.battleDeckList = [];
        this.cardCollectionList = [];
        // this.init();
    },

    setBattleDeckIdList: function (battleDeckIdList) {
        this.battleDeckIdList = battleDeckIdList;
        // this.battleDeckIdList.forEach(function (battleDeck) {
        //     cc.log('battleDeck: ' + JSON.stringify(battleDeck));
        // });
        this.mapIdListToBattleDeckList();
    },

    mapIdListToBattleDeckList: function () {
        this.battleDeckIdList.forEach((id) => {
            //TODO: add spell add
            for (let i = 0; i < this.battleDeckIdList.length; i++) {
                if (this.cardCollectionList[i].cardType === id) {
                    this.cardCollectionList[i].isBattleDeck = true;
                    this.battleDeckList.push(this.cardCollectionList[i]);
                }
            }
        });

        /*this.battleDeckList.forEach(function (battleDeck) {
            cc.log('battleDeck: ' + JSON.stringify(battleDeck));
        });*/
    },

    setCardCollectionList: function (cardCollectionList) {
        this.cardCollectionList = cardCollectionList;
        this.cardCollectionList.map((card) => {
            return {
                cardType: card.cardType,
                cardLevel: card.cardLevel,
                amount: card.amount,
                isBattleDeck: false,
            };
        })
        this.cardCollectionList.forEach(function (cardCollection) {
            cc.log('cardCollection: ' + JSON.stringify(cardCollection));
        });
    },

    upgradeCard: function (cardId) {
        cc.log('InventoryContext.js line 40 ~~~~~ upgradeCard: ' + cardId);
        cc.log('userGold: ' + contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT).user.gold)
        for (let card of this.cardCollectionList) {
            if (card.cardType === cardId) {
                if (card.amount >= JsonReader.getCardUpgradeConfig()[card.cardLevel + 1].fragments &&
                    contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT).user.gold >=
                    JsonReader.getCardUpgradeConfig()[card.cardLevel + 1].gold) {
                    testnetwork.connector.sendUpgradeCard(cardId);
                    return;
                }
            }
        }
    },

    onUpgradeCardSuccess: function (data) {
        cc.log('InventoryContext.js line 51 ~~~~~ onUpgradeCardSuccess: ' + JSON.stringify(data));
        let index = this.cardCollectionList.findIndex(card => (card.cardType === data.cardType));
        if (index !== -1) {
            let card = this.cardCollectionList[index];
            card.cardLevel += 1;
            card.amount += data.fragmentChange;
            contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT).user.gold += data.goldChange;

            this.cardCollectionList[index] = card;
            // let testCardModel = new CardModel(card.cardType, card.cardLevel, card.amount);
            ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.INVENTORY_NODE)
                .cardNodeMap.get(data.cardType)
                .onUpgradeCard(card.cardLevel, card.amount);

            // ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_CARD_DETAIL)
            //     .cardNode.updateCardNodeUI(card.amount);

            contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT).updateUserGold(data.goldChange);

            ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_CARD_DETAIL)
                .updateUIByLevelAndAccumulatedCard(card.cardLevel, card.amount);
        }
    }

});