const CardDeckNode2 = cc.Node.extend({
    ctor: function (cardDeckListData) {
        this._super();
        this.cardDeckListData = cardDeckListData;
        this.selectableCardIdList = this.cardDeckListData.getFirst4CardId();
        this.selectedCardType = null;
        this.nextCardPosition = null;
        this.isCardPuttedIntoMap = false;
        this.isDragging = false;
        this.cardSlotNodeList = [];
        this.cardSlotNodeFixedPosList = [];
        this.spriteDragManager = {};

        this.rootNode = ccs.load(BattleResource.CARD_DECK_NODE, "").node;
        this.addChild(this.rootNode);
        BattleManager.getInstance().registerCardDeckNode(this);

        this.init();

        EventDispatcher.getInstance()
            .addEventHandler(EventType.PUT_NEW_TOWER,
                this.handlePutCardIntoMap.bind(this))
            .addEventHandler(EventType.UPGRADE_TOWER,
                this.handlePutCardIntoMap.bind(this))
            .addEventHandler(EventType.DROP_SPELL,
                this.handlePutCardIntoMap.bind(this))
            .addEventHandler(EventType.PUT_TRAP,
                this.handlePutCardIntoMap.bind(this))
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
                // onTouchEnded: this._onTouchEnded.bind(this),
            }, cardSlot);
        }

    },

    handleInvalidPutCardPosition: function (data) {
        let cardId = data.cardId;
        let cardSlot = this.cardSlotNodeList.find((cardSlot) => cardSlot.type === cardId);
        if (cardSlot) {
            this._moveCardDown(cardSlot);
        }
        this.removeDragSprite(this.selectedCardType);
        this.selectedCardType = null;
        BattleManager.getInstance().getBattleLayer().selectedCard = null;
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

    handlePutCardIntoMap: function (data) {
        if (data.mode === GameConfig.PLAYER) {
            this.isCardPuttedIntoMap = true;
            cc.log("[CardDeckNode2] handlePutCardIntoMap event ==============:  " + data.cardId);
            this.onCardPutIntoMap(data.cardId);
            let cardEnergy = CARD_CONST[data.cardId].energy;
            let deckEnergyProgress = BattleManager.getInstance().getCardDeckNode().deckEnergyProgress;
            deckEnergyProgress.minusEnergy(cardEnergy);
            // this.setNextCardSlotVisible(false);
        }
    },

    _moveCardUp: function (card) {
        let index = this.cardSlotNodeList.indexOf(card);
        let moveY = this.cardSlotNodeFixedPosList[index].y + 30;
        let moveTop = cc.moveBy(1, cc.p(0, moveY)).easing(cc.easeElasticOut());
        card.runAction(cc.sequence(moveTop));
        card.isUp = true;
    },

    _moveCardDown: function (card) {
        let index = this.cardSlotNodeList.indexOf(card);
        let pos = this.cardSlotNodeFixedPosList[index];
        let moveDown = cc.moveTo(1, pos).easing(cc.easeElasticOut());
        card.runAction(cc.sequence(moveDown));
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
            this.removeDragSprite(this.selectedCardType);
            if (selectedCard.type === this.selectedCardType) {
                // let card = this.cardSlotNodeList.find(card => card.type === this.selectedCardType);
                cc.log(JSON.stringify(this.selectedCardType));
                this.selectedCardType = null;
                this._moveCardDown(selectedCard)
            } else {
                if (this.selectedCardType !== null) {
                    let prevSelectedCard = this.cardSlotNodeList.find(card => card.type === this.selectedCardType);
                    this._moveCardDown(prevSelectedCard);
                }
                let card = selectedCard;
                this.selectedCardType = card.type;
                BattleManager.getInstance().getBattleLayer().selectedCard = this.selectedCardType;
                this._moveCardUp(card);
            }
            return true;
        }
        return false;
    },

    _onTouchMoved: function (touch, event) {
        this.isDragging = true;
        let selectedCard = event.getCurrentTarget();
        // cc.log("CardDeckNode2.js line 100: " + JSON.stringify(selectedCard))
        let touchPos = touch.getLocation();
        touchPos = Utils.convertWorldSpace2MapNodeSpace(touchPos, GameConfig.PLAYER);
        let cardType = selectedCard.type;
        // FIXME: hardcode
        if (ValidatorECS.isSpell(cardType)) {
            if (Utils.isPixelPositionInMap(touchPos, GameConfig.PLAYER)) {
                this._createOrGetSprite(selectedCard, cardType, GameConfig.PLAYER);
                this.spriteDragManager[cardType].setVisible(true);
                this.spriteDragManager[cardType].setPosition(touchPos);
            } else {
                if (this.spriteDragManager[cardType]) {
                    this.spriteDragManager[cardType].setVisible(false);
                }
            }
        } else if (ValidatorECS.isTower(selectedCard.type) || ValidatorECS.isTrap(selectedCard.type)) {
            if (Utils.isPixelPositionInMap(touchPos, GameConfig.PLAYER)) {
                this._createOrGetSprite(selectedCard, cardType, GameConfig.PLAYER);
                let tilePos = Utils.pixel2Tile(touchPos.x, touchPos.y, GameConfig.PLAYER);
                let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, GameConfig.PLAYER);
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
        if (this.isDragging && this.selectedCardType !== null) {
            this.isDragging = false;
            let selectedCard = this.cardSlotNodeList.find(card => card.type === this.selectedCardType);
            this.removeDragSprite(this.selectedCardType);
        }
    },

    _createOrGetSprite: function (selectedCard, cardType, mode) {
        const battleLayer = BattleManager.getInstance().getBattleLayer();
        Utils.validateMode(mode);
        if (!this.spriteDragManager[cardType]) {
            // FIXME: hardcode sprite, use map to cache
            let mapNode = mode === GameConfig.PLAYER ? battleLayer.getPlayerMapNode()
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
        cc.log("[CardDeckNode2] onCardPutIntoMap: " + cardType);
        cc.log(this.isCardPuttedIntoMap);
        if (this.isCardPuttedIntoMap === true) {
            cc.log(JSON.stringify(this.spriteDragManager[cardType]));
            this.removeDragSprite(cardType);
            let cardSlotNode = this.cardSlotNodeList.find(card => card.type === cardType);
            if (cardSlotNode) {
                let index = this.cardSlotNodeList.indexOf(cardSlotNode);
                cardSlotNode.setPosition(this.nextCardPosition);
                cardSlotNode.setScale(0.6449, 0.6449);
                cardSlotNode.setCardType(this.nextCardSlot.type)
                cardSlotNode.runAction(cc.spawn(cc.moveTo(0.15, this.cardSlotNodeFixedPosList[index]), cc.scaleTo(0.15, 1)));
                this.nextCardSlot.setCardType(this.cardDeckListData.getNextCardId());
                this.cardDeckListData.pushUsedCardIntoDeck(cardType);
            }
            BattleManager.getInstance().getBattleLayer().selectedCard = null;
            this.selectedCardType = null;
            this.isCardPuttedIntoMap = false;
        }
    },

    removeDragSprite: function (cardType) {
        if (!this.spriteDragManager[cardType]) {
            return;
        }
        this.spriteDragManager[cardType].setVisible(false);
        BattleManager.getInstance().getBattleLayer().removeChild(this.spriteDragManager[cardType]);
        this.spriteDragManager[cardType] = null;
    },

    onPutCardIntoInvalidPosition: function () {
        this.isCardPuttedIntoMap = false;
        this.removeDragSprite(this.selectedCardType);
        this.selectedCardType = null;
        BattleManager.getInstance().getBattleLayer().selectedCard = null;
    },

    validateEnoughEnergySelectCard: function (cardType) {
        let cardEnergy = CARD_CONST[cardType].energy;
        let playerEnergy = BattleManager.getInstance().getBattleData().getCurrentEnergy(GameConfig.PLAYER);
        return playerEnergy >= cardEnergy;
    }
});