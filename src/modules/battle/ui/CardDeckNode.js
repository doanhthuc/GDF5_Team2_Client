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
            card.isUp = false;

            // FIXME: harcode
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
                    card.getChildByName("entity_image").setTexture("textures/card/skill_icon_burn.png");
                    card.type = GameConfig.ENTITY_ID.FIRE_SPELL;
                    break;
            }

            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: this.onTouchBegan,
                onTouchMoved: this.onTouchMoved,
                onTouchEnded: this.onTouchEnded,
            }, card);
        }
    },

    onTouchBegan: function (touch, event) {
        let touchPos = touch.getLocation();
        let card = event.getCurrentTarget();

        touchPos = card.convertToNodeSpace(touchPos);
        // FIXME: hardcode
        const CARD_WIDTH = 108, CARD_HEIGHT = 143;
        let rect = cc.rect(-CARD_WIDTH/2, -CARD_HEIGHT/2, CARD_WIDTH, CARD_HEIGHT);

        if (card.isUp === false && cc.rectContainsPoint(rect, touchPos)) {
            let moveTop = cc.moveBy(1, cc.p(0, 30)).easing(cc.easeElasticOut());
            card.runAction(cc.sequence(moveTop));
            card.isUp = true;
            GameConfig.gameLayer.selectedCard = card.type;
            return true;
        } else if (card.isUp === true) {

        }

        return false;
    },

    onTouchMoved: function (touch, event) {
        // let target = event.getCurrentTarget();
    },

    onTouchEnded: function (touch, event) {
        let touchPos = touch.getLocation();
        let card = event.getCurrentTarget();
        touchPos = card.convertToNodeSpace(touchPos);
        // FIXME: hardcode
        const CARD_WIDTH = 108, CARD_HEIGHT = 143;
        let rect = cc.rect(-CARD_WIDTH/2, -CARD_HEIGHT/2, CARD_WIDTH, CARD_HEIGHT);
        if (cc.rectContainsPoint(rect, touchPos)) {
            // let moveTop = cc.moveBy(1, cc.p(0, 30)).easing(cc.easeElasticOut());
            // card.runAction(cc.sequence(moveTop));
            // GameConfig.gameLayer.selectedCard = card.type;
            // return true;
            cc.log("INNNNNNNNNNNNNNNN")
        } else {
            let card = event.getCurrentTarget();
            let moveDown = cc.moveBy(1, cc.p(0, -30)).easing(cc.easeElasticOut());
            card.runAction(cc.sequence(moveDown));
            card.isUp = false;
        }
    },
});