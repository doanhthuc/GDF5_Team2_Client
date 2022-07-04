let CardDeckNode = cc.Node.extend({
    ctor: function () {
        this._super();

        this.rootNode = ccs.load(BattleResource.CARD_DECK_NODE, "").node;
        this.addChild(this.rootNode);

        let background = this.rootNode.getChildByName("background");
        this.width = background.width;
        this.height = background.height;

        for (let i = 1; i <= 4; i++) {
            let card = this.rootNode.getChildByName("card_" + i);
            card.name = "card"+i;

            switch (i) {
                case 1:
                    card.getChildByName("entity_image").setTexture("textures/card/card_tower_cannon.png");
                    card.type = GameConfig.ENTITY_ID.CANNON_TOWER;
                    break;
                case 2:
                    card.getChildByName("entity_image").setTexture("textures/card/card_tower_ice_gun.png");
                    card.type = GameConfig.ENTITY_ID.BEAR_TOWER;
                    break;
                case 3:
                    card.getChildByName("entity_image").setTexture("textures/card/card_tower_boomerang.png");
                    card.type = GameConfig.ENTITY_ID.FROG_TOWER;
                    break;
                case 4:
                    card.getChildByName("entity_image").setTexture("textures/card/card_tower_cannon.png");
                    card.type = GameConfig.ENTITY_ID.CANNON_TOWER;
                    break;
            }

            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: this.onTouchBegan.bind(this),
                onTouchMoved: this.onTouchMoved,
                onTouchEnded: this.onTouchEnded,
            }, card);
        }
        // this.cardBattleNodeList = [];
        // this.initCardBattleList();
    },

    onTouchBegan: function (touch, event) {
        let touchPos = touch.getLocation();
        let card = event.getCurrentTarget();

        touchPos = card.convertToNodeSpace(touchPos);
        const CARD_WIDTH = 108, CARD_HEIGHT = 143;

        let rect = cc.rect(-CARD_WIDTH/2, -CARD_HEIGHT/2, CARD_WIDTH, CARD_HEIGHT);

        if (cc.rectContainsPoint(rect, touchPos)) {
            let moveTop = cc.moveBy(1, cc.p(0, 30)).easing(cc.easeElasticOut());
            card.runAction(cc.sequence(moveTop));
            GameConfig.gameLayer.selectedTowerCard = card.type;
            return true;
        }

        return false;
    },

    onTouchMoved: function (touch, event) {
        // let target = event.getCurrentTarget();
    },

    onTouchEnded: function (touch, event) {
        let card = event.getCurrentTarget();
        let moveDown = cc.moveBy(1, cc.p(0, -30)).easing(cc.easeElasticOut());
        card.runAction(cc.sequence(moveDown));
    },

    // initCardBattleList: function () {
    //     let startX = -156.82;
    //     let startY = 14.76;
    //     for (let i = 0; i < 4; i++) {
    //         let cardBattleNode = new CardBattleNode(0);
    //         this.rootNode.addChild(cardBattleNode);
    //         cardBattleNode.setPosition(startX, startY);
    //         startX += cardBattleNode._width + 24.34;
    //         this.cardBattleNodeList.push(cardBattleNode);
    //     }
    // }
});