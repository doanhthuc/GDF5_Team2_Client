const CardDeckNode2 = cc.Node.extend({
    ctor: function (cardDeckListData) {
        this._super();
        this.cardDeckListData = cardDeckListData;
        this.selectableCardIdList = this.cardDeckListData.getFirst4CardId();
        this.selectedCardType = null;
        this.nextCardPosition = null;
        this.cardSlotNodeList = [];

        this.rootNode = ccs.load(BattleResource.CARD_DECK_NODE, "").node;
        this.addChild(this.rootNode);
        BattleManager.getInstance().registerCardDeckNode(this);

        this.init();
    },

    init: function () {
        // background
        let background = this.rootNode.getChildByName("background");
        this.width = background.width;
        this.height = background.height;

        // energy progress
        let progressPos = this.rootNode.getChildByName("progress").getPosition();
        this.deckEnergyProgress = new DeckEnergyProgress();
        this.deckEnergyProgress.setPosition(this.rootNode.convertToNodeSpace(progressPos));
        this.rootNode.addChild(this.deckEnergyProgress);

        for (let i = 0; i < this.selectableCardIdList.length; i++) {
            let card = this.rootNode.getChildByName("card_" + (i + 1));
            let cardPos = this.rootNode.convertToNodeSpace(card.getPosition());
            let cardSlot = new CardDeckSlot2(this.selectableCardIdList[i]);
            cardSlot.setPosition(cardPos);
            cardSlot.cardBackgroundBtn.addTouchEventListener(this.onCardClick.bind(this), this);
            this.cardSlotNodeList.push(cardSlot);
            this.rootNode.addChild(cardSlot);
        }

        this.initNextCardSlot();
    },

    initNextCardSlot: function () {
        let card = this.rootNode.getChildByName("card_5");
        let cardId = this.cardDeckListData.getNextCardId();
        this.nextCardSlot = new CardDeckSlot(cardId);
        this.nextCardPosition = card.getPosition();
        this.nextCardSlot.setPosition(card.getPosition());
        this.nextCardSlot.setScale(0.6449, 0.6449);
        this.rootNode.addChild(this.nextCardSlot, 1);
    },

    testOnclick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            console.log("aaaaaaaaaaaaaaaaaaaaaffffffffffffddddddddddddddd");
        }
    },

    onCardClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_BEGAN) {
            if (sender.parent.parent.type === this.selectedCardType) {
                let card = this.cardSlotNodeList.find(card => card.type === this.selectedCardType);
                cc.log(JSON.stringify(this.selectedCardType));
                this.selectedCardType = null;
                this._moveCardDown(card)
            } else {
                if (this.selectedCardType !== null) {
                    let prevSelectedCard = this.cardSlotNodeList.find(card => card.type === this.selectedCardType);
                    this._moveCardDown(prevSelectedCard);
                }
                let card = sender.parent.parent;
                this.selectedCardType = card.type;
                cc.log("aaaaaa:  " + this.selectedCardType);
                this._moveCardUp(card);
            }
        }
        if (type === ccui.Widget.TOUCH_MOVED) {
            cc.log("move");
        }
        if (type === ccui.Widget.TOUCH_ENDED) {
            cc.log("end");
            cc.log(sender)
        }
    },
    _moveCardUp: function (card) {
        let moveTop = cc.moveBy(1, cc.p(0, 30)).easing(cc.easeElasticOut());
        card.runAction(cc.sequence(moveTop));
        card.isUp = true;
    },

    _moveCardDown: function (card) {
        let moveDown = cc.moveBy(1, cc.p(0, -30)).easing(cc.easeElasticOut());
        card.runAction(cc.sequence(moveDown));
        card.isUp = false;
    },

    _onTouchBegan: function (touch, event) {
        let pos = touch.getLocation();
        if (this.nextCardSlot.getBoundingBox().contains(pos)) {
            this.nextCardSlot.onTouchBegan(touch, event);
        }
        return true;
    }
});