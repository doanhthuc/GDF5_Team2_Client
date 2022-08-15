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
        let receiveBtnBottomOffset = 100;
        this.receiveBtn.setPosition(0, -cc.winSize.height / 2 + receiveBtnBottomOffset);
        this._spineboy = new sp.SkeletonAnimation(TreasureSlotResources.OPEN_TREASURE_FX_JSON, TreasureSlotResources.OPEN_TREASURE_FX_ATLAS);
        this._spineboy.setPosition(0, -cc.winSize.height / 2);
        this.addChild(this._spineboy);

        let startX = -cc.winSize.width / 2 + 83 + 138 / 2;
        // let startX = 0;
        let startY = cc.winSize.height / 2 - 300;
        this.itemNodeList = [];
        for (let i = 0; i < 3; i++) {
            let itemNode = new CardWithQuantity(0, 0);
            itemNode.setPosition(startX, startY);
            startX += 138 + 30;
            this.node.addChild(itemNode);
            this.itemNodeList.push(itemNode);

        }
        this.actionArray = [];
        UiUtil.setImageFullScreen(this.backgroundImg);
    },

    setItemListTexture: function (packet) {
        this.actionArray = [];
        this.receiveBtn.setVisible(false);
        for (let i = 0; i < packet.itemType.length; i++) {
            let cardId = packet.itemType[i];
            if (cardId === 11) {
                this.itemNodeList[i].cardImg.setTexture('textures/common/common_icon_gold.png');
                this.itemNodeList[i].cardQuantityTxt.setString('x' + packet.itemQuantity[i]);
                this.itemNodeList[i].setName("item_receive_" + cardId);
            } else {
                this.itemNodeList[i].cardImg.setTexture(CARD_CONST[cardId].cardImage);
                this.itemNodeList[i].cardQuantityTxt.setString('x' + packet.itemQuantity[i]);
                this.itemNodeList[i].setName("item_receive_" + cardId);
            }
            this.itemNodeList[i].setVisible(false);
            if (i === 0) {
                this.actionArray.push(
                    cc.callFunc(function (sender) {
                        sender.setAnimation(1, 'init', false);
                    }),
                    cc.delayTime(1.5),
                    // cc.callFunc(function (nodeExecutingAction, test) {
                    //     cc.log("nodeexe" + nodeExecutingAction.isVisible() + " " + test);
                    //     nodeExecutingAction.setVisible(true)
                    // }.bind(this, this.itemNodeList[i], 5))
                    cc.callFunc(function (sender, nodeExecutingAction) {
                        cc.log(nodeExecutingAction.isVisible());
                        nodeExecutingAction.setVisible(true)
                    }, this, this.itemNodeList[i])
                )
            } else {
                this.actionArray.push(
                    cc.callFunc(function (sender) {
                        sender.addAnimation(1, 'opening', false)
                    }),
                    cc.delayTime(1),
                    cc.callFunc(function (sender, nodeExecutingAction) {
                        cc.log(nodeExecutingAction.isVisible());
                        nodeExecutingAction.setVisible(true)
                    }, this, this.itemNodeList[i])
                )
            }

        }
        this.actionArray.push(cc.callFunc(function (sender, btn) {
           btn.setVisible(true);
        }, this, this.receiveBtn));
        this.openTreasureAnimation();

    },

    onReceiveBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
        this.stopOpenTreasureAnimation();
    },

    openTreasureAnimation: function () {
        this._spineboy.setVisible(true);
        this._spineboy.runAction(cc.sequence(this.actionArray));
    },

    stopOpenTreasureAnimation: function () {
        this._spineboy.stopAllActions();
        this._spineboy.setVisible(false);
    },

    animationStateEvent: function (obj, trackIndex, type, event, loopCount) {
        let animationName = (trackIndex && trackIndex.animation) ? trackIndex.animation.name : 0;

        switch (type) {
            case sp.ANIMATION_EVENT_TYPE.START:
                cc.log(trackIndex + " start: " + animationName);
                break;
            case sp.ANIMATION_EVENT_TYPE.END:
                cc.log(trackIndex + " end:" + animationName);
                break;
            case sp.ANIMATION_EVENT_TYPE.EVENT:
                cc.log(trackIndex + " event: " + animationName);
                break;
            case sp.ANIMATION_EVENT_TYPE.COMPLETE:
                cc.log(trackIndex + " complete: " + animationName + "," + loopCount);
                // cc.log('animationName : ' + animationName);
                break;
            default :
                break;
        }
    },
});