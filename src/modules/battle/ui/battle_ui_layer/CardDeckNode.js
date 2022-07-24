let CardDeckNode = cc.Node.extend({
    ctor: function (cardDeckListData) {
        this._super();

        this.cardDeckListData = cardDeckListData;
        this.selectableCardIdList = this.cardDeckListData.getFirst4CardId();

        this.rootNode = ccs.load(BattleResource.CARD_DECK_NODE, "").node;
        this.addChild(this.rootNode);
        BattleManager.getInstance().registerCardDeckNode(this);

        // background
        let background = this.rootNode.getChildByName("background");
        this.width = background.width;
        this.height = background.height;

        // energy progress
        let progressPos = this.rootNode.getChildByName("progress").getPosition();
        this.deckEnergyProgress = new DeckEnergyProgress();
        this.deckEnergyProgress.setPosition(this.rootNode.convertToNodeSpace(progressPos));
        this.rootNode.addChild(this.deckEnergyProgress);

        this.cardSlotManager = [];
        this.spriteDragManager = {};
        this.fixedCardPosition = [null,];
        for (let i = 1; i <= 4; i++) {
            let card = this.rootNode.getChildByName("card_" + i);
            let cardPos = this.rootNode.convertToNodeSpace(card.getPosition());
            this.fixedCardPosition.push(cardPos);

            // FIXME: harcode
            // should save position of 5 card in array
            let cardDeckSlot = null;
            switch (i) {
                case 1:
                    cardDeckSlot = new CardDeckSlot(this.selectableCardIdList[i - 1]);
                    cardDeckSlot.setPosition(cardPos);
                    this.rootNode.addChild(cardDeckSlot);
                    break;
                case 2:
                    cardDeckSlot = new CardDeckSlot(this.selectableCardIdList[i - 1]);
                    cardDeckSlot.setPosition(cardPos);
                    this.rootNode.addChild(cardDeckSlot);
                    break;
                case 3:
                    cardDeckSlot = new CardDeckSlot(this.selectableCardIdList[i - 1]);
                    cardDeckSlot.setPosition(cardPos);
                    this.rootNode.addChild(cardDeckSlot);
                    break;
                case 4:
                    cardDeckSlot = new CardDeckSlot(this.selectableCardIdList[i - 1]);
                    cardDeckSlot.setPosition(cardPos);
                    this.rootNode.addChild(cardDeckSlot);
                    break;
            }

            cardDeckSlot.id = i;
            cardDeckSlot.name = "card" + i;
            cardDeckSlot.isUp = false;
            cardDeckSlot.number = i;
            cardDeckSlot.isClicked = false;
            this.cardSlotManager.push(cardDeckSlot);

            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: this._onTouchBegan.bind(this),
                onTouchMoved: this._onTouchMoved.bind(this),
                onTouchEnded: this._onTouchEnded.bind(this),
            }, cardDeckSlot);
        }

        this._handleEventKey();

        this.genNextCardSlot();

        EventDispatcher.getInstance()
            .addEventHandler(EventType.PUT_NEW_TOWER,
                this.handleChangeCardEvent.bind(this))
            .addEventHandler(EventType.UPGRADE_TOWER,
                this.handleChangeCardEvent.bind(this))
            .addEventHandler(EventType.DROP_SPELL,
                this.handleChangeCardEvent.bind(this))
    },

    handleChangeCardEvent: function (data) {
        let index = this.cardSlotManager.findIndex(function (cardSlot) {
            return cardSlot.type === data.cardId;
        });
        cc.log(JSON.stringify(this.cardSlotManager))
        cc.log("==> index = cardDeckNode line 89 " + index);
        if (index === -1) return;
        this.nextCard(index);
    },

    genNextCardSlot: function () {
        let card = this.rootNode.getChildByName("card_5");
        let cardId = this.cardDeckListData.getNextCardId();
        this.nextCardSlot = new CardDeckSlot(cardId);
        this.nextCardSlot.setPosition(card.getPosition());
        this.nextCardSlot.setScale(0.6449, 0.6449);
        this.rootNode.addChild(this.nextCardSlot, 1);
    },

    _onTouchBegan: function (touch, event) {
        let touchPos = touch.getLocation();
        let selectedCard = event.getCurrentTarget();

        let selectedCardBoundingBox = cc.rect(-selectedCard.width / 2, -selectedCard.height / 2, selectedCard.width, selectedCard.height);
        let touchInCard = cc.rectContainsPoint(selectedCardBoundingBox, selectedCard.convertToNodeSpace(touchPos)) === true;

        if (touchInCard) {
            if (selectedCard.isUp === false) {
                this._moveCardUp(selectedCard);
                // Select card
                BattleManager.getInstance().getBattleLayer().selectedCard = selectedCard.type;

                // move another card down if it is up
                for (let cardDeckSlot of this.cardSlotManager) {
                    if (cardDeckSlot.isUp && cardDeckSlot !== selectedCard) {
                        this._moveCardDown(cardDeckSlot);
                        cardDeckSlot.isClicked = false;
                    }
                }
            }
            return true;
        }

        return false;
    },

    _onTouchMoved: function (touch, event) {
        let selectedCard = event.getCurrentTarget();
        let touchPos = touch.getLocation();
        touchPos = Utils.convertWorldSpace2MapNodeSpace(touchPos, GameConfig.PLAYER);

        let isSpellCard = selectedCard.type === GameConfig.ENTITY_ID.FIRE_SPELL || selectedCard.type === GameConfig.ENTITY_ID.FROZEN_SPELL;
        // FIXME: hardcode
        if (isSpellCard) {
            if (Utils.isPixelPositionInMap(touchPos, GameConfig.PLAYER)) {
                this._createOrGetSprite(selectedCard, touch, GameConfig.PLAYER);
                this.spriteDragManager[touch.getID()].setVisible(true);
                this.spriteDragManager[touch.getID()].setPosition(touchPos);
            } else {
                if (this.spriteDragManager[touch.getID()]) {
                    this.spriteDragManager[touch.getID()].setVisible(false);
                }
            }
        } else {
            if (Utils.isPixelPositionInMap(touchPos, GameConfig.PLAYER)) {
                this._createOrGetSprite(selectedCard, touch, GameConfig.PLAYER);
                let tilePos = Utils.pixel2Tile(touchPos.x, touchPos.y, GameConfig.PLAYER);
                let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, GameConfig.PLAYER);
                this.spriteDragManager[touch.getID()].setVisible(true);
                this.spriteDragManager[touch.getID()].setPosition(pixelPos);
            } else {
                if (this.spriteDragManager[touch.getID()]) {
                    this.spriteDragManager[touch.getID()].setVisible(false);
                }
            }
        }
    },

    _onTouchEnded: function (touch, event) {
        let selectedCard = event.getCurrentTarget();
        let touchPos = touch.getLocation();

        let selectedCardBoundingBox = cc.rect(-selectedCard.width / 2, -selectedCard.height / 2, selectedCard.width, selectedCard.height);
        let touchInCard = cc.rectContainsPoint(selectedCardBoundingBox, selectedCard.convertToNodeSpace(touchPos)) === true;

        if (touchInCard && selectedCard.isUp) {
            if (selectedCard.isClicked) {
                if (selectedCard.isUp) {
                    this._moveCardDown(selectedCard);
                }
                selectedCard.isClicked = false;
            } else {
                selectedCard.isClicked = true;
            }

        } else if (!touchInCard) {
            if (selectedCard.isUp) {
                this._moveCardDown(selectedCard);
            }
        }

        if (this.spriteDragManager[touch.getID()]) {
            this.spriteDragManager[touch.getID()].setVisible(false);
            BattleManager.getInstance().getBattleLayer().removeChild(this.spriteDragManager[touch.getID()]);
            this.spriteDragManager[touch.getID()] = null;
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

    _createOrGetSprite: function (selectedCard, touch, mode) {
        const battleLayer = BattleManager.getInstance().getBattleLayer();
        Utils.validateMode(mode);
        if (!this.spriteDragManager[touch.getID()]) {
            // FIXME: hardcode sprite, use map to cache
            let mapNode = mode === GameConfig.PLAYER ? battleLayer.getPlayerMapNode()
                : battleLayer.getOpponentMapNode();
            if (selectedCard.type === GameConfig.ENTITY_ID.FIRE_SPELL || selectedCard.type === GameConfig.ENTITY_ID.FROZEN_SPELL) {
                let sp = new cc.Sprite(BattleResource.POTION_RANGE_IMG);
                sp.setScale(2 * 1.2 * GameConfig.TILE_WIDTH / sp.width);
                this.spriteDragManager[touch.getID()] = sp;
                mapNode.addChild(this.spriteDragManager[touch.getID()], 5);
            } else {
                // this.spriteDragManager[touch.getID()] = createBearNodeAnimation(1.5 * GameConfig.TILE_WIDTH, true);
                this.spriteDragManager[touch.getID()] = createDragTowerNode(selectedCard.type);
                mapNode.addChild(this.spriteDragManager[touch.getID()], 5);
            }
        }
    },

    _handleEventKey: function () {
        if ('keyboard' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (key, event) {
                    this.nextCard(3)
                }.bind(this),
                onKeyReleased: function (key, event) {
                    cc.log("Key up:" + key);
                }
            }, this);
        } else {
            cc.log("KEYBOARD Not supported");
        }
    },

    nextCard: function (replaceCardSlotID) {
        for (let i = 0; i < this.cardSlotManager.length; i++) {
            let currentCardSlot = this.cardSlotManager[i];
            if (currentCardSlot.id === replaceCardSlotID) {
                currentCardSlot.setVisible(false);
                // should save position of 5 card in array, and use it, not use the current slot card position
                let cardPos = currentCardSlot.getPosition();
                if (currentCardSlot.isUp) {
                    // FIXME: hardcode
                    cardPos.y = cardPos.y - 30;
                }

                this.nextCardSlot.id = currentCardSlot.id;
                this.cardSlotManager[i] = this.nextCardSlot;
                cc.log("Card Deck Node js line 243 : " + JSON.stringify(this.cardSlotManager[i]));
                this.cardSlotManager[i].runAction(cc.spawn(cc.moveTo(0.3, this.fixedCardPosition[currentCardSlot.number]), cc.scaleTo(0.3, 1)).easing(cc.easeElasticIn()));
                cc.eventManager.addListener({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    onTouchBegan: this._onTouchBegan.bind(this),
                    onTouchMoved: this._onTouchMoved.bind(this),
                    onTouchEnded: this._onTouchEnded.bind(this),
                }, this.cardSlotManager[i]);

                // FIXME: duplicate code
                this.cardSlotManager[i].name = "card" + currentCardSlot.id;
                this.cardSlotManager[i].isUp = false;
                this.cardSlotManager[i].isClicked = false;
                this.cardSlotManager[i].number = currentCardSlot.number;

                this.genNextCardSlot();
                break;
            }
        }
    },
});