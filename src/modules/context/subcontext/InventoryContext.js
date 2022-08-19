const InventoryContext = cc.Class.extend({
    ctor: function () {
        this.battleDeckIdList = [];
        this.battleDeckList = [];
        this.cardCollectionList = [];
    },

    setBattleDeckIdList: function (battleDeckIdList) {
        this.battleDeckIdList = battleDeckIdList;
        this.mapIdListToBattleDeckList();

        for (let i = 0; i < this.cardCollectionList.length; i++) {
            cc.log(JSON.stringify(this.cardCollectionList[i]));
        }
    },

    mapIdListToBattleDeckList: function () {
        this.battleDeckIdList.forEach((id) => {
            //TODO: add spell
            for (let i = 0; i < this.cardCollectionList.length; i++) {
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
                    InventoryNetwork.connector.sendUpgradeCard(cardId);
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
    },

    /**
     * @param {number} cardIdInCollection - the id of card will be added to the battle deck
     * @param {number} cardIdInBattleDeck - the id of card will be removed from the battle deck and added to the collection
     */
    swapCardFromCollectionToBattleDeck: function (cardIdInCollection, cardIdInBattleDeck) {
        let cardInCollection = this.getCardById(cardIdInCollection);
        let cardInBattleDeck = this.battleDeckList.find(card => (card.cardType === cardIdInBattleDeck));
        if (cardInCollection && cardInBattleDeck) {
            InventoryNetwork.connector.sendSwapCard(cardIdInCollection, cardIdInBattleDeck);
        }
    },

    onSwapCardSuccess: function (newCardIdInBattleDeck, newCardIdInCollection) {
        this.cardCollectionList.forEach((card) => {
            if (card.cardType === newCardIdInBattleDeck) {
                card.isBattleDeck = true;
                this.battleDeckList.push(card);
            } else if (card.cardType === newCardIdInCollection) {
                card.isBattleDeck = false;
            }
        });
        this.removeCardFromBattleDeck(newCardIdInCollection);
    },

    removeCardFromBattleDeck: function (cardId) {
        for (let i = 0; i < this.battleDeckList.length; i++) {
            if (this.battleDeckList[i].cardType === cardId) {
                this.battleDeckList.splice(i, 1);
                break;
            }
        }
    },
});