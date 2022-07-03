const CardBattleNode = cc.Node.extend({
    ctor: function (cardId) {
        this._super();
        this.cardId = cardId;
        this.isSelecting = false;
        this.init();
    },

    init: function () {
        this.cardImgNode = ccs.load('ui/inventory/cardImageNode.json', '').node;
        this.addChild(this.cardImgNode);
        this.cardBorderImg = this.cardImgNode.getChildByName('cardBorderImg');
        this.cardBackgroundBtn = this.cardImgNode.getChildByName('cardBackgroundBtn');
        this.towerImage = cc.Sprite(CARD_CONST[this.cardId].image['C']);
        this.addChild(this.towerImage);
        this.towerImage.setVisible(false);
        this._width = this.cardBorderImg.width;
        this._height = this.cardBorderImg.height;
        this.cardBackgroundBtn.addTouchEventListener(this.onCardClick.bind(this), this);
    },

    onCardClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_BEGAN) {
            this.isSelecting = !this.isSelecting;
            cc.log("card is selecting" + this.isSelecting);
        }
    }
})