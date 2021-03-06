const InventoryContext = cc.Class.extend({
    ctor: function () {
        this.battleDeckIdList = [];
        this.battleDeckList = [];
        this.cardCollectionList = [];
    },

    setBattleDeckIdList: function (battleDeckIdList) {
        this.battleDeckIdList = battleDeckIdList;
        this.mapIdListToBattleDeckList();
    },

    mapIdListToBattleDeckList: function () {
        this.battleDeckIdList.forEach((id) => {
            //TODO: add spell
            for (let i = 0; i < this.battleDeckIdList.length; i++) {
                if (this.cardCollectionList[i].cardType === id) {
                    this.cardCollectionList[i].isBattleDeck = true;
                    this.battleDeckList.push(this.cardCollectionList[i]);
                }
            }
        });
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
    },

    upgradeCard: function (cardId) {
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
        let index = this.cardCollectionList.findIndex(card => (card.cardType === data.cardType));
        if (index !== -1) {
            let card = this.cardCollectionList[index];
            card.cardLevel += 1;
            card.amount += data.fragmentChange;

            this.cardCollectionList[index] = card;
            let cardNode = ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.INVENTORY_NODE)
                .cardNodeMap.get(data.cardType);
            cardNode.onUpgradeCard(card.cardLevel, card.amount);
            
            PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.UPGRADE_SUCCESS_POPUP).setCardModel(cardNode.cardModel);
            PopupUIManager.getInstance().showUI(CLIENT_UI_CONST.POPUPS_NAME.UPGRADE_SUCCESS_POPUP);

            contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT).updateUserGold(data.goldChange);

            PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_CARD_DETAIL)
                .updateUIByLevelAndAccumulatedCard(card.cardLevel, card.amount);
        }
    },


    getCardById: function (cardId) {
        for (let card of this.cardCollectionList) {
            cc.log(JSON.stringify(card))
            if (card.cardType === cardId) {
                return card;
            }
        }
        return null;
    },

    updateCardAmount: function (cardId, amountChange) {
        let card = this.getCardById(cardId);
        if (card) {
            card.amount += amountChange;
            let inventoryLayer = ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.INVENTORY_NODE);
            inventoryLayer.cardNodeMap.get(cardId).onUpdateCard(amountChange);

        }
    },

    resetContextData: function () {
        this.battleDeckIdList = [];
        this.battleDeckList = [];
        this.cardCollectionList = [];
    }
});