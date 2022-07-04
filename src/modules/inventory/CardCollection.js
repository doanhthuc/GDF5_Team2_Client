const CardCollectionNode = cc.Node.extend({
    ctor: function () {
        this._super();
        this.init();
    },


    init: function () {
        this.node = ccs.load(InventoryResources.CARD_COLLECTION_NODE, '').node;
        this.addChild(this.node);
        this.backgroundImg = this.node.getChildByName('cardCollectionTitle');
        this.cardSortBtn = this.backgroundImg.getChildByName('cardSortBtn');
        this.cardSortBtn.addTouchEventListener(this.onSortByEnergyBtnClick.bind(this), this);
        this.setNodeHeight();
        this.cardCollection = [];
        this.cardNodeList = [];
        this.toggleSort = false;
    },

    updateCardCollection: function (cardCollection) {
        this.setCardCollection(cardCollection);
        this.setPositionForCardCollection();
    },

    setCardCollection: function (cardCollectionList) {
        cardCollectionList.forEach(card => {
            if (!card.isBattleDeck) {
                this.cardCollection.push(card);
            }
        });
        this.setCardNodeListByCardCollection(this.cardCollection);
    },

    setCardNodeListByCardCollection: function (cardCollection) {
        cardCollection.forEach(card => {
            let cardModel = new CardModel(
                card.cardType,
                card.cardLevel,
                card.amount
            );
            this.addCardNode(cardModel);
        });

    },

    addCardNode: function (cardModel) {
        let cardNode = new CardNode(cardModel);
        this.node.addChild(cardNode);
        this.cardNodeList.push(cardNode);
        ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.INVENTORY_NODE).cardNodeMap.set(cardModel.id, cardNode);
        ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.INVENTORY_NODE).cardNodeList.push(cardNode);
    },

    setPositionForCardCollection: function () {
        let startX = -cc.winSize.width / 2 + InventoryResources.CARD_WIDTH / 2 + InventoryResources.CARD_START_MARGIN;
        let startY = -164;
        for (let i = 0; i < this.cardNodeList.length; i++) {
            if (i !== 0 && i % 4 === 0) {
                startX = -cc.winSize.width / 2 + InventoryResources.CARD_WIDTH / 2 + InventoryResources.CARD_START_MARGIN;
                startY -= InventoryResources.CARD_HEIGHT + 15;
            }
            this.cardNodeList[i].setPosition(startX, startY);
            startX += InventoryResources.CARD_WIDTH + InventoryResources.CARD_RIGHT_MARGIN;
        }
    },

    setNodeHeight: function () {
        this.heightNode = 0;
        this.heightNode += this.backgroundImg.getContentSize().height;
        this.heightNode += (InventoryResources.CARD_HEIGHT + 15) * Math.ceil(4 / InventoryResources.NUM_CARD_ONE_LINE);
        cc.log('CardCollectionNode line 60 heightNode: ' + this.heightNode);
    },

    onSortByEnergyBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.sortCardCollectionNodeByEnergy();
            this.setPositionForCardCollection();
        }
    },

    sortCardCollectionNodeByEnergy: function () {
        this.cardNodeList.sort((a, b) => {
                return !this.toggleSort ? b.cardModel.energy - a.cardModel.energy
                    : a.cardModel.energy - b.cardModel.energy;
            }
        );
        this.toggleSort = !this.toggleSort;
    }
})