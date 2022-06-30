const OpenTreasurePopup = cc.Node.extend({
    ctor: function () {
        // this._super();
        this.name = CLIENT_UI_CONST.POPUPS_NAME.GUI_OPEN_TREASURE;
        this._super();
        this.init();
    },

    init: function () {
        this.node = ccs.load(TreasureSlotResources.OPEN_TREASURE_POPUP, '').node;
        this.addChild(this.node);
        this.backgroundImg = this.node.getChildByName('backgroundImg');
        this.receiveBtn = this.node.getChildByName('receiveBtn');
        this.receiveBtn.addTouchEventListener(this.onReceiveBtnClick.bind(this), this);
        // let startX = -cc.winSize/2 + 87 + 78 / 2;
        let startX = 0;
        let startY = 80;
        this.itemNodeList = [];
        for (let i = 0; i < 3; i++) {
            let itemNode = new CardWithQuantity(0, 0);
            itemNode.setPosition(startX, startY);
            startX += 78 + 30;
            this.node.addChild(itemNode);
            this.itemNodeList.push(itemNode);
        }
    },

    setItemListTexture: function (packet) {
        for (let i = 0; i < packet.rewardSize; i++) {
            let cardId = packet.itemType[i];
            if (cardId === 11) {
                this.itemNodeList[i].cardImg.setTexture('textures/common/common_icon_gold.png');
                this.itemNodeList[i].cardQuantityTxt.setString('x' + packet.itemQuantity[i]);
            } else {
                this.itemNodeList[i].cardImg.setTexture(CARD_CONST[cardId].cardImage);
                this.itemNodeList[i].cardQuantityTxt.setString('x' + packet.itemQuantity[i]);
            }
        }
    },


    onReceiveBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
    }
});