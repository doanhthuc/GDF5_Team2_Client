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
                onTouchBegan: this.onTouchBegan.bind(this),
                onTouchMoved: this.onTouchMoved.bind(this),
                onTouchEnded: this.onTouchEnded.bind(this),
            }, cardDeckSlot);
        }
    },

    onTouchBegan: function (touch, event) {
        let touchPos = touch.getLocation();
        let selectedCard = event.getCurrentTarget();

        touchPos = selectedCard.convertToNodeSpace(touchPos);
        // FIXME: hardcode
        const CARD_WIDTH = 108, CARD_HEIGHT = 143;
        let selectedCardBoundingBox = cc.rect(-CARD_WIDTH/2, -CARD_HEIGHT/2, CARD_WIDTH, CARD_HEIGHT);

        if (cc.rectContainsPoint(selectedCardBoundingBox, touchPos)) {
            if (selectedCard.isUp === false) {
                this.moveCardUp(selectedCard);
                // Select card
                GameConfig.gameLayer.selectedCard = selectedCard.type;

                // FIXME: hardcode sprite, use map
                if (selectedCard.type === GameConfig.ENTITY_ID.FIRE_SPELL || selectedCard.type === GameConfig.ENTITY_ID.FROZEN_SPELL) {
                    let sp = new cc.Sprite("textures/battle/battle_potion_range.png");
                    this.spriteDragManager[touch.getID()] = sp;
                    GameConfig.gameLayer.addChild(this.spriteDragManager[touch.getID()], 5);
                } else {
                    this.spriteDragManager[touch.getID()] = createBearNodeAnimation(1.5*GameConfig.TILE_WIDTH);
                    GameConfig.gameLayer.addChild(this.spriteDragManager[touch.getID()], 5);
                }

                // move another card down if it is up
                for (let cardDeckSlot of this.cardSlotManager) {
                    if (cardDeckSlot.isUp === true && cardDeckSlot !== selectedCard) {
                        this.moveCardDown(cardDeckSlot);
                    }
                }
            }
            return true;
        }

        return false;
    },

    onTouchMoved: function (touch, event) {
        let selectedCard = event.getCurrentTarget();
        let touchPos = touch.getLocation();

        // FIXME: hardcode
        if (selectedCard.type === GameConfig.ENTITY_ID.FIRE_SPELL || selectedCard.type === GameConfig.ENTITY_ID.FROZEN_SPELL) {
            this.spriteDragManager[touch.getID()].setPosition(touchPos);
        } else {
            let tilePos = Utils.pixel2Tile(touchPos.x, touchPos.y, GameConfig.PLAYER);
            let pixelPos = Utils.tile2Pixel(tilePos.x, tilePos.y, GameConfig.PLAYER);
            this.spriteDragManager[touch.getID()].setPosition(pixelPos);
        }
    },

    onTouchEnded: function (touch, event) {
        let selectedCard = event.getCurrentTarget();
        let touchPos = touch.getLocation();
        touchPos = selectedCard.convertToNodeSpace(touchPos);

        const CARD_WIDTH = 108, CARD_HEIGHT = 143;
        let cardBoundingBox = cc.rect(-CARD_WIDTH/2, -CARD_HEIGHT/2, CARD_WIDTH, CARD_HEIGHT);

        if (selectedCard.isUp === true && cc.rectContainsPoint(cardBoundingBox, touchPos) === true) {
            if (selectedCard.isClicked === true) {
                this.moveCardDown(selectedCard);
                selectedCard.isClicked = false;
            } else {
                selectedCard.isClicked = true;
            }

        } else if (cc.rectContainsPoint(cardBoundingBox, touchPos) === false) {
            this.spriteDragManager[touch.getID()].setVisible(false);
            GameConfig.gameLayer.removeChild(this.spriteDragManager[touch.getID()]);
            this.spriteDragManager[touch.getID()] = null;
            this.moveCardDown(selectedCard);
        }

    },

    moveCardUp: function (card) {
        let moveTop = cc.moveBy(1, cc.p(0, 30)).easing(cc.easeElasticOut());
        card.runAction(cc.sequence(moveTop));
        card.isUp = true;
    },

    moveCardDown: function (card) {
        let moveDown = cc.moveBy(1, cc.p(0, -30)).easing(cc.easeElasticOut());
        card.runAction(cc.sequence(moveDown));
        card.isUp = false;
    }
});