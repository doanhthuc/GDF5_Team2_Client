const TreasurePopup = cc.Node.extend({
    ctor: function () {
        this.slotId = null;
        this.action = null;
        this._super();
        this.init();
    },

    init: function () {
        this.name = CLIENT_UI_CONST.POPUPS_NAME.GUI_TREASURE;
        this.treasurePopupNode = ccs.load(res.TREASURE_POPUP_NODE, '').node;
        this.addChild(this.treasurePopupNode);
        this.closeBtn = this.treasurePopupNode.getChildByName('closeBtn');
        this.closeBtn.addTouchEventListener(this.onCloseClick.bind(this), this);
        this.treasureGoldQuantityTxt = this.treasurePopupNode.getChildByName('treasureGoldQuantityTxt');
        this.treasureCardQuantityTxt = this.treasurePopupNode.getChildByName('treasureCardQuantityTxt');
        // this.primaryBtn = this.treasurePopupNode.getChildByName('primaryBtn');
        // this.primaryBtn.addTouchEventListener(this.onPrimaryBtnClick.bind(this), this);
        this.modal = this.treasurePopupNode.getChildByName('modal');
        this.modal.addTouchEventListener(this.onModalClick.bind(this), this);
        this.constrainTxt = this.treasurePopupNode.getChildByName('constrainTxt');
        this.openTreasureBtnNode = this.treasurePopupNode.getChildByName('openTreasureBtn');
        this.openTreasureBtn = this.openTreasureBtnNode.getChildByName('primaryBtn');
        this.speedUpBtnNode = this.treasurePopupNode.getChildByName('speedUpTreasureBtn');
        this.speedUpBtn = this.speedUpBtnNode.getChildByName('speedUpBtn');
        this.speedUpGemTxt = this.speedUpBtnNode.getChildByName('speedUpGemTxt');
        this.openAfterTxt = this.treasurePopupNode.getChildByName('openAfterTxt');
        this.countdownTxt = this.treasurePopupNode.getChildByName('countdownTxt');
        this.countdownTxt.ignoreContentAdaptWithSize(true);

        this.openTreasureBtn.addTouchEventListener(this.onOpenBtnClick.bind(this), this);
        this.speedUpBtn.addTouchEventListener(this.onSpeedUpBtnClick.bind(this), this);
        UiUtil.setImageFullScreen(this.modal);
    },

    setPopUpInfoFromTreasureType: function (slotId, action, treasureTypeId, slotState) {
        this.slotId = slotId;
        this.action = action;
        if (this.slotId !== null) {
            this.claimTime = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.TREASURE_CONTEXT).treasureList[this.slotId].claimTime;
        }
        let TreasureSlotNodeList = ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.HOME_NODE).treasureSlotNodeList;
        if (slotId && TreasureSlotNodeList[slotId].state === TreasureSlotResources.STATE.OCCUPIED && action === ChestConst.ACTION.SPEED_UP) {
            this.constrainTxt.setString(TreasureSlotResources.CONSTRAINT_TXT);
        } else {
            this.constrainTxt.setString('');
        }
        let treasureReward = JsonReader.getTreasureConfig().treasures[treasureTypeId].rewards[0];
        this.treasureGoldQuantityTxt.setString(treasureReward.minGold + " - " + treasureReward.maxGold);
        this.treasureCardQuantityTxt.setString(treasureReward.minFragment + " - " + treasureReward.maxFragment);
        this.setPopupBtn(this.action);
        if (slotState === TreasureSlotResources.STATE.OPENING && action === ChestConst.ACTION.SPEED_UP) {
            this.setCountDownString();
            this.schedule(this.setCountDownString, 1);
            this.openAfterTxt.setVisible(true);
            this.countdownTxt.setVisible(true);
        } else if (slotState === TreasureSlotResources.STATE.OCCUPIED && action === ChestConst.ACTION.SPEED_UP) {
            this.speedUpGemTxt.setString(exchangeDurationToGem(10800000));
            this.openAfterTxt.setVisible(false);
            this.countdownTxt.setVisible(false);
        } else if (this.slotId && action === ChestConst.ACTION.OPEN) {
            this.countdownTxt.setString(millisecondToTimeString(10800000));
            this.openAfterTxt.setVisible(true);
            this.countdownTxt.setVisible(true);
        } else if (action === ChestConst.ACTION.BUY) {
            this.openAfterTxt.setVisible(false);
            this.countdownTxt.setVisible(false);
        } else {
            this.openAfterTxt.setVisible(false);
            this.countdownTxt.setVisible(false);
        }
    },

    onCloseClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
            this.onFinishCountDown();
            PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_NOTIFY).hideNotification();
        }
    },

    onPrimaryBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            switch (this.action) {
                case ChestConst.ACTION.OPEN:
                    contextManager.getContext(ContextManagerConst.CONTEXT_NAME.TREASURE_CONTEXT).openChest(this.slotId);
                    break;
                case ChestConst.ACTION.SPEED_UP:
                    contextManager.getContext(ContextManagerConst.CONTEXT_NAME.TREASURE_CONTEXT).speedUpChest(this.slotId);
                    break;
                case ChestConst.ACTION.CLAIM:
                    contextManager.getContext(ContextManagerConst.CONTEXT_NAME.TREASURE_CONTEXT).claimChest(this.slotId);
                    break;
                default:
                    break;
            }
            this.setVisible(false);
        }
    },

    setPopupBtn: function (action) {
        switch (action) {
            case ChestConst.ACTION.OPEN:
                this.openTreasureBtnNode.setVisible(true);
                this.speedUpBtnNode.setVisible(false);
                break;
            case ChestConst.ACTION.SPEED_UP:
                this.openTreasureBtnNode.setVisible(false);
                this.speedUpBtnNode.setVisible(true);
                this.setCostBtnTexture(action);
                break;
            case ChestConst.ACTION.CLAIM:
                this.openTreasureBtnNode.setVisible(true);
                this.speedUpBtnNode.setVisible(false);
                break;
            case ChestConst.ACTION.BUY:
                this.openTreasureBtnNode.setVisible(false);
                this.speedUpBtnNode.setVisible(true);
                this.setCostBtnTexture(action);
                break;
            default:
                break;
        }
    },

    setBuyPrice: function (price) {
        this.buyPrice = price;
        this.speedUpGemTxt.setString(this.buyPrice);
    },

    setCostBtnTexture: function (action) {
        switch (action) {
            case ChestConst.ACTION.SPEED_UP:
                this.speedUpBtnNode.getChildByName('Sprite_1').setTexture(TreasureSlotResources.GEM_ICON_SMALL)
                break;
            case ChestConst.ACTION.BUY:
                this.speedUpBtnNode.getChildByName('Sprite_1').setTexture(TreasureSlotResources.GOLD_ICON_SMALL)
                break;
            default:
                break;
        }
    },

    onSpeedUpBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            let user = contextManager.getContext(ContextManagerConst.CONTEXT_NAME.USER_CONTEXT).getUser();
            cc.log('TreasurePopup onSpeedUpBtnClick user.gold: ' + (user.gem < exchangeDurationToGem(this.claimTime - Date.now())));
            switch (this.action) {
                case ChestConst.ACTION.SPEED_UP:
                    if (user.gem < exchangeDurationToGem(this.claimTime - Date.now() + TimeUtil.getDeltaTime())) {
                        let notify = PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_NOTIFY);
                        notify.setNotifyTxt('Không Đủ Gem');
                        notify.showNotify();
                        return;
                    }
                    contextManager.getContext(ContextManagerConst.CONTEXT_NAME.TREASURE_CONTEXT).speedUpChest(this.slotId);
                    this.setVisible(false);
                    this.onFinishCountDown();
                    break;
                case ChestConst.ACTION.BUY:
                    if (user.gold < this.buyPrice) {
                        let notify = PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_NOTIFY);
                        notify.setNotifyTxt('Không Đủ Vàng');
                        notify.showNotify();
                        return;
                    }
                    contextManager.getContext(ContextManagerConst.CONTEXT_NAME.TREASURE_CONTEXT).buyTreasureInShop(0);
                    this.setVisible(false);
                    break;
            }

        }
    },

    onOpenBtnClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            switch (this.action) {
                case ChestConst.ACTION.OPEN:
                    contextManager.getContext(ContextManagerConst.CONTEXT_NAME.TREASURE_CONTEXT).openChest(this.slotId);
                    break;
                case ChestConst.ACTION.CLAIM:
                    if (this.slotId) {
                        contextManager.getContext(ContextManagerConst.CONTEXT_NAME.TREASURE_CONTEXT).claimChest(this.slotId);
                    } else {
                        cc.log('TreasurePopup.js line 132 onOpenBtnClick this.slotId = ' + this.slotId);
                        contextManager.getContext(ContextManagerConst.CONTEXT_NAME.TREASURE_CONTEXT).buyTreasureInShop(0)
                    }
                    break;
                default:
                    break;
            }
            this.setVisible(false);
        }
    },

    onModalClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
            this.onFinishCountDown();
            PopupUIManager.getInstance().getUI(CLIENT_UI_CONST.POPUPS_NAME.GUI_NOTIFY).hideNotification();
        }
    },

    setCountDownString: function () {
        // let distance = claimTime - Date.now();
        let distance = this.claimTime - Date.now() + TimeUtil.getDeltaTime();
        this.speedUpGemTxt.setString(exchangeDurationToGem(distance));
        this.countdownTxt.setString(millisecondToTimeString(distance));
        if (distance < 0) {
            this.onFinishCountDown();
        }
    },

    onFinishCountDown: function () {
        this.unschedule(this.setCountDownString);
        // this.openingCountDownTxt.setString("0m 0s");
    }
});