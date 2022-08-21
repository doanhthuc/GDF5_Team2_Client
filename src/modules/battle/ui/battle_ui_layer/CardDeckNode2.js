const CardDeckNode2 = cc.Node.extend({
    ctor: function (cardDeckListData) {
        this._super();
        this.cardDeckListData = cardDeckListData;
        this.selectableCardIdList = this.cardDeckListData.getFirst4Card();
        this.selectedCardType = null;
        this.selectedCardLevel = null;
        this.nextCardPosition = null;
        this.isCardPuttedIntoMap = false;
        this.isDragging = false;
        this.cardSlotNodeList = [];
        this.cardSlotNodeFixedPosList = [];
        this.spriteDragManager = {};
        this.shouldBeginTouch = true;

        this.rootNode = ccs.load(BattleResource.CARD_DECK_NODE, "").node;
        this.addChild(this.rootNode);
        BattleManager.getInstance().registerCardDeckNode(this);

        this.init();

        EventDispatcher.getInstance()
            .addEventHandler(EventType.INVALID_PUT_CARD_POSITION,
                this.handleInvalidPutCardPosition.bind(this));
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

        this.cancelSelectBtnNode = ccs.load("ui/battleCardDeck/CancelSelectBtn.json", "").node;
        this.cancelSelectBtn = this.cancelSelectBtnNode.getChildByName("cancelSelectBtnNode");
        this.rootNode.addChild(this.cancelSelectBtnNode, 10);
        this.cancelSelectBtn.addTouchEventListener(this.onCancelSelectCardBtnClick.bind(this), this);

        this.initNextCardSlot();

        for (let i = 0; i < this.selectableCardIdList.length; i++) {
            let card = this.rootNode.getChildByName("card_" + (i + 1));
            let cardPos = this.rootNode.convertToNodeSpace(card.getPosition());
            let cardSlot = new CardDeckSlot2(this.selectableCardIdList[i]);
            cardSlot.setPosition(cardPos);
            // cardSlot.cardBackgroundBtn.addTouchEventListener(this.onCardClick.bind(this), this);
            this.cardSlotNodeFixedPosList.push(cardPos);
            this.cardSlotNodeList.push(cardSlot);
            this.rootNode.addChild(cardSlot, 10);

            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: this._onTouchBegan.bind(this),
                onTouchMoved: this._onTouchMoved.bind(this),
                onTouchEnded: this._onTouchEnded.bind(this),
            }, cardSlot);
        }
    },

    handleInvalidPutCardPosition: function (data) {
        if (data.mode !== GameConfig.USER1()) {
            return;
        }
        let cardId = data.cardId;
        let cardSlot = this.cardSlotNodeList.find((cardSlot) => cardSlot.type === cardId);
        if (cardSlot) {
            this._moveCardDown(cardSlot);
        }
        this.removeDragSprite(this.selectedCardType);
        this.selectedCardType = null;
        this.selectedCardLevel = null;
        BattleManager.getInstance().getBattleLayer().selectedCard = null;
    },

    initNextCardSlot: function () {
        let cardNode = this.rootNode.getChildByName("card_5");
        let nextCard = this.cardDeckListData.getNextCard();
        this.nextCardSlot = new CardDeckSlot2(nextCard);
        this.nextCardPosition = cardNode.getPosition();
        this.nextCardSlot.setPosition(cardNode.getPosition());
        this.nextCardSlot.setScale(0.6449, 0.6449);
        this.rootNode.addChild(this.nextCardSlot, 1);
    },

    handlePutCardIntoMap: function (data) {
        if (data.mode === GameConfig.USER1()) {
            this.isCardPuttedIntoMap = true;
            // cc.log("[CardDeckNode2] handlePutCardIntoMap event ==============:  " + data.cardId);
            this.onCardPutIntoMap(data.cardId);
            let cardEnergy = CARD_CONST[data.cardId].energy;
            let deckEnergyProgress = BattleManager.getInstance().getCardDeckNode().deckEnergyProgress;
            deckEnergyProgress.minusEnergy(cardEnergy);
            // this.setNextCardSlotVisible(false);
        }
    },

    _moveCardUp: function (card) {
        let index = this.cardSlotNodeList.indexOf(card);
        let posY = this.cardSlotNodeFixedPosList[index].y;
        let moveY = posY + 50;
        let posX = this.cardSlotNodeFixedPosList[index].x;
        this.cancelSelectBtnNode.setPosition(posX, posY - card.height / 2 + 20);
        this.cancelSelectBtnNode.setVisible(true);
        let moveTop = cc.moveTo(1, cc.p(posX, moveY)).easing(cc.easeElasticOut());
        card.stopAllActions();
        card.runAction(moveTop);
        card.isUp = true;
    },

    _moveCardDown: function (card) {
        let index = this.cardSlotNodeList.indexOf(card);
        let pos = this.cardSlotNodeFixedPosList[index];
        let moveDown = cc.moveTo(1, pos).easing(cc.easeElasticOut());
        card.stopAllActions();
        card.runAction(moveDown);
        this.cancelSelectBtnNode.setVisible(false);
        card.isUp = false;
    },

    _onTouchBegan: function (touch, event) {
        this.isDragging = false;
        let touchPos = touch.getLocation();
        let selectedCard = event.getCurrentTarget();
        let selectedCardBoundingBox = cc.rect(-selectedCard.width / 2, -selectedCard.height / 2, selectedCard.width, selectedCard.height);
        // let selectedCardBoundingBox = cc.rect(0, 0, selectedCard.width, selectedCard.height);
        let touchInCard = cc.rectContainsPoint(selectedCardBoundingBox, selectedCard.convertToNodeSpace(touchPos));
        if (touchInCard) {
            if (!this.shouldBeginTouch) {
                return false;
            }
            this.shouldBeginTouch = false;


            this.removeDragSprite(this.selectedCardType);
            if (selectedCard.type === this.selectedCardType) {
                // let card = this.cardSlotNodeList.find(card => card.type === this.selectedCardType);
                this.selectedCardType = null;
                this.selectedCardLevel = null;
                this._moveCardDown(selectedCard)
                this.setSelectedCardType(null, null);
            } else {
                if (this.selectedCardType !== null) {
                    let prevSelectedCard = this.cardSlotNodeList.find(card => card.type === this.selectedCardType);
                    this._moveCardDown(prevSelectedCard);
                }
                // if (!this.validateEnoughEnergySelectCard(selectedCard.type)) {
                //     BattleManager.getInstance().getBattleLayer().uiLayer.notify("Không đủ năng lượng");
                //     this.setSelectedCardType(null, null);
                //     this.setShouldBeginTouch(true);
                //     return false;
                // }
                let card = selectedCard;
                this.setSelectedCardType(card.type, card.level);
                this._moveCardUp(card);
            }
            return true;
        }
        this.setShouldBeginTouch(true);
        return false;
    },

    _onTouchMoved: function (touch, event) {
        this.isDragging = true;
        let selectedCard = event.getCurrentTarget();
        let touchPos = touch.getLocation();
        touchPos = Utils.convertWorldSpace2MapNodeSpace(touchPos, GameConfig.USER1());
        let cardType = selectedCard.type;

        if (ValidatorECS.isSpell(cardType)) {
            if (Utils.isPixelPositionInMap(touchPos, GameConfig.USER1())) {
                this._createOrGetSprite(selectedCard, cardType, GameConfig.USER1());
                this.spriteDragManager[cardType].setVisible(true);
                this.spriteDragManager[cardType].setPosition(touchPos);
            } else {
                if (this.spriteDragManager[cardType]) {
                    this.spriteDragManager[cardType].setVisible(false);
                }
            }
        } else if (ValidatorECS.isTower(selectedCard.type) || ValidatorECS.isTrap(selectedCard.type)) {
            if (ValidatorECS.isTower(selectedCard.type)) {
                let tilePos = Utils.pixel2Tile(touchPos.x, touchPos.y, GameConfig.USER1());
                BattleManager.getInstance().getBattleLayer().mapLayer.showMonsterPathWhenDragCard(tilePos);
            }
            if (Utils.isPixelPositionInMap(touchPos, GameConfig.USER1())) {
                this._createOrGetSprite(selectedCard, cardType, GameConfig.USER1());
                let tilePos = Utils.pixel2Tile(touchPos.x, touchPos.y, GameConfig.USER1());
                let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, GameConfig.USER1());
                this.spriteDragManager[cardType].setVisible(true);
                this.spriteDragManager[cardType].setPosition(pixelPos);
            } else {
                if (this.spriteDragManager[cardType]) {
                    this.spriteDragManager[cardType].setVisible(false);
                }
            }
        }
    },

    _onTouchEnded: function (touch, event) {
        this.setShouldBeginTouch(true);
    },

    setShouldBeginTouch: function (shouldBeginTouch) {
        this.shouldBeginTouch = shouldBeginTouch;
    },

    setSelectedCardType: function (cardType, cardLevel) {
        this.selectedCardType = cardType;
        this.selectedCardLevel = cardLevel;
        BattleManager.getInstance().getBattleLayer().selectedCard = cardType;
        BattleManager.getInstance().getBattleLayer().selectedCardLevel = cardLevel;
    },

    _createOrGetSprite: function (selectedCard, cardType, mode) {
        const battleLayer = BattleManager.getInstance().getBattleLayer();
        Utils.validateMode(mode);
        if (!this.spriteDragManager[cardType]) {
            // FIXME: hardcode sprite, use map to cache
            let mapNode = mode === GameConfig.USER1() ? battleLayer.getPlayerMapNode()
                : battleLayer.getOpponentMapNode();
            if (ValidatorECS.isSpell(selectedCard.type)) {
                let sp = new cc.Sprite(BattleResource.POTION_RANGE_IMG);
                sp.setScale(2 * 1.2 * GameConfig.TILE_WIDTH / sp.width);
                this.spriteDragManager[cardType] = sp;
                mapNode.addChild(this.spriteDragManager[cardType], 5);
            } else if (ValidatorECS.isTrap(selectedCard.type)) {
                this.spriteDragManager[cardType] = new cc.Sprite(BattleResource.TRAP_IMG);
                mapNode.addChild(this.spriteDragManager[cardType], 5);
            } else {
                // this.spriteDragManager[cardType] = createBearNodeAnimation(1.5 * GameConfig.TILE_WIDTH, true);
                this.spriteDragManager[cardType] = NodeFactory.createDragTowerNode(selectedCard.type);
                mapNode.addChild(this.spriteDragManager[cardType], 5);
            }
        }
    },

    onCardPutIntoMap: function (cardType) {
        // cc.log("[CardDeckNode2] onCardPutIntoMap: " + cardType);
        // cc.log(this.isCardPuttedIntoMap);
        if (this.isCardPuttedIntoMap === true) {
            // cc.log(JSON.stringify(this.spriteDragManager[cardType]));
            this.removeDragSprite(cardType);
            let cardSlotNode = this.cardSlotNodeList.find(card => card.type === cardType);
            if (cardSlotNode) {
                let index = this.cardSlotNodeList.indexOf(cardSlotNode);
                cardSlotNode.setPosition(this.nextCardPosition);
                cardSlotNode.setScale(0.6449, 0.6449);
                let prevCardLevel = this.selectedCardLevel;
                cardSlotNode.setCardSlotTypeAndLevel(this.nextCardSlot.type, this.nextCardSlot.level);
                cardSlotNode.runAction(cc.spawn(cc.moveTo(0.15, this.cardSlotNodeFixedPosList[index]), cc.scaleTo(0.15, 1)));
                this.cardDeckListData.onCardUsed({id: cardType, level: prevCardLevel});
                let nextCard = this.cardDeckListData.getNextCard();
                this.nextCardSlot.setNextCardTypeAndLevel(nextCard.id, nextCard.level);
                // this.cardDeckListData.pushUsedCardIntoDeck({id: cardType, level: prevCardLevel});
            }
            BattleManager.getInstance().getBattleLayer().selectedCard = null;
            this.setSelectedCardType(null, null);
            this.isCardPuttedIntoMap = false;
            this.cancelSelectBtnNode.setVisible(false);
        }
    },

    removeDragSprite: function (cardType) {
        // cc.error("Remove drag sprite: " + cardType);
        for (let [key, value] of Object.entries(this.spriteDragManager)) {
            value.setVisible(false);
            BattleManager.getInstance().getBattleLayer().removeChild(value);
            // this.spriteDragManager[cardType] = null;
        }
        // if (!this.spriteDragManager[cardType]) {
        //     return;
        // }
        // this.spriteDragManager[cardType].setVisible(false);
        // BattleManager.getInstance().getBattleLayer().removeChild(this.spriteDragManager[cardType]);
        // this.spriteDragManager[cardType] = null;
    },

    onPutCardIntoInvalidPosition: function () {
        this.isCardPuttedIntoMap = false;
        this.removeDragSprite(this.selectedCardType);
        this.selectedCardType = null;
        BattleManager.getInstance().getBattleLayer().selectedCard = null;
    },

    validateEnoughEnergySelectCard: function (cardType) {
        let cardEnergy = CARD_CONST[cardType].energy;
        let playerEnergy = BattleManager.getInstance().getBattleData().getCurrentEnergy(GameConfig.USER1());
        return playerEnergy >= cardEnergy;
    },

    onCancelSelectCardBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.removeDragSprite(this.selectedCardType);
            let cardSlotNode = this.cardSlotNodeList.find(card => card.type === this.selectedCardType);
            if (cardSlotNode) {
                if (BattleManager.getInstance().getBattleData().getCurrentEnergy(GameConfig.USER1()) < 5) {
                    BattleManager.getInstance().getBattleLayer().uiLayer.notify("Không đủ năng lượng");
                    this._moveCardDown(cardSlotNode);
                    this.setSelectedCardType(null, null);
                    this.cancelSelectBtnNode.setVisible(false);
                    return;
                }
                let index = this.cardSlotNodeList.indexOf(cardSlotNode);
                cardSlotNode.setPosition(this.nextCardPosition);
                cardSlotNode.setScale(0.6449, 0.6449);
                let prevCardLevel = this.selectedCardLevel;
                cardSlotNode.setCardSlotTypeAndLevel(this.nextCardSlot.type, this.nextCardSlot.level);
                cardSlotNode.runAction(cc.spawn(cc.moveTo(0.15, this.cardSlotNodeFixedPosList[index]), cc.scaleTo(0.15, 1)));
                this.cardDeckListData.onCardUsed({id: this.selectedCardType, level: prevCardLevel});
                let nextCard = this.cardDeckListData.getNextCard();
                this.nextCardSlot.setNextCardTypeAndLevel(nextCard.id, nextCard.level);
                // this.cardDeckListData.pushUsedCardIntoDeck({id: this.selectedCardType, level: prevCardLevel});
                this.deckEnergyProgress.minusEnergy(5);
            }

            this.setSelectedCardType(null, null);
            this.cancelSelectBtnNode.setVisible(false);
        }
    },

    loadCardDeckList: function () {
        let cardDeckList = this.cardDeckListData.getFirst4Card();
        for (let i = 0; i < cardDeckList.length; i++) {
            let cardSlotNode = this.cardSlotNodeList[i];
            cardSlotNode.setCardSlotTypeAndLevel(cardDeckList[i].id, cardDeckList[i].level);
        }
        let nextCard = this.cardDeckListData.getNextCard();
        this.nextCardSlot.setNextCardTypeAndLevel(nextCard.id, nextCard.level);
    },

    updateCardDeckSlotState: function () {
        for (let i = 0; i < this.cardSlotNodeList.length; i++) {
            let cardSlotNode = this.cardSlotNodeList[i];
            if (this.validateEnoughEnergySelectCard(cardSlotNode.type)) {
                cardSlotNode.setColorByDisableState(false);
            } else {
                cardSlotNode.setColorByDisableState(true);
            }
        }
    }
});