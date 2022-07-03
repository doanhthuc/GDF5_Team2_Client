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
        this.primaryBtn = this.treasurePopupNode.getChildByName('primaryBtn');
        this.primaryBtn.addTouchEventListener(this.onPrimaryBtnClick.bind(this), this);
        this.modal = this.treasurePopupNode.getChildByName('modal');
        this.modal.addTouchEventListener(this.onModalClick.bind(this), this);
        this.constrainTxt = this.treasurePopupNode.getChildByName('constrainTxt');
    },

    setPopUpInfoFromTreasureType: function (slotId, action, treasureTypeId) {
        this.slotId = slotId;
        this.action = action;
        let TreasureSlotNodeList = ClientUIManager.getInstance().getUI(CLIENT_UI_CONST.NODE_NAME.HOME_NODE).treasureSlotNodeList;
        if (TreasureSlotNodeList[slotId].state === TreasureSlotResources.STATE.OCCUPIED && action === ChestConst.ACTION.SPEED_UP) {
            this.constrainTxt.setString(TreasureSlotResources.CONSTRAINT_TXT);
        } else {
            this.constrainTxt.setString('');
        }
        let treasureReward = JsonReader.getTreasureConfig().treasures[treasureTypeId].rewards[0];
        this.treasureGoldQuantityTxt.setString(treasureReward.minGold + " - " + treasureReward.maxGold);
        this.treasureCardQuantityTxt.setString(treasureReward.minFragment + " - " + treasureReward.maxFragment);
    },

    onCloseClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
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

    onModalClick: function (sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
    },
});