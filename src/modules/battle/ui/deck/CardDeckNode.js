let CardDeckNode = cc.Node.extend({
    ctor: function () {
        this._super();

        let rootNode = ccs.load(BattleResource.CARD_DECK_NODE, "").node;
        this.addChild(rootNode);

        // background
        let background = rootNode.getChildByName("background");
        this.width = background.width;
        this.height = background.height;

        // energy progress
        let progressPos = rootNode.getChildByName("progress").getPosition();
        this.deckEnergyProgress = new DeckEnergyProgress();
        this.deckEnergyProgress.setPosition(rootNode.convertToNodeSpace(progressPos));
        rootNode.addChild(this.deckEnergyProgress);

        this.cardSlotManager = [];
        this.spriteDragManager = {};
        for (let i = 1; i <= 4; i++) {
            let card = rootNode.getChildByName("card_" + i);
            let cardPos = rootNode.convertToNodeSpace(card.getPosition());

            // FIXME: harcode
            let cardDeckSlot = null;
            switch (i) {
                case 1:
                    cardDeckSlot = new CardDeckSlot("textures/card/card_tower_cannon.png", "textures/card/card_background_1.png", 1, GameConfig.ENTITY_ID.CANNON_TOWER);
                    cardDeckSlot.setPosition(cardPos);
                    rootNode.addChild(cardDeckSlot);
                    break;
                case 2:
                    cardDeckSlot = new CardDeckSlot("textures/card/card_tower_ice_gun.png", "textures/card/card_background_2.png", 2, GameConfig.ENTITY_ID.BEAR_TOWER);
                    cardDeckSlot.setPosition(cardPos);
                    rootNode.addChild(cardDeckSlot);
                    break;
                case 3:
                    cardDeckSlot = new CardDeckSlot("textures/card/card_potion_frozen.png", "textures/card/card_background_2.png", 3, GameConfig.ENTITY_ID.FROZEN_SPELL);
                    cardDeckSlot.setPosition(cardPos);
                    rootNode.addChild(cardDeckSlot);
                    break;
                case 4:
                    cardDeckSlot = new CardDeckSlot("textures/card/card_potion_fireball.png", "textures/card/card_background_2.png", 4, GameConfig.ENTITY_ID.FIRE_SPELL);
                    cardDeckSlot.setPosition(cardPos);
                    rootNode.addChild(cardDeckSlot);
                    break;
            }

            cardDeckSlot.name = "card"+i;
            cardDeckSlot.isUp = false;
            cardDeckSlot.isClicked = false;
            this.cardSlotManager.push(cardDeckSlot);

            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: this._onTouchBegan.bind(this),
                onTouchMoved: this._onTouchMoved.bind(this),
                onTouchEnded: this._onTouchEnded.bind(this),
            }, cardDeckSlot);
        }
    },

    _onTouchBegan: function (touch, event) {
        let touchPos = touch.getLocation();
        let selectedCard = event.getCurrentTarget();

        let selectedCardBoundingBox = cc.rect(-selectedCard.width/2, -selectedCard.height/2, selectedCard.width, selectedCard.height);
        let touchInCard = cc.rectContainsPoint(selectedCardBoundingBox, selectedCard.convertToNodeSpace(touchPos)) === true;

        if (touchInCard) {
            if (selectedCard.isUp === false) {
                this._moveCardUp(selectedCard);
                // Select card
                GameConfig.gameLayer.selectedCard = selectedCard.type;

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

        let isSpellCard = selectedCard.type === GameConfig.ENTITY_ID.FIRE_SPELL || selectedCard.type === GameConfig.ENTITY_ID.FROZEN_SPELL;
        // FIXME: hardcode
        if (isSpellCard) {
            if (Utils.isPixelPositionInMap(touchPos, GameConfig.PLAYER)) {
                this._createOrGetSprite(selectedCard, touch);
                this.spriteDragManager[touch.getID()].setVisible(true);
                this.spriteDragManager[touch.getID()].setPosition(touchPos);
            } else {
                if (this.spriteDragManager[touch.getID()]) {
                    this.spriteDragManager[touch.getID()].setVisible(false);
                }
            }
        } else {
            if (Utils.isPixelPositionInMap(touchPos, GameConfig.PLAYER)) {
                this._createOrGetSprite(selectedCard, touch);
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

        let selectedCardBoundingBox = cc.rect(-selectedCard.width/2, -selectedCard.height/2, selectedCard.width, selectedCard.height);
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
            GameConfig.gameLayer.removeChild(this.spriteDragManager[touch.getID()]);
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

    _createOrGetSprite: function (selectedCard, touch) {
        if (!this.spriteDragManager[touch.getID()]) {
            // FIXME: hardcode sprite, use map to cache
            if (selectedCard.type === GameConfig.ENTITY_ID.FIRE_SPELL || selectedCard.type === GameConfig.ENTITY_ID.FROZEN_SPELL) {
                let sp = new cc.Sprite("textures/battle/battle_potion_range.png");
                this.spriteDragManager[touch.getID()] = sp;
                GameConfig.gameLayer.addChild(this.spriteDragManager[touch.getID()], 5);
            } else {
                this.spriteDragManager[touch.getID()] = createBearNodeAnimation(1.5 * GameConfig.TILE_WIDTH, true);
                GameConfig.gameLayer.addChild(this.spriteDragManager[touch.getID()], 5);
            }
        }
    },

});